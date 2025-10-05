
'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import React, { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useAuth, useFirestore } from '@/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import { Loader } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { wemwbsQuestions, wemwbsScale } from '@/lib/data/wemwbs-data';

const createFormSchema = () => {
    const schemaObject: { [key: string]: any } = {};
    wemwbsQuestions.forEach((_, index) => {
        schemaObject[`q${index}`] = z.string({ required_error: "Please select an answer." });
    });
    return z.object(schemaObject);
};

const formSchema = createFormSchema();

type WemwbsFormValues = z.infer<typeof formSchema>;

export function WemwbsForm() {
  const auth = useAuth();
  const [user] = useAuthState(auth);
  const firestore = useFirestore();
  const { toast } = useToast();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const form = useForm<WemwbsFormValues>({
    resolver: zodResolver(formSchema),
  });
  
  const formValues = form.watch();

  const totalScore = useMemo(() => {
    return Object.values(formValues).reduce((sum, value) => sum + (parseInt(value) || 0), 0);
  }, [formValues]);

  const scoreInterpretation = useMemo(() => {
    if (totalScore >= 60) return { level: 'Very High', description: 'Your score suggests a very high level of mental well-being.' };
    if (totalScore >= 45) return { level: 'Above Average', description: 'Your score is above the average for the population, suggesting good mental well-being.' };
    if (totalScore >= 35) return { level: 'Average', description: 'Your score is in the average range for the population.' };
    if (totalScore >= 25) return { level: 'Below Average', description: 'Your score is below the average, suggesting your mental well-being may be low.' };
    return { level: 'Very Low', description: 'Your score is very low, which may indicate low mental well-being. It could be helpful to talk to a professional.' };
  }, [totalScore]);

  async function onSubmit(data: WemwbsFormValues) {
    if (!user) {
      toast({ variant: 'destructive', title: 'Not signed in', description: 'You must be signed in to save an assessment.' });
      return;
    }
    setIsSubmitting(true);
    try {
      const wemwbsCollection = collection(firestore, 'users', user.uid, 'wemwbsScores');
      await addDoc(wemwbsCollection, {
        userId: user.uid,
        score: totalScore,
        answers: data,
        timestamp: serverTimestamp(),
      });
      toast({ title: 'Assessment Saved', description: 'Your WEMWBS assessment has been saved.' });
      setIsSubmitted(true);
      window.scrollTo({top: 0, behavior: 'smooth'});

    } catch (error) {
      console.error('Error saving WEMWBS score:', error);
      toast({ variant: 'destructive', title: 'Error', description: 'There was an error saving your assessment.' });
    } finally {
      setIsSubmitting(false);
    }
  }
  
  if (isSubmitted) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Assessment Complete</CardTitle>
                <CardDescription>Your results have been saved. You can view your progress on the dashboard over time.</CardDescription>
            </CardHeader>
            <CardContent>
                <p className="text-4xl font-bold">{totalScore}</p>
                <p className={`text-lg font-semibold`}>{scoreInterpretation.level} Well-being</p>
                <p className="text-sm text-muted-foreground">{scoreInterpretation.description}</p>
                <Button onClick={() => {
                    form.reset();
                    setIsSubmitted(false);
                }} className="mt-4">Take Again</Button>
            </CardContent>
        </Card>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {wemwbsQuestions.map((question, index) => (
          <FormField
            key={index}
            control={form.control}
            name={`q${index}` as keyof WemwbsFormValues}
            render={({ field }) => (
              <FormItem className="space-y-3 p-4 rounded-md border bg-muted/20">
                <FormLabel>{index + 1}. {question}</FormLabel>
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
          {isSubmitting && <Loader className="mr-2 h-4 w-4 animate-spin" />}
          Calculate and Save Score
        </Button>
      </form>
    </Form>
  );
}

    