
import { getApps, initializeApp, type FirebaseApp } from 'firebase/app';
import { getAuth, type Auth } from 'firebase/auth';
import { getFirestore, type Firestore } from 'firebase/firestore';

import { firebaseConfig } from './firebase/config';

export * from './firebase/provider';
export * from './firebase/auth/google-provider';
export * from './firebase/auth/email-password';


// This function is used to initialize Firebase.
// It should be called in a client component, such as a layout or a page.
// It returns the Firebase app, auth, and firestore instances.
// It also ensures that Firebase is initialized only once.
export const initializeFirebase = (): {
  app: FirebaseApp;
  auth: Auth;
  firestore: Firestore;
} => {
  const apps = getApps();
  const app = apps.length
    ? apps[0]
    : initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const firestore = getFirestore(app);
  return { app, auth, firestore };
};
