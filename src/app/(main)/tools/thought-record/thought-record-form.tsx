
'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import React, { useState, useTransition } from 'react';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { useAuth, useFirestore } from '@/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import { Loader, Sparkles, ArrowRight } from 'lucide-react';
import { cognitiveDistortions } from '@/lib/data/cbt-data';
import { Checkbox } from '@/components/ui/checkbox';
import { analyzeThoughtRecord } from '@/services/actions';
import type { AnalyzeThoughtRecordOutput } from '@/services/flows/analyze-thought-record';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { FirestorePermissionError } from '@/firebase/errors';
import { errorEmitter } from '@/firebase/error-emitter';

const formSchema = z.object({
  situation: z.string().min(10, { message: "Please describe the situation in a bit more detail." }),
  automaticThought: z.string().min(5, { message: "Please write down your automatic thought." }),
  cognitiveDistortions: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: 'Please select at least one cognitive distortion you notice.',
  }),
});

type FormValues = z.infer<typeof formSchema>;

export function ThoughtRecordForm() {
  const auth = useAuth();
  const [user] = useAuthState(auth);
  const firestore = useFirestore();
  const { toast } = useToast();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isAnalysisPending, startAnalysisTransition] = useTransition();
  const [analysisResult, setAnalysisResult] = useState<AnalyzeThoughtRecordOutput | null>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
        situation: '',
        automaticThought: '',
        cognitiveDistortions: [],
    },
  });

  async function handleAnalyze(data: FormValues) {
    setAnalysisResult(null);
    startAnalysisTransition(async () => {
      const result = await analyzeThoughtRecord(data);
      if (result.success && result.data) {
        setAnalysisResult(result.data);
      } else {
        toast({
          variant: "destructive",
          title: "Analysis Failed",
          description: result.error || "Could not analyze the thought record.",
        });
      }
    });
  }

  async function onSave(data: FormValues) {
    if (!user) {
      toast({ variant: 'destructive', title: 'Not signed in' });
      return;
    }
    setIsSubmitting(true);
    const thoughtRecordData = {
        ...data,
        userId: user.uid,
        alternativeThought: analysisResult?.alternativeThought || '',
        analysis: analysisResult?.analysis || '',
        timestamp: serverTimestamp(),
    };
    const thoughtRecordCollection = collection(firestore, 'users', user.uid, 'thoughtRecords');

    addDoc(thoughtRecordCollection, thoughtRecordData).then(() => {
      toast({ title: 'Thought Record Saved', description: 'Your entry has been saved.' });
      router.push('/dashboard');
    }).catch(err => {
        const permissionError = new FirestorePermissionError({
            path: thoughtRecordCollection.path,
            operation: 'create',
            requestResourceData: thoughtRecordData,
        });
        errorEmitter.emit('permission-error', permissionError);
    }).finally(() => {
        setIsSubmitting(false);
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleAnalyze)} className="space-y-8">
        <FormField
          control={form.control}
          name="situation"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg font-semibold">1. Situation</FormLabel>
              <FormControl>
                <Textarea placeholder="What happened? Where were you? Who was with you?" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="automaticThought"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg font-semibold">2. Automatic Thought(s)</FormLabel>
              <FormControl>
                <Textarea placeholder="What thoughts went through your mind? What did you say to yourself?" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="cognitiveDistortions"
          render={() => (
            <FormItem>
              <FormLabel className="text-lg font-semibold">3. Cognitive Distortions</FormLabel>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {cognitiveDistortions.map((item) => (
                  <FormField
                    key={item.name}
                    control={form.control}
                    name="cognitiveDistortions"
                    render={({ field }) => (
                      <FormItem key={item.name} className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 hover:bg-muted/50 transition-colors">
                        <FormControl>
                          <Checkbox
                            checked={field.value?.includes(item.name)}
                            onCheckedChange={(checked) => {
                              return checked
                                ? field.onChange([...(field.value || []), item.name])
                                : field.onChange(field.value?.filter((value) => value !== item.name));
                            }}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                            <FormLabel className="font-normal">{item.name}</FormLabel>
                            <p className="text-xs text-muted-foreground">{item.description}</p>
                        </div>
                      </FormItem>
                    )}
                  />
                ))}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={isAnalysisPending || isSubmitting}>
          {isAnalysisPending ? (
            <>
              <Loader className="mr-2 h-4 w-4 animate-spin" />
              Analyzing...
            </>
          ) : (
            <>
              <Sparkles className="mr-2 h-4 w-4" />
              Analyze My Thought
            </>
          )}
        </Button>
      </form>
      
      {analysisResult && (
        <div className="mt-8 space-y-6">
            <Alert>
                <Sparkles className="size-5" />
                <AlertTitle className="font-headline">AI Feedback</AlertTitle>
                <AlertDescription>
                    Here is some feedback on your thought record and a suggestion for a more balanced alternative.
                </AlertDescription>
            </Alert>
            <div className="p-6 rounded-lg border bg-muted/20 space-y-4">
                <h3 className="font-semibold">AI Analysis</h3>
                <p className="text-sm text-foreground/80">{analysisResult.analysis}</p>
                <h3 className="font-semibold">Suggested Alternative Thought</h3>
                <p className="text-sm text-foreground/80 font-medium p-4 bg-background rounded-md border border-primary/20">{analysisResult.alternativeThought}</p>
            </div>

            <Button onClick={() => onSave(form.getValues())} disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                "Save Thought Record"
              )}
            </Button>
        </div>
      )}
    </Form>
  );
}
