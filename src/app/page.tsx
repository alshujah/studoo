
'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/firebase';
import { signInWithGoogle } from '@/firebase/auth/google-provider';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Loader } from 'lucide-react';

function GoogleIcon() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            <path d="M1 1h22v22H1z" fill="none"/>
        </svg>
    )
}

export default function Home() {
    const auth = useAuth();
    const [user, loading] = useAuthState(auth);
    const router = useRouter();

    useEffect(() => {
        if (user) {
            router.replace('/dashboard');
        }
    }, [user, router]);
    
    const handleSignIn = async () => {
        await signInWithGoogle(auth);
    }

    if (loading || user) {
        return (
             <div className="flex h-screen w-full flex-col items-center justify-center gap-4">
                <Loader className="h-8 w-8 animate-spin" />
                <p className="text-muted-foreground">Loading your experience...</p>
            </div>
        )
    }

    return (
        <main className="flex-1">
            <div className="container relative h-[calc(100vh-3.5rem)] flex-col items-center justify-center grid lg:max-w-none lg:grid-cols-2 lg:px-0">
                <div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r">
                    <div className="absolute inset-0 bg-zinc-900" />
                    <Image
                        src="https://images.unsplash.com/photo-1519817914152-22d216bb9170?q=80&w=1974&auto=format&fit=crop"
                        alt="Person sitting on a rock looking at a lake"
                        fill
                        style={{ objectFit: 'cover' }}
                        priority
                        data-ai-hint="calm nature"
                    />
                     <div className="relative z-20 mt-auto">
                        <blockquote className="space-y-2">
                        <p className="text-lg backdrop-blur-sm bg-black/20 p-4 rounded-md">
                            &ldquo;The greatest discovery of my generation is that a human being can alter his life by altering his attitudes.&rdquo;
                        </p>
                        <footer className="text-sm backdrop-blur-sm bg-black/20 p-2 rounded-md w-fit">William James</footer>
                        </blockquote>
                    </div>
                </div>
                <div className="lg:p-8">
                    <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
                        <div className="flex flex-col space-y-2 text-center">
                            <h1 className="text-2xl font-semibold tracking-tight font-headline">
                                Your partner in mental wellbeing
                            </h1>
                            <p className="text-sm text-muted-foreground">
                                A supportive space to learn, reflect, and grow.
                            </p>
                        </div>
                        
                        <Button onClick={handleSignIn} disabled={loading}>
                            {loading ? <Loader className="mr-2 h-4 w-4 animate-spin" /> : <GoogleIcon />}
                            Get Started with Google
                        </Button>
                        
                        <p className="px-8 text-center text-sm text-muted-foreground">
                            By clicking continue, you agree to our{" "}
                            <a
                                href="/terms"
                                className="underline underline-offset-4 hover:text-primary"
                            >
                                Terms of Service
                            </a>{" "}
                            and{" "}
                            <a
                                href="/privacy"
                                className="underline underline-offset-4 hover:text-primary"
                            >
                                Privacy Policy
                            </a>
                            .
                        </p>
                    </div>
                </div>
            </div>
        </main>
    );
}
