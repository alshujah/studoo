
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
import { useToast } from '@/hooks/use-toast';
import { Loader, BarChart } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { socialSkillsAssessment } from '@/lib/social-skills-assessment-data';
import { Progress } from '@/components/ui/progress';
import { useAuth, useFirestore } from '@/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { useRouter } from 'next/navigation';

const createFormSchema = () => {
    const schemaObject: { [key: string]: any } = {};
    socialSkillsAssessment.forEach((_, index) => {
        schemaObject[`q${index}`] = z.string({ required_error: "Please select an answer." });
    });
    return z.object(schemaObject);
};

const formSchema = createFormSchema();
type AssessmentFormValues = z.infer<typeof formSchema>;

type DomainScores = {
    [key: string]: {
        score: number;
        maxScore: number;
    }
}

export function SocialSkillsAssessmentForm() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [results, setResults] = useState<DomainScores | null>(null);
  const auth = useAuth();
  const [user] = useAuthState(auth);
  const firestore = useFirestore();
  const router = useRouter();


  const form = useForm<AssessmentFormValues>({
    resolver: zodResolver(formSchema),
  });

  async function onSubmit(data: AssessmentFormValues) {
    setIsSubmitting(true);
    
    const domainScores: DomainScores = {
        'Listening': { score: 0, maxScore: 0 },
        'Small Talk': { score: 0, maxScore: 0 },
        'Empathy': { score: 0, maxScore: 0 },
        'Nonverbal': { score: 0, maxScore: 0 },
        'Assertiveness': { score: 0, maxScore: 0 },
    };

    socialSkillsAssessment.forEach((item, index) => {
        const value = parseInt(data[`q${index}` as keyof AssessmentFormValues]);
        const maxItemScore = item.scale.reduce((max, op) => op.value > max ? op.value : max, 0);
        
        domainScores[item.domain].maxScore += maxItemScore;

        if (item.scoring === 'direct') {
            domainScores[item.domain].score += value;
        } else { // inverted
            domainScores[item.domain].score += (maxItemScore - value);
        }
    });

    const finalScores = Object.fromEntries(
        Object.entries(domainScores).map(([domain, {score, maxScore}]) => [domain, score])
    );

    if (user && firestore) {
        try {
            await addDoc(collection(firestore, 'users', user.uid, 'socialSkillAssessments'), {
                userId: user.uid,
                timestamp: serverTimestamp(),
                scores: finalScores,
                answers: data,
            });
            toast({ title: 'Assessment Complete', description: 'Your results are saved and shown below.' });
        } catch (e) {
            console.error("Error saving assessment:", e);
            toast({ variant: 'destructive', title: 'Save Failed', description: 'Could not save your assessment results.' });
        }
    }

    setResults(domainScores);
    setIsSubmitting(false);
    window.scrollTo({top: 0, behavior: 'smooth'});
  }

  if (results) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="font-headline">Your Social Skills Profile</CardTitle>
          <CardDescription>
            Here is a breakdown of your self-assessed social skills. Remember, these are opportunities for growth, not judgments.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {Object.entries(results).map(([domain, { score, maxScore }]) => (
            <div key={domain} className="space-y-2">
              <div className="flex justify-between items-baseline">
                <h3 className="font-semibold">{domain}</h3>
                <p className="text-sm text-muted-foreground">{score} / {maxScore}</p>
              </div>
              <Progress value={(score / maxScore) * 100} />
            </div>
          ))}
           <Button onClick={() => { setResults(null); form.reset(); window.scrollTo(0,0) }}>
            Take Again
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {socialSkillsAssessment.map((item, index) => (
          <FormField
            key={index}
            control={form.control}
            name={`q${index}` as keyof AssessmentFormValues}
            render={({ field }) => (
              <FormItem className="space-y-3 p-4 rounded-md border bg-muted/20">
                <FormLabel>{index + 1}. {item.text}</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-6"
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
          {isSubmitting ? (
            <Loader className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <BarChart className="mr-2 h-4 w-4" />
          )}
          Calculate My Results
        </Button>
      </form>
    </Form>
  );
}
