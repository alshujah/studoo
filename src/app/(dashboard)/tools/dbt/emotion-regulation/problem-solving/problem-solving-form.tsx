
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
  problemDescription: z.string().min(10, "Be specific about the problem."),
  goal: z.string().min(5, "What is your goal?"),
  brainstormedSolutions: z.string().min(10, "List at least 2-3 potential solutions."),
  actionPlan: z.string().min(10, "Describe the first step you will take."),
});

type FormValues = z.infer<typeof formSchema>;

export function ProblemSolvingForm() {
  const firestore = useFirestore();
  const auth = useAuth();
  const [user] = useAuthState(auth);
  const { toast } = useToast();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
        problemDescription: '',
        goal: '',
        brainstormedSolutions: '',
        actionPlan: '',
    },
  });

  async function onSubmit(data: FormValues) {
    if (!user || !firestore) {
      toast({ variant: 'destructive', title: 'Not signed in' });
      return;
    }
    setIsSubmitting(true);
    
    const worksheetData = {
        ...data,
        userId: user.uid,
        createdAt: serverTimestamp(),
    };
    const worksheetCollection = collection(firestore, 'users', user.uid, 'problemSolvingWorksheets');

    addDoc(worksheetCollection, worksheetData).then(() => {
      toast({ title: 'Worksheet Saved', description: 'Your problem-solving plan has been recorded.' });
      router.push('/dashboard');
    }).catch(err => {
        const permissionError = new FirestorePermissionError({
            path: worksheetCollection.path,
            operation: 'create',
            requestResourceData: worksheetData,
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
          name="problemDescription"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg font-semibold">1. Describe the Problem</FormLabel>
              <FormDescription>What is the situation that is causing a problem for you?</FormDescription>
              <FormControl>
                <Textarea placeholder="e.g., I'm not getting enough sleep because my roommate is noisy." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
         <FormField
          control={form.control}
          name="goal"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg font-semibold">2. What is your goal?</FormLabel>
              <FormDescription>What needs to happen for you to feel good about the situation?</FormDescription>
              <FormControl>
                <Textarea placeholder="e.g., My goal is to get 7-8 hours of uninterrupted sleep." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
         <FormField
          control={form.control}
          name="brainstormedSolutions"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg font-semibold">3. Brainstorm Solutions</FormLabel>
              <FormDescription>List all the ideas you can think of. Don't judge them yet.</FormDescription>
              <FormControl>
                <Textarea placeholder="e.g., 1. Talk to my roommate. 2. Buy earplugs. 3. Go to bed earlier..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
         <FormField
          control={form.control}
          name="actionPlan"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg font-semibold">4. Choose a solution and make a plan.</FormLabel>
              <FormDescription>Pick the best solution from your list and describe the first concrete step you will take.</FormDescription>
              <FormControl>
                <Textarea placeholder="e.g., I will text my roommate tomorrow morning and ask if we can chat for 5 minutes." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <Button type="submit" disabled={isSubmitting} size="lg">
          {isSubmitting && <Loader className="mr-2 h-4 w-4 animate-spin" />}
          Save Worksheet
        </Button>
      </form>
    </Form>
  );
}
