'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthState } from 'react-firebase-hooks/auth';
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore';
import { useAuth, useFirestore } from '@/firebase';
import { Loader } from 'lucide-react';

export default function OnboardPage() {
  const auth = useAuth();
  const firestore = useFirestore();
  const [user, loading] = useAuthState(auth);
  const router = useRouter();

  useEffect(() => {
    if (loading) {
      return;
    }

    if (!user) {
      router.replace('/dashboard');
      return;
    }

    const createUserDocument = async () => {
      const userDocRef = doc(firestore, 'users', user.uid);
      const userDoc = await getDoc(userDocRef);

      if (!userDoc.exists()) {
        try {
          await setDoc(userDocRef, {
            displayName: user.displayName,
            email: user.email,
            photoURL: user.photoURL,
            createdAt: serverTimestamp(),
          });
        } catch (error) {
          console.error('Error creating user document:', error);
          // Handle error, maybe show a toast
        }
      }
      router.replace('/dashboard');
    };

    createUserDocument();
  }, [user, loading, firestore, router]);

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center gap-4">
      <Loader className="h-8 w-8 animate-spin" />
      <p className="text-muted-foreground">Setting up your account...</p>
    </div>
  );
}
