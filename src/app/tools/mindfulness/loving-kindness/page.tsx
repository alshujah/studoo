
import type { Metadata } from 'next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Heart } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Loving-Kindness Meditation | Rejoyn',
};

export default function LovingKindnessPage() {
  return (
    <main className="flex flex-1 flex-col">
      <div className="sticky top-0 z-10 flex h-14 items-center border-b bg-background px-6">
        <h1 className="font-headline text-xl font-semibold">Loving-Kindness Meditation</h1>
      </div>
      <div className="flex-1 p-4 md:p-6">
        <Card>
          <CardHeader>
            <CardTitle className="font-headline">Cultivating Compassion</CardTitle>
            <CardDescription>
              Loving-kindness meditation (LKM), or Metta meditation, is the practice of directing well-wishes towards yourself and others. It's a powerful way to cultivate feelings of warmth, kindness, and interconnectedness.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <Alert>
              <Heart className="h-4 w-4" />
              <AlertTitle>An Antidote to Ill Will</AlertTitle>
              <AlertDescription>
                Practicing loving-kindness can increase positive emotions, reduce self-criticism, and enhance empathy for others.
              </AlertDescription>
            </Alert>

            <Card className="bg-muted/30">
                <CardHeader>
                    <CardTitle className="text-lg">How to Practice Loving-Kindness</CardTitle>
                </CardHeader>
                <CardContent className="prose prose-sm max-w-none text-foreground">
                    <ol>
                        <li><strong>Find a comfortable posture.</strong> Sit with your back straight but not stiff. Close your eyes and take a few deep breaths.</li>
                        <li><strong>Start with Yourself.</strong> Bring to mind a gentle, warm feeling. Silently repeat phrases of kindness towards yourself. A traditional set of phrases is:
                            <ul className="my-2">
                                <li>May I be happy.</li>
                                <li>May I be healthy.</li>
                                <li>May I be safe.</li>
                                <li>May I live with ease.</li>
                            </ul>
                            Feel the intention behind the words as you say them.
                        </li>
                        <li><strong>Extend to a Loved One.</strong> Now, bring to mind someone you care about deeply. Picture them and repeat the phrases for them: "May you be happy. May you be healthy..."</li>
                        <li><strong>Extend to a Neutral Person.</strong> Think of someone you don't have strong feelings for, like a cashier or a neighbor. Offer them the same well-wishes: "May you be happy..."</li>
                        <li><strong>Extend to a Difficult Person.</strong> If you feel ready, bring to mind someone with whom you have a difficult relationship. This can be challenging. See if you can offer them the same phrases, even a little bit: "May you be happy..."</li>
                        <li><strong>Extend to All Beings.</strong> Finally, expand your awareness to include all living beings everywhere, without exception, repeating the phrases for everyone: "May all beings be happy. May all beings be healthy..."</li>
                        <li><strong>Rest in the Feeling.</strong> Sit for a few moments, just breathing and resting in the feeling of warm, open-heartedness.</li>
                    </ol>
                </CardContent>
            </Card>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
