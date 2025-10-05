
'use client';

import React, { useState, useTransition, useMemo } from 'react';
import Link from 'next/link';
import type { User } from 'firebase/auth';
import { ArrowRight, Pen, Wind, Loader, Sparkles, AlertCircle, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { MoodChart } from './mood-chart';
import { getJournalAnalysis } from '@/app/chatbot/actions';
import type { AnalyzeJournalEntryOutput } from '@/ai/flows/analyze-journal-entry';
import { useToast } from '@/hooks/use-toast';
import { Badge } from './ui/badge';
import { Alert, AlertDescription, AlertTitle } from './ui/alert';
import { useCollection } from 'react-firebase-hooks/firestore';
import { collection, query, orderBy, where, Timestamp, addDoc, serverTimestamp, limit } from 'firebase/firestore';
import { useFirestore, useMemoFirebase } from '@/firebase/provider';
import type { MoodLog, JournalEntry } from '@/lib/types';
import { subDays, format } from 'date-fns';
import { useMoodTriggers } from '@/hooks/use-mood-triggers';
import { ScrollArea } from './ui/scroll-area';

const moodIcons = [
  { mood: 'Happy', icon: '😊' },
  { mood: 'Calm', icon: '😌' },
  { mood: 'Okay', icon: '😐' },
  { mood: 'Sad', icon: '😢' },
  { mood: 'Anxious', icon: '😟' },
];

interface DashboardAuthenticatedProps {
    user: User;
}

export function DashboardAuthenticated({ user }: DashboardAuthenticatedProps) {
  const [isJournalPending, startJournalTransition] = useTransition();
  const [journalEntry, setJournalEntry] = useState('');
  const [journalAnalysis, setJournalAnalysis] = useState<AnalyzeJournalEntryOutput | null>(null);
  const { toast } = useToast();
  const firestore = useFirestore();

  const {
    triggers,
    isLoading: isLoadingTriggers,
    error: triggersError,
    findTriggers,
  } = useMoodTriggers(user.uid);


  const moodLogQuery = useMemoFirebase(() => {
    if (!user || !firestore) return null;
    const sevenDaysAgo = subDays(new Date(), 7);
    return query(
        collection(firestore, 'users', user.uid, 'moodLogs'),
        where('timestamp', '>=', sevenDaysAgo),
        orderBy('timestamp', 'desc')
    );
  }, [user, firestore]);
  
  const journalQuery = useMemoFirebase(() => {
    if (!user || !firestore) return null;
    return query(
      collection(firestore, 'users', user.uid, 'journalEntries'),
      orderBy('timestamp', 'desc'),
      limit(10)
    );
  }, [user, firestore]);


  const [moodLogsSnapshot, loadingMoodLogs] = useCollection(moodLogQuery);
  const [journalEntriesSnapshot, loadingJournalEntries] = useCollection(journalQuery);

  const moodChartData = useMemo(() => {
    const last7Days = Array.from({ length: 7 }).map((_, i) => {
        const d = subDays(new Date(), 6 - i);
        return { day: format(d, 'EEE'), mood: 0, date: format(d, 'yyyy-MM-dd') };
    });

    if (!moodLogsSnapshot) {
        return last7Days;
    }

    const moodMapping: { [key: string]: number } = {
        'Joy': 5,
        'Contentment': 4,
        'Surprise': 3,
        'Sadness': 2,
        'Fear': 1,
        'Anger': 1,
        'Disgust': 1,
    };
    
    const aggregatedData: { [key: string]: { total: number; count: number } } = {};

    moodLogsSnapshot.docs.forEach(doc => {
        const log = doc.data() as MoodLog;
        if (log.timestamp) {
             const date = (log.timestamp as Timestamp).toDate();
             const day = format(date, 'yyyy-MM-dd');
             const moodValue = moodMapping[log.coreEmotion] || (log.intensity / 25);
             if (!aggregatedData[day]) {
                 aggregatedData[day] = { total: 0, count: 0 };
             }
             aggregatedData[day].total += moodValue;
             aggregatedData[day].count += 1;
        }
    });

    return last7Days.map(day => {
        const dayData = aggregatedData[day.date];
        if (dayData) {
            return { ...day, mood: Math.round(dayData.total / dayData.count) };
        }
        return day;
    });

  }, [moodLogsSnapshot]);

  const handleJournalSubmit = () => {
    if (!journalEntry.trim() || !user) {
        toast({
            variant: "destructive",
            title: "Error",
            description: "Journal entry cannot be empty."
        })
        return;
    }
    setJournalAnalysis(null);
    startJournalTransition(async () => {
      const analysisResult = await getJournalAnalysis(journalEntry);
      
      try {
        await addDoc(collection(firestore, 'users', user.uid, 'journalEntries'), {
            userId: user.uid,
            content: journalEntry,
            timestamp: serverTimestamp(),
            ...(analysisResult.success && analysisResult.data && { 
                analysis: analysisResult.data.analysis,
                keyThemes: analysisResult.data.keyThemes,
                suggestedToolName: analysisResult.data.suggestedTool?.name,
                suggestedToolHref: analysisResult.data.suggestedTool?.href,
             })
        });

        if (analysisResult.success && analysisResult.data) {
            setJournalAnalysis(analysisResult.data);
             toast({
                title: "Entry Saved & Analyzed",
                description: "Your journal entry has been saved and analyzed.",
            });
        } else {
            toast({
                title: "Entry Saved",
                description: "Your journal entry has been saved, but AI analysis failed.",
            });
        }
        // Do not clear input here, user might want to see the analysis for the text they wrote
      } catch (saveError) {
          console.error("Error saving journal entry:", saveError)
          toast({
              variant: "destructive",
              title: "Save Failed",
              description: "Could not save your journal entry.",
          });
      }
    });
  };


  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 lg:gap-6">
      <Card className="col-span-1 md:col-span-2">
        <CardHeader>
          <CardTitle className="font-headline">Welcome back, {user.displayName?.split(' ')[0] || 'friend'}!</CardTitle>
          <CardDescription>How are you feeling today?</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex justify-around rounded-lg bg-muted/50 p-4">
             {moodIcons.map(({ mood, icon }) => (
              <Link href="/track/mood" key={mood} legacyBehavior>
                <a className="h-16 w-16 flex-col gap-1 text-2xl text-center no-underline">
                  <div className="flex items-center justify-center rounded-full h-12 w-12 mx-auto hover:bg-background transition-colors">
                    {icon}
                  </div>
                  <span className="text-xs font-normal text-muted-foreground">{mood}</span>
                </a>
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="col-span-1 md:col-span-2">
        <CardHeader>
          <CardTitle className="font-headline">Mood Patterns</CardTitle>
          <CardDescription>Your mood trends over the last week.</CardDescription>
        </CardHeader>
        <CardContent>
          <MoodChart data={moodChartData} loading={loadingMoodLogs} />
        </CardContent>
      </Card>
      
      <Card className="col-span-1 md:col-span-2 xl:col-span-1">
        <CardHeader>
          <CardTitle className="font-headline">Insights</CardTitle>
          <CardDescription>Discover patterns in your well-being.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
            {isLoadingTriggers && (
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Loader className="size-4 animate-spin" />
                    <span>Analyzing your mood logs...</span>
                </div>
            )}
            {triggersError && (
                 <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Analysis Failed</AlertTitle>
                    <AlertDescription>
                       {triggersError}
                    </AlertDescription>
                </Alert>
            )}
            {triggers && triggers.length > 0 && (
                <div className="space-y-3">
                    {triggers.map((item, index) => (
                        <div key={index} className="p-3 border rounded-md bg-muted/30">
                            <h4 className="font-semibold text-primary">{item.trigger}</h4>
                            <p className="text-sm text-muted-foreground mt-1">{item.pattern}</p>
                            <div className="flex flex-wrap gap-2 mt-2">
                                {item.relatedEmotions.map(emotion => (
                                    <Badge key={emotion} variant="secondary">{emotion}</Badge>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            )}
             {triggers && triggers.length === 0 && !isLoadingTriggers && (
                <p className="text-sm text-muted-foreground">Not enough data to identify triggers. Keep logging your mood to see insights here.</p>
            )}

            {!triggers && !isLoadingTriggers && !triggersError && (
                 <p className="text-sm text-muted-foreground">Click the button to analyze your recent mood logs and identify potential triggers.</p>
            )}


        </CardContent>
        <CardFooter>
             <Button onClick={findTriggers} disabled={isLoadingTriggers}>
                {isLoadingTriggers ? <Loader className="mr-2 animate-spin" /> : <Sparkles className="mr-2" />}
                Find My Triggers
            </Button>
        </CardFooter>
      </Card>

      <Card className="col-span-1 md:col-span-2 xl:col-span-1 flex flex-col h-[500px]">
        <CardHeader>
          <CardTitle className="font-headline">AI Coach</CardTitle>
          <CardDescription>Talk through your thoughts with your AI companion.</CardDescription>
        </CardHeader>
        <CardContent className="flex-grow flex items-center justify-center p-0">
            <div className="text-center text-muted-foreground">
                <MessageSquare className="mx-auto size-12" />
                <p className="mt-4">Full chat experience available.</p>
                <Button asChild variant="link">
                    <Link href="/chatbot">Go to AI Coach <ArrowRight className="ml-2 size-4" /></Link>
                </Button>
            </div>
        </CardContent>
      </Card>
      
      <Card className="col-span-1 md:col-span-2">
        <CardHeader>
          <CardTitle className="font-headline">Daily Journal</CardTitle>
          <CardDescription>A space for your thoughts, reflections, and feelings.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
            <Textarea 
              placeholder="What's on your mind today?" 
              className="min-h-32"
              value={journalEntry}
              onChange={(e) => setJournalEntry(e.target.value)}
              disabled={isJournalPending}
            />
            {isJournalPending && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Loader className="size-4 animate-spin" />
                <span>Saving & Analyzing...</span>
              </div>
            )}
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
        <CardFooter className="justify-between">
            <Button onClick={handleJournalSubmit} disabled={!journalEntry.trim() || isJournalPending}>
              {isJournalPending ? (
                <>
                  <Loader className="mr-2 size-4 animate-spin" />
                  Saving...
                </>
              ) : (
                "Save & Analyze"
              )}
            </Button>
             <Button asChild variant="ghost">
              <Link href="/track/journal/freeform">
                Go to Journal <ArrowRight className="ml-2 size-4" />
              </Link>
            </Button>
        </CardFooter>
      </Card>
      
       <Card className="col-span-1 flex flex-col">
        <CardHeader>
          <CardTitle className="font-headline">Quick Tools</CardTitle>
          <CardDescription>Access powerful tools for immediate relief.</CardDescription>
        </CardHeader>
        <CardContent className="flex-grow">
          <div className="flex flex-col gap-4">
            <Button asChild variant="outline" size="lg" className="justify-start gap-4">
              <Link href="/tools/relaxation/box-breathing">
                <Wind className="size-5 text-primary" />
                <span>Breathing Exercise</span>
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="justify-start gap-4">
              <Link href="/tools/thought-record">
                <Pen className="size-5 text-primary" />
                <span>Thought Record</span>
              </Link>
            </Button>
          </div>
        </CardContent>
        <CardFooter>
          <Button asChild variant="ghost" className="w-full">
            <Link href="/tools">
              See all tools <ArrowRight className="ml-2 size-4" />
            </Link>
          </Button>
        </CardFooter>
      </Card>
      
      <Card className="col-span-1 md:col-span-2">
        <CardHeader>
            <CardTitle className="font-headline">Recent Journal Entries</CardTitle>
            <CardDescription>Review and reflect on your past entries.</CardDescription>
        </CardHeader>
        <CardContent>
            {loadingJournalEntries && <Loader className="mx-auto animate-spin" />}
            {!loadingJournalEntries && journalEntriesSnapshot?.empty && (
              <p className="text-sm text-muted-foreground">You have no journal entries yet.</p>
            )}
            <ScrollArea className="h-72">
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
  );
}
