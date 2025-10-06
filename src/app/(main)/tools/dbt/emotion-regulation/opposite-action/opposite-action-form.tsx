
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
import { Slider } from '@/components/ui/slider';
import { Input } from '@/components/ui/input';

const formSchema = z.object({
  emotion: z.string().min(2, "Please identify the emotion."),
  intensity: z.number().min(0).max(100),
  actionUrge: z.string().min(5, "Describe what the emotion makes you want to do."),
  oppositeAction: z.string().min(5, "What is the opposite of that urge?"),
  outcome: z.string().min(10, "Describe what happened when you did the opposite action."),
});

type FormValues = z.infer<typeof formSchema>;

export function OppositeActionForm() {
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
      intensity: 50,
      actionUrge: '',
      oppositeAction: '',
      outcome: ''
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
    const logCollection = collection(firestore, 'users', user.uid, 'oppositeActionLogs');

    addDoc(logCollection, logData).then(() => {
      toast({ title: 'Exercise Saved', description: 'Your Opposite Action log has been saved.' });
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
              <FormLabel className="text-lg font-semibold">1. Identify the Emotion</FormLabel>
              <FormDescription>What is the primary emotion you are feeling that you want to change?</FormDescription>
              <FormControl>
                <Input placeholder="e.g., Sadness, Fear, Anger, Shame" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="intensity"
          render={({ field: { value, onChange } }) => (
            <FormItem>
              <FormLabel className="text-lg font-semibold">2. Rate the Intensity ({value}%)</FormLabel>
              <FormControl>
                <Slider defaultValue={[value ?? 50]} onValueChange={(vals) => onChange(vals[0])} max={100} step={1} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
         <FormField
          control={form.control}
          name="actionUrge"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg font-semibold">3. Describe the Action Urge</FormLabel>
              <FormDescription>What does this emotion make you want to do?</FormDescription>
              <FormControl>
                <Textarea placeholder="e.g., Stay in bed and isolate myself from everyone." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
         <FormField
          control={form.control}
          name="oppositeAction"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg font-semibold">4. Plan Your Opposite Action</FormLabel>
              <FormDescription>What is the opposite of that urge? Be specific.</FormDescription>
              <FormControl>
                <Textarea placeholder="e.g., Get out of bed, take a shower, and text a friend to go for a walk." {...field} />
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
              <FormLabel className="text-lg font-semibold">5. Reflect on the Outcome</FormLabel>
              <FormDescription>After doing the opposite action, what happened? How did your emotion change?</FormDescription>
              <FormControl>
                <Textarea placeholder="e.g., It was hard at first, but after the walk I felt a little lighter. The sadness wasn't as heavy." {...field} />
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
