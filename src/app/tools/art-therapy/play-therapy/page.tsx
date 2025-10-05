
import type { Metadata } from 'next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { ToyBrick, Lightbulb, Brain } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Play Therapy Elements | Rejoyn',
};

export default function PlayTherapyPage() {
  return (
    <main className="flex flex-1 flex-col">
      <div className="sticky top-0 z-10 flex h-14 items-center border-b bg-background px-6">
        <h1 className="font-headline text-xl font-semibold">Play Therapy Elements</h1>
      </div>
      <div className="flex-1 p-4 md:p-6">
        <Card>
          <CardHeader>
            <CardTitle className="font-headline">The Power of Play</CardTitle>
            <CardDescription>
              Play is not just for children. For adults, it can be a powerful way to reduce stress, spark creativity, and connect with a more spontaneous part of yourself. Play therapy uses this natural human impulse to explore feelings and solve problems.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <Alert>
              <Lightbulb className="h-4 w-4" />
              <AlertTitle>Informational Only</AlertTitle>
              <AlertDescription>
                Formal Play Therapy is a specific modality used by trained therapists, especially with children. This page offers ways for adults to incorporate the spirit of play into their own wellness routine.
              </AlertDescription>
            </Alert>

            <div className="grid md:grid-cols-2 gap-6">
                 <Card className="bg-muted/30">
                    <CardHeader>
                        <CardTitle className="text-lg flex items-center gap-2"><ToyBrick className="size-5 text-primary" /> Self-Directed Play Exercises</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="p-3 border rounded-lg bg-background">
                            <h4 className="font-semibold">Non-Dominant Hand Doodling</h4>
                            <p className="text-sm text-muted-foreground mt-1">Grab a pen and paper and doodle with your non-dominant hand. This bypasses your inner critic and can lead to surprising and expressive creations. Don't try to draw anything specific.</p>
                        </div>
                        <div className="p-3 border rounded-lg bg-background">
                            <h4 className="font-semibold">Build Something</h4>
                            <p className="text-sm text-muted-foreground mt-1">Use building blocks, LEGOs, or even clay to create something without a plan. Focus on the sensory experience of putting things together. What shape does your current mood take?</p>
                        </div>
                         <div className="p-3 border rounded-lg bg-background">
                            <h4 className="font-semibold">Mindful Coloring</h4>
                            <p className="text-sm text-muted-foreground mt-1">Engage with a coloring book or a simple design. Pay attention to the colors you choose and the physical sensation of filling in the spaces.</p>
                        </div>
                    </CardContent>
                </Card>
                 <Card className="bg-muted/30">
                    <CardHeader>
                        <CardTitle className="text-lg flex items-center gap-2"><Brain className="size-5 text-primary" /> Benefits of Play for Adults</CardTitle>
                    </CardHeader>
                    <CardContent className="prose prose-sm max-w-none text-foreground">
                        <ul>
                           <li><strong>Stress Relief:</strong> Play triggers the release of endorphins, the body's natural feel-good chemicals.</li>
                           <li><strong>Improved Brain Function:</strong> Play stimulates creativity and can improve problem-solving skills.</li>
                           <li><strong>Emotional Expression:</strong> It can provide a safe outlet for expressing feelings that are hard to put into words.</li>
                           <li><strong>Increased Connection:</strong> Playing with others can strengthen social bonds and feelings of community.</li>
                        </ul>
                    </CardContent>
                </Card>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
