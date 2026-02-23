import requests
import json

PYTHON_API_URL = "http://127.0.0.1:8000"

def test_health():
    """Test health endpoint"""
    print("Testing health endpoint...")
    response = requests.get(f"{PYTHON_API_URL}/health")
    print(f"Status: {response.status_code}")
    print(f"Response: {response.json()}\n")

def test_analysis():
    """Test interview analysis"""
    print("Testing analysis endpoint...")
    
    sample_transcript = [
        {
            "role": "assistant",
            "content": "Can you tell me about your experience with React?"
        },
        {
            "role": "user",
            "content": "Um, yeah, so like, I've been working with React for about, uh, two years now. I've built, you know, several applications using React and, um, I'm pretty comfortable with hooks and state management, like Redux and stuff."
        },
        {
            "role": "assistant",
            "content": "How do you handle performance optimization in React applications?"
        },
        {
            "role": "user",
            "content": "Well, um, I use techniques like React.memo for component memoization, useCallback and useMemo hooks to prevent unnecessary re-renders. I also implement code splitting with lazy loading and React.Suspense. For larger apps, I profile performance using React DevTools to identify bottlenecks."
        },
        {
            "role": "assistant",
            "content": "Can you explain the difference between useEffect and useLayoutEffect?"
        },
        {
            "role": "user",
            "content": "Uh, so useEffect runs after the render is painted to screen, while useLayoutEffect runs synchronously after DOM mutations but before the browser paints. useLayoutEffect is useful for measuring DOM elements or making synchronous updates that need to happen before the browser paints."
        }
    ]
    
    response = requests.post(
        f"{PYTHON_API_URL}/analyze",
        json={"transcript": sample_transcript}
    )
    
    print(f"Status: {response.status_code}")
    
    if response.status_code == 200:
        result = response.json()
        print("\n=== Analysis Results ===")
        print(f"Overall Score: {result['overall_score']}/100")
        print(f"Communication Score: {result['communication_score']}/100")
        print(f"Technical Score: {result['technical_score']}/100")
        print(f"\nMetrics:")
        for key, value in result['metrics'].items():
            print(f"  {key}: {value}")
        print(f"\nStrengths:")
        for strength in result['strengths']:
            print(f"  • {strength}")
        print(f"\nWeaknesses:")
        for weakness in result['weaknesses']:
            print(f"  • {weakness}")
        print(f"\nImprovement Areas:")
        for area in result['improvement_areas']:
            print(f"  • {area}")
        print(f"\nDetailed Feedback:\n{result['detailed_feedback']}")
    else:
        print(f"Error: {response.text}")

if __name__ == "__main__":
    try:
        test_health()
        test_analysis()
        print("\n✅ All tests passed!")
    except Exception as e:
        print(f"\n❌ Test failed: {e}")
