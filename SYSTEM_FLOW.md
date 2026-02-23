# 🔄 System Flow Diagram

## Complete Request Flow

```
┌─────────────────────────────────────────────────────────────────┐
│                         USER INTERVIEW                          │
│                    (Voice/Text Interaction)                     │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             │ Interview Complete
                             ↓
┌─────────────────────────────────────────────────────────────────┐
│                    NEXT.JS FRONTEND (:3000)                     │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  lib/actions/interview.action.ts                         │  │
│  │  → createFeedback(transcript)                            │  │
│  └──────────────────────┬───────────────────────────────────┘  │
└─────────────────────────┼───────────────────────────────────────┘
                          │
                          │ HTTP POST /analyze
                          │ Body: { transcript: [...] }
                          ↓
┌─────────────────────────────────────────────────────────────────┐
│               PYTHON BACKEND (:8000) - FastAPI                  │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  main.py → /analyze endpoint                             │  │
│  └──────────────────────┬───────────────────────────────────┘  │
│                         │                                       │
│                         ↓                                       │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  analysis.py - Core Intelligence Engine                  │  │
│  │                                                           │  │
│  │  1️⃣ TranscriptAnalyzer                                   │  │
│  │     ├─ Extract user responses                            │  │
│  │     ├─ Count words, sentences                            │  │
│  │     ├─ Detect filler words (um, uh, like...)            │  │
│  │     ├─ Find technical keywords                           │  │
│  │     └─ Calculate metrics                                 │  │
│  │                                                           │  │
│  │  2️⃣ CommunicationScorer                                  │  │
│  │     ├─ Score filler ratio                                │  │
│  │     ├─ Evaluate response length                          │  │
│  │     ├─ Check sentence structure                          │  │
│  │     └─ Assess depth (shallow/moderate/detailed)          │  │
│  │                                                           │  │
│  │  3️⃣ TechnicalScorer                                      │  │
│  │     ├─ Score technical density                           │  │
│  │     ├─ Count technical mentions                          │  │
│  │     └─ Evaluate domain knowledge                         │  │
│  │                                                           │  │
│  │  4️⃣ FeedbackGenerator                                    │  │
│  │     ├─ Generate detailed feedback text                   │  │
│  │     ├─ Identify strengths                                │  │
│  │     ├─ Identify weaknesses                               │  │
│  │     └─ Create improvement plan                           │  │
│  └──────────────────────┬───────────────────────────────────┘  │
└─────────────────────────┼───────────────────────────────────────┘
                          │
                          │ Return JSON
                          │ { overall_score, communication_score,
                          │   technical_score, metrics, strengths,
                          │   weaknesses, improvement_areas }
                          ↓
┌─────────────────────────────────────────────────────────────────┐
│                    NEXT.JS FRONTEND (:3000)                     │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  Python analysis received ✅                              │  │
│  │                                                           │  │
│  │  Build enhanced prompt for Gemini:                       │  │
│  │  "Use this data-driven analysis..."                      │  │
│  │  - Overall Score: 75/100                                 │  │
│  │  - Filler Ratio: 5.2%                                    │  │
│  │  - Technical Density: 3.8%                               │  │
│  │  - Detected Strengths: [...]                             │  │
│  │  - Detected Weaknesses: [...]                            │  │
│  └──────────────────────┬───────────────────────────────────┘  │
└─────────────────────────┼───────────────────────────────────────┘
                          │
                          │ Call Gemini API
                          │ (with Python analysis context)
                          ↓
┌─────────────────────────────────────────────────────────────────┐
│                   GEMINI LLM (External API)                     │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  Refine feedback using:                                   │  │
│  │  • Python's quantitative metrics                         │  │
│  │  • Transcript qualitative analysis                       │  │
│  │  • Professional interviewer perspective                  │  │
│  │                                                           │  │
│  │  Generate:                                               │  │
│  │  • Category scores (5 dimensions)                        │  │
│  │  • Detailed comments per category                        │  │
│  │  • Final assessment                                      │  │
│  └──────────────────────┬───────────────────────────────────┘  │
└─────────────────────────┼───────────────────────────────────────┘
                          │
                          │ Return refined feedback
                          ↓
┌─────────────────────────────────────────────────────────────────┐
│                    NEXT.JS FRONTEND (:3000)                     │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  Combine:                                                 │  │
│  │  • Python metrics (quantitative)                         │  │
│  │  • Gemini analysis (qualitative)                         │  │
│  │                                                           │  │
│  │  Save to Firestore:                                      │  │
│  │  • Total score                                           │  │
│  │  • Category scores                                       │  │
│  │  • Strengths                                             │  │
│  │  • Areas for improvement                                 │  │
│  │  • Final assessment                                      │  │
│  └──────────────────────┬───────────────────────────────────┘  │
└─────────────────────────┼───────────────────────────────────────┘
                          │
                          ↓
┌─────────────────────────────────────────────────────────────────┐
│                        FIRESTORE DB                             │
│  Collection: feedback                                           │
│  ├─ interviewId                                                 │
│  ├─ userId                                                      │
│  ├─ totalScore: 75                                              │
│  ├─ categoryScores: [...]                                       │
│  ├─ strengths: [...]                                            │
│  ├─ areasForImprovement: [...]                                  │
│  └─ finalAssessment: "..."                                      │
└─────────────────────────┬───────────────────────────────────────┘
                          │
                          ↓
┌─────────────────────────────────────────────────────────────────┐
│                      USER SEES RESULTS                          │
│  📊 Overall Score: 75/100                                       │
│  💬 Communication: 80/100                                       │
│  🔧 Technical: 72/100                                           │
│  ✅ Strengths: Clear, structured responses                      │
│  ⚠️ Weaknesses: 5.2% filler words, improve technical depth     │
│  🎯 Improvements: Practice STAR method, study algorithms        │
└─────────────────────────────────────────────────────────────────┘
```

## Data Flow Details

### 1. Python Backend Processing
```python
Transcript → TranscriptAnalyzer
           ↓
        Metrics (10 signals)
           ↓
  ┌────────┴─────────┐
  ↓                  ↓
CommunicationScorer  TechnicalScorer
  ↓                  ↓
Score: 80/100      Score: 72/100
Strengths: [...]   Strengths: [...]
Weaknesses: [...]  Weaknesses: [...]
           ↓
    FeedbackGenerator
           ↓
    Complete Analysis
```

### 2. Hybrid Intelligence Flow
```
Python Analysis (Quantitative)
    ├─ Filler ratio: 5.2%
    ├─ Technical density: 3.8%
    ├─ Avg response length: 45 words
    └─ Metrics → LLM Prompt
              ↓
           Gemini (Qualitative)
    ├─ Contextual understanding
    ├─ Nuanced assessment
    └─ Professional insights
              ↓
         Final Feedback
    (Best of both approaches)
```

## Fallback Flow (Backend Down)

```
Next.js Frontend
       ↓
Try Python Backend ❌ (failed)
       ↓
Fall back to LLM-only mode
       ↓
Gemini analyzes transcript directly
       ↓
Still works, just less precise
```

## Key Advantages

| Step | Traditional | Your System |
|------|-------------|-------------|
| **Analysis** | LLM only | Python rules + LLM |
| **Metrics** | Vague | Quantified (%) |
| **Transparency** | Black box | Clear scoring |
| **Speed** | Slow | Fast Python processing |
| **Cost** | High token usage | Optimized |
| **Reliability** | Dependent on LLM | Has fallback |

## Architectural Benefits

✅ **Separation of Concerns**
- Frontend: UI/UX
- Python: Analysis logic
- LLM: Refinement
- Database: Storage

✅ **Modularity**
- Each component independent
- Easy to test
- Easy to extend

✅ **Scalability**
- Python backend can scale separately
- Add caching layer
- Add queue for async processing

✅ **Maintainability**
- Clear responsibilities
- Modular code
- Comprehensive docs

---

**This is production-level architecture, not a toy project.** 🚀
