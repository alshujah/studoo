
'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { useAuth, useFirestore } from '@/lib/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Loader } from 'lucide-react';
import { FirestorePermissionError } from '@/lib/firebase/errors';
import { errorEmitter } from '@/lib/firebase/error-emitter';

const formSchema = z.object({
  beliefToTest: z.string().min(10, "Be specific about the thought you want to test."),
  experiment: z.string().min(10, "Describe the specific experiment you will conduct."),
  prediction: z.string().min(5, "What do you predict will happen?"),
  outcome: z.string().min(5, "What actually happened when you did the experiment?"),
  whatILearned: z.string().min(10, "What did you learn from this experiment? How did the outcome differ from your prediction?"),
});

type FormValues = z.infer<typeof formSchema>;

export function BehavioralExperimentForm() {
  const firestore = useFirestore();
  const auth = useAuth();
  const [user] = useAuthState(auth);
  const { toast } = useToast();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
        beliefToTest: '',
        experiment: '',
        prediction: '',
        outcome: '',
        whatILearned: '',
    },
  });

  async function onSubmit(data: FormValues) {
    if (!user) {
      toast({ variant: 'destructive', title: 'Not signed in' });
      return;
    }
    setIsSubmitting(true);
    const experimentData = {
        ...data,
        userId: user.uid,
        createdAt: serverTimestamp(),
    };
    const experimentCollection = collection(firestore, 'users', user.uid, 'behavioralExperiments');

    addDoc(experimentCollection, experimentData).then(() => {
      toast({ title: 'Experiment Saved', description: 'Your findings have been recorded.' });
      router.push('/dashboard');
    }).catch(err => {
        const permissionError = new FirestorePermissionError({
            path: experimentCollection.path,
            operation: 'create',
            requestResourceData: experimentData,
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
          name="beliefToTest"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg font-semibold">1. Belief to Test</FormLabel>
              <FormDescription>What anxious thought or belief do you want to test?</FormDescription>
              <FormControl>
                <Textarea placeholder="e.g., If I speak up in the meeting, everyone will think my idea is stupid." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
         <FormField
          control={form.control}
          name="experiment"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg font-semibold">2. The Experiment</FormLabel>
              <FormDescription>How will you test this belief? Be specific, like a scientist.</FormDescription>
              <FormControl>
                <Textarea placeholder="e.g., During the team meeting on Tuesday, I will share one idea or ask one question." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
         <FormField
          control={form.control}
          name="prediction"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg font-semibold">3. My Prediction</FormLabel>
              <FormDescription>What do you predict will happen? What's the worst-case scenario?</FormDescription>
              <FormControl>
                <Textarea placeholder="e.g., I predict my boss will dismiss my idea, and my coworkers will look at me funny. I'll feel humiliated." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
         <FormField
          control={form.control}
          name="outcome"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg font-semibold">4. The Outcome</FormLabel>
              <FormDescription>After you've done the experiment, what actually happened? Be objective.</FormDescription>
              <FormControl>
                <Textarea placeholder="e.g., I shared my idea. My boss said, 'Good point, let's consider that.' One coworker nodded. No one looked at me funny." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
         <FormField
          control={form.control}
          name="whatILearned"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg font-semibold">5. What I Learned</FormLabel>
              <FormDescription>What does this result tell you about your initial belief?</FormDescription>
              <FormControl>
                <Textarea placeholder="e.g., I learned that my prediction was much more catastrophic than reality. People weren't judging me as harshly as I thought." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <Button type="submit" disabled={isSubmitting} size="lg">
          {isSubmitting && <Loader className="mr-2 h-4 w-4 animate-spin" />}
          Save Experiment
        </Button>
      </form>
    </Form>
  );
}
