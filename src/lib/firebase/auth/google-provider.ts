
'use client';

import { GoogleAuthProvider, signInWithPopup, type Auth } from 'firebase/auth';
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore';
import { getFirestore } from 'firebase/firestore';

const provider = new GoogleAuthProvider();

export async function signInWithGoogle(auth: Auth) {
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    // Create user document on first sign-in
    const firestore = getFirestore(auth.app);
    const userDocRef = doc(firestore, 'users', user.uid);
    const userDoc = await getDoc(userDocRef);

    if (!userDoc.exists()) {
      await setDoc(userDocRef, {
        displayName: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
        createdAt: serverTimestamp(),
      });
    }

    return user;
  } catch (error) {
    console.error("Error signing in with Google: ", error);
    return null;
  }
}
