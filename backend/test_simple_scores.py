"""
Score comparison test - simple output
"""

from analysis import Message, TranscriptAnalyzer, TechnicalScorer

test_cases = [
    ("Weak", [
        Message(role="interviewer", content="Explain databases"),
        Message(role="user", content="Database stores data. Index helps queries.")
    ]),
    
    ("Keyword", [
        Message(role="interviewer", content="Explain databases"),
        Message(role="user", content="database database optimization performance scalability algorithm cache")
    ]),
    
    ("Spam", [
        Message(role="interviewer", content="Explain databases"),
        Message(role="user", content="Database improves performance because it helps optimize queries. Database improves performance because it helps optimize queries.")
    ]),
    
    ("Gaming", [
        Message(role="interviewer", content="Explain databases"),
        Message(role="user", content="Database improves performance because optimization. Index reduces latency so that queries. Cache increases speed therefore. API helps in scalability used to. Authentication optimizes security in order to. Transaction improves consistency as a result.")
    ]),
    
    ("Strong", [
        Message(role="interviewer", content="Explain database indexing"),
        Message(role="user", content="Database indexing is used to improve query performance because it reduces search time. An index helps in finding records faster, so that the database doesn't have to scan entire tables. This optimization is crucial for scalability."),
        Message(role="interviewer", content="What about caching?"),
        Message(role="user", content="Caching stores frequently accessed data in memory to reduce database load. It improves response time because repeated queries are eliminated. This helps achieve better scalability as a result of lower latency.")
    ])
]

print("\n" + "="*80)
print("FINAL SCORES")
print("="*80)
print(f"\n{'Type':<15} {'Words':<8} {'Density':<10} {'Explns':<8} {'Links':<8} {'Reps':<6} {'Div':<8} {'Score':<8} {'Conf':<10}")
print("-" * 90)

for name, transcript in test_cases:
    analyzer = TranscriptAnalyzer()
    metrics = analyzer.analyze(transcript)
    score, _, _, conf = TechnicalScorer.score(metrics)
    
    print(f"{name:<15} {metrics['total_words']:<8} {metrics['technical_density']:<10.4f} {metrics['explanation_count']:<8} {metrics['concept_links']:<8} {metrics['repetition_count']:<6} {metrics['lexical_diversity']:<8.4f} {score:<8} {conf:<10}")

print("\n" + "="*80)
print("TARGET vs ACTUAL")
print("="*80)

targets = {
    "Weak": (20, 30),
    "Keyword": (15, 25),
    "Spam": (10, 20),
    "Gaming": (60, 70),
    "Strong": (80, 90)
}

print(f"\n{'Type':<15} {'Target':<15} {'Actual':<10} {'Status':<15}")
print("-" * 60)

for name, transcript in test_cases:
    analyzer = TranscriptAnalyzer()
    metrics = analyzer.analyze(transcript)
    score, _, _, _ = TechnicalScorer.score(metrics)
    
    target_min, target_max = targets[name]
    in_range = target_min <= score <= target_max
    status = "MATCH" if in_range else "OFF TARGET"
    
    print(f"{name:<15} {target_min:>3}-{target_max:<10} {score:<10} {status:<15}")

print("\n" + "="*80)
