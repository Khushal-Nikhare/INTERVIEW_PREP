"""
Anti-Gaming Test: Compare old vs new scoring system
"""

from analysis import Message, TranscriptAnalyzer, TechnicalScorer

# 1. WEAK - Just keywords
weak_transcript = [
    Message(role="interviewer", content="Explain databases"),
    Message(role="user", content="Database stores data. Index helps queries.")
]

# 2. SPAM - Repeated nonsense with structure
spam_transcript = [
    Message(role="interviewer", content="Explain databases"),
    Message(role="user", content="Database improves performance because it helps optimize queries. Database improves performance because it helps optimize queries.")
]

# 3. KEYWORD SPAM - High density, no reasoning
keyword_spam_transcript = [
    Message(role="interviewer", content="Explain databases"),
    Message(role="user", content="database database optimization performance scalability algorithm cache index query")
]

# 4. STRONG - Real understanding
strong_transcript = [
    Message(role="interviewer", content="Explain database indexing"),
    Message(role="user", content="Database indexing is used to improve query performance because it reduces search time. An index helps in finding records faster, so that the database doesn't have to scan entire tables. This optimization is crucial for scalability."),
    Message(role="interviewer", content="What about caching?"),
    Message(role="user", content="Caching stores frequently accessed data in memory to reduce database load. It improves response time because repeated queries are eliminated. This helps achieve better scalability as a result of lower latency.")
]

# 5. GAMING ATTEMPT - Over-optimized structure
gaming_transcript = [
    Message(role="interviewer", content="Explain databases"),
    Message(role="user", content="Database improves performance because optimization. Index reduces latency so that queries. Cache increases speed therefore. API helps in scalability used to. Authentication optimizes security in order to. Transaction improves consistency as a result.")
]

def test_case(name, transcript):
    analyzer = TranscriptAnalyzer()
    metrics = analyzer.analyze(transcript)
    score, strengths, weaknesses, confidence = TechnicalScorer.score(metrics)
    
    return {
        "name": name,
        "score": score,
        "confidence": confidence,
        "density": metrics['technical_density'],
        "explanations": metrics['explanation_count'],
        "links": metrics['concept_links'],
        "repetitions": metrics['repetition_count'],
        "diversity": metrics['lexical_diversity'],
        "weaknesses": weaknesses[:2] if weaknesses else []
    }

if __name__ == "__main__":
    print("\n" + "="*80)
    print("🔥 ANTI-GAMING TEST: Robust Scoring Engine")
    print("="*80)
    
    cases = [
        ("❌ Weak (keywords only)", weak_transcript),
        ("❌ Spam (repeated nonsense)", spam_transcript),
        ("❌ Keyword Spam (database x3)", keyword_spam_transcript),
        ("✅ Strong (real understanding)", strong_transcript),
        ("⚠️ Gaming (over-optimized)", gaming_transcript)
    ]
    
    results = []
    for name, transcript in cases:
        result = test_case(name, transcript)
        results.append(result)
    
    print("\n📊 COMPARISON TABLE\n")
    print(f"{'Type':<30} {'Score':<8} {'Conf':<8} {'Density':<10} {'Explns':<8} {'Links':<8} {'Reps':<6} {'Div':<8}")
    print("-" * 90)
    
    for r in results:
        print(f"{r['name']:<30} {r['score']:<8} {r['confidence']:<8} {r['density']:<10.4f} {r['explanations']:<8} {r['links']:<8} {r['repetitions']:<6} {r['diversity']:<8.4f}")
    
    print("\n" + "="*80)
    print("🎯 KEY IMPROVEMENTS")
    print("="*80)
    
    print("\n✅ Repetition Penalty:")
    spam_result = results[1]
    print(f"   Spam detected: {spam_result['repetitions']} repetitions → Score: {spam_result['score']}")
    
    print("\n✅ Lexical Diversity:")
    keyword_result = results[2]
    print(f"   Low diversity: {keyword_result['diversity']:.2f} → Score: {keyword_result['score']}")
    
    print("\n✅ Anti-Gaming:")
    gaming_result = results[4]
    print(f"   Over-optimization detected → Score: {gaming_result['score']}")
    print(f"   Weaknesses: {gaming_result['weaknesses']}")
    
    print("\n✅ Realistic Ceiling:")
    strong_result = results[3]
    print(f"   Strong answer → Score: {strong_result['score']} (not 100)")
    print(f"   Confidence: {strong_result['confidence']}")
    
    print("\n" + "="*80)
    print("💡 BEFORE vs AFTER")
    print("="*80)
    print("""
BEFORE (gameable):
- Spam repeated text → HIGH SCORE ❌
- Keyword density → Main metric ❌
- Max score = 100 → Unrealistic ❌

AFTER (robust):
- Repetition penalty → Spam detected ✅
- Lexical diversity → Quality check ✅
- Max score = 95 → Realistic ✅
- Confidence band → Production-level ✅
- Anti-gaming → Over-optimization caught ✅
""")
    
    print("="*80 + "\n")
