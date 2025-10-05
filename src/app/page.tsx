
'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/firebase';
import { signInWithGoogle } from '@/firebase/auth/google-provider';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useRouter } from 'next/navigation';
import { Loader } from 'lucide-react';

export default function LoginPage() {
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
        <main className="flex min-h-screen flex-col items-center justify-center p-24">
            <div className="flex flex-col items-center gap-4 text-center">
                <h1 className="text-4xl font-bold">Rejoyn</h1>
                <p className="max-w-md text-muted-foreground">
                    A supportive space to learn, reflect, and grow. Your partner in mental wellbeing.
                </p>
                <Button onClick={handleSignIn} disabled={loading}>
                    {loading ? <Loader className="mr-2 h-4 w-4 animate-spin" /> : null}
                    Sign In with Google
                </Button>
            </div>
        </main>
    );
}
