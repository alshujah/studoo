
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Ear, Loader, Sparkles, Wand } from 'lucide-react';
import React, { useState, useTransition } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { generateMeditationScript, generateMeditationAudio } from '@/ai/flows/generate-meditation-flow';
import { useToast } from '@/hooks/use-toast';
import { Label } from '@/components/ui/label';

export default function GuidedMeditationPage() {
  const [topic, setTopic] = useState('');
  const [script, setScript] = useState<string | null>(null);
  const [audioDataUri, setAudioDataUri] = useState<string | null>(null);
  const [isScriptPending, startScriptTransition] = useTransition();
  const [isAudioPending, startAudioTransition] = useTransition();
  const { toast } = useToast();

  const handleScriptSubmit = () => {
    if (!topic.trim()) {
      toast({
        variant: 'destructive',
        title: 'Topic is empty',
        description: 'Please enter a topic for your meditation.',
      });
      return;
    }

    setScript(null);
    setAudioDataUri(null);
    startScriptTransition(async () => {
      try {
        const result = await generateMeditationScript({ topic });
        setScript(result.script);
      } catch (error: any) {
        console.error('Failed to generate meditation script:', error);
        toast({
          variant: 'destructive',
          title: 'Script Generation Failed',
          description: error.message || 'Could not generate the meditation script.',
        });
      }
    });
  };

  const handleAudioSubmit = () => {
    if (!script) {
        toast({
            variant: 'destructive',
            title: 'No script available',
            description: 'Please generate a script first.',
        });
        return;
    }

    startAudioTransition(async () => {
        try {
            const result = await generateMeditationAudio({ script });
            setAudioDataUri(result.audioDataUri);
        } catch (error: any) {
            console.error('Failed to generate meditation audio:', error);
            toast({
                variant: 'destructive',
                title: 'Audio Generation Failed',
                description: error.message || 'Could not generate the meditation audio.',
            });
        }
    });
  };
  
  const isPending = isScriptPending || isAudioPending;

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
              Enter a topic, feeling, or situation you'd like to focus on. Our AI will generate a unique guided meditation just for you.
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
              <Button onClick={handleScriptSubmit} disabled={isPending || !topic.trim()}>
                {isScriptPending ? (
                  <Loader className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Wand className="mr-2 h-4 w-4" />
                )}
                Generate Script
              </Button>
            </div>

            {isScriptPending && (
              <div className="flex items-center justify-center gap-4 rounded-lg border bg-muted/50 p-8">
                <Loader className="h-8 w-8 animate-spin text-primary" />
                <div className="text-center">
                    <p className="font-semibold">Generating your meditation script...</p>
                </div>
              </div>
            )}

            {script && (
              <div className="space-y-6">
                <Card className="bg-muted/30">
                  <CardHeader>
                    <CardTitle className="text-lg">Meditation Script</CardTitle>
                  </CardHeader>
                  <CardContent className="prose prose-sm max-w-none text-foreground whitespace-pre-wrap">
                    {script}
                  </CardContent>
                </Card>

                {!audioDataUri && (
                    <Button onClick={handleAudioSubmit} disabled={isAudioPending}>
                        {isAudioPending ? (
                            <Loader className="mr-2 h-4 w-4 animate-spin" />
                        ) : (
                            <Sparkles className="mr-2 h-4 w-4" />
                        )}
                        Generate Audio
                    </Button>
                )}

                {isAudioPending && (
                    <div className="flex items-center justify-center gap-4 rounded-lg border bg-muted/50 p-8">
                        <Loader className="h-8 w-8 animate-spin text-primary" />
                        <div className="text-center">
                            <p className="font-semibold">Generating audio...</p>
                            <p className="text-sm text-muted-foreground">This may take a moment.</p>
                        </div>
                    </div>
                )}
                
                {audioDataUri && (
                    <Alert>
                        <Ear className="h-4 w-4" />
                        <AlertTitle>Your Audio is Ready</AlertTitle>
                        <AlertDescription>Find a comfortable position and press play.</AlertDescription>
                         <audio controls className="w-full mt-4" src={audioDataUri}>
                            Your browser does not support the audio element.
                        </audio>
                    </Alert>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
