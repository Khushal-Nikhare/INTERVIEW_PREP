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
    const formattedTranscript = transcript
      .map(
        (sentence: { role: string; content: string }) =>
          `- ${sentence.role}: ${sentence.content}\n`
      )
      .join("");

    console.log("Generating AI feedback for interview:", interviewId);

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
      prompt: `
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
        `,
      system:
        "You are a professional interviewer analyzing a mock interview. Your task is to evaluate the candidate based on structured categories",
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
