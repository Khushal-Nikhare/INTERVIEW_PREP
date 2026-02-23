"""
Edge case test: "database database database" vs real explanation
"""

from analysis import Message, TranscriptAnalyzer, TechnicalScorer

# KEYWORD SPAM - Should score LOW
spam_transcript = [
    Message(role="interviewer", content="Tell me about databases"),
    Message(role="user", content="database database database optimization performance scalability database algorithm")
]

# REAL EXPLANATION - Should score HIGH
real_transcript = [
    Message(role="interviewer", content="Tell me about databases"),
    Message(role="user", content="I use databases to store structured information because it allows efficient querying. Proper indexing improves performance so that users get faster responses.")
]

def compare(name, transcript):
    print(f"\n{name}")
    analyzer = TranscriptAnalyzer()
    metrics = analyzer.analyze(transcript)
    score, strengths, weaknesses = TechnicalScorer.score(metrics)
    
    print(f"  Density: {metrics['technical_density']} | Explanations: {metrics['explanation_count']} | Links: {metrics['concept_links']}")
    print(f"  Score: {score}/100")
    print(f"  Verdict: {weaknesses[0] if weaknesses else 'Strong answer'}")

print("\n🔥 EDGE CASE TEST: Keyword Spam vs Real Understanding\n")
compare("❌ SPAM (database database database)", spam_transcript)
compare("✅ REAL (proper explanation)", real_transcript)
print()
