"""
Test script for the Interview Prep Backend API
Includes:
  - API integration tests (health, generate questions, generate feedback)
  - Unit tests for GeminiKeyManager multi-key rotation logic
"""
import io
import sys
import os
import asyncio
import httpx
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')
from unittest.mock import MagicMock, patch

# Make sure 'app' package is importable when running from the backend/ dir
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from app.services.ai_service import GeminiKeyManager
from google.api_core.exceptions import ResourceExhausted


API_BASE_URL = "http://localhost:8000"

PASS = "[PASS]"
FAIL = "[FAIL]"


# ═══════════════════════════════════════════════════════════════════
#  SECTION 1 – GeminiKeyManager Unit Tests (no server required)
# ═══════════════════════════════════════════════════════════════════

def _make_exhausted_error():
    """Return a ResourceExhausted exception that mimics a real 429."""
    return ResourceExhausted("Quota exceeded for quota metric.")


def test_key_manager_single_key_success():
    """Single key works on first attempt — no rotation needed."""
    print("  [Unit] Single key — success on first call ... ", end="")
    manager = GeminiKeyManager(["key-1"])

    mock_model = MagicMock()
    mock_model.generate_content.return_value = MagicMock(text="hello")

    with patch.object(manager, "build_model", return_value=mock_model):
        result = manager.generate_with_fallback("test prompt")

    assert result == "hello", f"Expected 'hello', got '{result}'"
    assert mock_model.generate_content.call_count == 1
    print(PASS)
    return True


def test_key_manager_rotation_on_rate_limit():
    """Primary key is rate-limited → rotates to secondary key."""
    print("  [Unit] Two keys — rotate on rate-limit of key #1 ... ", end="")
    manager = GeminiKeyManager(["key-1", "key-2"])

    call_count = [0]

    def side_effect(prompt):
        call_count[0] += 1
        if call_count[0] == 1:
            raise _make_exhausted_error()   # key-1 fails
        return MagicMock(text="rotated-response")  # key-2 succeeds

    mock_model = MagicMock()
    mock_model.generate_content.side_effect = side_effect

    with patch.object(manager, "build_model", return_value=mock_model):
        result = manager.generate_with_fallback("test prompt")

    assert result == "rotated-response", f"Expected 'rotated-response', got '{result}'"
    assert call_count[0] == 2, f"Expected 2 attempts, got {call_count[0]}"
    print(PASS)
    return True


def test_key_manager_all_keys_exhausted():
    """All keys are rate-limited → raises ResourceExhausted."""
    print("  [Unit] All keys exhausted — should raise error ... ", end="")
    manager = GeminiKeyManager(["key-1", "key-2", "key-3"])

    mock_model = MagicMock()
    mock_model.generate_content.side_effect = _make_exhausted_error()

    try:
        with patch.object(manager, "build_model", return_value=mock_model):
            manager.generate_with_fallback("test prompt")
        print(FAIL)
        return False
    except ResourceExhausted:
        print(PASS)
        return True
    except Exception as e:
        print(f"{FAIL} — Wrong exception: {e}")
        return False


def test_key_manager_three_keys_second_works():
    """Key #1 and #2 rate-limited → key #3 succeeds."""
    print("  [Unit] Three keys — key #3 should succeed ... ", end="")
    manager = GeminiKeyManager(["key-1", "key-2", "key-3"])

    call_count = [0]

    def side_effect(prompt):
        call_count[0] += 1
        if call_count[0] < 3:
            raise _make_exhausted_error()
        return MagicMock(text="third-key-response")

    mock_model = MagicMock()
    mock_model.generate_content.side_effect = side_effect

    with patch.object(manager, "build_model", return_value=mock_model):
        result = manager.generate_with_fallback("test prompt")

    assert result == "third-key-response", f"Unexpected result: '{result}'"
    assert call_count[0] == 3
    print(PASS)
    return True


def test_key_manager_no_rotation_on_non_rate_limit_error():
    """Non-rate-limit errors (e.g. bad API key) must NOT trigger rotation."""
    print("  [Unit] Non-rate-limit error — should NOT rotate ... ", end="")
    manager = GeminiKeyManager(["key-1", "key-2"])

    mock_model = MagicMock()
    mock_model.generate_content.side_effect = ValueError("Invalid API key")

    try:
        with patch.object(manager, "build_model", return_value=mock_model):
            manager.generate_with_fallback("test prompt")
        print(FAIL)
        return False
    except ValueError:
        # Should have been called only once (no rotation)
        assert mock_model.generate_content.call_count == 1, (
            f"Expected 1 call, got {mock_model.generate_content.call_count}"
        )
        print(PASS)
        return True


def test_key_manager_requires_at_least_one_key():
    """GeminiKeyManager must raise ValueError if initialized with empty list."""
    print("  [Unit] Empty key list — should raise ValueError ... ", end="")
    try:
        GeminiKeyManager([])
        print(FAIL)
        return False
    except ValueError:
        print(PASS)
        return True


def test_key_manager_keys_loaded_from_env():
    """Verify that all_api_keys from settings includes both primary + extra keys."""
    print("  [Unit] settings.all_api_keys loads all keys correctly ... ", end="")
    try:
        from app.config import settings

        keys = settings.all_api_keys
        assert isinstance(keys, list), "all_api_keys should return a list"
        assert len(keys) >= 1, "Should have at least one key (GOOGLE_API_KEY)"
        assert settings.google_api_key in keys, "Primary key must be in the list"

        extra_count = len(keys) - 1
        print(f"{PASS}  ({len(keys)} key(s) found: 1 primary + {extra_count} extra)")
        return True
    except Exception as e:
        print(f"{FAIL} — {e}")
        return False


# ═══════════════════════════════════════════════════════════════════
#  SECTION 2 – API Integration Tests (requires running backend)
# ═══════════════════════════════════════════════════════════════════

async def test_health_check():
    """Test the health check endpoint."""
    print("  [API] Health check ... ", end="")
    async with httpx.AsyncClient() as client:
        response = await client.get(f"{API_BASE_URL}/health")
        ok = response.status_code == 200
        print(PASS if ok else f"{FAIL} (status {response.status_code})")
        if ok:
            print(f"         → {response.json()}")
        return ok


async def test_generate_questions():
    """Test question generation endpoint."""
    print("  [API] Generate questions ... ", end="")

    payload = {
        "role": "Frontend Developer",
        "level": "Senior",
        "techstack": "React, TypeScript, Next.js",
        "type": "Technical",
        "amount": 5,
        "user_id": "test_user_123"
    }

    async with httpx.AsyncClient(timeout=60.0) as client:
        response = await client.post(
            f"{API_BASE_URL}/api/interview/generate",
            json=payload
        )
        result = response.json()
        ok = result.get("success", False)
        print(PASS if ok else f"{FAIL} → {result.get('error')}")
        if ok:
            qs = result.get("questions", [])
            print(f"         → {len(qs)} question(s) generated")
            print(f"         → Sample: {qs[0] if qs else 'N/A'}")
        return result


async def test_generate_feedback():
    """Test feedback generation endpoint."""
    print("  [API] Generate feedback ... ", end="")

    payload = {
        "interview_id": "test_interview_123",
        "user_id": "test_user_123",
        "transcript": [
            {
                "role": "assistant",
                "content": "Hello! Thank you for taking the time to speak with me today. Can you tell me about your experience with React?"
            },
            {
                "role": "user",
                "content": "I have been working with React for 5 years. I have built several production applications using React, Redux, and TypeScript. I'm very comfortable with hooks, context API, and performance optimization."
            },
            {
                "role": "assistant",
                "content": "That's great! Can you explain how you would optimize a React application that has performance issues?"
            },
            {
                "role": "user",
                "content": "I would start by using React DevTools Profiler to identify slow components. Then I would implement React.memo for expensive components, use useMemo and useCallback hooks to memoize values and functions, implement code splitting with lazy loading, and optimize re-renders by proper state management."
            }
        ],
        "feedback_id": None
    }

    async with httpx.AsyncClient(timeout=120.0) as client:
        response = await client.post(
            f"{API_BASE_URL}/api/interview/feedback",
            json=payload
        )
        result = response.json()
        ok = result.get("success", False)
        print(PASS if ok else f"{FAIL} → {result.get('error')}")
        if ok:
            print(f"         → Feedback ID: {result.get('feedback_id')}")
        return result


# ═══════════════════════════════════════════════════════════════════
#  MAIN
# ═══════════════════════════════════════════════════════════════════

async def main():
    print()
    print("=" * 62)
    print("  Interview Prep -- Backend Test Suite")
    print("=" * 62)

    unit_results = []
    api_results = []

    # -- Unit Tests --
    print()
    print("-- UNIT TESTS: Multi-Key Rotation (GeminiKeyManager) --")
    unit_results.append(test_key_manager_single_key_success())
    unit_results.append(test_key_manager_rotation_on_rate_limit())
    unit_results.append(test_key_manager_all_keys_exhausted())
    unit_results.append(test_key_manager_three_keys_second_works())
    unit_results.append(test_key_manager_no_rotation_on_non_rate_limit_error())
    unit_results.append(test_key_manager_requires_at_least_one_key())
    unit_results.append(test_key_manager_keys_loaded_from_env())

    # -- API Integration Tests --
    print()
    print("-- API INTEGRATION TESTS (requires backend on :8000) --")
    try:
        health_ok = await test_health_check()

        if not health_ok:
            print("  [!] Health check failed -- skipping API tests.")
            print("     Make sure 'python run.py' is running first.\n")
        else:
            q_result = await test_generate_questions()
            api_results.append(q_result.get("success", False))

            f_result = await test_generate_feedback()
            api_results.append(f_result.get("success", False))

    except httpx.ConnectError:
        print("  [!] Cannot reach http://localhost:8000 -- API tests skipped.")
        health_ok = False

    # ── Summary ─────────────────────────────────────────────────────
    print()
    print("=" * 62)
    print("  SUMMARY")
    print("=" * 62)

    unit_labels = [
        "Single key — success on first call",
        "Two keys   — rotate on rate-limit",
        "All keys   — raises when exhausted",
        "Three keys — key #3 succeeds",
        "Non-rate-limit error — no rotation",
        "Empty key list — raises ValueError",
        "settings.all_api_keys loads all keys",
    ]
    print("\nUnit Tests:")
    for label, result in zip(unit_labels, unit_results):
        print(f"  {PASS if result else FAIL}  {label}")

    print("\nAPI Integration Tests:")
    if not api_results and not health_ok:
        print("  [!] Skipped (backend not running)")
    else:
        api_labels = ["Generate Questions", "Generate Feedback"]
        for label, result in zip(api_labels, api_results):
            print(f"  {PASS if result else FAIL}  {label}")

    passed_unit = sum(unit_results)
    total_unit = len(unit_results)
    passed_api = sum(api_results)
    total_api = len(api_results)

    print()
    print(f"  Unit  : {passed_unit}/{total_unit} passed")
    if total_api:
        print(f"  API   : {passed_api}/{total_api} passed")
    print("=" * 62)
    print()


if __name__ == "__main__":
    asyncio.run(main())
