# ⚡ Quick Reference - Interview Analysis System

## 🚀 Start System

```bash
# Start everything (recommended)
.\start-all.bat

# Or start individually:
.\start-backend.bat              # Python on :8000
cd INTERVIEW_PREP && npm run dev # Next.js on :3000
```

## 🔗 URLs

- **Frontend**: http://localhost:3000
- **Backend API**: http://127.0.0.1:8000
- **API Docs**: http://127.0.0.1:8000/docs
- **Health Check**: http://127.0.0.1:8000/health

## 🧪 Test Backend

```bash
cd backend
python test_api.py
```

## 📁 Key Files

| File | Purpose |
|------|---------|
| `backend/main.py` | FastAPI server & endpoints |
| `backend/analysis.py` | Core intelligence engine |
| `INTERVIEW_PREP/lib/actions/interview.action.ts` | Frontend integration |
| `start-all.bat` | Launch everything |

## 🎯 Analysis Metrics

### Communication Score (0-100)
- Filler word ratio
- Response length
- Sentence structure
- Response depth

### Technical Score (0-100)
- Technical keyword density
- Terminology usage
- Domain knowledge

### Overall Score
**40% Communication + 60% Technical**

## 📊 API Endpoints

### Health Check
```bash
GET http://127.0.0.1:8000/health
```

### Analyze Interview
```bash
POST http://127.0.0.1:8000/analyze
Content-Type: application/json

{
  "transcript": [
    {"role": "assistant", "content": "Question..."},
    {"role": "user", "content": "Answer..."}
  ]
}
```

**Response:**
```json
{
  "overall_score": 75,
  "communication_score": 80,
  "technical_score": 72,
  "metrics": {...},
  "strengths": [...],
  "weaknesses": [...],
  "improvement_areas": [...]
}
```

## 🔧 Troubleshooting

### Backend not starting?
```bash
cd backend
pip install -r requirements.txt
```

### Port 8000 in use?
```bash
# Change port in start-backend.bat
uvicorn main:app --reload --port 8001
```

### Frontend not connecting?
Check `INTERVIEW_PREP/.env.local`:
```
PYTHON_API_URL=http://127.0.0.1:8000
```

## 🧠 How Analysis Works

1. **Extract user responses** from transcript
2. **Count metrics**:
   - Words, sentences, fillers
   - Technical terms
   - Response patterns
3. **Calculate scores**:
   - Communication: filler ratio, depth, structure
   - Technical: keyword density, terminology
4. **Generate feedback**:
   - Identify strengths/weaknesses
   - Suggest improvements
5. **Send to LLM** with data context
6. **Return comprehensive feedback**

## 📈 Scoring Rules

### Filler Words Penalty
- **> 8%**: -25 points
- **5-8%**: -15 points
- **< 5%**: +0 (strength)

### Response Length
- **< 15 words**: -20 points (too brief)
- **> 80 words**: -10 points (too lengthy)
- **15-80 words**: +0 (strength)

### Technical Density
- **< 2%**: -30 points (weak)
- **2-5%**: -15 points (moderate)
- **> 5%**: +0 (strong)

## 🎯 Example Scores

| Candidate | Filler% | Tech% | Comm | Tech | Overall |
|-----------|---------|-------|------|------|---------|
| Strong    | 2%      | 8%    | 95   | 90   | 92      |
| Average   | 6%      | 3%    | 80   | 70   | 74      |
| Weak      | 10%     | 0.5%  | 65   | 40   | 50      |

## 🚀 Extensions Ideas

1. **Live Analysis**: Real-time filler counter
2. **Historical Tracking**: Improvement over time
3. **Role-Specific**: Custom keywords per job
4. **Peer Comparison**: Benchmark against others
5. **Advanced NLP**: Sentiment, confidence detection

## 📝 Important Notes

✅ Backend **must be running** for analysis  
✅ Falls back to LLM-only if backend down  
✅ All scores are **transparent and reproducible**  
✅ Improvements are **actionable and specific**  

## 🔒 Security Notes

⚠️ No authentication yet - add before production  
⚠️ CORS set for localhost:3000 only  
⚠️ Rate limiting not implemented  

## 📚 Documentation

- **Full Architecture**: `ARCHITECTURE.md`
- **Implementation Details**: `IMPLEMENTATION_COMPLETE.md`
- **Backend Docs**: `backend/README.md`

---

**Built with:** FastAPI + Next.js + Hybrid Intelligence 🧠
