
'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
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
  entry1: z.string().min(3, "Please write at least a few words."),
  entry2: z.string().min(3, "Please write at least a few words."),
  entry3: z.string().min(3, "Please write at least a few words."),
});

type FormValues = z.infer<typeof formSchema>;

export function GratitudeForm() {
  const firestore = useFirestore();
  const auth = useAuth();
  const [user] = useAuthState(auth);
  const { toast } = useToast();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      entry1: '',
      entry2: '',
      entry3: '',
    },
  });

  async function onSubmit(data: FormValues) {
    if (!user || !firestore) {
      toast({ variant: 'destructive', title: 'Not signed in' });
      return;
    }
    setIsSubmitting(true);
    
    const gratitudeData = {
      userId: user.uid,
      entries: [data.entry1, data.entry2, data.entry3],
      timestamp: serverTimestamp(),
    };

    const gratitudeCollection = collection(firestore, 'users', user.uid, 'gratitudeEntries');

    addDoc(gratitudeCollection, gratitudeData).then(() => {
      toast({ title: 'Gratitude Entry Saved', description: 'Thanks for taking the time to reflect.' });
      router.push('/dashboard');
    }).catch(err => {
      const permissionError = new FirestorePermissionError({
          path: gratitudeCollection.path,
          operation: 'create',
          requestResourceData: gratitudeData,
      });
      errorEmitter.emit('permission-error', permissionError);
    }).finally(() => {
      setIsSubmitting(false);
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="entry1"
          render={({ field }) => (
            <FormItem>
              <FormLabel>1.</FormLabel>
              <FormControl>
                <Input placeholder="Something that made you smile..." {...field} />
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
              <FormLabel>2.</FormLabel>
              <FormControl>
                <Input placeholder="A person you appreciate..." {...field} />
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
              <FormLabel>3.</FormLabel>
              <FormControl>
                <Input placeholder="Something simple you often take for granted..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isSubmitting} size="lg">
          {isSubmitting && <Loader className="mr-2 h-4 w-4 animate-spin" />}
          Save Entry
        </Button>
      </form>
    </Form>
  );
}
