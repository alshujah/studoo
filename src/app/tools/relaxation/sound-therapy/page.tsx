
import type { Metadata } from 'next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Waves } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Sound Therapy | Rejoyn',
};

export default function SoundTherapyPage() {
  return (
    <main className="flex flex-1 flex-col">
      <div className="sticky top-0 z-10 flex h-14 items-center border-b bg-background px-6">
        <h1 className="font-headline text-xl font-semibold">Sound Therapy for Relaxation</h1>
      </div>
      <div className="flex-1 p-4 md:p-6">
        <Card>
          <CardHeader>
            <CardTitle className="font-headline">Harnessing Sound for Calm</CardTitle>
            <CardDescription>
              Sound therapy uses specific frequencies and tones to help induce states of relaxation, focus, or sleep. This can include white noise, nature sounds, or binaural beats.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <Alert>
              <Waves className="h-4 w-4" />
              <AlertTitle>What are Binaural Beats?</AlertTitle>
              <AlertDescription>
                Binaural beats work by sending a slightly different frequency to each ear through headphones. Your brain perceives the difference between the two frequencies as a third, new frequency, which can help guide your brainwaves toward a more relaxed state. Headphones are required for this effect.
              </AlertDescription>
            </Alert>

            <Card className="bg-muted/30">
                <CardHeader>
                    <CardTitle className="text-lg">Relaxing Sound Sample</CardTitle>
                    <CardDescription>Listen to this sample of white noise mixed with a gentle theta wave binaural beat (6hz), often associated with deep relaxation and meditation. Use headphones for the best effect.</CardDescription>
                </CardHeader>
                <CardContent>
                    <audio controls className="w-full">
                        <source src="https://firebasestorage.googleapis.com/v0/b/trauma-phase-one-toolkit.appspot.com/o/sounds%2Ftheta-binaural-whitenoise.mp3?alt=media&token=8e99e0c5-555e-4c2f-9a1b-0d321f8a8e3d" type="audio/mpeg" />
                        Your browser does not support the audio element.
                    </audio>
                </CardContent>
            </Card>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
