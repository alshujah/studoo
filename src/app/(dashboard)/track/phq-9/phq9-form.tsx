
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
import type { Phq9Score } from '@/types';
import { FirestorePermissionError } from '@/lib/firebase/errors';
import { errorEmitter } from '@/lib/firebase/error-emitter';
import { scorePhq9Action } from '@/services/actions';
import type { ScorePhq9Output } from '@/services/flows/score-phq-9-flow';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const questions = [
  "Little interest or pleasure in doing things",
  "Feeling down, depressed, or hopeless",
  "Trouble falling or staying asleep, or sleeping too much",
  "Feeling tired or having little energy",
  "Poor appetite or overeating",
  "Feeling bad about yourself - or that you are a failure or have let yourself or your family down",
  "Trouble concentrating on things, such as reading the newspaper or watching television",
  "Moving or speaking so slowly that other people could have noticed. Or the opposite - being so fidgety or restless that you have been moving around a lot more than usual",
  "Thoughts that you would be better off dead, or of hurting yourself in some way",
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

export function Phq9Form() {
  const auth = useAuth();
  const [user] = useAuthState(auth);
  const firestore = useFirestore();
  const { toast } = useToast();
  const [isSubmitting, startTransition] = useTransition();
  const [assessmentResult, setAssessmentResult] = useState<ScorePhq9Output | null>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  });

  async function onSubmit(data: FormValues) {
    startTransition(async () => {
        const result = await scorePhq9Action({ answers: data });

        if (result.success && result.data) {
            setAssessmentResult(result.data);
            if (user && firestore) {
                const assessmentData: Omit<Phq9Score, 'id'> = {
                    userId: user.uid,
                    score: result.data.score,
                    answers: data,
                    timestamp: serverTimestamp() as Timestamp,
                };
                const assessmentCollection = collection(firestore, 'users', user.uid, 'phq9Scores');
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
                    <Alert variant={assessmentResult.hasSuicidalIdeation ? 'destructive' : 'default'}>
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
