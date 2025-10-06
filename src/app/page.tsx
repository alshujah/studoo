
import { redirect } from 'next/navigation';
import { getApps, initializeApp, cert } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { cookies } from 'next/headers';

// This is the main entry point of the app.
// It will redirect the user to the appropriate page based on their authentication status.
// This is a server component, so it can safely check for the session cookie.

// Initialize Firebase Admin SDK if not already initialized
if (!getApps().length) {
  try {
    // Attempt to use service account from environment variables if available
    const serviceAccountEnv = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;
    if (serviceAccountEnv) {
        const serviceAccount = JSON.parse(serviceAccountEnv);
        initializeApp({
            credential: cert(serviceAccount)
        });
    } else {
        console.warn("Firebase Admin SDK not initialized. FIREBASE_SERVICE_ACCOUNT_KEY is not set.");
    }
  } catch (e) {
    console.error("Failed to initialize Firebase Admin SDK. Service account key might be missing or invalid.", e);
    // If admin initialization fails, we can't verify the token,
    // so we'll treat the user as logged out.
  }
}


export default async function RootPage() {
    const session = cookies().get('session')?.value;

    // If no session cookie, redirect to login
    if (!session) {
        return redirect('/login');
    }

    // Verify session cookie with Firebase Admin SDK
    try {
        if (getApps().length > 0) {
          await getAuth().verifySessionCookie(session, true);
          // If verification is successful, user is authenticated
          return redirect('/dashboard');
        } else {
          // If Firebase admin failed to initialize, we can't verify, so treat as logged out.
          return redirect('/login');
        }
    } catch (error) {
        // If verification fails, user is not authenticated
        console.error("Session cookie verification failed:", error);
        return redirect('/login');
    }
}
