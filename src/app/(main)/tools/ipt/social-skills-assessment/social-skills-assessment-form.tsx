
'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import React, { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useAuth, useFirestore } from '@/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { addDoc, collection, serverTimestamp, Timestamp } from 'firebase/firestore';
import { useToast } from '@/hooks/use-toast';
import { Loader } from 'lucide-react';
import { socialSkillsAssessment } from '@/lib/data/social-skills-assessment-data';
import type { SocialSkillAssessment } from '@/lib/types';
import { FirestorePermissionError } from '@/firebase/errors';
import { errorEmitter } from '@/firebase/error-emitter';


const createFormSchema = () => {
    const schemaObject: { [key: string]: any } = {};
    socialSkillsAssessment.forEach((_, index) => {
        schemaObject[`q${index}`] = z.string({ required_error: "Please select an answer." });
    });
    return z.object(schemaObject);
};

const formSchema = createFormSchema();
type FormValues = z.infer<typeof formSchema>;

interface SocialSkillsAssessmentFormProps {
    setAssessmentResult: (result: SocialSkillAssessment) => void;
}

export function SocialSkillsAssessmentForm({ setAssessmentResult }: SocialSkillsAssessmentFormProps) {
  const auth = useAuth();
  const [user] = useAuthState(auth);
  const firestore = useFirestore();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  });

  const calculateScores = (data: FormValues) => {
    const scores = {
        'Listening': 0,
        'Small Talk': 0,
        'Empathy': 0,
        'Nonverbal': 0,
        'Assertiveness': 0,
    };
    const maxScores = { ...scores };

    socialSkillsAssessment.forEach((item, index) => {
        const answerValue = parseInt(data[`q${index}` as keyof FormValues]);
        const maxScoreForItem = item.scale[item.scale.length -1].value;
        maxScores[item.domain] += maxScoreForItem;

        if (item.scoring === 'direct') {
            scores[item.domain] += answerValue;
        } else {
            scores[item.domain] += maxScoreForItem - answerValue;
        }
    });
    
    // Normalize scores to a 0-10 scale for consistency
    for (const domain in scores) {
        const key = domain as keyof typeof scores;
        if(maxScores[key] > 0) {
           scores[key] = Math.round((scores[key] / maxScores[key]) * 10);
        } else {
           scores[key] = 0;
        }
    }

    return scores;
  }

  async function onSubmit(data: FormValues) {
    if (!user) {
      toast({ variant: 'destructive', title: 'Not signed in' });
      return;
    }
    setIsSubmitting(true);
    const scores = calculateScores(data);
    const assessmentData = {
        userId: user.uid,
        scores,
        answers: data,
        timestamp: serverTimestamp(),
    };
    const assessmentCollection = collection(firestore, 'users', user.uid, 'socialSkillAssessments');

    addDoc(assessmentCollection, assessmentData)
        .then(docRef => {
            toast({ title: 'Assessment Complete', description: 'Your results have been calculated.' });
            
            setAssessmentResult({
                id: docRef.id,
                userId: user.uid,
                scores: scores,
                answers: data,
                timestamp: Timestamp.now(),
            });
        })
        .catch(err => {
            const permissionError = new FirestorePermissionError({
                path: assessmentCollection.path,
                operation: 'create',
                requestResourceData: assessmentData,
            });
            errorEmitter.emit('permission-error', permissionError);
        })
        .finally(() => {
            setIsSubmitting(false);
        });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {socialSkillsAssessment.map((item, index) => (
          <FormField
            key={index}
            control={form.control}
            name={`q${index}` as keyof FormValues}
            render={({ field }) => (
              <FormItem className="space-y-3 p-4 rounded-md border bg-muted/20">
                <FormLabel>{index + 1}. {item.text}</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex flex-col sm:flex-row flex-wrap gap-x-6 gap-y-2"
                  >
                    {item.scale.map(option => (
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
