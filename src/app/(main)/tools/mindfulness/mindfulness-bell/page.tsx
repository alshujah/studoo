
'use client';

import { PageLayout } from '@/components/layout/page-layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

export default function MindfulnessBellPage() {
    const [audio, setAudio] = useState<HTMLAudioElement | null>(null);

    const playBell = () => {
        const bellSound = '/sounds/bell.mp3';
        const newAudio = new Audio(bellSound);
        newAudio.play();
        setAudio(newAudio);
    };

    return (
        <PageLayout title="Mindfulness Bell">
            <Card>
                <CardHeader>
                    <CardTitle className="font-headline">The Mindfulness Bell</CardTitle>
                    <CardDescription>A simple tool to bring you back to the present moment.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6 flex flex-col items-center text-center">
                    <Alert>
                        <Bell className="h-4 w-4" />
                        <AlertTitle>A Call to Awareness</AlertTitle>
                        <AlertDescription>
                           Use the sound of the bell as an invitation to pause, take a conscious breath, and notice what is happening in the here and now, without judgment.
                        </AlertDescription>
                    </Alert>

                    <div className="p-8">
                        <Button
                            onClick={playBell}
                            variant="outline"
                            className="w-48 h-48 rounded-full flex flex-col gap-2"
                        >
                            <Bell className="w-20 h-20 text-primary" />
                            <span className="text-muted-foreground">Ring the Bell</span>
                        </Button>
                    </div>

                    <div className="prose prose-sm max-w-none text-center">
                        <p>When you hear the bell, you can:</p>
                        <ul>
                            <li>Stop what you are doing for a moment.</li>
                            <li>Take one to three conscious breaths, focusing on the in-breath and the out-breath.</li>
                            <li>Notice the sensations in your body.</li>
                            <li>Gently return to your activity with renewed awareness.</li>
                        </ul>
                    </div>

                </CardContent>
            </Card>
        </PageLayout>
    );
}
