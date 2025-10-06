
'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import React, { useState, useTransition } from 'react';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useAuth, useFirestore } from '@/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { addDoc, collection, serverTimestamp, Timestamp } from 'firebase/firestore';
import { useToast } from '@/hooks/use-toast';
import { Loader, BarChart, Smile } from 'lucide-react';
import type { WemwbsScore } from '@/lib/types';
import { FirestorePermissionError } from '@/firebase/errors';
import { errorEmitter } from '@/firebase/error-emitter';
import { wemwbsQuestions, wemwbsScale } from '@/lib/data/wemwbs-data';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const createFormSchema = () => {
    const schemaObject: { [key: string]: any } = {};
    wemwbsQuestions.forEach((_, index) => {
        schemaObject[`q${index}`] = z.string({ required_error: "Please select an answer." });
    });
    return z.object(schemaObject);
};

const formSchema = createFormSchema();
type FormValues = z.infer<typeof formSchema>;

export function WemwbsForm() {
  const auth = useAuth();
  const [user] = useAuthState(auth);
  const firestore = useFirestore();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState<{ score: number; interpretation: string } | null>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  });

  async function onSubmit(data: FormValues) {
    if (!user || !firestore) {
        toast({ variant: 'destructive', title: 'Not signed in' });
        return;
    }
    setIsSubmitting(true);
    
    const score = Object.values(data).reduce((sum, value) => sum + parseInt(value, 10), 0);
    
    let interpretation = '';
    if (score < 40) {
        interpretation = 'Your score suggests low mental well-being. It could be helpful to explore some tools in this app or speak with a professional.';
    } else if (score >= 40 && score <= 59) {
        interpretation = 'Your score suggests average mental well-being. There may be areas for growth to enhance your sense of wellness.';
    } else {
        interpretation = 'Your score suggests high mental well-being. This is a great sign that you are feeling good and functioning well.';
    }

    setResult({ score, interpretation });
    
    const assessmentData: Omit<WemwbsScore, 'id'> = {
        userId: user.uid,
        score: score,
        answers: data,
        timestamp: serverTimestamp() as Timestamp,
    };
    const assessmentCollection = collection(firestore, 'users', user.uid, 'wemwbsScores');
    
    addDoc(assessmentCollection, assessmentData).catch(err => {
        const permissionError = new FirestorePermissionError({
            path: assessmentCollection.path,
            operation: 'create',
            requestResourceData: assessmentData,
        });
        errorEmitter.emit('permission-error', permissionError);
    }).finally(() => {
        setIsSubmitting(false);
    });
  }

  const handleReset = () => {
    setResult(null);
    form.reset();
  }

  if (result) {
    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 font-headline">
                        <Smile /> Your Well-being Score
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <p className="text-2xl font-bold">Total Score: {result.score} / 70</p>
                    <p className="text-muted-foreground">{result.interpretation}</p>
                </CardContent>
            </Card>
            <Button onClick={handleReset} variant="outline">Take Again</Button>
        </div>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {wemwbsQuestions.map((item, index) => (
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
                    {wemwbsScale.map(option => (
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
