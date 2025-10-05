
import type { Metadata } from 'next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Body, Waves } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Somatic Experiencing | Rejoyn',
};

export default function SomaticExperiencingPage() {
  return (
    <main className="flex flex-1 flex-col">
      <div className="sticky top-0 z-10 flex h-14 items-center border-b bg-background px-6">
        <h1 className="font-headline text-xl font-semibold">Somatic Experiencing Exercises</h1>
      </div>
      <div className="flex-1 p-4 md:p-6">
        <Card>
          <CardHeader>
            <CardTitle className="font-headline">Listening to Your Body</CardTitle>
            <CardDescription>
              Somatic Experiencing (SE) is a body-oriented approach to healing trauma. It focuses on releasing traumatic shock by tracking bodily sensations (the "felt sense") to relieve stored energy and tension.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <Alert>
              <Body className="h-4 w-4" />
              <AlertTitle>The Body Keeps the Score</AlertTitle>
              <AlertDescription>
                SE operates on the principle that trauma gets trapped in the body. These gentle exercises help you listen to your body's wisdom and allow it to complete self-protective responses.
              </AlertDescription>
            </Alert>

            <Card className="bg-muted/30">
                <CardHeader>
                    <CardTitle className="text-lg">Core SE Exercises</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="p-4 border rounded-lg bg-background">
                        <h4 className="font-semibold">1. Titration: A Little at a Time</h4>
                        <p className="text-sm text-muted-foreground mt-2">Instead of diving into a difficult sensation, you gently touch upon it for a moment and then immediately return your focus to a part of your body that feels neutral or pleasant. This prevents overwhelm.</p>
                        <p className="text-sm mt-4 italic">Exercise: Notice an area of tension in your body. Now, shift your focus to the feeling of your feet on the floor. Stay with your feet for a few breaths. Then, briefly notice the tension again before returning your focus to your feet.</p>
                    </div>
                     <div className="p-4 border rounded-lg bg-background">
                        <h4 className="font-semibold flex items-center gap-2"><Waves className="size-5 text-primary" />2. Pendulation: Finding Rhythm</h4>
                        <p className="text-sm text-muted-foreground mt-2">Pendulation is the natural rhythm of moving between states of expansion (ease, calm) and contraction (tension, fear). By intentionally moving your attention between a sensation of distress and a sensation of calm, you help your nervous system regulate itself.</p>
                         <p className="text-sm mt-4 italic">Exercise: Find a place in your body that feels calm or neutral. Now, find a place that holds a bit of tension. Gently shift your awareness back and forth between these two places, like a slow-swinging pendulum. Spend more time in the calm place.</p>
                    </div>
                     <div className="p-4 border rounded-lg bg-background">
                        <h4 className="font-semibold">3. Resourcing: Finding Your Safe Place</h4>
                        <p className="text-sm text-muted-foreground mt-2">A resource is any internal or external source of calm, strength, or pleasure. Before exploring difficult sensations, it's vital to establish a connection to a resource.</p>
                        <p className="text-sm mt-4 italic">Exercise: Think of a person, a place, a memory, or an activity that makes you feel safe and calm. Close your eyes and imagine it in detail. Notice what sensations arise in your body as you connect with this resource. This is your anchor.</p>
                    </div>
                </CardContent>
            </Card>

          </CardContent>
        </Card>
      </div>
    </main>
  );
}
