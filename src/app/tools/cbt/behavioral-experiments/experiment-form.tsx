
'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import React, { useState, useMemo } from 'react';
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
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { useAuth, useFirestore, useMemoFirebase } from '@/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { addDoc, collection, serverTimestamp, query, orderBy, doc, updateDoc } from 'firebase/firestore';
import { useCollection } from 'react-firebase-hooks/firestore';
import { Loader, FlaskConical, Beaker, CheckCircle, RotateCcw } from 'lucide-react';
import type { BehavioralExperiment } from '@/lib/types';
import { format } from 'date-fns';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { ScrollArea } from '@/components/ui/scroll-area';

const formSchema = z.object({
  belief: z.string().min(5, "Please state the belief clearly."),
  prediction: z.string().min(5, "What do you predict will happen?"),
  experiment: z.string().min(10, "Please describe the experiment in detail."),
  outcome: z.string().optional(),
  whatILearned: z.string().optional(),
});

type ExperimentFormValues = z.infer<typeof formSchema>;

export function ExperimentForm() {
  const { toast } = useToast();
  const auth = useAuth();
  const [user] = useAuthState(auth);
  const firestore = useFirestore();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentExperiment, setCurrentExperiment] = useState<BehavioralExperiment | null>(null);
  const [step, setStep] = useState(1); // 1: Design, 2: Reflect

  const experimentsQuery = useMemoFirebase(() => {
    if (!user) return null;
    return query(collection(firestore, 'users', user.uid, 'behavioralExperiments'), orderBy('createdAt', 'desc'));
  }, [user, firestore]);

  const [experimentsSnapshot, loading] = useCollection(experimentsQuery);
  const pastExperiments = useMemo(() => experimentsSnapshot?.docs.map(doc => ({ id: doc.id, ...doc.data() } as BehavioralExperiment)) || [], [experimentsSnapshot]);

  const form = useForm<ExperimentFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
        belief: '',
        prediction: '',
        experiment: '',
        outcome: '',
        whatILearned: '',
    },
  });

  async function onDesignSubmit(data: ExperimentFormValues) {
    if (!user) return;
    setIsSubmitting(true);
    try {
      const docRef = await addDoc(collection(firestore, 'users', user.uid, 'behavioralExperiments'), {
        userId: user.uid,
        belief: data.belief,
        prediction: data.prediction,
        experiment: data.experiment,
        outcome: '',
        whatILearned: '',
        createdAt: serverTimestamp(),
      });
      setCurrentExperiment({ id: docRef.id, ...data, userId: user.uid, createdAt: new Date() } as BehavioralExperiment);
      setStep(2);
      toast({ title: 'Experiment Designed', description: "Now, go and run your experiment!" });
    } catch (error) {
      console.error(error);
      toast({ variant: 'destructive', title: 'Error', description: 'Could not save your experiment design.' });
    } finally {
      setIsSubmitting(false);
    }
  }

  async function onReflectSubmit(data: ExperimentFormValues) {
    if (!user || !currentExperiment) return;
    setIsSubmitting(true);
    try {
        const docRef = doc(firestore, 'users', user.uid, 'behavioralExperiments', currentExperiment.id);
        await updateDoc(docRef, {
            outcome: data.outcome,
            whatILearned: data.whatILearned,
        });
        toast({ title: 'Reflection Saved', description: 'Great job completing your experiment.' });
        resetForm();
    } catch (error) {
         console.error(error);
         toast({ variant: 'destructive', title: 'Error', description: 'Could not save your reflection.' });
    } finally {
        setIsSubmitting(false);
    }
  }
  
  const resetForm = () => {
    form.reset();
    setCurrentExperiment(null);
    setStep(1);
  }

  if (step === 2 && currentExperiment) {
    return (
        <Card>
            <Form {...form}>
                 <form onSubmit={form.handleSubmit(onReflectSubmit)} className="space-y-6">
                    <CardHeader>
                        <CardTitle className="font-headline text-2xl">Step 2: Reflect on Your Experiment</CardTitle>
                        <CardDescription>You've run the experiment. What happened? What did you learn?</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                         <Card className="bg-muted/30">
                            <CardHeader>
                                <CardTitle className="text-lg font-semibold">Your Experiment Plan</CardTitle>
                            </CardHeader>
                            <CardContent className="text-sm space-y-2">
                                <p><strong className="text-primary">Belief:</strong> {currentExperiment.belief}</p>
                                <p><strong className="text-primary">Prediction:</strong> {currentExperiment.prediction}</p>
                                <p><strong className="text-primary">Experiment:</strong> {currentExperiment.experiment}</p>
                            </CardContent>
                        </Card>
                        <FormField control={form.control} name="outcome" render={({ field }) => (
                            <FormItem><FormLabel className="text-base">What was the actual outcome?</FormLabel><FormControl><Textarea placeholder="Describe exactly what happened when you did the experiment." {...field} /></FormControl><FormMessage /></FormItem>
                        )} />
                        <FormField control={form.control} name="whatILearned" render={({ field }) => (
                            <FormItem><FormLabel className="text-base">What did you learn?</FormLabel><FormControl><Textarea placeholder="Compare the outcome to your prediction. What does this tell you about your original belief?" {...field} /></FormControl><FormMessage /></FormItem>
                        )} />
                    </CardContent>
                    <CardFooter className="gap-4">
                        <Button type="submit" disabled={isSubmitting}>
                            {isSubmitting ? <Loader className="mr-2 h-4 w-4 animate-spin"/> : <CheckCircle className="mr-2 h-4 w-4" />} Save Reflection
                        </Button>
                        <Button variant="ghost" onClick={resetForm}>Start a New Experiment</Button>
                    </CardFooter>
                 </form>
            </Form>
        </Card>
    )
  }

  return (
    <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
        <Card>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onDesignSubmit)} className="space-y-6">
                    <CardHeader>
                        <CardTitle className="font-headline text-2xl">Step 1: Design Your Experiment</CardTitle>
                        <CardDescription>
                            Treat your anxious thoughts like a scientist. Design an experiment to test if they're really true.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                         <Alert>
                            <FlaskConical className="h-4 w-4" />
                            <AlertTitle>What is a Behavioral Experiment?</AlertTitle>
                            <AlertDescription>
                                It's a way to test out your beliefs in the real world. For example, if you believe "If I speak up in a meeting, everyone will think I'm stupid," an experiment could be to share one idea in your next meeting and observe what actually happens.
                            </AlertDescription>
                        </Alert>
                        <FormField control={form.control} name="belief" render={({ field }) => (
                            <FormItem><FormLabel className="text-base">What's the belief or anxious thought you want to test?</FormLabel><FormControl><Textarea placeholder="e.g., If I go to the party alone, I'll stand in the corner all night and no one will talk to me." {...field} /></FormControl><FormMessage /></FormItem>
                        )} />
                        <FormField control={form.control} name="prediction" render={({ field }) => (
                            <FormItem><FormLabel className="text-base">What's your specific, testable prediction?</FormLabel><FormControl><Textarea placeholder="e.g., I predict that I will not have a single conversation that lasts longer than one minute." {...field} /></FormControl><FormMessage /></FormItem>
                        )} />
                        <FormField control={form.control} name="experiment" render={({ field }) => (
                            <FormItem><FormLabel className="text-base">How can you test this? (The Experiment)</FormLabel><FormControl><Textarea placeholder="e.g., I will go to the party by myself this Friday. I will stay for at least one hour. My goal is simply to observe what happens." {...field} /></FormControl><FormMessage /></FormItem>
                        )} />
                    </CardContent>
                    <CardFooter>
                        <Button type="submit" disabled={isSubmitting}>
                            {isSubmitting ? <Loader className="mr-2 h-4 w-4 animate-spin"/> : <Beaker className="mr-2 h-4 w-4" />} Design My Experiment
                        </Button>
                    </CardFooter>
                </form>
            </Form>
        </Card>
        </div>
         <div className="md:col-span-1">
            <Card>
                <CardHeader>
                    <CardTitle>Past Experiments</CardTitle>
                    <CardDescription>Review what you've learned.</CardDescription>
                </CardHeader>
                <CardContent>
                    {loading && <Loader className="animate-spin mx-auto" />}
                    <ScrollArea className="h-96">
                        <div className="space-y-4">
                        {!loading && pastExperiments.length === 0 && <p className="text-sm text-muted-foreground">No experiments logged yet.</p>}
                        {pastExperiments.map(exp => (
                            <button key={exp.id} onClick={() => {
                                form.reset({
                                    belief: exp.belief,
                                    prediction: exp.prediction,
                                    experiment: exp.experiment,
                                    outcome: exp.outcome,
                                    whatILearned: exp.whatILearned,
                                });
                                setStep(exp.outcome ? 2 : 1); // Go to reflection if outcome is filled
                                setCurrentExperiment(exp);
                            }} className="w-full text-left p-3 rounded-md border hover:bg-muted/50">
                                <p className="font-semibold text-sm truncate">{exp.belief}</p>
                                <p className="text-xs text-muted-foreground mt-1">
                                    {exp.createdAt instanceof Date ? format(exp.createdAt, 'MMM d, yyyy') : format((exp.createdAt as any).toDate(), 'MMM d, yyyy')}
                                </p>
                                {exp.outcome && <CheckCircle className="size-4 text-green-500 mt-2" />}
                            </button>
                        ))}
                        </div>
                    </ScrollArea>
                </CardContent>
            </Card>
        </div>
    </div>
  );
}
