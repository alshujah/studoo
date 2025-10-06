
'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
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

const symptoms = [
  "Pounding heart or accelerated heart rate",
  "Sweating",
  "Trembling or shaking",
  "Shortness of breath or smothering sensations",
  "Feelings of choking",
  "Chest pain or discomfort",
  "Nausea or abdominal distress",
  "Feeling dizzy, unsteady, light-headed, or faint",
  "Chills or heat sensations",
  "Numbness or tingling sensations (paresthesias)",
  "Feelings of unreality (derealization) or being detached from oneself (depersonalization)",
  "Fear of losing control or 'going crazy'",
  "Fear of dying",
];

const formSchema = z.object({
  symptoms: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: 'You have to select at least one symptom.',
  }),
  peakIntensity: z.number().min(0).max(100).default(50),
  durationInMinutes: z.coerce.number().min(1, { message: 'Duration must be at least 1 minute.' }),
  trigger: z.string().optional(),
  notes: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

export function PanicLogForm() {
  const firestore = useFirestore();
  const auth = useAuth();
  const [user] = useAuthState(auth);
  const { toast } = useToast();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      symptoms: [],
      peakIntensity: 50,
      durationInMinutes: 10,
      trigger: '',
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
    const logCollection = collection(firestore, 'users', user.uid, 'panicLogs');

    addDoc(logCollection, logData).then(() => {
      toast({ title: 'Panic Attack Logged', description: 'Your log has been saved.' });
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
          name="symptoms"
          render={() => (
            <FormItem>
              <FormLabel className="text-base">Symptoms</FormLabel>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {symptoms.map((item) => (
                  <FormField
                    key={item}
                    control={form.control}
                    name="symptoms"
                    render={({ field }) => {
                      return (
                        <FormItem key={item} className="flex flex-row items-start space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={field.value?.includes(item)}
                              onCheckedChange={(checked) => {
                                return checked
                                  ? field.onChange([...(field.value || []), item])
                                  : field.onChange(field.value?.filter((value) => value !== item));
                              }}
                            />
                          </FormControl>
                          <FormLabel className="font-normal">{item}</FormLabel>
                        </FormItem>
                      );
                    }}
                  />
                ))}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="peakIntensity"
          render={({ field: { value, onChange } }) => (
            <FormItem>
              <FormLabel>Peak Intensity ({value}%)</FormLabel>
              <FormControl>
                <Slider defaultValue={[value ?? 50]} onValueChange={(vals) => onChange(vals[0])} max={100} step={1} />
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
                <Input type="number" placeholder="e.g., 15" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="trigger"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Possible Trigger</FormLabel>
              <FormControl>
                <Textarea placeholder="What do you think might have triggered the attack?" {...field} />
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
              <FormLabel>Additional Notes</FormLabel>
              <FormControl>
                <Textarea placeholder="Any other details you want to add?" {...field} />
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
