
'use client';
import { initializeFirebase } from '.';
import { FirebaseProvider } from './provider';
import React, { useState, useEffect } from 'react';
import type { FirebaseApp } from 'firebase/app';
import type { Auth } from 'firebase/auth';
import type { Firestore } from 'firebase/firestore';
import { Loader } from 'lucide-react';

interface FirebaseInstances {
    app: FirebaseApp;
    auth: Auth;
    firestore: Firestore;
}

// This provider is responsible for initializing Firebase on the client side.
// It should be used as a wrapper around the root layout of the application.
// It ensures that Firebase is initialized only once and that children are only
// rendered after Firebase is ready.
export function FirebaseClientProvider({
  children,
}: {
  children: React.ReactNode;
}) {
    const [firebase, setFirebase] = useState<FirebaseInstances | null>(null);

    useEffect(() => {
        // This code runs only on the client.
        const instances = initializeFirebase();
        setFirebase(instances);
    }, []);

    if (!firebase) {
        return (
            <div className="flex h-screen w-full flex-col items-center justify-center gap-4 bg-background">
                <Loader className="h-8 w-8 animate-spin text-primary" />
                <p className="text-muted-foreground">Initializing...</p>
            </div>
        );
    }

    return (
        <FirebaseProvider app={firebase.app} auth={firebase.auth} firestore={firebase.firestore}>
            {children}
        </FirebaseProvider>
    );
}
