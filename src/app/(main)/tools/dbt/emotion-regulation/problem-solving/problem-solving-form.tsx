
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
  problemDescription: z.string().min(10, "Be specific about the problem. Who, what, when, and where?"),
  goal: z.string().min(10, "What is your goal in solving this problem? What do you want to happen?"),
  brainstormedSolutions: z.string().min(10, "List all possible solutions, no matter how silly they seem. Don't judge them yet."),
  actionPlan: z.string().min(10, "Choose one solution. What is the first step you will take? When will you do it?"),
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
    if (!user) {
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
      toast({ title: 'Worksheet Saved', description: 'Your plan has been saved. You can do this!' });
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
              <FormDescription>Be specific and factual. What is the problem situation?</FormDescription>
              <FormControl>
                <Textarea placeholder="e.g., I have a big project due on Friday, and I haven't started. I feel overwhelmed." {...field} />
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
              <FormLabel className="text-lg font-semibold">2. What is Your Goal?</FormLabel>
              <FormDescription>What do you want the outcome to be?</FormDescription>
              <FormControl>
                <Textarea placeholder="e.g., My goal is to finish the project by Friday without feeling completely burnt out." {...field} />
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
              <FormDescription>List all ideas, without judgment. Aim for at least 5.</FormDescription>
              <FormControl>
                <Textarea placeholder="e.g., 1. Work on it for 12 hours straight. 2. Ask for an extension. 3. Break it into small pieces..." {...field} />
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
              <FormLabel className="text-lg font-semibold">4. Choose a Solution & Create an Action Plan</FormLabel>
              <FormDescription>Pick the best solution from your brainstorm list and describe the very first step you will take.</FormDescription>
              <FormControl>
                <Textarea placeholder="e.g., I will choose 'Break it into small pieces.' My first step is to open my calendar and schedule one hour to work on the outline today." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <Button type="submit" disabled={isSubmitting} size="lg">
          {isSubmitting && <Loader className="mr-2 h-4 w-4 animate-spin" />}
          Save Action Plan
        </Button>
      </form>
    </Form>
  );
}

    