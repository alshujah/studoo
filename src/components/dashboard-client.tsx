'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Bot, Pen, Wind } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { MoodChart } from './mood-chart';

const moodIcons = [
  { mood: 'Happy', icon: '😊' },
  { mood: 'Calm', icon: '😌' },
  { mood: 'Okay', icon: '😐' },
  { mood: 'Sad', icon: '😢' },
  { mood: 'Anxious', icon: '😟' },
];

export function DashboardClient() {
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

      <Card className="col-span-1 flex flex-col">
        <CardHeader>
          <CardTitle className="font-headline">AI Coach</CardTitle>
          <CardDescription>Talk through your thoughts with your AI companion.</CardDescription>
        </CardHeader>
        <CardContent className="flex-grow flex items-center justify-center">
            <Bot className="size-16 text-muted-foreground/50" />
        </CardContent>
        <CardFooter>
          <Button asChild className="w-full bg-primary/90 hover:bg-primary">
            <Link href="/chatbot">
              Start a conversation
            </Link>
          </Button>
        </CardFooter>
      </Card>
      
      <Card className="col-span-1 md:col-span-2">
        <CardHeader>
          <CardTitle className="font-headline">Daily Journal</CardTitle>
          <CardDescription>A space for your thoughts, reflections, and feelings.</CardDescription>
        </CardHeader>
        <CardContent>
            <Textarea placeholder="What's on your mind today?" className="min-h-32"/>
        </CardContent>
        <CardFooter>
            <Button>Save Entry</Button>
        </CardFooter>
      </Card>

    </div>
  );
}
