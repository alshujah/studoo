
'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { CalendarIcon, Loader } from 'lucide-react';
import { useAuth, useFirestore } from '@/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { addDoc, collection, serverTimestamp, Timestamp } from 'firebase/firestore';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { FirestorePermissionError } from '@/firebase/errors';
import { errorEmitter } from '@/firebase/error-emitter';

const formSchema = z.object({
  date: z.date({ required_error: 'Please select the date of your sleep.' }),
  timeSlept: z.coerce.number().min(0, 'Time slept must be positive.').max(24, 'You can\'t sleep more than 24 hours!'),
  quality: z.enum(['Poor', 'Fair', 'Good', 'Excellent'], { required_error: 'Please select a sleep quality rating.'}),
  awakenings: z.coerce.number().min(0, 'Number of awakenings must be positive.'),
  notes: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

export function SleepLogForm() {
  const firestore = useFirestore();
  const auth = useAuth();
  const [user] = useAuthState(auth);
  const { toast } = useToast();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      date: new Date(),
      timeSlept: 8,
      awakenings: 0,
      notes: '',
    },
  });

  async function onSubmit(data: FormValues) {
    if (!user) {
      toast({ variant: 'destructive', title: 'Not signed in' });
      return;
    }
    setIsSubmitting(true);
    const sleepLogData = {
        ...data,
        date: data.date.toISOString().split('T')[0], // Format as YYYY-MM-DD string
        userId: user.uid,
        createdAt: serverTimestamp(),
    };
    const sleepLogCollection = collection(firestore, 'users', user.uid, 'sleepLogs');
    
    addDoc(sleepLogCollection, sleepLogData).then(() => {
      toast({ title: 'Sleep Logged', description: 'Your sleep entry has been saved.' });
      router.push('/dashboard');
    }).catch(err => {
        const permissionError = new FirestorePermissionError({
            path: sleepLogCollection.path,
            operation: 'create',
            requestResourceData: sleepLogData,
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
          name="date"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Date of Sleep</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button variant={"outline"} className={cn("w-[240px] pl-3 text-left font-normal", !field.value && "text-muted-foreground")}>
                      {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar mode="single" selected={field.value} onSelect={field.onChange} disabled={(date) => date > new Date()} initialFocus />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="timeSlept"
          render={({ field }) => (
            <FormItem>
              <FormLabel>How many hours did you sleep?</FormLabel>
              <FormControl>
                <Input type="number" step="0.5" placeholder="e.g., 7.5" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="quality"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Overall Sleep Quality</FormLabel>
              <FormControl>
                <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex flex-col sm:flex-row gap-4">
                  {['Poor', 'Fair', 'Good', 'Excellent'].map(q => (
                    <FormItem key={q} className="flex items-center space-x-3 space-y-0">
                      <FormControl><RadioGroupItem value={q} /></FormControl>
                      <FormLabel className="font-normal">{q}</FormLabel>
                    </FormItem>
                  ))}
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="awakenings"
          render={({ field }) => (
            <FormItem>
              <FormLabel>How many times did you wake up during the night?</FormLabel>
              <FormControl>
                <Input type="number" placeholder="e.g., 2" {...field} />
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
                <Textarea placeholder="Any dreams, reasons for waking up, or other details?" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={isSubmitting} size="lg">
          {isSubmitting && <Loader className="mr-2 h-4 w-4 animate-spin" />}
          Save Sleep Log
        </Button>
      </form>
    </Form>
  );
}
