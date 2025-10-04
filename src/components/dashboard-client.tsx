'use client';

import React, { useState, useTransition } from 'react';
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

  const handleJournalSubmit = () => {
    setJournalAnalysis(null);
    startJournalTransition(async () => {
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
              <Button key={mood} variant="ghost" className="h-16 w-16 flex-col gap-1 text-2xl" aria-label={mood}>
                {icon}
                <span className="text-xs font-normal">{mood}</span>
              </Button>
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
          <MoodChart />
        </CardContent>
      </Card>

      <Card className="col-span-1 flex flex-col">
        <CardHeader>
          <CardTitle className="font-headline">Quick Tools</CardTitle>
          <CardDescription>Access powerful tools for immediate relief.</CardDescription>
        </CardHeader>
        <CardContent className="flex-grow">
          <div className="flex flex-col gap-4">
            <Button variant="outline" size="lg" className="justify-start gap-4">
              <Wind className="size-5 text-primary" />
              <span>Breathing Exercise</span>
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
        <CardFooter>
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
        </CardFooter>
      </Card>

    </div>
  );
}
