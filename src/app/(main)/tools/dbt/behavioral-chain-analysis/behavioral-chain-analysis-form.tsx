
'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { useAuth, useFirestore } from '@/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Loader } from 'lucide-react';
import { FirestorePermissionError } from '@/firebase/errors';
import { errorEmitter } from '@/firebase/error-emitter';

const formSchema = z.object({
  problemBehavior: z.string().min(5, "Be specific. What exactly did you do or say?"),
  promptingEvent: z.string().min(10, "What happened right before the urge to do the behavior?"),
  vulnerabilityFactors: z.string().min(10, "What was going on in your life that made you vulnerable? (e.g., poor sleep, stress)"),
  chainOfEvents: z.string().min(10, "Detail the sequence of events (thoughts, feelings, actions) that linked the prompting event to the problem behavior."),
  consequences: z.string().min(10, "What were the consequences of the behavior, both for yourself and others?"),
  solutions: z.string().min(10, "How could you have prevented this? What could you do differently next time?"),
});

type FormValues = z.infer<typeof formSchema>;

export function BehavioralChainAnalysisForm() {
  const firestore = useFirestore();
  const auth = useAuth();
  const [user] = useAuthState(auth);
  const { toast } = useToast();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      problemBehavior: '',
      promptingEvent: '',
      vulnerabilityFactors: '',
      chainOfEvents: '',
      consequences: '',
      solutions: '',
    },
  });

  async function onSubmit(data: FormValues) {
    if (!user) {
      toast({ variant: 'destructive', title: 'Not signed in' });
      return;
    }
    setIsSubmitting(true);
    const logData = {
        ...data,
        userId: user.uid,
        createdAt: serverTimestamp(),
    };
    const logCollection = collection(firestore, 'users', user.uid, 'behavioralChainAnalyses');

    addDoc(logCollection, logData).then(() => {
      toast({ title: 'Analysis Saved', description: 'Your behavioral chain analysis has been saved.' });
      router.push('/dashboard');
    }).catch(err => {
        const permissionError = new FirestorePermissionError({
            path: logCollection.path,
            operation: 'create',
            requestResourceData: logData,
        });
        errorEmitter.emit('permission-error', permissionError);
    }).finally(() => {
        setIsSubmitting(false);
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="problemBehavior"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg font-semibold">1. Problem Behavior</FormLabel>
              <FormDescription>Describe the specific behavior you want to analyze.</FormDescription>
              <FormControl>
                <Textarea placeholder="e.g., I yelled at my partner." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
         <FormField
          control={form.control}
          name="promptingEvent"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg font-semibold">2. Prompting Event</FormLabel>
              <FormDescription>What event in the environment triggered the behavior?</FormDescription>
              <FormControl>
                <Textarea placeholder="e.g., My partner asked me what was wrong with my mood." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
         <FormField
          control={form.control}
          name="vulnerabilityFactors"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg font-semibold">3. Vulnerability Factors</FormLabel>
              <FormDescription>What made you more vulnerable to this prompting event?</FormDescription>
              <FormControl>
                <Textarea placeholder="e.g., I only slept 4 hours, I was stressed about a work deadline, I hadn't eaten." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
         <FormField
          control={form.control}
          name="chainOfEvents"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg font-semibold">4. Chain of Events</FormLabel>
              <FormDescription>Describe the chain of events step-by-step.</FormDescription>
              <FormControl>
                <Textarea placeholder="e.g., 1. I thought, 'They're criticizing me.' 2. I felt a surge of anger. 3. My fists clenched..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
         <FormField
          control={form.control}
          name="consequences"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg font-semibold">5. Consequences</FormLabel>
              <FormDescription>What were the immediate and long-term consequences?</FormDescription>
              <FormControl>
                <Textarea placeholder="e.g., My partner looked hurt and left the room. I felt guilty afterward." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="solutions"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg font-semibold">6. Solutions & Prevention</FormLabel>
              <FormDescription>What could you do differently next time? How can you repair any damage?</FormDescription>
              <FormControl>
                <Textarea placeholder="e.g., Next time, I can use the STOP skill. I will apologize to my partner." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={isSubmitting} size="lg">
          {isSubmitting && <Loader className="mr-2 h-4 w-4 animate-spin" />}
          Save Analysis
        </Button>
      </form>
    </Form>
  );
}
