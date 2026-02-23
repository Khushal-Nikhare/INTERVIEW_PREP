"""
Test script to demonstrate the upgraded technical scoring system
"""

from analysis import Message, TranscriptAnalyzer, TechnicalScorer, calculate_overall_score, CommunicationScorer

# WEAK ANSWER - Just keywords, no reasoning
weak_transcript = [
    Message(role="interviewer", content="Can you explain how database indexing works?"),
    Message(role="user", content="Database is used to store data. Index helps with queries. Performance is important."),
    Message(role="interviewer", content="What about scalability?"),
    Message(role="user", content="Scalability is good. Use cache and optimization.")
]

# STRONG ANSWER - Reasoning + concept linking + explanation
strong_transcript = [
    Message(role="interviewer", content="Can you explain how database indexing works?"),
    Message(role="user", content="Database indexing is used to improve query performance because it reduces the search time. An index helps in finding records faster, so that the database doesn't have to scan the entire table. This optimization is crucial for scalability."),
    Message(role="interviewer", content="What about caching strategies?"),
    Message(role="user", content="Caching is used for reducing database load. By storing frequently accessed data in memory, cache improves response time because it eliminates repeated queries. This helps in achieving better scalability as a result of lower latency.")
]

def test_transcript(name, transcript):
    print(f"\n{'='*60}")
    print(f"Testing: {name}")
    print(f"{'='*60}\n")
    
    analyzer = TranscriptAnalyzer()
    metrics = analyzer.analyze(transcript)
    
    print("📊 METRICS:")
    print(f"  Technical Density: {metrics['technical_density']}")
    print(f"  Technical Mentions: {metrics['technical_mentions']}")
    print(f"  Explanation Count: {metrics['explanation_count']}")
    print(f"  Concept Links: {metrics['concept_links']}")
    print(f"  Response Depth: {metrics['response_depth']}")
    print(f"  Avg Response Length: {metrics['avg_response_length']} words")
    
    tech_score, tech_strengths, tech_weaknesses = TechnicalScorer.score(metrics)
    comm_score, comm_strengths, comm_weaknesses = CommunicationScorer.score(metrics)
    overall = calculate_overall_score(comm_score, tech_score)
    
    print(f"\n🎯 SCORES:")
    print(f"  Technical Score: {tech_score}/100")
    print(f"  Communication Score: {comm_score}/100")
    print(f"  Overall Score: {overall}/100")
    
    print(f"\n✅ STRENGTHS:")
    for s in (tech_strengths + comm_strengths):
        print(f"  • {s}")
    
    print(f"\n❌ WEAKNESSES:")
    for w in (tech_weaknesses + comm_weaknesses):
        print(f"  • {w}")

if __name__ == "__main__":
    print("\n🧪 TECHNICAL SCORING SYSTEM UPGRADE TEST")
    print("Comparing keyword counting vs signal-based evaluation\n")
    
    test_transcript("❌ WEAK ANSWER (Just Keywords)", weak_transcript)
    test_transcript("✅ STRONG ANSWER (Reasoning + Links)", strong_transcript)
    
    print(f"\n{'='*60}")
    print("🔥 KEY DIFFERENCE:")
    print("Weak answers repeat keywords without understanding")
    print("Strong answers show reasoning, connections, and depth")
    print(f"{'='*60}\n")
