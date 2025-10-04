'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { useAuth } from '@/firebase';
import { useUser } from 'react-firebase-hooks/auth';
import { useFirestore } from '@/firebase/provider';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Loader } from 'lucide-react';

const formSchema = z.object({
  entry1: z.string().min(1, 'Please fill out this entry.'),
  entry2: z.string().min(1, 'Please fill out this entry.'),
  entry3: z.string().min(1, 'Please fill out this entry.'),
});

type GratitudeFormValues = z.infer<typeof formSchema>;

export function GratitudeForm() {
  const auth = useAuth();
  const [user] = useUser(auth);
  const firestore = useFirestore();
  const { toast } = useToast();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<GratitudeFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      entry1: '',
      entry2: '',
      entry3: '',
    },
  });

  async function onSubmit(data: GratitudeFormValues) {
    if (!user) {
      toast({
        variant: 'destructive',
        title: 'Not signed in',
        description: 'You must be signed in to save a gratitude entry.',
      });
      return;
    }
    setIsSubmitting(true);
    try {
      const gratitudeCollection = collection(firestore, 'users', user.uid, 'gratitudeEntries');
      await addDoc(gratitudeCollection, {
        userId: user.uid,
        entries: [data.entry1, data.entry2, data.entry3],
        timestamp: serverTimestamp(),
      });
      toast({
        title: 'Entry Saved',
        description: 'Your gratitude journal entry has been saved.',
      });
      form.reset();
      router.push('/dashboard');
    } catch (error) {
      console.error('Error saving gratitude entry:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'There was an error saving your entry.',
      });
    } finally {
        setIsSubmitting(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="entry1"
          render={({ field }) => (
            <FormItem>
              <FormLabel>1. One thing I am grateful for today is...</FormLabel>
              <FormControl>
                <Textarea placeholder="e.g., A warm cup of coffee this morning" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="entry2"
          render={({ field }) => (
            <FormItem>
              <FormLabel>2. Another thing that went well or I appreciate is...</FormLabel>
              <FormControl>
                <Textarea placeholder="e.g., A friend who listened to me" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="entry3"
          render={({ field }) => (
            <FormItem>
              <FormLabel>3. A personal quality or strength I am thankful for is...</FormLabel>
              <FormControl>
                <Textarea placeholder="e.g., My ability to stay patient in traffic" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting && <Loader className="mr-2 h-4 w-4 animate-spin" />}
          Save Entry
        </Button>
      </form>
    </Form>
  );
}
