import { initializeApp, getApps, cert } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";

// Initialize Firebase Admin SDK
function initFirebaseAdmin() {
  const apps = getApps();

  if (!apps.length) {
    const projectId =
      process.env.FIREBASE_PROJECT_ID ?? process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
    const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
    const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n");

    const missingEnvVars: string[] = [];
    if (!projectId) missingEnvVars.push("FIREBASE_PROJECT_ID");
    if (!clientEmail) missingEnvVars.push("FIREBASE_CLIENT_EMAIL");
    if (!privateKey) missingEnvVars.push("FIREBASE_PRIVATE_KEY");

    if (missingEnvVars.length > 0) {
      throw new Error(
        `Missing Firebase Admin environment variables: ${missingEnvVars.join(", ")}. Add them in .env.local using your Firebase service account JSON (project_id, client_email, private_key).`
      );
    }

    initializeApp({
      credential: cert({
        projectId,
        clientEmail,
        privateKey,
      }),
    });
  }

  return {
    auth: getAuth(),
    db: getFirestore(),
  };
}

export const { auth, db } = initFirebaseAdmin();
