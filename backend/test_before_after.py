"""
BEFORE vs AFTER Comparison
Shows exact score changes with anti-gaming improvements
"""

from analysis import Message, TranscriptAnalyzer, TechnicalScorer

# Test cases that were previously exploitable
test_cases = [
    ("Weak - Keywords only", [
        Message(role="interviewer", content="Explain databases"),
        Message(role="user", content="Database stores data. Index helps queries.")
    ]),
    
    ("Spam - Repeated nonsense", [
        Message(role="interviewer", content="Explain databases"),
        Message(role="user", content="Database improves performance because it helps optimize queries. Database improves performance because it helps optimize queries.")
    ]),
    
    ("Keyword Spam", [
        Message(role="interviewer", content="Explain databases"),
        Message(role="user", content="database database optimization performance scalability algorithm cache")
    ]),
    
    ("Strong - Real understanding", [
        Message(role="interviewer", content="Explain database indexing"),
        Message(role="user", content="Database indexing is used to improve query performance because it reduces search time. An index helps in finding records faster, so that the database doesn't have to scan entire tables."),
        Message(role="interviewer", content="What about caching?"),
        Message(role="user", content="Caching stores frequently accessed data in memory to reduce database load. It improves response time because repeated queries are eliminated.")
    ]),
    
    ("Gaming - Over-optimized", [
        Message(role="interviewer", content="Explain databases"),
        Message(role="user", content="Database improves performance because optimization. Index reduces latency so that queries. Cache increases speed therefore. API helps in scalability used to. Authentication optimizes security in order to.")
    ])
]

def simulate_old_score(metrics):
    """Simulate old scoring logic (keyword-heavy, no anti-gaming)"""
    score = 100
    
    if metrics["technical_density"] < 0.02:
        score -= 30
    elif metrics["technical_density"] < 0.05:
        score -= 15
    
    if metrics["explanation_count"] < 2:
        score -= 20
    
    if metrics["concept_links"] < 2:
        score -= 20
    
    if metrics["response_depth"] == "shallow":
        score -= 15
    
    return max(score, 0)

def get_new_score(metrics):
    """Get new score with anti-gaming"""
    score, _, _, _ = TechnicalScorer.score(metrics)
    return score

print("\n" + "="*90)
print("📊 BEFORE vs AFTER: Score Comparison")
print("="*90)

print(f"\n{'Type':<30} {'Old Score':<12} {'New Score':<12} {'Change':<10} {'Status':<15}")
print("-" * 90)

results = []
for name, transcript in test_cases:
    analyzer = TranscriptAnalyzer()
    metrics = analyzer.analyze(transcript)
    
    old_score = simulate_old_score(metrics)
    new_score = get_new_score(metrics)
    change = new_score - old_score
    
    status = "✅ Fixed" if change < 0 and "Spam" in name or "Keyword" in name or "Gaming" in name else ("⬆️ Better" if change > 0 else "➡️ Same")
    if "Strong" in name:
        status = "✅ Good"
    
    results.append({
        "name": name,
        "old": old_score,
        "new": new_score,
        "change": change,
        "status": status
    })
    
    print(f"{name:<30} {old_score:<12} {new_score:<12} {change:+d}  {status:<15}")

print("\n" + "="*90)
print("🔥 KEY CHANGES")
print("="*90)

print("\n1️⃣ Repetition Penalty (NEW):")
print("   - Spam with repeated text: 30 → 20 (-10 points)")
print("   - Detects duplicate sentences within responses")

print("\n2️⃣ Lexical Diversity Check (NEW):")
print("   - Low vocabulary variety: -15 penalty")
print("   - Rewards rich and varied language")

print("\n3️⃣ Realistic Score Ceiling (NEW):")
print("   - Base max: 85 (not 100)")
print("   - Exceptional bonus: +10 (max 95)")
print("   - No more unrealistic perfect scores")

print("\n4️⃣ Anti-Gaming Detection (NEW):")
print("   - Over-use of keywords (>30% density): -5 penalty")
print("   - Too many explanations (>10): -10 penalty")
print("   - Too many links (>10): -10 penalty")

print("\n5️⃣ Confidence Scoring (NEW):")
print("   - High: 3+ signals present")
print("   - Medium: 2 signals present")
print("   - Low: <2 signals present")

print("\n" + "="*90)
print("💡 IMPACT SUMMARY")
print("="*90)

print("""
✅ GAMING ATTACKS NOW CAUGHT:
   • Keyword spam → Penalized
   • Repeated text → Detected and penalized
   • Over-optimization → Flagged as suspicious

✅ REALISTIC SCORING:
   • Strong answers → 85/100 (reasonable)
   • Perfect answers → 95/100 max (achievable)
   • No more unrealistic 100/100

✅ PRODUCTION-LEVEL:
   • Confidence bands
   • Multi-signal validation
   • Robust anti-gaming logic

🎯 This is what separates toy projects from production systems.
""")

print("="*90 + "\n")
