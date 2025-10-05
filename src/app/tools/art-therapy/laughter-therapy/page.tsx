
import type { Metadata } from 'next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Laugh, Lightbulb } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Laughter Therapy | Rejoyn',
};

export default function LaughterTherapyPage() {
  return (
    <main className="flex flex-1 flex-col">
      <div className="sticky top-0 z-10 flex h-14 items-center border-b bg-background px-6">
        <h1 className="font-headline text-xl font-semibold">Laughter Therapy</h1>
      </div>
      <div className="flex-1 p-4 md:p-6">
        <Card>
          <CardHeader>
            <CardTitle className="font-headline">The Best Medicine</CardTitle>
            <CardDescription>
              Laughter Therapy, or Laughter Yoga, is a practice that uses voluntary laughter to promote health and well-being. It's based on the idea that your body can't distinguish between fake and real laughter, so you get the same physiological and psychological benefits.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <Alert>
              <Lightbulb className="h-4 w-4" />
              <AlertTitle>You Don't Need to Feel Happy to Laugh</AlertTitle>
              <AlertDescription>
                The goal is to initiate laughter as a form of body exercise. Often, fake laughter turns into genuine, contagious laughter, especially in a group.
              </AlertDescription>
            </Alert>

            <div className="grid md:grid-cols-2 gap-6">
                 <Card className="bg-muted/30">
                    <CardHeader>
                        <CardTitle className="text-lg flex items-center gap-2"><Laugh className="size-5 text-primary" /> Self-Directed Laughter Exercises</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="p-3 border rounded-lg bg-background">
                            <h4 className="font-semibold">The "Ho, Ha, Ha" Chant</h4>
                            <p className="text-sm text-muted-foreground mt-1">Start by chanting "ho, ho, ha, ha, ha" in rhythm. Move your hands and body with the chant. This often feels silly, which can itself trigger real laughter.</p>
                        </div>
                        <div className="p-3 border rounded-lg bg-background">
                            <h4 className="font-semibold">Simulated Laughter</h4>
                            <p className="text-sm text-muted-foreground mt-1">Simply start laughing. It might feel forced at first, but try to keep it going for 30-60 seconds. Pay attention to the physical sensation of laughing.</p>
                        </div>
                         <div className="p-3 border rounded-lg bg-background">
                            <h4 className="font-semibold">Smile and Giggle</h4>
                            <p className="text-sm text-muted-foreground mt-1">Start by just holding a smile for a minute. Then, let a small giggle escape. Then another. See if you can let the giggles build into a gentle laugh.</p>
                        </div>
                    </CardContent>
                </Card>
                 <Card className="bg-muted/30">
                    <CardHeader>
                        <CardTitle className="text-lg flex items-center gap-2"><Lightbulb className="size-5 text-primary" /> Key Benefits</CardTitle>
                    </CardHeader>
                    <CardContent className="prose prose-sm max-w-none text-foreground">
                        <ul>
                           <li><strong>Stress Reduction:</strong> Laughter increases oxygen intake, stimulates circulation, and can cool down your stress response.</li>
                           <li><strong>Mood Elevation:</strong> It triggers the release of endorphins, the body's natural feel-good chemicals.</li>
                           <li><strong>Pain Relief:</strong> Laughter may ease pain by causing the body to produce its own natural painkillers.</li>
                           <li><strong>Social Connection:</strong> Laughing with others is a powerful way to bond and reduce feelings of isolation.</li>
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
