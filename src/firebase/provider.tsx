'use client';

import {
  createContext,
  useContext,
  type ReactNode,
  useMemo,
  useCallback,
} from 'react';
import type { Auth } from 'firebase/auth';
import type { Firestore } from 'firebase/firestore';
import type { FirebaseApp } from 'firebase/app';

// This file provides a Firebase context and a hook to access it.
// The context is used to store the Firebase app, auth, and firestore instances.
// The hook is used to access the instances from any component in the application.

// Create the context
const FirebaseContext = createContext<{
  app: FirebaseApp;
  auth: Auth;
  firestore: Firestore;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
} | null>(null);

// Create the provider
export function FirebaseProvider({
  children,
  app,
  auth,
firestore,
}: {
  children: ReactNode;
  app: FirebaseApp;
  auth: Auth;
  firestore: Firestore;
}) {
  const value = useMemo(
    () => ({
      app,
      auth,
      firestore,
    }),
    [app, auth, firestore]
  );

  return (
    <FirebaseContext.Provider value={value}>
      {children}
    </FirebaseContext.Provider>
  );
}

// Create a hook to access the context
export function useFirebase() {
  const context = useContext(FirebaseContext);
  if (!context) {
    throw new Error('useFirebase must be used within a FirebaseProvider');
  }
  return context;
}

// The following hooks are just shortcuts to access the specific Firebase services
export function useFirebaseApp() {
  return useFirebase().app;
}

export function useFirestore() {
  return useFirebase().firestore;
}

export function useAuth() {
  return useFirebase().auth;
}

export function useMemoFirebase<T>(
  factory: () => T,
  deps: React.DependencyList
) {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  return useMemo(factory, deps);
}
