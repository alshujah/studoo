
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Ear, Loader, Sparkles } from 'lucide-react';
import React, { useState, useTransition } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { generateMeditation, type GenerateMeditationOutput } from '@/ai/flows/generate-meditation-flow';
import { useToast } from '@/hooks/use-toast';
import { Label } from '@/components/ui/label';

export default function GuidedMeditationPage() {
  const [topic, setTopic] = useState('');
  const [isPending, startTransition] = useTransition();
  const [result, setResult] = useState<GenerateMeditationOutput | null>(null);
  const { toast } = useToast();

  const handleSubmit = () => {
    if (!topic.trim()) {
      toast({
        variant: 'destructive',
        title: 'Topic is empty',
        description: 'Please enter a topic for your meditation.',
      });
      return;
    }

    setResult(null);
    startTransition(async () => {
      try {
        const meditationResult = await generateMeditation({ topic });
        setResult(meditationResult);
      } catch (error: any) {
        console.error('Failed to generate meditation:', error);
        toast({
          variant: 'destructive',
          title: 'Generation Failed',
          description: error.message || 'Could not generate the meditation audio.',
        });
      }
    });
  };

  return (
    <main className="flex flex-1 flex-col">
      <div className="sticky top-0 z-10 flex h-14 items-center border-b bg-background px-6">
        <h1 className="font-headline text-xl font-semibold">AI Guided Meditation</h1>
      </div>
      <div className="flex-1 p-4 md:p-6">
        <Card>
          <CardHeader>
            <CardTitle className="font-headline">Your Personal Meditation Guide</CardTitle>
            <CardDescription>
              Enter a topic, feeling, or situation you'd like to focus on. Our AI will generate a unique, voiced guided meditation just for you.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <Label htmlFor="meditation-topic">What do you want to meditate on?</Label>
              <Textarea
                id="meditation-topic"
                placeholder="e.g., Releasing anxiety about my presentation tomorrow, finding calm during a busy day, letting go of anger..."
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                disabled={isPending}
              />
              <Button onClick={handleSubmit} disabled={isPending || !topic.trim()}>
                {isPending ? (
                  <Loader className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Sparkles className="mr-2 h-4 w-4" />
                )}
                Generate My Meditation
              </Button>
            </div>

            {isPending && (
              <div className="flex items-center justify-center gap-4 rounded-lg border bg-muted/50 p-8">
                <Loader className="h-8 w-8 animate-spin text-primary" />
                <div className="text-center">
                    <p className="font-semibold">Generating your meditation...</p>
                    <p className="text-sm text-muted-foreground">This may take up to a minute. Please wait.</p>
                </div>
              </div>
            )}

            {result && (
              <div className="space-y-6">
                 <Alert>
                  <Ear className="h-4 w-4" />
                  <AlertTitle>Your Meditation is Ready</AlertTitle>
                  <AlertDescription>
                    Find a comfortable position, press play, and follow the guidance.
                  </AlertDescription>
                </Alert>
                <Card className="bg-muted/30">
                  <CardHeader>
                    <CardTitle className="text-lg">Listen</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <audio controls className="w-full" src={result.audioDataUri}>
                      Your browser does not support the audio element.
                    </audio>
                  </CardContent>
                </Card>
                <Card className="bg-muted/30">
                  <CardHeader>
                    <CardTitle className="text-lg">Meditation Script</CardTitle>
                  </CardHeader>
                  <CardContent className="prose prose-sm max-w-none text-foreground whitespace-pre-wrap">
                    {result.script}
                  </CardContent>
                </Card>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
