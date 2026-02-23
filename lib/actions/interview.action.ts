"use server";

import { feedbackSchema } from "@/constants";
import { db } from "@/firebase/admin";
import { google } from "@ai-sdk/google";
import { generateObject } from "ai";

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
    console.log("Analyzing interview with Python backend:", interviewId);

    let pythonAnalysis = null;
    let usingPythonBackend = false;

    try {
      const pythonApiUrl = process.env.PYTHON_API_URL || "http://127.0.0.1:8000";
      
      const pythonResponse = await fetch(`${pythonApiUrl}/analyze`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          transcript: transcript.map((msg: { role: string; content: string }) => ({
            role: msg.role,
            content: msg.content,
          })),
        }),
      });

      if (pythonResponse.ok) {
        pythonAnalysis = await pythonResponse.json();
        usingPythonBackend = true;
        console.log("✅ Python backend analysis successful");
      } else {
        console.warn("⚠️ Python backend unavailable, falling back to LLM-only mode");
      }
    } catch (pythonError) {
      console.warn("⚠️ Python backend error, falling back to LLM-only mode:", pythonError);
    }

    const formattedTranscript = transcript
      .map(
        (sentence: { role: string; content: string }) =>
          `- ${sentence.role}: ${sentence.content}\n`
      )
      .join("");

    const prompt = usingPythonBackend
      ? `
        You are an AI interviewer analyzing a mock interview. You have received advanced analysis data from a Python backend system.
        
        Transcript:
        ${formattedTranscript}
        
        Python Analysis Results:
        - Overall Score: ${pythonAnalysis.overall_score}/100
        - Communication Score: ${pythonAnalysis.communication_score}/100
        - Technical Score: ${pythonAnalysis.technical_score}/100
        - Filler Word Ratio: ${(pythonAnalysis.metrics.filler_ratio * 100).toFixed(2)}%
        - Average Response Length: ${pythonAnalysis.metrics.avg_response_length} words
        - Technical Density: ${(pythonAnalysis.metrics.technical_density * 100).toFixed(2)}%
        - Response Depth: ${pythonAnalysis.metrics.response_depth}
        
        Detected Strengths: ${pythonAnalysis.strengths.join(", ")}
        Detected Weaknesses: ${pythonAnalysis.weaknesses.join(", ")}
        
        Using this data-driven analysis, provide detailed scores and feedback in the following areas:
        - **Communication Skills**: Use the Python communication score (${pythonAnalysis.communication_score}) as a baseline. Consider filler words, clarity, and response structure.
        - **Technical Knowledge**: Use the Python technical score (${pythonAnalysis.technical_score}) as a baseline. Consider technical terminology usage and depth.
        - **Problem-Solving**: Analyze their approach to problems based on the transcript.
        - **Cultural Fit**: Assess alignment with professional standards.
        - **Confidence and Clarity**: Consider response depth and articulation.

        Be thorough and critical. Point out specific issues found by the Python analysis.
        `
      : `
        You are an AI interviewer analyzing a mock interview. Your task is to evaluate the candidate based on structured categories. Be thorough and detailed in your analysis. Don't be lenient with the candidate. If there are mistakes or areas for improvement, point them out.
        Transcript:
        ${formattedTranscript}

        Please score the candidate from 0 to 100 in the following areas:
        - **Communication Skills**: Clarity, articulation, structured responses.
        - **Technical Knowledge**: Understanding of key concepts for the role.
        - **Problem-Solving**: Ability to analyze problems and propose solutions.
        - **Cultural Fit**: Alignment with company values and job role.
        - **Confidence and Clarity**: Confidence in responses, engagement, and clarity.

        For strengths and areas for improvement, provide detailed explanations in paragraph form.
        `;

    const {
      object: {
        totalScore,
        communicationSkills,
        technicalKnowledge,
        problemSolving,
        culturalFit,
        confidenceAndClarity,
        strengths,
        areasForImprovement,
        finalAssessment,
      },
    } = await generateObject({
      model: google("gemini-2.5-flash-lite"),
      schema: feedbackSchema,
      prompt,
      system: usingPythonBackend
        ? "You are a professional interviewer with access to advanced analytics. Use both data-driven insights and qualitative assessment to provide comprehensive feedback."
        : "You are a professional interviewer analyzing a mock interview. Your task is to evaluate the candidate based on structured categories",
    });

    // Convert the new schema format to the database format
    const categoryScores = [
      {
        name: "Communication Skills",
        score: communicationSkills.score,
        comment: communicationSkills.comment,
      },
      {
        name: "Technical Knowledge",
        score: technicalKnowledge.score,
        comment: technicalKnowledge.comment,
      },
      {
        name: "Problem Solving",
        score: problemSolving.score,
        comment: problemSolving.comment,
      },
      {
        name: "Cultural Fit",
        score: culturalFit.score,
        comment: culturalFit.comment,
      },
      {
        name: "Confidence and Clarity",
        score: confidenceAndClarity.score,
        comment: confidenceAndClarity.comment,
      },
    ];

    const strengthsArray = [strengths];
    const areasForImprovementArray = [areasForImprovement];

    const feedback = {
      interviewId,
      userId,
      totalScore,
      categoryScores,
      strengths: strengthsArray,
      areasForImprovement: areasForImprovementArray,
      finalAssessment,
      createdAt: new Date().toISOString(),
    };

    let feedbackRef;

    if (feedbackId) {
      feedbackRef = db.collection("feedback").doc(feedbackId);
    } else {
      feedbackRef = db.collection("feedback").doc();
    }

    await feedbackRef.set(feedback);

    return { success: true, feedbackId: feedbackRef.id };
  } catch (error) {
    console.error("Error saving feedback:", error);

    // Return more specific error information
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

export async function addInterview(params: AddInterviewParams) {
  const { userId, role, level, type, techstack, questions } = params;

  try {
    const interview = {
      role,
      type,
      level,
      techstack,
      questions,
      userId,
      finalized: true,
      coverImage: "/interview-cover-1.png",
      createdAt: new Date().toISOString(),
    };

    const docRef = await db.collection("interviews").add(interview);

    return { success: true, interviewId: docRef.id };
  } catch (error) {
    console.error("Error adding interview:", error);
    return { success: false, error: "Failed to create interview" };
  }
}
