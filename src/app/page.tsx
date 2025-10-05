
'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { useAuth, signInWithGoogle, signUpWithEmail, signInWithEmail } from '@/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useRouter } from 'next/navigation';
import { Loader, LogIn, Mail, UserPlus } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import Image from 'next/image';
import placeholderImage from '@/lib/placeholder-images.json';


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
    const image = placeholderImage.placeholderImages.find(img => img.id === 'calm-lake');


    const loginForm = useForm<z.infer<typeof loginSchema>>({
      resolver: zodResolver(loginSchema),
      defaultValues: { email: '', password: '' },
    });

    const signupForm = useForm<z.infer<typeof signupSchema>>({
        resolver: zodResolver(signupSchema),
        defaultValues: { displayName: '', email: '', password: '' },
    });

    useEffect(() => {
        if (user) {
            router.replace('/dashboard');
        }
    }, [user, router]);
    
    const handleGoogleSignIn = async () => {
        setIsSubmitting(true);
        await signInWithGoogle(auth);
        setIsSubmitting(false);
    }

    const handleLoginSubmit = async (values: z.infer<typeof loginSchema>) => {
        setIsSubmitting(true);
        const success = await signInWithEmail(auth, values.email, values.password);
        if (!success) {
            toast({
                variant: 'destructive',
                title: 'Login Failed',
                description: 'Please check your email and password and try again.',
            });
        }
        setIsSubmitting(false);
    };

    const handleSignupSubmit = async (values: z.infer<typeof signupSchema>) => {
        setIsSubmitting(true);
        const success = await signUpWithEmail(auth, values.email, values.password, values.displayName);
        if (!success) {
            toast({
                variant: 'destructive',
                title: 'Sign Up Failed',
                description: 'This email may already be in use or there was another error.',
            });
        } else {
             toast({
                title: 'Welcome!',
                description: 'Your account has been created successfully.',
            });
        }
        setIsSubmitting(false);
    };


    if (loading || user) {
        return (
             <div className="flex h-screen w-full flex-col items-center justify-center gap-4">
                <Loader className="h-8 w-8 animate-spin" />
                <p className="text-muted-foreground">Loading your experience...</p>
            </div>
        )
    }

    return (
        <main className="flex min-h-screen items-center justify-center p-4 bg-muted/30">
            <Card className="w-full max-w-md shadow-2xl">
                <CardHeader className="text-center">
                    <CardTitle className="text-3xl font-headline">Welcome to Rejoyn</CardTitle>
                    <CardDescription>Your partner in mental wellbeing.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-6">
                        <Button onClick={handleGoogleSignIn} disabled={isSubmitting} variant="outline" className="w-full">
                            {isSubmitting ? <Loader className="mr-2 h-4 w-4 animate-spin" /> : <LogIn className="mr-2" />}
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
                                         {isSubmitting ? <Loader className="mr-2 h-4 w-4 animate-spin" /> : <Mail className="mr-2" />}
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
                                         {isSubmitting ? <Loader className="mr-2 h-4 w-4 animate-spin" /> : <UserPlus className="mr-2" />}
                                        Create Account
                                    </Button>
                                </form>
                            </Form>
                        )}


                        <Separator />
                        <div className="text-center">
                            <Button variant="link" onClick={() => setAuthMode(authMode === 'login' ? 'signup' : 'login')}>
                                {authMode === 'login' 
                                    ? "Don't have an account? Sign up" 
                                    : "Already have an account? Sign in"}
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </main>
    );
}
