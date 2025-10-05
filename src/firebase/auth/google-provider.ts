
'use client';

import { GoogleAuthProvider, signInWithPopup, type Auth } from 'firebase/auth';

const provider = new GoogleAuthProvider();

export async function signInWithGoogle(auth: Auth) {
  try {
    const result = await signInWithPopup(auth, provider);
    // This is a simple way to trigger the onboarding flow.
    // In a real app, you might use a custom claim or a different mechanism.
    window.location.href = '/onboard';
    return result.user;
  } catch (error) {
    console.error("Error signing in with Google: ", error);
    return null;
  }
}
