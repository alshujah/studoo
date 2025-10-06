
'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import React, { useState, useTransition } from 'react';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useAuth, useFirestore } from '@/lib/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { addDoc, collection, serverTimestamp, Timestamp } from 'firebase/firestore';
import { useToast } from '@/hooks/use-toast';
import { Loader, BarChart, ShieldAlert } from 'lucide-react';
import type { Gad7Score } from '@/types';
import { FirestorePermissionError } from '@/lib/firebase/errors';
import { errorEmitter } from '@/lib/firebase/error-emitter';
import { scoreGad7Action } from '@/services/actions';
import type { ScoreGad7Output } from '@/services/flows/score-gad7-flow';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const questions = [
  "Feeling nervous, anxious, or on edge",
  "Not being able to stop or control worrying",
  "Worrying too much about different things",
  "Trouble relaxing",
  "Being so restless that it is hard to sit still",
  "Becoming easily annoyed or irritable",
  "Feeling afraid as if something awful might happen",
];

const scale = [
  { label: "Not at all", value: 0 },
  { label: "Several days", value: 1 },
  { label: "More than half the days", value: 2 },
  { label: "Nearly every day", value: 3 },
];

const createFormSchema = () => {
    const schemaObject: { [key: string]: any } = {};
    questions.forEach((_, index) => {
        schemaObject[`q${index}`] = z.string({ required_error: "Please select an answer." });
    });
    return z.object(schemaObject);
};

const formSchema = createFormSchema();
type FormValues = z.infer<typeof formSchema>;

export function Gad7Form() {
  const auth = useAuth();
  const [user] = useAuthState(auth);
  const firestore = useFirestore();
  const { toast } = useToast();
  const [isSubmitting, startTransition] = useTransition();
  const [assessmentResult, setAssessmentResult] = useState<ScoreGad7Output | null>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  });

  async function onSubmit(data: FormValues) {
    startTransition(async () => {
        const result = await scoreGad7Action({ answers: data });

        if (result.success && result.data) {
            setAssessmentResult(result.data);
            if (user && firestore) {
                const assessmentData: Omit<Gad7Score, 'id'> = {
                    userId: user.uid,
                    score: result.data.score,
                    answers: data,
                    timestamp: serverTimestamp() as Timestamp,
                };
                const assessmentCollection = collection(firestore, 'users', user.uid, 'gad7Scores');
                addDoc(assessmentCollection, assessmentData).catch(err => {
                    const permissionError = new FirestorePermissionError({
                        path: assessmentCollection.path,
                        operation: 'create',
                        requestResourceData: assessmentData,
                    });
                    errorEmitter.emit('permission-error', permissionError);
                });
            }
        } else {
            toast({ variant: 'destructive', title: 'Error', description: result.error });
        }
    });
  }

  const handleReset = () => {
    setAssessmentResult(null);
    form.reset();
  }

  if (assessmentResult) {
    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 font-headline">
                        <BarChart /> Your Result
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <p className="text-2xl font-bold">Total Score: {assessmentResult.score}</p>
                    <p className="text-lg">Severity: <span className="font-semibold">{assessmentResult.severity}</span></p>
                    <Alert>
                        <ShieldAlert className="h-4 w-4" />
                        <AlertTitle>Interpretation</AlertTitle>
                        <AlertDescription>{assessmentResult.interpretation}</AlertDescription>
                    </Alert>
                </CardContent>
            </Card>
            <Button onClick={handleReset} variant="outline">Take Again</Button>
        </div>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {questions.map((item, index) => (
          <FormField
            key={index}
            control={form.control}
            name={`q${index}` as keyof FormValues}
            render={({ field }) => (
              <FormItem className="space-y-3 p-4 rounded-md border bg-muted/20">
                <FormLabel>{index + 1}. {item}</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex flex-col sm:flex-row flex-wrap gap-x-6 gap-y-2"
                  >
                    {scale.map(option => (
                      <FormItem key={option.value} className="flex items-center space-x-2 space-y-0">
                        <FormControl>
                          <RadioGroupItem value={String(option.value)} />
                        </FormControl>
                        <FormLabel className="font-normal">{option.label}</FormLabel>
                      </FormItem>
                    ))}
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        ))}

        <Button type="submit" disabled={isSubmitting} size="lg">
          {isSubmitting ? <Loader className="mr-2 h-4 w-4 animate-spin" /> : 'See My Results'}
        </Button>
      </form>
    </Form>
  );
}
