from analysis import Message, TranscriptAnalyzer, TechnicalScorer

gaming = [
    Message(role="interviewer", content="Explain databases"),
    Message(role="user", content="Database improves performance because optimization. Index reduces latency so that queries. Cache increases speed therefore. API helps in scalability used to. Authentication optimizes security in order to. Transaction improves consistency as a result.")
]

analyzer = TranscriptAnalyzer()
metrics = analyzer.analyze(gaming)

print(f"normalized_explanations: {metrics['normalized_explanations']}")
print(f"normalized_links: {metrics['normalized_links']}")
print(f"Ratio: {metrics['normalized_explanations'] / metrics['normalized_links']}")
print(f"Check > 4.0: {metrics['normalized_explanations'] > 4.0}")
print(f"Check ratio > 3.0: {metrics['normalized_explanations'] / metrics['normalized_links'] > 3.0}")
