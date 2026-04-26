from fastapi import APIRouter, HTTPException
from app.models.schemas import (
    CreateFeedbackRequest,
    CreateFeedbackResponse,
    GenerateQuestionsRequest,
    GenerateQuestionsResponse,
    Feedback
)
from app.services.ai_service import ai_service
from app.services.firebase_service import firebase_service
from datetime import datetime
import random


router = APIRouter(prefix="/api/interview", tags=["interview"])


INTERVIEW_COVERS = [
    "/adobe.png",
    "/amazon.png",
    "/facebook.png",
    "/hostinger.png",
    "/pinterest.png",
    "/quora.png",
    "/reddit.png",
    "/skype.png",
    "/spotify.png",
    "/telegram.png",
    "/tiktok.png",
    "/yahoo.png",
]


def get_random_cover() -> str:
    """Get random interview cover image"""
    return f"/covers{random.choice(INTERVIEW_COVERS)}"


@router.post("/feedback", response_model=CreateFeedbackResponse)
async def create_feedback(request: CreateFeedbackRequest):
    """Generate and save AI feedback for an interview"""
    try:
        # Convert transcript to dict format
        transcript_dicts = [
            {"role": msg.role, "content": msg.content}
            for msg in request.transcript
        ]
        
        # Generate AI feedback
        print(f"Generating AI feedback for interview: {request.interview_id}")
        feedback_response = await ai_service.generate_feedback(transcript_dicts)
        
        # Prepare feedback document
        category_scores = [
            {
                "name": feedback_response.communication_skills.name,
                "score": feedback_response.communication_skills.score,
                "comment": feedback_response.communication_skills.comment,
            },
            {
                "name": feedback_response.technical_knowledge.name,
                "score": feedback_response.technical_knowledge.score,
                "comment": feedback_response.technical_knowledge.comment,
            },
            {
                "name": feedback_response.problem_solving.name,
                "score": feedback_response.problem_solving.score,
                "comment": feedback_response.problem_solving.comment,
            },
            {
                "name": feedback_response.cultural_fit.name,
                "score": feedback_response.cultural_fit.score,
                "comment": feedback_response.cultural_fit.comment,
            },
            {
                "name": feedback_response.confidence_and_clarity.name,
                "score": feedback_response.confidence_and_clarity.score,
                "comment": feedback_response.confidence_and_clarity.comment,
            },
        ]
        
        feedback_doc = {
            "interviewId": request.interview_id,
            "userId": request.user_id,
            "totalScore": feedback_response.total_score,
            "categoryScores": category_scores,
            "strengths": [feedback_response.strengths],
            "areasForImprovement": [feedback_response.areas_for_improvement],
            "finalAssessment": feedback_response.final_assessment,
            "createdAt": datetime.utcnow().isoformat(),
        }
        
        # Save to Firebase
        db = firebase_service.db
        
        if request.feedback_id:
            # Update existing feedback
            feedback_ref = db.collection("feedback").document(request.feedback_id)
            feedback_ref.set(feedback_doc)
            feedback_id = request.feedback_id
        else:
            # Create new feedback
            feedback_ref = db.collection("feedback").document()
            feedback_ref.set(feedback_doc)
            feedback_id = feedback_ref.id
        
        return CreateFeedbackResponse(
            success=True,
            feedback_id=feedback_id
        )
        
    except Exception as e:
        print(f"Error creating feedback: {e}")
        return CreateFeedbackResponse(
            success=False,
            error=str(e)
        )


@router.post("/generate", response_model=GenerateQuestionsResponse)
async def generate_interview_questions(request: GenerateQuestionsRequest):
    """Generate interview questions using AI"""
    try:
        # Generate questions using AI
        questions = await ai_service.generate_questions(
            role=request.role,
            level=request.level,
            techstack=request.techstack,
            interview_type=request.type,
            amount=request.amount
        )
        
        # Prepare interview document
        interview_doc = {
            "role": request.role,
            "type": request.type,
            "level": request.level,
            "techstack": request.techstack.split(","),
            "questions": questions,
            "userId": request.user_id,
            "finalized": True,
            "coverImage": get_random_cover(),
            "createdAt": datetime.utcnow().isoformat(),
        }
        
        # Save to Firebase
        db = firebase_service.db
        interview_ref = db.collection("interviews").document()
        interview_ref.set(interview_doc)
        
        return GenerateQuestionsResponse(
            success=True,
            interview_id=interview_ref.id,
            questions=questions
        )
        
    except Exception as e:
        print(f"Error generating questions: {e}")
        return GenerateQuestionsResponse(
            success=False,
            error=str(e)
        )
