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
  "Feeling nervous, anxious, or on edge",
  "Not being able to stop or control worrying",
  "Worrying too much about different things",
  "Trouble relaxing",
  "Being so restless that it is hard to sit still",
  "Becoming easily annoyed or irritable",
  "Feeling afraid as if something awful might happen"
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

type Gad7FormValues = z.infer<typeof formSchema>;

export function Gad7Form() {
  const auth = useAuth();
  const [user] = useAuthState(auth);
  const firestore = useFirestore();
  const { toast } = useToast();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<Gad7FormValues>({
    resolver: zodResolver(formSchema),
  });
  
  const formValues = form.watch();

  const totalScore = useMemo(() => {
    return Object.values(formValues).reduce((sum, value) => sum + (parseInt(value) || 0), 0);
  }, [formValues]);

  const scoreInterpretation = useMemo(() => {
    if (totalScore >= 15) return { level: 'Severe', color: 'text-destructive', description: "Severe anxiety. It's highly recommended to consult a professional." };
    if (totalScore >= 10) return { level: 'Moderate', color: 'text-orange-500', description: "Moderate anxiety. Professional consultation may be helpful." };
    if (totalScore >= 5) return { level: 'Mild', color: 'text-yellow-500', description: "Mild anxiety. You may wish to monitor your symptoms." };
    return { level: 'Minimal', color: 'text-green-500', description: "Minimal or no anxiety." };
  }, [totalScore]);

  async function onSubmit(data: Gad7FormValues) {
    if (!user) {
      toast({ variant: 'destructive', title: 'Not signed in', description: 'You must be signed in to save an assessment.' });
      return;
    }
    setIsSubmitting(true);
    try {
      const gad7Collection = collection(firestore, 'users', user.uid, 'gad7Scores');
      await addDoc(gad7Collection, {
        userId: user.uid,
        score: totalScore,
        answers: data,
        timestamp: serverTimestamp(),
      });
      toast({ title: 'Assessment Saved', description: 'Your GAD-7 assessment has been saved.' });
      form.reset();
      router.push('/dashboard');
    } catch (error) {
      console.error('Error saving GAD-7 score:', error);
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
            name={`q${index}` as keyof Gad7FormValues}
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
                <p className="text-4xl font-bold">{totalScore} / 21</p>
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
