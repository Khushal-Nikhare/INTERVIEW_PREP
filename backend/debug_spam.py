"""Debug component scores"""

from analysis import Message, TranscriptAnalyzer, TechnicalScorer

spam = [
    Message(role="interviewer", content="Explain databases"),
    Message(role="user", content="Database improves performance because it helps optimize queries. Database improves performance because it helps optimize queries.")
]

analyzer = TranscriptAnalyzer()
metrics = analyzer.analyze(spam)

print("Spam Metrics:")
for k, v in metrics.items():
    print(f"  {k}: {v}")

print("\nComponent Breakdown:")

# Manually call components
tech = TechnicalScorer._score_technical_knowledge(metrics, [], [])
print(f"  Technical (30%): {tech:.2f}")

reasoning = TechnicalScorer._score_reasoning(metrics, [], [])
print(f"  Reasoning (40%): {reasoning:.2f}")

structure = TechnicalScorer._score_structure(metrics, [], [])
print(f"  Structure (20%): {structure:.2f}")

quality = TechnicalScorer._score_quality(metrics, [], [])
print(f"  Quality (10%): {quality:.2f}")

final = 0.30 * tech + 0.40 * reasoning + 0.20 * structure + 0.10 * quality
print(f"\nWeighted Final: {final:.2f}")

score, _, _, conf = TechnicalScorer.score(metrics)
print(f"Actual Score: {score}")
print(f"Confidence: {conf}")
