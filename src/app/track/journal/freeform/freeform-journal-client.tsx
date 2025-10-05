
'use client';

import React, { useState, useTransition, useMemo } from 'react';
import Link from 'next/link';
import { ArrowRight, Loader, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { getJournalAnalysis } from '@/services/actions';
import type { AnalyzeJournalEntryOutput } from '@/services/flows/analyze-journal-entry';
import { useToast } from '@/hooks/use-toast';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { useAuth, useFirestore, useMemoFirebase } from '@/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollection } from 'react-firebase-hooks/firestore';
import { collection, query, orderBy, limit, addDoc, serverTimestamp } from 'firebase/firestore';
import type { JournalEntry } from '@/lib/types';
import { format } from 'date-fns';
import { ScrollArea } from '@/components/ui/scroll-area';
import { FirestorePermissionError } from '@/firebase/errors';
import { errorEmitter } from '@/firebase/error-emitter';

export function FreeformJournalClient() {
  const [isAnalysisPending, startAnalysisTransition] = useTransition();
  const [isSaving, setIsSaving] = useState(false);
  const [journalEntry, setJournalEntry] = useState('');
  const [journalAnalysis, setJournalAnalysis] = useState<AnalyzeJournalEntryOutput | null>(null);
  const { toast } = useToast();
  const auth = useAuth();
  const [user] = useAuthState(auth);
  const firestore = useFirestore();

  const journalQuery = useMemoFirebase(() => {
    if (!user || !firestore) return null;
    return query(
      collection(firestore, 'users', user.uid, 'journalEntries'),
      orderBy('timestamp', 'desc'),
      limit(10)
    );
  }, [user, firestore]);

  const [journalEntriesSnapshot, loadingJournalEntries] = useCollection(journalQuery);

  const handleAnalysisSubmit = () => {
    setJournalAnalysis(null);
    startAnalysisTransition(async () => {
      const result = await getJournalAnalysis(journalEntry);
      if (result.success && result.data) {
        setJournalAnalysis(result.data);
      } else {
        toast({
          variant: "destructive",
          title: "Analysis Failed",
          description: result.error || "Could not analyze the journal entry.",
        });
      }
    });
  };
  
  const handleSaveSubmit = async () => {
    if (!user || !journalEntry.trim()) {
        toast({
            variant: "destructive",
            title: "Error",
            description: "You must be signed in and have content to save an entry.",
        });
        return;
    }
    
    setIsSaving(true);
    const journalData = {
        userId: user.uid,
        content: journalEntry,
        timestamp: serverTimestamp(),
        ...(journalAnalysis && { 
            analysis: journalAnalysis.analysis,
            keyThemes: journalAnalysis.keyThemes,
            suggestedToolName: journalAnalysis.suggestedTool?.name,
            suggestedToolHref: journalAnalysis.suggestedTool?.href,
         })
    };
    const journalCollection = collection(firestore, 'users', user.uid, 'journalEntries');

    addDoc(journalCollection, journalData)
        .then(() => {
            toast({
                title: "Journal Entry Saved",
                description: "Your entry has been successfully saved.",
            });
            setJournalEntry('');
            setJournalAnalysis(null);
        })
        .catch(err => {
            const permissionError = new FirestorePermissionError({
                path: journalCollection.path,
                operation: 'create',
                requestResourceData: journalData,
            });
            errorEmitter.emit('permission-error', permissionError);
        })
        .finally(() => {
            setIsSaving(false);
        });
  };

  const isPending = isAnalysisPending || isSaving;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="md:col-span-2">
        <Card>
          <CardHeader>
            <CardTitle className="font-headline">What's on your mind?</CardTitle>
            <CardDescription>Use this space for your thoughts, reflections, and feelings. You can analyze it with AI before saving.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
              <Textarea 
                placeholder="Start writing..." 
                className="min-h-72"
                value={journalEntry}
                onChange={(e) => setJournalEntry(e.target.value)}
                disabled={isPending}
              />
              {journalAnalysis && (
                <div className="space-y-4 rounded-md border bg-muted/20 p-4">
                   <Alert>
                       <Sparkles className="size-5" />
                      <AlertTitle className="font-headline">AI Insights</AlertTitle>
                      <AlertDescription>
                          Here are some reflections on your journal entry.
                      </AlertDescription>
                  </Alert>
                  <p className="text-sm text-foreground/80">{journalAnalysis.analysis}</p>
                  <div className="flex flex-wrap gap-2">
                    {journalAnalysis.keyThemes.map(theme => (
                      <Badge key={theme} variant="secondary">{theme}</Badge>
                    ))}
                  </div>
                  {journalAnalysis.suggestedTool && (
                    <Card>
                      <CardHeader className="p-4">
                        <CardTitle className="text-base">You might find this helpful:</CardTitle>
                      </CardHeader>
                      <CardContent className="p-4 pt-0">
                          <p className="text-sm text-muted-foreground mb-2">{journalAnalysis.suggestedTool.reason}</p>
                          <Button asChild size="sm" variant="outline">
                            <Link href={journalAnalysis.suggestedTool.href}>
                              Go to {journalAnalysis.suggestedTool.name}
                              <ArrowRight className="ml-2 size-4" />
                            </Link>
                          </Button>
                      </CardContent>
                    </Card>
                  )}
                </div>
              )}
          </CardContent>
          <CardFooter className="gap-4">
              <Button onClick={handleAnalysisSubmit} disabled={!journalEntry.trim() || isPending}>
                {isAnalysisPending ? (
                  <>
                    <Loader className="mr-2 size-4 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-2 size-4" />
                    Analyze with AI
                  </>
                )}
              </Button>
              <Button onClick={handleSaveSubmit} disabled={!journalEntry.trim() || isPending}>
                 {isSaving ? (
                  <>
                    <Loader className="mr-2 size-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  "Save Entry"
                )}
              </Button>
          </CardFooter>
        </Card>
      </div>

      <div className="md:col-span-1">
        <Card>
          <CardHeader>
            <CardTitle className="font-headline">Recent Entries</CardTitle>
            <CardDescription>Your last 10 journal entries.</CardDescription>
          </CardHeader>
          <CardContent>
            {loadingJournalEntries && <Loader className="mx-auto animate-spin" />}
            {!loadingJournalEntries && journalEntriesSnapshot?.empty && (
              <p className="text-sm text-muted-foreground">You have no journal entries yet.</p>
            )}
            <ScrollArea className="h-96">
                <div className="space-y-4">
                    {journalEntriesSnapshot?.docs.map(doc => {
                        const entry = { id: doc.id, ...doc.data() } as JournalEntry;
                        return (
                            <button
                                key={entry.id}
                                className="block w-full text-left p-3 rounded-md border hover:bg-muted/50"
                                onClick={() => {
                                    setJournalEntry(entry.content);
                                    setJournalAnalysis(entry.analysis ? {
                                        analysis: entry.analysis,
                                        keyThemes: entry.keyThemes || [],
                                        suggestedTool: entry.suggestedToolName ? {
                                            name: entry.suggestedToolName,
                                            href: entry.suggestedToolHref || '#',
                                            reason: '',
                                        } : undefined,
                                    } : null);
                                }}
                            >
                                <p className="text-sm font-medium truncate">{entry.content}</p>
                                <p className="text-xs text-muted-foreground">
                                    {entry.timestamp && format(entry.timestamp.toDate(), 'MMM d, yyyy - h:mm a')}
                                </p>
                            </button>
                        );
                    })}
                </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

    