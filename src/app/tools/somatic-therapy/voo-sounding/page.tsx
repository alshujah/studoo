

import type { Metadata } from 'next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Waves } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  title: 'Voo Sounding | Rejoyn',
};

function VooSoundingTool() {
    const playVooSound = () => {
        const audioContext = new (window.AudioContext)();
        const oscillator = audioContext.createOscillator();
        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(100, audioContext.currentTime); // Low frequency for 'Voo'
        
        const gainNode = audioContext.createGain();
        gainNode.gain.setValueAtTime(0, audioContext.currentTime);
        gainNode.gain.linearRampToValueAtTime(0.5, audioContext.currentTime + 0.5);
        gainNode.gain.linearRampToValueAtTime(0, audioContext.currentTime + 5);

        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);

        oscillator.start();
        oscillator.stop(audioContext.currentTime + 5);
    };

    return (
        <Button onClick={playVooSound}>
            Play "Voo" Sound Example
        </Button>
    )
}


export default function VooSoundingPage() {
  return (
    <main className="flex flex-1 flex-col">
      <div className="sticky top-0 z-10 flex h-14 items-center border-b bg-background px-6">
        <h1 className="font-headline text-xl font-semibold">Somatic: Voo Sounding</h1>
      </div>
      <div className="flex-1 p-4 md:p-6">
        <Card>
          <CardHeader>
            <CardTitle className="font-headline">Calming with Vibration</CardTitle>
            <CardDescription>
              "Voo" sounding is a simple and powerful somatic exercise that uses the vibration of your own voice to help calm the nervous system. It's particularly effective for releasing feelings of anxiety or being frozen in fear.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <Alert>
              <Waves className="h-4 w-4" />
              <AlertTitle>Why It Works</AlertTitle>
              <AlertDescription>
                The deep, low-frequency vibration of the "voo" sound stimulates the vagus nerve in your chest and abdomen, which is a key part of your parasympathetic nervous system (the "rest and digest" system). This sends a signal of safety and calm throughout your body.
              </AlertDescription>
            </Alert>

            <Card className="bg-muted/30">
                <CardHeader>
                    <CardTitle className="text-lg">How to Practice Voo Sounding</CardTitle>
                </CardHeader>
                <CardContent className="prose prose-sm max-w-none text-foreground">
                    <ol>
                        <li><strong>Find a comfortable seated position.</strong> Feel your feet on the floor and your back supported.</li>
                        <li><strong>Take a deep breath in.</strong> Allow your belly to expand as you inhale, filling your lungs completely.</li>
                        <li><strong>Exhale with "Voooooo".</strong> As you exhale slowly, make a low, deep "Voo" sound, like the sound of a foghorn. Try to make the sound long, slow, and continuous.</li>
                        <li><strong>Feel the vibration.</strong> As you make the sound, bring your attention to the vibration in your chest, throat, and belly. Imagine the vibration gently shaking loose any tension.</li>
                        <li><strong>Repeat.</strong> Continue for 3-5 breaths, or as long as it feels comfortable. Notice any shifts in your body or emotional state.</li>
                    </ol>
                    <div className="mt-4">
                        <VooSoundingTool />
                    </div>
                </CardContent>
            </Card>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
