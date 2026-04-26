import google.generativeai as genai
from google.api_core.exceptions import ResourceExhausted
from app.config import settings
from app.models.schemas import FeedbackResponse, CategoryScore
from typing import List, Dict
import json
import re
import logging

logger = logging.getLogger(__name__)


class GeminiKeyManager:
    """
    Manages a pool of Gemini API keys.
    Rotates to the next key automatically when one hits its rate limit.
    """

    def __init__(self, api_keys: List[str]):
        if not api_keys:
            raise ValueError("At least one Gemini API key must be provided.")
        self._keys = api_keys
        self._index = 0
        logger.info(f"[GeminiKeyManager] Loaded {len(self._keys)} API key(s).")

    @property
    def current_key(self) -> str:
        return self._keys[self._index]

    def rotate(self) -> bool:
        """
        Rotate to the next available key.
        Returns True if a new key is available, False if all keys are exhausted.
        """
        next_index = (self._index + 1) % len(self._keys)
        if next_index == 0 and self._index != 0:
            # Wrapped around — all keys tried
            logger.error("[GeminiKeyManager] All API keys are exhausted.")
            return False
        if next_index == self._index:
            # Only one key, no rotation possible
            logger.error("[GeminiKeyManager] Only one API key available and it is rate-limited.")
            return False
        self._index = next_index
        logger.warning(
            f"[GeminiKeyManager] Rate limit hit. Rotating to key #{self._index + 1} of {len(self._keys)}."
        )
        return True

    def build_model(self, model_name: str = "gemini-2.5-flash") -> genai.GenerativeModel:
        """Configure the genai library with the current key and return a model."""
        genai.configure(api_key=self.current_key)
        return genai.GenerativeModel(model_name)

    def generate_with_fallback(self, prompt: str, model_name: str = "gemini-2.5-flash") -> str:
        """
        Try to generate content using the current key. On rate-limit, rotate and retry
        until all keys are tried. Raises the last exception if all fail.
        """
        attempts = 0
        last_error = None

        while attempts < len(self._keys):
            try:
                model = self.build_model(model_name)
                response = model.generate_content(prompt)
                return response.text.strip()
            except ResourceExhausted as e:
                logger.warning(
                    f"[GeminiKeyManager] Key #{self._index + 1} hit rate limit: {e}"
                )
                last_error = e
                if not self.rotate():
                    break
                attempts += 1
            except Exception as e:
                logger.error(f"[GeminiKeyManager] Unexpected error on key #{self._index + 1}: {e}")
                raise

        raise last_error or RuntimeError("All Gemini API keys are exhausted.")


class AIService:
    def __init__(self):
        self._key_manager = GeminiKeyManager(settings.all_api_keys)

    async def generate_feedback(self, transcript: List[Dict[str, str]]) -> FeedbackResponse:
        """Generate AI feedback from interview transcript"""

        # Format transcript
        formatted_transcript = "\n".join([
            f"- {msg['role']}: {msg['content']}"
            for msg in transcript
        ])

        prompt = f"""
You are an AI interviewer analyzing a mock interview. Your task is to evaluate the candidate based on structured categories. Be thorough and detailed in your analysis. Don't be lenient with the candidate. If there are mistakes or areas for improvement, point them out.

Transcript:
{formatted_transcript}

Please score the candidate from 0 to 100 in the following areas:
- **Communication Skills**: Clarity, articulation, structured responses.
- **Technical Knowledge**: Understanding of key concepts for the role.
- **Problem-Solving**: Ability to analyze problems and propose solutions.
- **Cultural Fit**: Alignment with company values and job role.
- **Confidence and Clarity**: Confidence in responses, engagement, and clarity.

Return your response in the following JSON format:
{{
    "total_score": <number 0-100>,
    "communication_skills": {{
        "score": <number 0-100>,
        "comment": "<detailed comment>"
    }},
    "technical_knowledge": {{
        "score": <number 0-100>,
        "comment": "<detailed comment>"
    }},
    "problem_solving": {{
        "score": <number 0-100>,
        "comment": "<detailed comment>"
    }},
    "cultural_fit": {{
        "score": <number 0-100>,
        "comment": "<detailed comment>"
    }},
    "confidence_and_clarity": {{
        "score": <number 0-100>,
        "comment": "<detailed comment>"
    }},
    "strengths": "<paragraph describing main strengths>",
    "areas_for_improvement": "<paragraph describing areas for improvement>",
    "final_assessment": "<overall assessment and recommendation>"
}}
"""

        try:
            response_text = self._key_manager.generate_with_fallback(prompt)

            # Extract JSON from response (handle markdown code blocks)
            json_match = re.search(r'```json\s*(.*?)\s*```', response_text, re.DOTALL)
            if json_match:
                response_text = json_match.group(1)

            # Parse JSON
            feedback_data = json.loads(response_text)

            # Convert to Pydantic model
            return FeedbackResponse(
                total_score=feedback_data["total_score"],
                communication_skills=CategoryScore(
                    name="Communication Skills",
                    score=feedback_data["communication_skills"]["score"],
                    comment=feedback_data["communication_skills"]["comment"]
                ),
                technical_knowledge=CategoryScore(
                    name="Technical Knowledge",
                    score=feedback_data["technical_knowledge"]["score"],
                    comment=feedback_data["technical_knowledge"]["comment"]
                ),
                problem_solving=CategoryScore(
                    name="Problem Solving",
                    score=feedback_data["problem_solving"]["score"],
                    comment=feedback_data["problem_solving"]["comment"]
                ),
                cultural_fit=CategoryScore(
                    name="Cultural Fit",
                    score=feedback_data["cultural_fit"]["score"],
                    comment=feedback_data["cultural_fit"]["comment"]
                ),
                confidence_and_clarity=CategoryScore(
                    name="Confidence and Clarity",
                    score=feedback_data["confidence_and_clarity"]["score"],
                    comment=feedback_data["confidence_and_clarity"]["comment"]
                ),
                strengths=feedback_data["strengths"],
                areas_for_improvement=feedback_data["areas_for_improvement"],
                final_assessment=feedback_data["final_assessment"]
            )

        except Exception as e:
            print(f"Error generating feedback: {e}")
            raise

    async def generate_questions(
        self,
        role: str,
        level: str,
        techstack: str,
        interview_type: str,
        amount: int
    ) -> List[str]:
        """Generate interview questions based on parameters"""

        prompt = f"""Prepare questions for a job interview.
The job role is {role}.
The job experience level is {level}.
The tech stack used in the job is: {techstack}.
The focus between behavioural and technical questions should lean towards: {interview_type}.
The amount of questions required is: {amount}.

Please return only the questions, without any additional text.
The questions are going to be read by a voice assistant so do not use "/" or "*" or any other special characters which might break the voice assistant.

Return the questions formatted as a JSON array like this:
["Question 1", "Question 2", "Question 3"]

Do not include any markdown formatting or code blocks, just the raw JSON array.
"""

        try:
            response_text = self._key_manager.generate_with_fallback(prompt)

            # Extract JSON array from response
            json_match = re.search(r'```json\s*(.*?)\s*```', response_text, re.DOTALL)
            if json_match:
                response_text = json_match.group(1)

            # Find the JSON array
            array_match = re.search(r'\[.*?\]', response_text, re.DOTALL)
            if array_match:
                response_text = array_match.group(0)

            # Parse JSON
            questions = json.loads(response_text)

            return questions

        except Exception as e:
            print(f"Error generating questions: {e}")
            raise

    async def generate_aptitude_questions(
        self,
        category: str,
        amount: int,
        difficulty: str = "medium",
    ) -> list:
        """Generate MCQ aptitude questions for a given category"""

        prompt = f"""Generate exactly {amount} {difficulty}-difficulty aptitude questions for the category: {category}.

Return a valid JSON array (no markdown, no extra text) where each element has these exact keys:
- "id": a unique string like "q1", "q2", ...
- "question": the question text (clear, unambiguous)
- "options": an array of exactly 4 strings, each prefixed with the letter, e.g. ["A. 400", "B. 500", "C. 600", "D. 700"]
- "correct_answer": exactly one of "A", "B", "C", or "D"
- "explanation": a brief explanation of why the answer is correct (1-2 sentences)
- "difficulty": "{difficulty}"

Category guidelines:
- "quantitative": arithmetic, percentages, ratios, profit/loss, time-speed-distance, averages
- "logical_reasoning": series, analogies, syllogisms, coding-decoding, blood relations, seating arrangement
- "verbal_ability": synonyms, antonyms, fill-in-the-blank, reading comprehension, sentence correction

Return ONLY the JSON array. No markdown. No additional text.
"""
        try:
            response_text = self._key_manager.generate_with_fallback(prompt)

            # Strip markdown code fences if present
            json_match = re.search(r'```(?:json)?\s*(.*?)\s*```', response_text, re.DOTALL)
            if json_match:
                response_text = json_match.group(1)

            # Extract the JSON array
            array_match = re.search(r'\[.*\]', response_text, re.DOTALL)
            if array_match:
                response_text = array_match.group(0)

            questions_data = json.loads(response_text)

            # Validate and normalise each question
            validated = []
            for i, q in enumerate(questions_data):
                validated.append({
                    "id": q.get("id", f"q{i+1}"),
                    "question": q["question"],
                    "options": q["options"],
                    "correct_answer": q["correct_answer"].strip().upper(),
                    "explanation": q.get("explanation", ""),
                    "difficulty": q.get("difficulty", difficulty),
                })

            return validated

        except Exception as e:
            print(f"Error generating aptitude questions: {e}")
            raise


# Singleton instance
ai_service = AIService()
