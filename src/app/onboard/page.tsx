
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthState } from 'react-firebase-hooks/auth';
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore';
import { useAuth, useFirestore } from '@/firebase';
import { Loader } from 'lucide-react';
import { Logo } from '@/components/icons';

const welcomeMessages = [
    "Setting up your space...",
    "Crafting your sanctuary...",
    "Finding your balance...",
    "Welcome to Rejoyn.",
];

export default function OnboardPage() {
  const auth = useAuth();
  const firestore = useFirestore();
  const [user, loading] = useAuthState(auth);
  const router = useRouter();
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
        setMessageIndex(prevIndex => {
            if (prevIndex < welcomeMessages.length - 1) {
                return prevIndex + 1;
            }
            clearInterval(interval);
            return prevIndex;
        });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (loading) {
      return;
    }

    if (!user) {
      // If there's no user after loading, they shouldn't be here.
      router.replace('/');
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
      // Give the animation time to finish before redirecting
      setTimeout(() => {
          router.replace('/dashboard');
      }, 3000 * welcomeMessages.length - 1000);
    };

    createUserDocument();
  }, [user, loading, firestore, router]);
  

  if (loading && !user) {
      return (
        <div className="flex h-screen w-full flex-col items-center justify-center gap-4">
            <Loader className="h-8 w-8 animate-spin" />
            <p className="text-muted-foreground">Loading user information...</p>
        </div>
      )
  }

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center gap-6 bg-background">
      <Logo className="size-24 text-primary" />
       <div className="relative h-6 w-64 text-center">
            {welcomeMessages.map((msg, index) => (
                 <p key={index} className={`absolute inset-0 text-muted-foreground text-lg transition-opacity duration-1000 ${messageIndex === index ? 'opacity-100' : 'opacity-0'}`}>
                    {msg}
                </p>
            ))}
       </div>
    </div>
  );
}
