
'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { useAuth, useFirestore } from '@/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Loader } from 'lucide-react';
import { Slider } from '@/components/ui/slider';
import { FirestorePermissionError } from '@/firebase/errors';
import { errorEmitter } from '@/firebase/error-emitter';

const formSchema = z.object({
  substance: z.string().min(1, 'Please enter the substance.'),
  amount: z.string().min(1, 'Please enter the amount.'),
  urgeIntensity: z.number().min(0).max(100).default(50),
  notes: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

export function SubstanceUseForm() {
  const firestore = useFirestore();
  const auth = useAuth();
  const [user] = useAuthState(auth);
  const { toast } = useToast();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      urgeIntensity: 50,
      notes: '',
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
    const logCollection = collection(firestore, 'users', user.uid, 'substanceUseLogs');

    addDoc(logCollection, logData).then(() => {
      toast({ title: 'Log Saved', description: 'Your substance use entry has been saved.' });
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
          name="substance"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Substance</FormLabel>
              <FormControl>
                <Input placeholder="e.g., Caffeine, Alcohol, Nicotine" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="amount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Amount</FormLabel>
              <FormControl>
                <Input placeholder="e.g., 1 cup, 1 glass, 1 cigarette" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="urgeIntensity"
          render={({ field: { value, onChange } }) => (
            <FormItem>
              <FormLabel>Urge Intensity (before use): {value}%</FormLabel>
              <FormControl>
                <Slider defaultValue={[value || 50]} onValueChange={(vals) => onChange(vals[0])} max={100} step={1} />
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
              <FormLabel>Notes</FormLabel>
              <FormControl>
                <Textarea placeholder="What was the context? What were you feeling before and after?" {...field} />
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
