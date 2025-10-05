
'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, useFieldArray } from 'react-hook-form';
import { z } from 'zod';
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { useAuth, useFirestore, useMemoFirebase } from '@/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { addDoc, collection, serverTimestamp, doc, updateDoc } from 'firebase/firestore';
import { Loader, PlusCircle, Trash2 } from 'lucide-react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import type { ProblemSolvingSession } from '@/lib/types';
import { Input } from '@/components/ui/input';

const solutionSchema = z.object({
  solution: z.string().min(1, 'Solution cannot be empty.'),
  pros: z.string().optional(),
  cons: z.string().optional(),
});

const formSchema = z.object({
  problem: z.string().min(10, 'Please define the problem with more detail.'),
  solutions: z.array(solutionSchema).min(1, 'Please brainstorm at least one solution.'),
  chosenSolution: z.string().optional(),
  actionPlan: z.string().optional(),
  outcome: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

export function ProblemSolvingForm() {
  const { toast } = useToast();
  const auth = useAuth();
  const [user] = useAuthState(auth);
  const firestore = useFirestore();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentSession, setCurrentSession] = useState<ProblemSolvingSession | null>(null);
  const [step, setStep] = useState(1);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      problem: '',
      solutions: [{ solution: '' }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'solutions',
  });

  const handleNextStep = async () => {
    let isValid = false;
    switch (step) {
      case 1:
        isValid = await form.trigger('problem');
        if (isValid) setStep(2);
        break;
      case 2:
        isValid = await form.trigger('solutions');
        if (isValid) setStep(3);
        break;
      case 3:
        const hasProsCons = form.getValues('solutions').every(s => s.pros && s.cons);
        if (hasProsCons) {
          setStep(4)
        } else {
          toast({ variant: 'destructive', title: 'Incomplete', description: 'Please list pros and cons for each solution.' });
        }
        break;
       case 4:
        isValid = await form.trigger(['chosenSolution', 'actionPlan']);
        if(isValid) {
            await saveSession();
            setStep(5);
        }
        break;
    }
  };

  const saveSession = async (finalOutcome?: string) => {
    if(!user) return;
    setIsSubmitting(true);
    try {
        const data = form.getValues();
        if (currentSession?.id) {
            const docRef = doc(firestore, 'users', user.uid, 'problemSolving', currentSession.id);
            await updateDoc(docRef, { ...data, ...(finalOutcome && { outcome: finalOutcome }) });
        } else {
            const docRef = await addDoc(collection(firestore, 'users', user.uid, 'problemSolving'), {
                ...data,
                userId: user.uid,
                createdAt: serverTimestamp(),
            });
            setCurrentSession({ id: docRef.id, ...data, userId: user.uid, createdAt: new Date() } as ProblemSolvingSession);
        }
        toast({ title: 'Progress Saved', description: 'Your problem-solving session has been updated.' });
    } catch (e) {
        console.error(e);
        toast({ variant: 'destructive', title: 'Error', description: 'Could not save your session.' });
    } finally {
        setIsSubmitting(false);
    }
  }
  
  const handleReviewSubmit = async () => {
    const outcome = form.getValues('outcome');
    if(outcome) {
        await saveSession(outcome);
        resetForm();
    } else {
        toast({ variant: 'destructive', title: 'Incomplete', description: 'Please describe the outcome.' });
    }
  }

  const resetForm = () => {
    form.reset();
    setStep(1);
    setCurrentSession(null);
  };

  const steps = [
    { number: 1, title: 'Define the Problem' },
    { number: 2, title: 'Brainstorm Solutions' },
    { number: 3, title: 'Evaluate Solutions' },
    { number: 4, title: 'Plan & Execute' },
    { number: 5, title: 'Review the Outcome' },
  ];

  return (
    <div>
        <div className="flex justify-between items-center mb-8">
            {steps.map((s, index) => (
                <React.Fragment key={s.number}>
                    <div className="flex flex-col items-center">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= s.number ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}>{s.number}</div>
                        <p className={`text-xs mt-2 text-center ${step >= s.number ? 'font-semibold' : ''}`}>{s.title}</p>
                    </div>
                    {index < steps.length - 1 && <div className="flex-1 h-px bg-border -mx-2"></div>}
                </React.Fragment>
            ))}
        </div>

      <Form {...form}>
        <form className="space-y-8">
          {step === 1 && (
            <FormField control={form.control} name="problem" render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg font-semibold">What is the problem, specifically?</FormLabel>
                <FormControl><Textarea placeholder="Be as specific and objective as possible. For example, instead of 'My life is a mess,' try 'I have not done laundry in three weeks and have no clean clothes.'" {...field} className="min-h-32"/></FormControl>
                <FormMessage />
              </FormItem>
            )} />
          )}

          {step === 2 && (
            <div>
              <h2 className="text-lg font-semibold mb-4">Brainstorm as many solutions as possible.</h2>
              <p className="text-sm text-muted-foreground mb-4">Don't judge them yet, just list everything that comes to mind, no matter how silly it seems.</p>
              <div className="space-y-4">
                {fields.map((field, index) => (
                    <FormField key={field.id} control={form.control} name={`solutions.${index}.solution`} render={({ field }) => (
                        <FormItem><FormControl>
                            <div className="flex gap-2">
                                <Input placeholder={`Solution #${index + 1}`} {...field}/>
                                <Button type="button" variant="ghost" size="icon" onClick={() => remove(index)}><Trash2 className="text-destructive"/></Button>
                            </div>
                        </FormControl><FormMessage/></FormItem>
                    )}/>
                ))}
                <Button type="button" variant="outline" size="sm" onClick={() => append({ solution: '' })}><PlusCircle className="mr-2"/> Add Solution</Button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div>
              <h2 className="text-lg font-semibold mb-4">Evaluate the pros and cons of each solution.</h2>
              <div className="space-y-4">
                {form.getValues('solutions').map((solution, index) => (
                    <Card key={index}>
                        <CardHeader><CardTitle className="text-base">{solution.solution}</CardTitle></CardHeader>
                        <CardContent className="grid md:grid-cols-2 gap-4">
                            <FormField control={form.control} name={`solutions.${index}.pros`} render={({ field }) => (
                                <FormItem><FormLabel>Pros</FormLabel><FormControl><Textarea placeholder="Advantages..." {...field}/></FormControl><FormMessage/></FormItem>
                            )}/>
                            <FormField control={form.control} name={`solutions.${index}.cons`} render={({ field }) => (
                                <FormItem><FormLabel>Cons</FormLabel><FormControl><Textarea placeholder="Disadvantages..." {...field}/></FormControl><FormMessage/></FormItem>
                            )}/>
                        </CardContent>
                    </Card>
                ))}
              </div>
            </div>
          )}

          {step === 4 && (
            <div>
              <FormField control={form.control} name="chosenSolution" render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel className="text-lg font-semibold">Which solution will you try first?</FormLabel>
                  <FormControl>
                    <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex flex-col space-y-1">
                      {form.getValues('solutions').map(s => (
                        <FormItem key={s.solution} className="flex items-center space-x-3 space-y-0">
                          <FormControl><RadioGroupItem value={s.solution} /></FormControl>
                          <FormLabel className="font-normal">{s.solution}</FormLabel>
                        </FormItem>
                      ))}
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />
               <FormField control={form.control} name="actionPlan" render={({ field }) => (
                <FormItem className="mt-8">
                  <FormLabel className="text-lg font-semibold">What is your concrete action plan?</FormLabel>
                   <FormDescription>What are the specific steps? When will you do them? What might get in the way?</FormDescription>
                  <FormControl><Textarea placeholder="e.g., 1. On Tuesday at 6pm, I will gather all my laundry. 2. I will take it to the laundromat. 3. I will bring $10 in quarters..." {...field} className="min-h-32" /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
            </div>
          )}
          
          {step === 5 && currentSession && (
             <FormField control={form.control} name="outcome" render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg font-semibold">How did it go?</FormLabel>
                  <FormControl><Textarea placeholder="Describe what happened when you tried your solution. Did it solve the problem? What did you learn?" {...field} className="min-h-32"/></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
          )}

          <div className="flex justify-between items-center mt-8">
            <div>
                {step > 1 && step < 5 && <Button type="button" variant="ghost" onClick={() => setStep(step - 1)}>Back</Button>}
                 {step === 5 && <Button type="button" variant="ghost" onClick={resetForm}>Start New Session</Button>}
            </div>
            <div>
                {step < 4 && <Button type="button" onClick={handleNextStep}>Next</Button>}
                {step === 4 && <Button type="button" onClick={handleNextStep}>Save Plan &amp; Execute</Button>}
                {step === 5 && <Button type="button" onClick={handleReviewSubmit}>Save Review &amp; Finish</Button>}
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
}

    