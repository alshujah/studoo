
'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { useAuth, signInWithGoogle, signUpWithEmail, signInWithEmail } from '@/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useRouter } from 'next/navigation';
import { Loader, Mail, UserPlus } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import Image from 'next/image';
import { placeholderImages } from '@/lib/placeholder-images';
import { Logo } from '@/components/icons';
import type { FirebaseError } from 'firebase/app';


const loginSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email.' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters.' }),
});

const signupSchema = z.object({
  displayName: z.string().min(2, { message: 'Display name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email.' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters.' }),
});


export default function LoginPage() {
    const auth = useAuth();
    const [user, loading] = useAuthState(auth);
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
    const { toast } = useToast();
    const image = placeholderImages.find(img => img.id === 'calm-lake');

    const loginForm = useForm<z.infer<typeof loginSchema>>({
      resolver: zodResolver(loginSchema),
      defaultValues: { email: '', password: '' },
    });

    const signupForm = useForm<z.infer<typeof signupSchema>>({
        resolver: zodResolver(signupSchema),
        defaultValues: { displayName: '', email: '', password: '' },
    });

    useEffect(() => {
        if (!loading && user) {
            router.replace('/dashboard');
        }
    }, [user, loading, router]);
    
    const handleGoogleSignIn = async () => {
        setIsSubmitting(true);
        try {
            await signInWithGoogle(auth);
        } catch (error) {
            console.error(error);
             toast({
                variant: 'destructive',
                title: 'Sign In Failed',
                description: 'Could not sign in with Google. Please try again.',
            });
        } finally {
            setIsSubmitting(false);
        }
    }

    const handleLoginSubmit = async (values: z.infer<typeof loginSchema>) => {
        setIsSubmitting(true);
        try {
            await signInWithEmail(auth, values.email, values.password);
        } catch (error) {
            const firebaseError = error as FirebaseError;
            let description = 'An unexpected error occurred. Please try again.';
            switch (firebaseError.code) {
                case 'auth/user-not-found':
                case 'auth/wrong-password':
                case 'auth/invalid-credential':
                    description = 'Invalid email or password. Please check your credentials and try again.';
                    break;
                case 'auth/too-many-requests':
                    description = 'Access to this account has been temporarily disabled due to many failed login attempts. You can reset your password or try again later.';
                    break;
                 case 'auth/invalid-email':
                    description = 'The email address is not valid.';
                    break;
            }
            toast({
                variant: 'destructive',
                title: 'Login Failed',
                description,
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleSignupSubmit = async (values: z.infer<typeof signupSchema>) => {
        setIsSubmitting(true);
        try {
            await signUpWithEmail(auth, values.email, values.password, values.displayName);
             toast({
                title: 'Welcome!',
                description: 'Your account has been created successfully.',
            });
        } catch (error) {
            const firebaseError = error as FirebaseError;
            let description = 'An unexpected error occurred. Please try again.';
            switch (firebaseError.code) {
                case 'auth/email-already-in-use':
                    description = 'This email address is already in use by another account.';
                    break;
                case 'auth/weak-password':
                    description = 'The password is too weak. Please use a stronger password.';
                    break;
                case 'auth/invalid-email':
                    description = 'The email address is not valid.';
                    break;
            }
            toast({
                variant: 'destructive',
                title: 'Sign Up Failed',
                description,
            });
        } finally {
            setIsSubmitting(false);
        }
    };


    if (loading || user) {
        return (
             <div className="flex h-screen w-full flex-col items-center justify-center gap-4 bg-background">
                <Loader className="h-8 w-8 animate-spin text-primary" />
                <p className="text-muted-foreground">Loading your experience...</p>
            </div>
        )
    }

    return (
       <div className="w-full lg:grid lg:min-h-screen lg:grid-cols-2">
            <div className="flex items-center justify-center py-12">
                 <div className="mx-auto grid w-[350px] gap-6">
                    <div className="grid gap-2 text-center">
                        <Logo className="h-10 w-10 text-primary mx-auto" />
                        <h1 className="text-3xl font-headline font-bold">Welcome to Zenith</h1>
                        <p className="text-balance text-muted-foreground">
                            Your partner in mental wellbeing.
                        </p>
                    </div>

                    <div className="grid gap-4">
                         <Button onClick={handleGoogleSignIn} disabled={isSubmitting} variant="outline" className="w-full">
                            {isSubmitting ? <Loader className="mr-2 h-4 w-4 animate-spin" /> : <svg className="mr-2 h-4 w-4" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512"><path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 126 21.2 172.4 56.7L368.4 128C338.8 102.3 298.4 88 248 88c-86.6 0-157.2 70.6-157.2 157.2s70.6 157.2 157.2 157.2c94.8 0 135.7-75.3 140.9-114.3H248v-85.3h236.1c2.3 12.7 3.9 26.9 3.9 41.4z"></path></svg>}
                            Sign In with Google
                        </Button>
                        <div className="flex items-center">
                            <Separator className="flex-1" />
                            <span className="px-4 text-xs text-muted-foreground">OR</span>
                            <Separator className="flex-1" />
                        </div>
                        
                        {authMode === 'login' ? (
                            <Form {...loginForm}>
                                <form onSubmit={loginForm.handleSubmit(handleLoginSubmit)} className="space-y-4">
                                    <FormField control={loginForm.control} name="email" render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Email</FormLabel>
                                            <FormControl><Input placeholder="you@example.com" {...field} /></FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}/>
                                    <FormField control={loginForm.control} name="password" render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Password</FormLabel>
                                            <FormControl><Input type="password" placeholder="••••••••" {...field} /></FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}/>
                                    <Button type="submit" disabled={isSubmitting} className="w-full">
                                        {isSubmitting ? <Loader className="mr-2 h-4 w-4 animate-spin" /> : <Mail className="mr-2 h-4 w-4" />}
                                        Sign In with Email
                                    </Button>
                                </form>
                            </Form>
                        ) : (
                            <Form {...signupForm}>
                                <form onSubmit={signupForm.handleSubmit(handleSignupSubmit)} className="space-y-4">
                                    <FormField control={signupForm.control} name="displayName" render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Display Name</FormLabel>
                                            <FormControl><Input placeholder="Your Name" {...field} /></FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}/>
                                    <FormField control={signupForm.control} name="email" render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Email</FormLabel>
                                            <FormControl><Input placeholder="you@example.com" {...field} /></FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}/>
                                    <FormField control={signupForm.control} name="password" render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Password</FormLabel>
                                            <FormControl><Input type="password" placeholder="••••••••" {...field} /></FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}/>
                                    <Button type="submit" disabled={isSubmitting} className="w-full">
                                        {isSubmitting ? <Loader className="mr-2 h-4 w-4 animate-spin" /> : <UserPlus className="mr-2 h-4 w-4" />}
                                        Create Account
                                    </Button>
                                </form>
                            </Form>
                        )}

                        <div className="mt-4 text-center text-sm">
                            <Button variant="link" onClick={() => setAuthMode(authMode === 'login' ? 'signup' : 'login')} className="p-0 h-auto">
                                {authMode === 'login' 
                                    ? "Don't have an account? Sign up" 
                                    : "Already have an account? Sign in"}
                            </Button>
                        </div>
                    </div>
                 </div>
            </div>
             <div className="hidden bg-muted lg:block">
                {image && (
                    <Image
                        src={image.imageUrl}
                        alt={image.description}
                        width="1920"
                        height="1080"
                        className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
                        data-ai-hint={image.imageHint}
                        priority
                    />
                )}
            </div>
       </div>
    );
}
