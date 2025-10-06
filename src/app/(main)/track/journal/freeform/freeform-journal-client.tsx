
'use client';

import { useState, useTransition } from 'react';
import { useForm, zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useAuth, useFirestore } from '@/lib/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { useToast } from '@/hooks/use-toast';
import { Loader, Sparkles, Save, ArrowRight } from 'lucide-react';
import { getJournalAnalysis } from '@/services/actions/analyze-journal-entry';
import type { AnalyzeJournalEntryOutput } from '@/services/flows/analyze-journal-entry';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { FirestorePermissionError } from '@/lib/firebase/errors';
import { errorEmitter } from '@/lib/firebase/error-emitter';
import { useStreak } from '@/hooks/use-streak';

const formSchema = z.object({
  content: z.string().min(20, { message: "Please write a bit more to get a helpful analysis." }),
});

type FormValues = z.infer<typeof formSchema>;

export function FreeformJournalClient() {
  const [analysisResult, setAnalysisResult] = useState<AnalyzeJournalEntryOutput | null>(null);
  const [isAnalysisPending, startAnalysisTransition] = useTransition();
  const [isSavePending, setIsSavePending] = useState(false);

  const auth = useAuth();
  const [user] = useAuthState(auth);
  const firestore = useFirestore();
  const { toast } = useToast();
  const { updateStreak } = useStreak('journaling');


  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      content: '',
    },
  });

  const handleAnalyze = (data: FormValues) => {
    setAnalysisResult(null);
    startAnalysisTransition(async () => {
      const result = await getJournalAnalysis({ journalEntry: data.content });
      if (result.success && result.data) {
        setAnalysisResult(result.data);
      } else {
        toast({
          variant: "destructive",
          title: "Analysis Failed",
          description: result.error || "Could not get analysis from the AI coach.",
        });
      }
    });
  };

  const handleSave = async (data: FormValues) => {
    if (!user) {
      toast({ variant: 'destructive', title: 'Not signed in' });
      return;
    }
    setIsSavePending(true);

    const journalData = {
      userId: user.uid,
      content: data.content,
      analysis: analysisResult?.analysis || '',
      keyThemes: analysisResult?.keyThemes || [],
      suggestedToolName: analysisResult?.suggestedTool?.name || '',
      suggestedToolHref: analysisResult?.suggestedTool?.href || '',
      timestamp: serverTimestamp(),
    };
    
    const journalCollection = collection(firestore, 'users', user.uid, 'journalEntries');

    addDoc(journalCollection, journalData).then(async () => {
        await updateStreak();
        toast({
          title: "Journal Entry Saved",
          description: "Your reflections have been saved successfully.",
        });
        form.reset();
        setAnalysisResult(null);
    }).catch(err => {
        const permissionError = new FirestorePermissionError({
            path: journalCollection.path,
            operation: 'create',
            requestResourceData: journalData,
        });
        errorEmitter.emit('permission-error', permissionError);
    }).finally(() => {
        setIsSavePending(false);
    });
  };
  
  const isPending = isAnalysisPending || isSavePending;

  return (
    <div className="space-y-6">
      <form onSubmit={form.handleSubmit(handleAnalyze)} className="space-y-4">
        <Textarea
          placeholder="What's on your mind? Write freely..."
          className="min-h-[250px]"
          disabled={isPending}
          {...form.register('content')}
        />
        {form.formState.errors.content && (
            <p className="text-sm font-medium text-destructive">{form.formState.errors.content.message}</p>
        )}

        <div className="flex flex-wrap gap-4">
             <Button type="submit" disabled={isPending}>
              {isAnalysisPending ? (
                <>
                  <Loader className="mr-2 h-4 w-4 animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 h-4 w-4" />
                  Analyze with AI
                </>
              )}
            </Button>
             {analysisResult && (
                <Button onClick={() => handleSave(form.getValues())} disabled={isPending}>
                    {isSavePending ? (
                        <Loader className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                        <Save className="mr-2 h-4 w-4" />
                    )}
                    Save Entry
                </Button>
            )}
        </div>
      </form>

      {analysisResult && (
        <div className="mt-6 space-y-6 animate-in fade-in-50 duration-500">
            <Alert>
                <Sparkles className="size-5" />
                <AlertTitle className="font-headline">AI Coach Feedback</AlertTitle>
                <AlertDescription>
                    Here are some gentle reflections on your entry.
                </AlertDescription>
            </Alert>
            <div className="p-6 rounded-lg border bg-muted/20 space-y-6">
                <div>
                    <h3 className="font-semibold mb-2">Key Themes</h3>
                     <div className="flex flex-wrap gap-2">
                        {analysisResult.keyThemes.map(theme => (
                            <Badge key={theme} variant="secondary">{theme}</Badge>
                        ))}
                    </div>
                </div>
                <div>
                    <h3 className="font-semibold mb-2">Analysis</h3>
                    <p className="text-sm text-foreground/80">{analysisResult.analysis}</p>
                </div>
                {analysisResult.suggestedTool && (
                     <div>
                        <h3 className="font-semibold mb-2">Suggested Tool</h3>
                        <div className="p-4 bg-background rounded-md border border-primary/20">
                            <h4 className="font-medium">{analysisResult.suggestedTool.name}</h4>
                            <p className="text-sm text-muted-foreground mt-1 mb-3">{analysisResult.suggestedTool.reason}</p>
                            <Button asChild variant="link" className="p-0 h-auto">
                                <Link href={analysisResult.suggestedTool.href}>
                                    Try this tool <ArrowRight className="ml-2 h-4 w-4" />
                                </Link>
                            </Button>
                        </div>
                    </div>
                )}
            </div>
        </div>
      )}
    </div>
  );
}

    