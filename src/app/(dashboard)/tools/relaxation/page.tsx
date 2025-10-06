
'use client';

import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import type { Metadata } from 'next';
import { PageLayout } from '@/components/layout/page-layout';
import { generateMeditationScriptAction, generateMeditationAudioAction } from '@/services/actions';
import { Button } from '@/components/ui/button';
import { Loader, Play, Pause, Mic, Wind, Brain, GitCommitHorizontal, Sparkles } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Input } from '@/components/ui/input';

const meditationTopics = [
    { title: "Box Breathing", description: "A simple technique to calm your nervous system.", icon: Wind },
    { title: "4-7-8 Breathing", description: "A breathing pattern to promote relaxation.", icon: GitCommitHorizontal },
    { title: "Body Scan", description: "Bring awareness to different parts of your body.", icon: Brain },
    { title: "Loving-Kindness", description: "Cultivate feelings of warmth and kindness for yourself and others.", icon: Sparkles },
];

export default function RelaxationPage() {
  const [script, setScript] = useState('');
  const [audioDataUri, setAudioDataUri] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [customTopic, setCustomTopic] = useState('');
  const [activeTopic, setActiveTopic] = useState('');
  const audioRef = React.useRef<HTMLAudioElement>(null);
  const { toast } = useToast();

  const handleGenerate = async (topic: string) => {
    if (!topic) {
        toast({ variant: 'destructive', title: 'Please select or enter a topic.'});
        return;
    }
    
    setIsLoading(true);
    setActiveTopic(topic);
    setScript('');
    setAudioDataUri('');
    
    const scriptResult = await generateMeditationScriptAction({ topic });
    if (!scriptResult.success || !scriptResult.data) {
        toast({ variant: 'destructive', title: 'Failed to generate script.', description: scriptResult.error });
        setIsLoading(false);
        return;
    }
    setScript(scriptResult.data.script);
    
    const audioResult = await generateMeditationAudioAction({ script: scriptResult.data.script });
    if (!audioResult.success || !audioResult.data) {
        toast({ variant: 'destructive', title: 'Failed to generate audio.', description: audioResult.error });
        setIsLoading(false);
        return;
    }

    setAudioDataUri(audioResult.data.audioDataUri);
    setIsLoading(false);
  };

  const togglePlay = () => {
    if (audioRef.current) {
        if (isPlaying) {
            audioRef.current.pause();
            setIsPlaying(false);
        } else {
            audioRef.current.play();
            setIsPlaying(true);
        }
    }
  }

  return (
    <PageLayout title="Guided Relaxation">
        <Card>
            <CardHeader>
                <CardTitle className="font-headline">Create a Personalized Meditation</CardTitle>
                <CardDescription>Select a topic or enter your own to generate a unique guided meditation with AI.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
                    {meditationTopics.map((item) => (
                        <Card 
                            key={item.title} 
                            onClick={() => handleGenerate(item.title)}
                            className="cursor-pointer hover:bg-muted/50 transition-colors flex flex-col"
                        >
                            <CardHeader className="flex-grow">
                                <item.icon className="size-6 text-primary mb-2" />
                                <CardTitle>{item.title}</CardTitle>
                                <CardDescription>{item.description}</CardDescription>
                            </CardHeader>
                        </Card>
                    ))}
                </div>
                <div className="flex gap-2">
                    <Input 
                        placeholder="Or enter a custom topic, e.g., 'releasing work stress'" 
                        value={customTopic}
                        onChange={(e) => setCustomTopic(e.target.value)}
                    />
                    <Button onClick={() => handleGenerate(customTopic)}>Generate</Button>
                </div>

                {isLoading && (
                    <div className="flex flex-col items-center justify-center gap-4 p-8 border rounded-lg bg-muted/50 min-h-64">
                        <Mic className="h-12 w-12 animate-pulse text-primary" />
                        <p className="text-muted-foreground">The AI Coach is creating your personalized meditation for "{activeTopic}"...</p>
                        <Loader className="h-6 w-6 animate-spin" />
                    </div>
                )}
                
                {audioDataUri && !isLoading && (
                     <Card className="bg-muted/20">
                        <CardHeader>
                            <CardTitle>Your "{activeTopic}" Meditation</CardTitle>
                        </CardHeader>
                        <CardContent>
                             <audio ref={audioRef} src={audioDataUri} onEnded={() => setIsPlaying(false)} />
                             <Button onClick={togglePlay} size="lg">
                                {isPlaying ? <Pause className="mr-2" /> : <Play className="mr-2" />}
                                {isPlaying ? 'Pause' : 'Play'}
                             </Button>
                        </CardContent>
                        <CardFooter>
                            <p className="text-sm text-muted-foreground">Find a comfortable position, press play, and follow the guidance.</p>
                        </CardFooter>
                     </Card>
                )}

            </CardContent>
        </Card>
    </PageLayout>
  );
}
