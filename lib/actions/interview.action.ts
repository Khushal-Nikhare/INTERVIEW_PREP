"use server";

import { db } from "@/firebase/admin";
import { getRandomInterviewCover } from "@/lib/utils";

export async function getInterviewsByUserId(
  userId: string
): Promise<Interview[] | null> {
  const interviews = await db
    .collection("interviews")
    .where("userId", "==", userId)
    .orderBy("createdAt", "desc")
    .get();

  return interviews.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Interview[];
}

export async function getLatestInterviews(
  params: GetLatestInterviewsParams
): Promise<Interview[] | null> {
  const { userId, limit = 20 } = params;

  const interviews = await db
    .collection("interviews")
    .orderBy("createdAt", "desc")
    .where("finalized", "==", true)
    .where("userId", "!=", userId)
    .limit(limit)
    .get();

  return interviews.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Interview[];
}

export async function getInterviewById(id: string): Promise<Interview | null> {
  const interview = await db.collection("interviews").doc(id).get();

  return interview.data() as Interview | null;
}

export async function createFeedback(params: CreateFeedbackParams) {
  const { interviewId, userId, transcript, feedbackId } = params;

  try {
    console.log("Generating AI feedback via Python backend for interview:", interviewId);
    console.log("Transcript length:", transcript.length);

    // Call the Python backend which handles multi-key rotation and Firebase saving
    const backendUrl = process.env.BACKEND_URL || "http://localhost:8000";
    const response = await fetch(`${backendUrl}/api/interview/feedback`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        interview_id: interviewId,
        user_id: userId,
        transcript: transcript,
        feedback_id: feedbackId || null,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Backend responded with error:", response.status, errorText);
      return { success: false, error: `Backend error ${response.status}: ${errorText}` };
    }

    const result = await response.json();

    if (result.success) {
      console.log("Feedback saved successfully via backend. ID:", result.feedback_id);
      return { success: true, feedbackId: result.feedback_id };
    } else {
      console.error("Backend returned failure:", result.error);
      return { success: false, error: result.error || "Unknown backend error" };
    }
  } catch (error) {
    console.error("Error saving feedback:", error);

    let errorMessage = "Unknown error occurred";
    if (error instanceof Error) {
      errorMessage = error.message;
    }

    return { success: false, error: errorMessage };
  }
}

export async function getFeedbackByInterviewId(
  params: GetFeedbackByInterviewIdParams
): Promise<Feedback | null> {
  const { interviewId, userId } = params;

  const querySnapshot = await db
    .collection("feedback")
    .where("interviewId", "==", interviewId)
    .where("userId", "==", userId)
    .limit(1)
    .get();

  if (querySnapshot.empty) return null;

  const feedbackDoc = querySnapshot.docs[0];
  return { id: feedbackDoc.id, ...feedbackDoc.data() } as Feedback;
}

export async function createCustomInterview(params: CreateCustomInterviewParams) {
  const { role, type, level, techstack, questions, userId } = params;

  try {
    const interview = {
      role,
      type,
      level,
      techstack: techstack.split(",").map((tech) => tech.trim()),
      questions,
      userId,
      finalized: false,
      coverImage: getRandomInterviewCover(),
      createdAt: new Date().toISOString(),
    };

    const docRef = await db.collection("interviews").add(interview);

    return { success: true, interviewId: docRef.id };
  } catch (error) {
    console.error("Error creating custom interview:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to create interview"
    };
  }
}

// ── Aptitude Test Actions ──────────────────────────────────────────

export async function generateAptitudeQuestions(
  category: string,
  amount: number = 20,
  difficulty: string = "medium"
): Promise<{ success: boolean; questions?: MCQQuestion[]; error?: string }> {
  try {
    const backendUrl = process.env.BACKEND_URL || "http://localhost:8000";
    const response = await fetch(`${backendUrl}/api/aptitude/generate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        category,
        amount,
        difficulty,
        user_id: "system",
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      return { success: false, error: `Backend error ${response.status}: ${errorText}` };
    }

    const result = await response.json();

    if (result.success && result.questions) {
      // Map snake_case from backend to camelCase for frontend
      const questions: MCQQuestion[] = result.questions.map((q: any) => ({
        id: q.id,
        question: q.question,
        options: q.options,
        correctAnswer: q.correct_answer,
        explanation: q.explanation,
        difficulty: q.difficulty,
      }));
      return { success: true, questions };
    }

    return { success: false, error: result.error || "Failed to generate questions" };
  } catch (error) {
    console.error("Error generating aptitude questions:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

export async function saveAptitudeResult(
  params: SaveAptitudeResultParams
): Promise<{ success: boolean; resultId?: string; error?: string }> {
  try {
    const backendUrl = process.env.BACKEND_URL || "http://localhost:8000";
    const response = await fetch(`${backendUrl}/api/aptitude/result`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user_id: params.userId,
        category: params.category,
        score: params.score,
        total_questions: params.totalQuestions,
        percentage: params.percentage,
        answers: params.answers.map((a) => ({
          question_id: a.questionId,
          selected: a.selected,
          correct: a.correct,
          is_correct: a.isCorrect,
          question_text: a.questionText,
          options: a.options,
          explanation: a.explanation,
        })),
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      return { success: false, error: `Backend error ${response.status}: ${errorText}` };
    }

    const result = await response.json();
    return result.success
      ? { success: true, resultId: result.result_id }
      : { success: false, error: result.error };
  } catch (error) {
    console.error("Error saving aptitude result:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

export async function getAptitudeResultsByUser(
  userId: string
): Promise<AptitudeResult[]> {
  try {
    const backendUrl = process.env.BACKEND_URL || "http://localhost:8000";
    const response = await fetch(`${backendUrl}/api/aptitude/results/${userId}`, {
      cache: "no-store",
    });

    if (!response.ok) return [];

    const data = await response.json();
    if (!data.success || !data.results) return [];

    return data.results.map((r: any) => ({
      id: r.id,
      userId: r.userId,
      category: r.category,
      score: r.score,
      totalQuestions: r.totalQuestions,
      percentage: r.percentage,
      answers: (r.answers || []).map((a: any) => ({
        questionId: a.question_id,
        selected: a.selected,
        correct: a.correct,
        isCorrect: a.is_correct,
        questionText: a.question_text,
        options: a.options,
        explanation: a.explanation,
      })),
      createdAt: r.createdAt,
    }));
  } catch (error) {
    console.error("Error fetching aptitude results:", error);
    return [];
  }
}
