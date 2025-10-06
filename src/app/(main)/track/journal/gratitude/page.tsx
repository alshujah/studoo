
'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, useFieldArray } from 'react-hook-form';
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
import { Loader, Plus, Trash2, Sparkles } from 'lucide-react';
import { FirestorePermissionError } from '@/firebase/errors';
import { errorEmitter } from '@/firebase/error-emitter';
import { PageLayout } from '@/components/layout/page-layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const formSchema = z.object({
  entries: z.array(z.object({ value: z.string().min(1, "Please enter something you're grateful for.") })).min(3, "Please list at least 3 things."),
});

type FormValues = z.infer<typeof formSchema>;

export default function GratitudeJournalPage() {
  const firestore = useFirestore();
  const auth = useAuth();
  const [user] = useAuthState(auth);
  const { toast } = useToast();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      entries: [{ value: '' }, { value: '' }, { value: '' }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "entries",
  });

  async function onSubmit(data: FormValues) {
    if (!user) {
      toast({ variant: 'destructive', title: 'Not signed in' });
      return;
    }
    setIsSubmitting(true);
    const logData = {
        userId: user.uid,
        entries: data.entries.map(e => e.value),
        timestamp: serverTimestamp(),
    };
    const logCollection = collection(firestore, 'users', user.uid, 'gratitudeEntries');

    addDoc(logCollection, logData).then(() => {
      toast({ title: 'Gratitude Logged', description: 'Your entry has been saved. Great job!' });
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
    <PageLayout title="Gratitude Journal">
        <Card>
            <CardHeader>
                <CardTitle className="font-headline">What are you grateful for today?</CardTitle>
                <CardDescription>
                    Taking a moment to acknowledge the good things in your life can have a powerful positive effect on your mood and outlook.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Alert className="mb-8">
                    <Sparkles className="h-4 w-4" />
                    <AlertTitle>Focus on the Small Things</AlertTitle>
                    <AlertDescription>
                        Gratitude doesn't have to be for big events. It can be for a warm cup of coffee, a sunny day, or a nice conversation.
                    </AlertDescription>
                </Alert>
                <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="space-y-4">
                        {fields.map((field, index) => (
                        <FormField
                            control={form.control}
                            key={field.id}
                            name={`entries.${index}.value`}
                            render={({ field }) => (
                            <FormItem>
                                <FormLabel className="sr-only">Gratitude Entry {index + 1}</FormLabel>
                                <div className="flex items-center gap-2">
                                <FormControl>
                                    <Input placeholder={`Grateful for...`} {...field} />
                                </FormControl>
                                {fields.length > 3 && (
                                    <Button type="button" variant="ghost" size="icon" onClick={() => remove(index)} disabled={isSubmitting}>
                                        <Trash2 className="h-4 w-4 text-muted-foreground" />
                                    </Button>
                                )}
                                </div>
                                <FormMessage />
                            </FormItem>
                            )}
                        />
                        ))}
                    </div>

                    <div className="flex flex-wrap gap-4 items-center">
                        <Button type="button" variant="outline" size="sm" onClick={() => append({ value: '' })} disabled={fields.length >= 7 || isSubmitting}>
                            <Plus className="mr-2 h-4 w-4" />
                            Add another
                        </Button>

                        <Button type="submit" disabled={isSubmitting}>
                            {isSubmitting && <Loader className="mr-2 h-4 w-4 animate-spin" />}
                            Save Entry
                        </Button>
                    </div>
                </form>
                </Form>
            </CardContent>
        </Card>
    </PageLayout>
  );
}
