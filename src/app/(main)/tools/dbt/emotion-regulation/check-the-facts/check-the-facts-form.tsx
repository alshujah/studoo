
'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from '@/components/ui/form';
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
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

const formSchema = z.object({
  emotion: z.string().min(2, "Please identify the emotion."),
  promptingEvent: z.string().min(10, "Describe the facts of the event."),
  interpretations: z.string().min(10, "Describe your thoughts and interpretations."),
  isJustified: z.enum(['yes', 'no'], { required_error: 'You must select an answer.' }),
  justification: z.string().min(10, "Explain your reasoning."),
});

type FormValues = z.infer<typeof formSchema>;

export function CheckTheFactsForm() {
  const firestore = useFirestore();
  const auth = useAuth();
  const [user] = useAuthState(auth);
  const { toast } = useToast();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      emotion: '',
      promptingEvent: '',
      interpretations: '',
      justification: '',
    },
  });

  async function onSubmit(data: FormValues) {
    if (!user) {
      toast({ variant: 'destructive', title: 'Not signed in' });
      return;
    }
    setIsSubmitting(true);
    const logData = {
        userId: user.uid,
        emotion: data.emotion,
        promptingEvent: data.promptingEvent,
        interpretations: data.interpretations,
        isJustified: data.isJustified === 'yes',
        justification: data.justification,
        createdAt: serverTimestamp(),
    };
    const logCollection = collection(firestore, 'users', user.uid, 'checkTheFactsLogs');

    addDoc(logCollection, logData).then(() => {
      toast({ title: 'Exercise Saved', description: 'Your "Check the Facts" log has been saved.' });
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
          name="emotion"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg font-semibold">1. What emotion are you feeling?</FormLabel>
              <FormControl>
                <Input placeholder="e.g., Anger, Sadness, Fear" {...field} />
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
              <FormLabel className="text-lg font-semibold">2. What was the Prompting Event?</FormLabel>
              <FormDescription>Describe the facts that you observed through your senses. No interpretations!</FormDescription>
              <FormControl>
                <Textarea placeholder="e.g., 'My friend walked past me in the hallway without saying hello.'" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
         <FormField
          control={form.control}
          name="interpretations"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg font-semibold">3. What are your interpretations?</FormLabel>
              <FormDescription>Describe your thoughts, assumptions, and beliefs about the event.</FormDescription>
              <FormControl>
                <Textarea placeholder="e.g., 'They must be mad at me. I did something wrong. They don't want to be my friend anymore.'" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
         <FormField
          control={form.control}
          name="isJustified"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel className="text-lg font-semibold">4. Does your emotion fit the facts?</FormLabel>
              <FormDescription>Is your emotional reaction and its intensity justified by the actual event?</FormDescription>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-col space-y-1"
                >
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="yes" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      Yes, the emotion and intensity are justified.
                    </FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="no" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      No, the emotion and/or intensity do not fit the facts.
                    </FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
         <FormField
          control={form.control}
          name="justification"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg font-semibold">5. Explain Your Answer</FormLabel>
              <FormDescription>Why do you think your emotion is or is not justified?</FormDescription>
              <FormControl>
                <Textarea placeholder="e.g., 'My fear wasn't justified because there are many other reasons they might not have said hello. Maybe they were distracted or didn't see me.'" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <Button type="submit" disabled={isSubmitting} size="lg">
          {isSubmitting && <Loader className="mr-2 h-4 w-4 animate-spin" />}
          Save Exercise
        </Button>
      </form>
    </Form>
  );
}
