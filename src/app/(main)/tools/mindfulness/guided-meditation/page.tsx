
'use client';

import React, { useState, useTransition } from 'react';
import { PageLayout } from '@/components/layout/page-layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Sparkles, Loader, Wand, Mic, Play } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { generateMeditationScriptAction, generateMeditationAudioAction } from '@/services/actions';

export default function GuidedMeditationPage() {
  const [topic, setTopic] = useState('');
  const [script, setScript] = useState('');
  const [audioDataUri, setAudioDataUri] = useState('');
  const [isScriptPending, startScriptTransition] = useTransition();
  const [isAudioPending, startAudioTransition] = useTransition();
  const { toast } = useToast();

  const handleGenerateScript = () => {
    if (!topic.trim()) {
      toast({ variant: 'destructive', title: 'Topic is required' });
      return;
    }
    setScript('');
    setAudioDataUri('');
    startScriptTransition(async () => {
      const result = await generateMeditationScriptAction({ topic });
      if (result.success && result.data) {
        setScript(result.data.script);
        toast({ title: 'Script Generated', description: 'Now you can generate the audio.' });
      } else {
        toast({ variant: 'destructive', title: 'Script Generation Failed', description: result.error });
      }
    });
  };

  const handleGenerateAudio = () => {
    if (!script) {
      toast({ variant: 'destructive', title: 'Please generate a script first' });
      return;
    }
    startAudioTransition(async () => {
      const result = await generateMeditationAudioAction({ script });
      if (result.success && result.data) {
        setAudioDataUri(result.data.audioDataUri);
        toast({ title: 'Audio Ready', description: 'Your guided meditation is ready to play.' });
      } else {
        toast({ variant: 'destructive', title: 'Audio Generation Failed', description: result.error });
      }
    });
  };
  
  const isPending = isScriptPending || isAudioPending;

  return (
    <PageLayout title="AI Guided Meditation">
      <Card>
        <CardHeader>
          <CardTitle className="font-headline">Create Your Personalized Meditation</CardTitle>
          <CardDescription>
            Enter a topic, feeling, or situation you'd like to focus on. The AI will create a unique guided meditation script and audio for you.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="topic-input" className="font-medium">What's on your mind?</label>
            <div className="flex gap-2">
              <Input
                id="topic-input"
                placeholder="e.g., Releasing work stress, finding calm, morning energy"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                disabled={isPending}
              />
              <Button onClick={handleGenerateScript} disabled={isPending || !topic.trim()}>
                {isScriptPending ? <Loader className="animate-spin" /> : <Wand />}
                <span className="sr-only sm:not-sr-only sm:ml-2">Generate Script</span>
              </Button>
            </div>
          </div>
          
          {script && (
            <Card className="bg-muted/30">
              <CardHeader>
                <CardTitle className="text-lg">Generated Script</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="whitespace-pre-wrap font-serif text-base leading-relaxed">{script}</p>
                <Button onClick={handleGenerateAudio} disabled={isPending}>
                  {isAudioPending ? <Loader className="animate-spin" /> : <Mic />}
                  <span className="ml-2">Generate Audio</span>
                </Button>
              </CardContent>
            </Card>
          )}

          {audioDataUri && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Play /> Your Guided Meditation
                </CardTitle>
              </CardHeader>
              <CardContent>
                <audio controls src={audioDataUri} className="w-full">
                  Your browser does not support the audio element.
                </audio>
              </CardContent>
            </Card>
          )}

        </CardContent>
      </Card>
    </PageLayout>
  );
}
