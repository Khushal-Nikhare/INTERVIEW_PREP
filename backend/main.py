from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Dict, Optional

from analysis import (
    Message,
    TranscriptAnalyzer,
    CommunicationScorer,
    TechnicalScorer,
    FeedbackGenerator,
    calculate_overall_score
)

app = FastAPI(title="Interview Analysis API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class MessageInput(BaseModel):
    role: str
    content: str

class TranscriptInput(BaseModel):
    transcript: List[MessageInput]
    job_role: Optional[str] = None
    tech_stack: Optional[List[str]] = None

class AnalysisResult(BaseModel):
    overall_score: int
    communication_score: int
    technical_score: int
    confidence: str
    metrics: Dict
    strengths: List[str]
    weaknesses: List[str]
    detailed_feedback: str
    improvement_areas: List[str]

@app.post("/analyze", response_model=AnalysisResult)
async def analyze_interview(data: TranscriptInput):
    """Main endpoint for interview analysis"""
    
    if not data.transcript or len(data.transcript) == 0:
        raise HTTPException(status_code=400, detail="Transcript cannot be empty")
    
    try:
        messages = [Message(role=msg.role, content=msg.content) for msg in data.transcript]
        
        analyzer = TranscriptAnalyzer()
        metrics = analyzer.analyze(messages)
        
        comm_score, comm_strengths, comm_weaknesses = CommunicationScorer.score(metrics)
        tech_score, tech_strengths, tech_weaknesses, confidence = TechnicalScorer.score(metrics)
        
        all_strengths = comm_strengths + tech_strengths
        all_weaknesses = comm_weaknesses + tech_weaknesses
        
        overall_score = calculate_overall_score(comm_score, tech_score)
        
        feedback = FeedbackGenerator.generate(metrics, comm_score, tech_score, all_strengths, all_weaknesses)
        improvements = FeedbackGenerator.get_improvements(all_weaknesses)
        
        return AnalysisResult(
            overall_score=overall_score,
            communication_score=comm_score,
            technical_score=tech_score,
            confidence=confidence,
            metrics=metrics,
            strengths=all_strengths,
            weaknesses=all_weaknesses,
            detailed_feedback=feedback,
            improvement_areas=improvements
        )
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Analysis failed: {str(e)}")

@app.get("/health")
async def health_check():
    return {"status": "healthy", "message": "Interview Analysis API is running"}
