'use client';

import React, { useState, useTransition, useMemo } from 'react';
import Link from 'next/link';
import { ArrowRight, Bot, Pen, Wind, Loader, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { MoodChart } from './mood-chart';
import { ChatInterface } from '@/app/chatbot/chat-interface';
import { getJournalAnalysis } from '@/app/chatbot/actions';
import type { AnalyzeJournalEntryOutput } from '@/ai/flows/analyze-journal-entry';
import { useToast } from '@/hooks/use-toast';
import { Badge } from './ui/badge';
import { Alert, AlertDescription, AlertTitle } from './ui/alert';
import { useAuth } from '@/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollection } from 'react-firebase-hooks/firestore';
import { collection, query, orderBy, limit, where, Timestamp, addDoc, serverTimestamp } from 'firebase/firestore';
import { useFirestore } from '@/firebase/provider';
import type { MoodLog } from '@/lib/types';
import { subDays, format } from 'date-fns';

const moodIcons = [
  { mood: 'Happy', icon: '😊' },
  { mood: 'Calm', icon: '😌' },
  { mood: 'Okay', icon: '😐' },
  { mood: 'Sad', icon: '😢' },
  { mood: 'Anxious', icon: '😟' },
];

export function DashboardClient() {
  const [isJournalPending, startJournalTransition] = useTransition();
  const [journalEntry, setJournalEntry] = useState('');
  const [journalAnalysis, setJournalAnalysis] = useState<AnalyzeJournalEntryOutput | null>(null);
  const { toast } = useToast();
  const auth = useAuth();
  const [user] = useAuthState(auth);
  const firestore = useFirestore();

  const moodLogQuery = useMemo(() => {
    if (!user || !firestore) return null;
    const sevenDaysAgo = subDays(new Date(), 7);
    return query(
        collection(firestore, 'users', user.uid, 'moodLogs'),
        where('timestamp', '>=', sevenDaysAgo),
        orderBy('timestamp', 'desc')
    );
  }, [user, firestore]);

  const [moodLogsSnapshot, loadingMoodLogs] = useCollection(moodLogQuery);

  const moodChartData = useMemo(() => {
    if (!moodLogsSnapshot) {
        const last7Days = Array.from({ length: 7 }).map((_, i) => {
            const d = subDays(new Date(), i);
            return { day: format(d, 'EEE'), mood: 0, date: format(d, 'yyyy-MM-dd') };
        }).reverse();
        return last7Days;
    }

    const moodMapping: { [key: string]: number } = {
        'Anxious': 1,
        'Sadness': 2,
        'Contentment': 3,
        'Joy': 4,
        'Surprise': 4,
        'Anger': 1,
        'Disgust': 1,
    };

    const aggregatedData: { [key: string]: { total: number; count: number } } = {};

    moodLogsSnapshot.docs.forEach(doc => {
        const log = doc.data() as MoodLog;
        if (log.timestamp) {
             const date = (log.timestamp as Timestamp).toDate();
             const day = format(date, 'yyyy-MM-dd');
             const moodValue = moodMapping[log.coreEmotion] || (log.intensity / 25) + 1; // fallback
             if (!aggregatedData[day]) {
                 aggregatedData[day] = { total: 0, count: 0 };
             }
             aggregatedData[day].total += moodValue;
             aggregatedData[day].count += 1;
        }
    });

    const last7Days = Array.from({ length: 7 }).map((_, i) => {
        const d = subDays(new Date(), 6 - i);
        const dayKey = format(d, 'yyyy-MM-dd');
        const dayData = aggregatedData[dayKey];
        const avgMood = dayData ? Math.round(dayData.total / dayData.count) : 0;
        return { day: format(d, 'EEE'), mood: avgMood, date: dayKey };
    });

    return last7Days;
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
        setJournalEntry(''); // Clear input after successful save

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
          <CardTitle className="font-headline">Welcome back!</CardTitle>
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

      <Card className="col-span-1 md:col-span-2 xl:col-span-1 flex flex-col h-[500px]">
        <CardHeader>
          <CardTitle className="font-headline">AI Coach</CardTitle>
          <CardDescription>Talk through your thoughts with your AI companion.</CardDescription>
        </CardHeader>
        <CardContent className="flex-grow p-0">
            <ChatInterface className="h-full" />
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
                <span>Analyzing your entry...</span>
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
                "Save Entry & Analyze"
              )}
            </Button>
             <Button asChild variant="ghost">
              <Link href="/track/journal/freeform">
                Go to Journal <ArrowRight className="ml-2 size-4" />
              </Link>
            </Button>
        </CardFooter>
      </Card>

    </div>
  );
}
