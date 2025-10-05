
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
import { Slider } from '@/components/ui/slider';

const moodOptions = ['Happy', 'Sad', 'Anxious', 'Angry', 'Calm', 'Content', 'Stressed', 'Tired', 'Energetic'];

const formSchema = z.object({
  activity: z.string().optional(),
  durationInMinutes: z.coerce.number().optional(),
  moodBefore: z.string().optional(),
  moodAfter: z.string().optional(),
  energyLevel: z.number().min(1).max(5).optional(),
  physicalSymptoms: z.string().optional(),
  screenTimeHours: z.coerce.number().optional(),
  eatingHabits: z.string().optional(),
  notes: z.string().optional(),
}).refine(data => Object.values(data).some(v => v !== undefined && v !== ''), {
    message: 'Please fill out at least one field.'
});

type FormValues = z.infer<typeof formSchema>;

export function DailyLogForm() {
  const firestore = useFirestore();
  const auth = useAuth();
  const [user] = useAuthState(auth);
  const { toast } = useToast();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {},
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
      toast({ title: 'Daily Log Saved', description: 'Your entry has been saved.' });
      router.push('/dashboard');
    } catch (error) {
      console.error('Error saving daily log:', error);
      toast({ variant: 'destructive', title: 'Error', description: 'Could not save your daily log.' });
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
              <FormLabel>Primary Activity</FormLabel>
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
              <FormLabel>Activity Duration (in minutes)</FormLabel>
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
                <FormLabel>Mood Before Activity</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a mood" />
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
                <FormLabel>Mood After Activity</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a mood" />
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
          name="energyLevel"
          render={({ field: { value, onChange } }) => (
            <FormItem>
              <FormLabel>Energy Level (1=Exhausted, 5=Energized): {value}</FormLabel>
              <FormControl>
                <Slider min={1} max={5} step={1} defaultValue={[3]} onValueChange={(vals) => onChange(vals[0])} />
              </FormControl>
            </FormItem>
          )}
        />

         <FormField
          control={form.control}
          name="physicalSymptoms"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Physical Symptoms</FormLabel>
              <FormControl>
                <Input placeholder="e.g., Headache, stomach ache, muscle tension" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="screenTimeHours"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Screen Time (in hours)</FormLabel>
              <FormControl>
                <Input type="number" placeholder="e.g., 4" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="eatingHabits"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Eating Habits</FormLabel>
              <FormControl>
                <Input placeholder="e.g., Ate 3 regular meals, skipped lunch" {...field} />
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
              <FormLabel>General Notes</FormLabel>
              <FormControl>
                <Textarea placeholder="Any other reflections or thoughts about your day?" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <p className="text-sm text-destructive">{form.formState.errors.root?.message}</p>

        <Button type="submit" disabled={isSubmitting} size="lg">
          {isSubmitting && <Loader className="mr-2 h-4 w-4 animate-spin" />}
          Save Daily Log
        </Button>
      </form>
    </Form>
  );
}
