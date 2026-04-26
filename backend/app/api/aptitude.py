from fastapi import APIRouter
from app.models.schemas import (
    GenerateAptitudeRequest,
    GenerateAptitudeResponse,
    MCQQuestion,
    SaveAptitudeResultRequest,
    SaveAptitudeResultResponse,
)
from app.services.ai_service import ai_service
from app.services.firebase_service import firebase_service
from datetime import datetime, timezone

router = APIRouter(prefix="/api/aptitude", tags=["aptitude"])


@router.post("/generate", response_model=GenerateAptitudeResponse)
async def generate_aptitude_questions(request: GenerateAptitudeRequest):
    """Generate MCQ aptitude questions for a given category using AI."""
    try:
        raw_questions = await ai_service.generate_aptitude_questions(
            category=request.category,
            amount=request.amount,
            difficulty=request.difficulty,
        )

        questions = [MCQQuestion(**q) for q in raw_questions]

        return GenerateAptitudeResponse(success=True, questions=questions)

    except Exception as e:
        print(f"Error generating aptitude questions: {e}")
        return GenerateAptitudeResponse(success=False, error=str(e))


@router.post("/result", response_model=SaveAptitudeResultResponse)
async def save_aptitude_result(request: SaveAptitudeResultRequest):
    """Save a completed aptitude test result to Firestore."""
    try:
        db = firebase_service.db

        result_doc = {
            "userId": request.user_id,
            "category": request.category,
            "score": request.score,
            "totalQuestions": request.total_questions,
            "percentage": request.percentage,
            "answers": [a.model_dump() for a in request.answers],
            "createdAt": datetime.now(timezone.utc).isoformat(),
        }

        result_ref = db.collection("aptitudeResults").document()
        result_ref.set(result_doc)

        return SaveAptitudeResultResponse(success=True, result_id=result_ref.id)

    except Exception as e:
        print(f"Error saving aptitude result: {e}")
        return SaveAptitudeResultResponse(success=False, error=str(e))


@router.get("/results/{user_id}")
async def get_aptitude_results(user_id: str):
    """Get all aptitude test results for a user."""
    try:
        db = firebase_service.db

        query = (
            db.collection("aptitudeResults")
            .where("userId", "==", user_id)
            .order_by("createdAt", direction="DESCENDING")
            .limit(20)
        )

        docs = query.get()
        results = [{"id": doc.id, **doc.to_dict()} for doc in docs]

        return {"success": True, "results": results}

    except Exception as e:
        print(f"Error fetching aptitude results: {e}")
        return {"success": False, "error": str(e), "results": []}
