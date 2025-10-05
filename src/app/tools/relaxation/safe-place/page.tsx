
import type { Metadata } from 'next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Sofa } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Safe Place Visualization | Rejoyn',
};

export default function SafePlacePage() {
  return (
    <main className="flex flex-1 flex-col">
      <div className="sticky top-0 z-10 flex h-14 items-center border-b bg-background px-6">
        <h1 className="font-headline text-xl font-semibold">Safe Place Visualization</h1>
      </div>
      <div className="flex-1 p-4 md:p-6">
        <Card>
          <CardHeader>
            <CardTitle className="font-headline">Creating Your Inner Sanctuary</CardTitle>
            <CardDescription>
              The "safe place" or "calm place" is a visualization technique where you use your imagination to create a place where you feel completely safe, calm, and peaceful. This becomes an inner resource you can return to anytime you feel overwhelmed.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <Alert>
              <Sofa className="h-4 w-4" />
              <AlertTitle>Your Personal Retreat</AlertTitle>
              <AlertDescription>
                Your safe place can be real or imagined. The only rule is that it must feel calm and safe to YOU.
              </AlertDescription>
            </Alert>

            <Card className="bg-muted/30">
                <CardHeader>
                    <CardTitle className="text-lg">How to Create Your Safe Place</CardTitle>
                </CardHeader>
                <CardContent className="prose prose-sm max-w-none text-foreground">
                    <ol>
                        <li><strong>Find a comfortable position and close your eyes.</strong> Take a few deep breaths to relax.</li>
                        <li><strong>Imagine a place of profound safety and calm.</strong> It could be a beach, a forest, a cozy room, or even a place in outer space. Let your mind create it.</li>
                        <li><strong>Engage all your senses.</strong>
                            <ul>
                                <li><strong>What do you see?</strong> Notice the colors, the light, the details.</li>
                                <li><strong>What do you hear?</strong> The sound of waves, birds, gentle music, or peaceful silence.</li>
                                <li><strong>What do you feel?</strong> The warmth of the sun, a soft blanket, a gentle breeze.</li>
                                <li><strong>What do you smell?</strong> The scent of pine trees, salty air, or fresh laundry.</li>
                            </ul>
                        </li>
                        <li><strong>Anchor the feeling.</strong> As you explore your safe place, notice the feeling of calm in your body. Give this feeling a word, like "Peace" or "Calm."</li>
                        <li><strong>Spend time there.</strong> Linger in your safe place for a few minutes, soaking in the feelings of safety and peace. Know that you can return here whenever you need to.</li>
                        <li><strong>Return gently.</strong> When you're ready, slowly bring your awareness back to the room you're in. Open your eyes and take the feeling of calm with you.</li>
                    </ol>
                </CardContent>
            </Card>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
