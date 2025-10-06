
'use client';

import type { User } from 'firebase/auth';
import Link from 'next/link';
import { ArrowRight, Loader, Sparkles, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { MoodChart } from './mood-chart';
import { Badge } from '../ui/badge';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';
import { ScrollArea } from '../ui/scroll-area';
import { StreaksCard } from './streaks-card';
import { useDashboardData } from '@/hooks/use-dashboard-data';
import { format } from 'date-fns';
import type { JournalEntry } from '@/lib/types';

interface DashboardAuthenticatedProps {
    user: User;
}

export function DashboardAuthenticated({ user }: DashboardAuthenticatedProps) {
  const {
    issue,
    setIssue,
    greeting,
    triageResult,
    isTriagePending,
    handleTriageSubmit,
    moodChartData,
    loadingMoodLogs,
    triggers,
    isLoadingTriggers,
    triggersError,
    journalEntries,
    loadingJournalEntries,
  } = useDashboardData(user);

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4 lg:gap-6">
       <div className="col-span-1 md:col-span-2 lg:col-span-4">
        <h1 className="font-headline text-4xl">{greeting}, {user.displayName?.split(' ')[0] || 'friend'}.</h1>
        <p className="text-lg text-muted-foreground mt-1">How can we support you today?</p>
      </div>
      
      <Card className="col-span-1 md:col-span-2 lg:col-span-2 flex flex-col bg-gradient-to-br from-primary/10 via-background to-background">
        <CardHeader>
          <CardTitle className="font-headline text-primary flex items-center gap-2"><Sparkles className="size-5" /> AI Triage</CardTitle>
          <CardDescription>Tell me what's on your mind, and I'll suggest a tool that might help.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 flex-grow">
            <Textarea 
              placeholder="e.g., 'I keep thinking I'm going to fail my big presentation.' or 'I'm feeling really anxious and can't calm down.'"
              className="min-h-24 bg-background/50"
              value={issue}
              onChange={(e) => setIssue(e.target.value)}
              disabled={isTriagePending}
            />
            {isTriagePending && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground animate-in fade-in">
                <Loader className="size-4 animate-spin" />
                <span>Finding the right tool...</span>
              </div>
            )}
            {triageResult && (
              <div className="space-y-3 rounded-lg border bg-background p-4 animate-in fade-in">
                 <p className="text-sm text-muted-foreground">{triageResult.reason}</p>
                <Button asChild size="sm" variant="default">
                  <Link href={triageResult.toolHref}>
                    Go to {triageResult.toolName}
                    <ArrowRight className="ml-2 size-4" />
                  </Link>
                </Button>
              </div>
            )}
        </CardContent>
        <CardFooter className="justify-start border-t pt-6">
            <Button onClick={handleTriageSubmit} disabled={!issue.trim() || isTriagePending}>
              {isTriagePending ? (
                <>
                  <Loader className="mr-2 h-4 w-4 animate-spin" />
                  Analyzing...
                </>
              ) : (
                'Get Suggestion'
              )}
            </Button>
        </CardFooter>
      </Card>
      
      <StreaksCard />

      <Card className="col-span-1 md:col-span-1 lg:col-span-1">
        <CardHeader>
          <CardTitle className="font-headline">Mood Patterns</CardTitle>
          <CardDescription>Your trends from the last week.</CardDescription>
        </CardHeader>
        <CardContent>
          <MoodChart data={moodChartData} loading={loadingMoodLogs} />
        </CardContent>
      </Card>

      <Card className="col-span-1 md:col-span-2 lg:col-span-2">
        <CardHeader>
          <CardTitle className="font-headline">Recent Insights</CardTitle>
          <CardDescription>Discover patterns in your well-being.</CardDescription>
        </CardHeader>
        <CardContent>
            {isLoadingTriggers && (
                <div className="flex items-center gap-2 text-sm text-muted-foreground p-4 justify-center">
                    <Loader className="size-4 animate-spin" />
                    <span>Analyzing your mood logs...</span>
                </div>
            )}
            {triggersError && !isLoadingTriggers && (
                 <Alert variant="default" className="bg-muted/50">
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
                        <div key={index} className="p-3 border rounded-md bg-muted/50">
                            <h4 className="font-semibold text-foreground">{item.trigger}</h4>
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
      
      <Card className="col-span-1 md:col-span-2 lg:col-span-2">
        <CardHeader>
            <CardTitle className="font-headline">Recent Journal Entries</CardTitle>
            <CardDescription>Review and reflect on your past entries.</CardDescription>
        </CardHeader>
        <CardContent>
            {loadingJournalEntries && <div className="flex justify-center p-4"><Loader className="mx-auto animate-spin" /></div>}
            {!loadingJournalEntries && journalEntries?.length === 0 && (
              <div className="text-center py-10 px-4 bg-muted/50 rounded-lg">
                <p className="text-sm text-muted-foreground">You have no journal entries yet.</p>
                 <Button asChild variant="link" className="mt-2">
                    <Link href="/track/journal/freeform">Write your first entry</Link>
                </Button>
              </div>
            )}
            <ScrollArea className="h-72">
                <div className="space-y-2">
                    {journalEntries?.map((entry: JournalEntry) => {
                        return (
                            <button
                                key={entry.id}
                                className="block w-full text-left p-3 rounded-md border hover:bg-accent transition-colors"
                                onClick={() => {
                                    setIssue(entry.content);
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
