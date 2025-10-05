
'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAuth, useFirestore } from '@/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Loader } from 'lucide-react';

const moodOptions = ['Happy', 'Sad', 'Anxious', 'Angry', 'Calm', 'Content', 'Stressed', 'Tired', 'Energetic'];

const formSchema = z.object({
  activity: z.string().min(3, { message: 'Please describe the activity.' }),
  durationInMinutes: z.coerce.number().min(1, 'Duration must be at least 1 minute.'),
  moodBefore: z.string({ required_error: 'Please select your mood before the activity.' }),
  moodAfter: z.string({ required_error: 'Please select your mood after the activity.' }),
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
  });

  async function onSubmit(data: FormValues) {
    if (!user) {
      toast({ variant: 'destructive', title: 'Not signed in' });
      return;
    }
    setIsSubmitting(true);
    try {
      await addDoc(collection(firestore, 'users', user.uid, 'activityLogs'), {
        ...data,
        userId: user.uid,
        timestamp: serverTimestamp(),
      });
      toast({ title: 'Activity Logged', description: 'Your activity has been saved.' });
      router.push('/dashboard');
    } catch (error) {
      console.error('Error saving activity log:', error);
      toast({ variant: 'destructive', title: 'Error', description: 'Could not save your activity log.' });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="activity"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Activity</FormLabel>
              <FormControl>
                <Input placeholder="e.g., Went for a run, read a book, had coffee with a friend" {...field} />
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
                <Input type="number" placeholder="e.g., 30" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <div className="grid md:grid-cols-2 gap-8">
          <FormField
            control={form.control}
            name="moodBefore"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Mood Before</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your mood" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {moodOptions.map(mood => <SelectItem key={mood} value={mood}>{mood}</SelectItem>)}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="moodAfter"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Mood After</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your mood" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {moodOptions.map(mood => <SelectItem key={mood} value={mood}>{mood}</SelectItem>)}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="notes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Notes</FormLabel>
              <FormControl>
                <Textarea placeholder="Any additional thoughts or reflections about the activity?" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={isSubmitting} size="lg">
          {isSubmitting && <Loader className="mr-2 h-4 w-4 animate-spin" />}
          Save Activity Log
        </Button>
      </form>
    </Form>
  );
}
