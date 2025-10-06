
'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
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
  activity: z.string().min(2, "Please enter an activity."),
  durationInMinutes: z.coerce.number().min(1, "Duration must be at least 1 minute."),
  moodBefore: z.string().optional(),
  moodAfter: z.string().optional(),
  energyLevel: z.number().min(1).max(5).default(3),
  notes: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

export function ActivityLogForm() {
  const firestore = useFirestore();
  const auth = useAuth();
  const [user] = useAuthState(auth);
  const { toast } = useToast();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      activity: '',
      durationInMinutes: 30,
      energyLevel: 3,
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
        timestamp: serverTimestamp(),
    };
    const logCollection = collection(firestore, 'users', user.uid, 'activityLogs');

    addDoc(logCollection, logData).then(() => {
      toast({ title: 'Activity Logged', description: 'Your activity has been saved.' });
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
        <div className="grid md:grid-cols-2 gap-8">
            <FormField
            control={form.control}
            name="activity"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Activity</FormLabel>
                <FormControl>
                    <Input placeholder="e.g., Went for a walk, read a book" {...field} />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />
            <FormField
            control={form.control}
            name="durationInMinutes"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Duration (in minutes)</FormLabel>
                <FormControl>
                    <Input type="number" {...field} />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />
        </div>
        <div className="grid md:grid-cols-2 gap-8">
            <FormField
            control={form.control}
            name="moodBefore"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Mood Before (Optional)</FormLabel>
                <FormControl>
                    <Input placeholder="e.g., Tired, stressed" {...field} />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />
            <FormField
            control={form.control}
            name="moodAfter"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Mood After (Optional)</FormLabel>
                <FormControl>
                    <Input placeholder="e.g., More relaxed, energized" {...field} />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />
        </div>
        <FormField
          control={form.control}
          name="energyLevel"
          render={({ field: { value, onChange } }) => (
            <FormItem>
              <FormLabel>Energy Level (1=Very Low, 5=Very High): {value}</FormLabel>
              <FormControl>
                <Slider defaultValue={[value ?? 3]} onValueChange={(vals) => onChange(vals[0])} min={1} max={5} step={1} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="notes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Notes (Optional)</FormLabel>
              <FormControl>
                <Textarea placeholder="Any other details to remember?" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={isSubmitting} size="lg">
          {isSubmitting && <Loader className="mr-2 h-4 w-4 animate-spin" />}
          Save Log
        </Button>
      </form>
    </Form>
  );
}
