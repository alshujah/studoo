
import { redirect } from 'next/navigation';
import { getApps, initializeApp, cert } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { cookies } from 'next/headers';

// This is the main entry point of the app.
// It will redirect the user to the appropriate page based on their authentication status.
// This is a server component, so it can safely check for the session cookie.

const serviceAccountKey = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;

// Initialize Firebase Admin SDK only if the service key is available and it hasn't been initialized yet.
if (serviceAccountKey && !getApps().length) {
    try {
        const serviceAccount = JSON.parse(serviceAccountKey);
        initializeApp({
            credential: cert(serviceAccount)
        });
    } catch (e) {
        console.error("Failed to parse FIREBASE_SERVICE_ACCOUNT_KEY. Make sure it's a valid JSON string.", e);
    }
}

export default async function RootPage() {
    const session = cookies().get('session')?.value;

    // If no session cookie is present, redirect to login.
    if (!session) {
        return redirect('/login');
    }

    // If Firebase Admin isn't initialized (e.g., missing env var), we cannot verify the cookie.
    // In a production environment, you'd want to handle this case, but for now, we'll redirect to login.
    if (getApps().length === 0) {
        console.warn("Firebase Admin SDK not initialized on the server. Cannot verify session cookie.");
        return redirect('/login');
    }

    // Verify session cookie with Firebase Admin SDK.
    try {
        await getAuth().verifySessionCookie(session, true);
        // If verification is successful, the user is authenticated.
        return redirect('/dashboard');
    } catch (error) {
        // If verification fails (e.g., expired cookie), the user is not authenticated.
        console.error("Session cookie verification failed:", error);
        return redirect('/login');
    }
}
