
'use client';

import React, { useState, useTransition, useMemo, useEffect } from 'react';
import Link from 'next/link';
import type { User } from 'firebase/auth';
import { ArrowRight, Pen, Wind, Loader, Sparkles, AlertCircle, MessageSquare, BrainCircuit, Calendar, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { MoodChart } from './mood-chart';
import { triageIssue } from '@/app/dashboard/actions';
import type { TriageUserIssueOutput } from '@/services/flows/triage-user-issue';
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

interface DashboardAuthenticatedProps {
    user: User;
}

export function DashboardAuthenticated({ user }: DashboardAuthenticatedProps) {
  const [isTriagePending, startTriageTransition] = useTransition();
  const [issue, setIssue] = useState('');
  const [greeting, setGreeting] = useState('');
  const [triageResult, setTriageResult] = useState<TriageUserIssueOutput | null>(null);
  const { toast } = useToast();
  const firestore = useFirestore();

  useEffect(() => {
    const hours = new Date().getHours();
    if (hours < 12) {
      setGreeting('Good morning');
    } else if (hours < 18) {
      setGreeting('Good afternoon');
    } else {
      setGreeting('Good evening');
    }
  }, []);

  const {
    triggers,
    isLoading: isLoadingTriggers,
    error: triggersError,
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
      limit(5)
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

  const handleTriageSubmit = () => {
    if (!issue.trim() || !user) {
        toast({
            variant: "destructive",
            title: "Error",
            description: "Please describe what's on your mind."
        })
        return;
    }
    setTriageResult(null);
    startTriageTransition(async () => {
      const result = await triageIssue({ issue });
      if (result.success && result.data) {
        setTriageResult(result.data);
      } else {
        toast({
          variant: "destructive",
          title: "Analysis Failed",
          description: result.error || "Could not get a recommendation.",
        });
      }
    });
  };


  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 lg:gap-6">
       <Card className="col-span-1 md:col-span-2 xl:col-span-4 bg-transparent border-none shadow-none">
        <CardHeader className="p-0">
          <CardTitle className="font-headline text-4xl">{greeting}, {user.displayName?.split(' ')[0] || 'friend'}.</CardTitle>
          <CardDescription>How can we support you today?</CardDescription>
        </CardHeader>
      </Card>
      
      <Card className="col-span-1 md:col-span-2 xl:col-span-2 flex flex-col">
        <CardHeader>
          <CardTitle className="font-headline">Triage with AI</CardTitle>
          <CardDescription>Tell me what's bothering you, and I'll suggest a tool that might help.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 flex-grow">
            <Textarea 
              placeholder="e.g., 'I keep thinking I'm going to fail my big presentation.' or 'I'm feeling really anxious and can't calm down.'"
              className="min-h-24"
              value={issue}
              onChange={(e) => setIssue(e.target.value)}
              disabled={isTriagePending}
            />
            {isTriagePending && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Loader className="size-4 animate-spin" />
                <span>Finding the right tool...</span>
              </div>
            )}
            {triageResult && (
              <div className="space-y-4 rounded-md border bg-muted/20 p-4">
                 <Alert>
                     <Sparkles className="size-5" />
                    <AlertTitle className="font-headline">AI Recommendation</AlertTitle>
                    <AlertDescription>
                       {triageResult.reason}
                    </AlertDescription>
                </Alert>
                <Button asChild size="sm">
                  <Link href={triageResult.toolHref}>
                    Go to {triageResult.toolName}
                    <ArrowRight className="ml-2 size-4" />
                  </Link>
                </Button>
              </div>
            )}
        </CardContent>
        <CardFooter className="justify-start">
            <Button onClick={handleTriageSubmit} disabled={!issue.trim() || isTriagePending}>
              {isTriagePending ? 'Analyzing...' : 'Get Suggestion'}
            </Button>
        </CardFooter>
      </Card>

      <Card className="col-span-1 flex flex-col">
        <CardHeader>
          <CardTitle className="font-headline">Quick Actions</CardTitle>
          <CardDescription>Your most-used tools.</CardDescription>
        </CardHeader>
        <CardContent className="flex-grow">
          <div className="flex flex-col gap-4">
             <Button asChild variant="outline" size="lg" className="justify-start gap-4">
              <Link href="/chatbot">
                <MessageSquare className="size-5 text-primary" />
                <span>Chat with AI Coach</span>
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="justify-start gap-4">
              <Link href="/track/mood">
                <Wind className="size-5 text-primary" />
                <span>Check-in Mood</span>
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="justify-start gap-4">
              <Link href="/track/journal/freeform">
                <Pen className="size-5 text-primary" />
                <span>Write in Journal</span>
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

      <Card className="col-span-1 md:col-span-2 lg:col-span-3 xl:col-span-1">
        <CardHeader>
          <CardTitle className="font-headline">Mood Patterns</CardTitle>
          <CardDescription>Your mood trends over the last week.</CardDescription>
        </CardHeader>
        <CardContent>
          <MoodChart data={moodChartData} loading={loadingMoodLogs} />
        </CardContent>
      </Card>

      <Card className="col-span-1 md:col-span-2 xl:col-span-2">
        <CardHeader>
          <CardTitle className="font-headline">Insights</CardTitle>
          <CardDescription>Discover patterns in your well-being.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
            {isLoadingTriggers && (
                <div className="flex items-center gap-2 text-sm text-muted-foreground p-4 justify-center">
                    <Loader className="size-4 animate-spin" />
                    <span>Analyzing your mood logs...</span>
                </div>
            )}
            {triggersError && (
                 <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Insight Status</AlertTitle>
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
             {triggers && triggers.length === 0 && !isLoadingTriggers && !triggersError && (
                 <p className="text-sm text-muted-foreground text-center p-4">Not enough data to identify triggers. Keep logging your mood to see insights here.</p>
            )}
        </CardContent>
      </Card>
      
      <Card className="col-span-1 md:col-span-2 lg:col-span-3 xl:col-span-2">
        <CardHeader>
            <CardTitle className="font-headline">Recent Journal Entries</CardTitle>
            <CardDescription>Review and reflect on your past entries.</CardDescription>
        </CardHeader>
        <CardContent>
            {loadingJournalEntries && <div className="flex justify-center p-4"><Loader className="mx-auto animate-spin" /></div>}
            {!loadingJournalEntries && journalEntriesSnapshot?.empty && (
              <p className="text-sm text-muted-foreground p-4 text-center">You have no journal entries yet.</p>
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
                                    setIssue(entry.content);
                                    setTriageResult(null);
                                    window.scrollTo({top: 0, behavior: 'smooth'});
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
