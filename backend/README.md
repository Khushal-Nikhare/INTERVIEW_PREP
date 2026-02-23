# Interview Analysis Backend

FastAPI backend for intelligent interview feedback analysis.

## Setup

```bash
# Install dependencies
pip install -r requirements.txt

# Run server
uvicorn main:app --reload

# Or specify port
uvicorn main:app --reload --port 8000
```

## Endpoints

- `POST /analyze` - Analyze interview transcript
- `GET /health` - Health check

## Test

Visit: http://127.0.0.1:8000/docs

## Architecture

**Rule-based Analysis**:
- Filler word detection
- Technical keyword density
- Response depth analysis
- Sentence structure evaluation

**Scoring System**:
- Communication Score (40% weight)
- Technical Score (60% weight)
- Real-time weakness detection
