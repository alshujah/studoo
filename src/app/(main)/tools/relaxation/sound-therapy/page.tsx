
'use client';

import { PageLayout } from '@/components/layout/page-layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Music } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

const sounds = [
  { name: 'Rain', file: '/sounds/rain.mp3' },
  { name: 'Ocean Waves', file: '/sounds/waves.mp3' },
  { name: 'Forest', file: '/sounds/forest.mp3' },
  { name: 'White Noise', file: '/sounds/whitenoise.mp3' },
];

export default function SoundTherapyPage() {
    const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
    const [nowPlaying, setNowPlaying] = useState<string | null>(null);

    const playSound = (soundFile: string, soundName: string) => {
        if (audio) {
            audio.pause();
        }
        const newAudio = new Audio(soundFile);
        newAudio.loop = true;
        newAudio.play();
        setAudio(newAudio);
        setNowPlaying(soundName);
    };

    const stopSound = () => {
        if (audio) {
            audio.pause();
            setAudio(null);
            setNowPlaying(null);
        }
    };

    return (
        <PageLayout title="Sound Therapy & Binaural Beats">
            <Card>
                <CardHeader>
                    <CardTitle className="font-headline">Calming Soundscapes</CardTitle>
                    <CardDescription>Use ambient sounds to calm your mind, improve focus, or help you sleep.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <Alert>
                        <Music className="h-4 w-4" />
                        <AlertTitle>How It Works</AlertTitle>
                        <AlertDescription>
                           Ambient sounds can help mask distracting noises and promote a state of relaxation by providing a steady, non-intrusive auditory input. Note: Audio files are placeholders.
                        </AlertDescription>
                    </Alert>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {sounds.map(sound => (
                            <Button 
                                key={sound.name} 
                                variant={nowPlaying === sound.name ? 'default' : 'outline'}
                                onClick={() => playSound(sound.file, sound.name)}
                            >
                                {sound.name}
                            </Button>
                        ))}
                    </div>
                     {audio && (
                        <div className="text-center">
                            <p className="text-sm text-muted-foreground">Now playing: {nowPlaying}</p>
                            <Button onClick={stopSound} variant="destructive" className="mt-2">Stop Sound</Button>
                        </div>
                    )}
                </CardContent>
            </Card>
        </PageLayout>
    );
}
