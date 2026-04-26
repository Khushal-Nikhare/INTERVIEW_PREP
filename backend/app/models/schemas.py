from pydantic import BaseModel, Field
from typing import List, Optional
from datetime import datetime


class CategoryScore(BaseModel):
    name: str
    score: int = Field(..., ge=0, le=100)
    comment: str


class FeedbackResponse(BaseModel):
    total_score: int = Field(..., ge=0, le=100)
    communication_skills: CategoryScore
    technical_knowledge: CategoryScore
    problem_solving: CategoryScore
    cultural_fit: CategoryScore
    confidence_and_clarity: CategoryScore
    strengths: str
    areas_for_improvement: str
    final_assessment: str


class TranscriptMessage(BaseModel):
    role: str
    content: str


class CreateFeedbackRequest(BaseModel):
    interview_id: str
    user_id: str
    transcript: List[TranscriptMessage]
    feedback_id: Optional[str] = None


class GenerateQuestionsRequest(BaseModel):
    role: str
    level: str
    techstack: str
    type: str
    amount: int = Field(..., ge=1, le=20)
    user_id: str


class GenerateQuestionsResponse(BaseModel):
    success: bool
    interview_id: Optional[str] = None
    questions: Optional[List[str]] = None
    error: Optional[str] = None


class CreateFeedbackResponse(BaseModel):
    success: bool
    feedback_id: Optional[str] = None
    error: Optional[str] = None


class Interview(BaseModel):
    id: Optional[str] = None
    role: str
    type: str
    level: str
    techstack: List[str]
    questions: List[str]
    user_id: str
    finalized: bool = True
    cover_image: Optional[str] = None
    created_at: str


class Feedback(BaseModel):
    id: Optional[str] = None
    interview_id: str
    user_id: str
    total_score: int
    category_scores: List[CategoryScore]
    strengths: List[str]
    areas_for_improvement: List[str]
    final_assessment: str
    created_at: str


# ── Aptitude Test Models ───────────────────────────────────────────


class MCQQuestion(BaseModel):
    id: str
    question: str
    options: List[str]          # ["A. ...", "B. ...", "C. ...", "D. ..."]
    correct_answer: str         # "A" | "B" | "C" | "D"
    explanation: str
    difficulty: str = "medium"


class GenerateAptitudeRequest(BaseModel):
    category: str
    amount: int = Field(default=20, ge=5, le=50)
    difficulty: str = "medium"
    user_id: str


class GenerateAptitudeResponse(BaseModel):
    success: bool
    questions: Optional[List[MCQQuestion]] = None
    error: Optional[str] = None


class AptitudeAnswerEntry(BaseModel):
    question_id: str
    selected: str
    correct: str
    is_correct: bool
    question_text: Optional[str] = None
    options: Optional[List[str]] = None
    explanation: Optional[str] = None


class SaveAptitudeResultRequest(BaseModel):
    user_id: str
    category: str
    score: int
    total_questions: int
    percentage: float
    answers: List[AptitudeAnswerEntry]


class SaveAptitudeResultResponse(BaseModel):
    success: bool
    result_id: Optional[str] = None
    error: Optional[str] = None


class AptitudeResult(BaseModel):
    id: Optional[str] = None
    user_id: str
    category: str
    score: int
    total_questions: int
    percentage: float
    answers: List[AptitudeAnswerEntry]
    created_at: str
