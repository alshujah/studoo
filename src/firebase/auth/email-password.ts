
'use client';

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  type Auth,
} from 'firebase/auth';
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore';
import { getFirestore } from 'firebase/firestore';

export async function signUpWithEmail(auth: Auth, email: string, password: string, displayName: string): Promise<boolean> {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Update the user's profile with the display name
    await updateProfile(user, { displayName });

    // Create user document in Firestore
    const firestore = getFirestore(auth.app);
    const userDocRef = doc(firestore, 'users', user.uid);
    
    await setDoc(userDocRef, {
        displayName: displayName,
        email: user.email,
        photoURL: user.photoURL,
        createdAt: serverTimestamp(),
    });

    return true;
  } catch (error) {
    console.error("Error signing up with email: ", error);
    return false;
  }
}

export async function signInWithEmail(auth: Auth, email: string, password: string): Promise<boolean> {
    try {
        await signInWithEmailAndPassword(auth, email, password);
        return true;
    } catch (error) {
        console.error("Error signing in with email: ", error);
        return false;
    }
}
