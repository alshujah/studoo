
'use client';

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  type Auth,
} from 'firebase/auth';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { getFirestore } from 'firebase/firestore';

export async function signUpWithEmail(auth: Auth, email: string, password: string, displayName: string): Promise<void> {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    await updateProfile(user, { displayName });

    const firestore = getFirestore(auth.app);
    const userDocRef = doc(firestore, 'users', user.uid);
    
    await setDoc(userDocRef, {
        displayName: displayName,
        email: user.email,
        photoURL: user.photoURL,
        createdAt: serverTimestamp(),
    });
  } catch (error) {
    console.error("Error signing up with email: ", error);
    throw error;
  }
}

export async function signInWithEmail(auth: Auth, email: string, password: string): Promise<void> {
    try {
        await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
        console.error("Error signing in with email: ", error);
        throw error;
    }
}
