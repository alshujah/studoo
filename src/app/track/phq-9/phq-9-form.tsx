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
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const questions = [
  "Little interest or pleasure in doing things",
  "Feeling down, depressed, or hopeless",
  "Trouble falling or staying asleep, or sleeping too much",
  "Feeling tired or having little energy",
  "Poor appetite or overeating",
  "Feeling bad about yourself — or that you are a failure or have let yourself or your family down",
  "Trouble concentrating on things, such as reading the newspaper or watching television",
  "Moving or speaking so slowly that other people could have noticed. Or the opposite — being so fidgety or restless that you have been moving around a lot more than usual",
  "Thoughts that you would be better off dead or of hurting yourself in some way",
];

const answerOptions = [
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

type Phq9FormValues = z.infer<typeof formSchema>;

export function Phq9Form() {
  const auth = useAuth();
  const [user] = useAuthState(auth);
  const firestore = useFirestore();
  const { toast } = useToast();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<Phq9FormValues>({
    resolver: zodResolver(formSchema),
  });
  
  const formValues = form.watch();

  const totalScore = useMemo(() => {
    return Object.values(formValues).reduce((sum, value) => sum + (parseInt(value) || 0), 0);
  }, [formValues]);

  const scoreInterpretation = useMemo(() => {
    if (totalScore >= 20) return { level: 'Severe', color: 'text-destructive', description: "Severe depression. It's highly recommended to consult a professional." };
    if (totalScore >= 15) return { level: 'Moderately Severe', color: 'text-destructive', description: "Moderately severe depression. Professional consultation is recommended." };
    if (totalScore >= 10) return { level: 'Moderate', color: 'text-orange-500', description: "Moderate depression. Professional consultation may be helpful." };
    if (totalScore >= 5) return { level: 'Mild', color: 'text-yellow-500', description: "Mild depression. You may wish to monitor your symptoms." };
    return { level: 'Minimal', color: 'text-green-500', description: "Minimal or no depressive symptoms." };
  }, [totalScore]);

  async function onSubmit(data: Phq9FormValues) {
    if (!user) {
      toast({ variant: 'destructive', title: 'Not signed in', description: 'You must be signed in to save an assessment.' });
      return;
    }
    setIsSubmitting(true);
    try {
      const phq9Collection = collection(firestore, 'users', user.uid, 'phq9Scores');
      await addDoc(phq9Collection, {
        userId: user.uid,
        score: totalScore,
        answers: data,
        timestamp: serverTimestamp(),
      });
      toast({ title: 'Assessment Saved', description: 'Your PHQ-9 assessment has been saved.' });
      form.reset();
      router.push('/dashboard');
    } catch (error) {
      console.error('Error saving PHQ-9 score:', error);
      toast({ variant: 'destructive', title: 'Error', description: 'There was an error saving your assessment.' });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {questions.map((question, index) => (
          <FormField
            key={index}
            control={form.control}
            name={`q${index}` as keyof Phq9FormValues}
            render={({ field }) => (
              <FormItem className="space-y-3 p-4 rounded-md border">
                <FormLabel>{index + 1}. {question}</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-8"
                  >
                    {answerOptions.map(option => (
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

        <Card className="mt-8">
            <CardHeader>
                <CardTitle>Your Score</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-4xl font-bold">{totalScore} / 27</p>
                <p className={`text-lg font-semibold ${scoreInterpretation.color}`}>{scoreInterpretation.level}</p>
                <p className="text-sm text-muted-foreground">{scoreInterpretation.description}</p>
            </CardContent>
        </Card>

        <Button type="submit" disabled={isSubmitting} size="lg">
          {isSubmitting && <Loader className="mr-2 h-4 w-4 animate-spin" />}
          Save Assessment
        </Button>
      </form>
    </Form>
  );
}
