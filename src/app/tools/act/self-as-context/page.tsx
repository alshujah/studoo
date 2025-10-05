
import type { Metadata } from 'next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Telescope, Mountain } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Self-as-Context | Rejoyn',
};

export default function SelfAsContextPage() {
  return (
    <main className="flex flex-1 flex-col">
      <div className="sticky top-0 z-10 flex h-14 items-center border-b bg-background px-6">
        <h1 className="font-headline text-xl font-semibold">ACT: Self-as-Context</h1>
      </div>
      <div className="flex-1 p-4 md:p-6">
        <Card>
          <CardHeader>
            <CardTitle className="font-headline">The Observing Self</CardTitle>
            <CardDescription>
              Self-as-Context, also known as the "observing self," is the part of you that is aware of your thoughts, feelings, and experiences, but is not defined by them. It is a stable, consistent perspective from which you can watch your inner world go by.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <Alert>
              <Telescope className="h-4 w-4" />
              <AlertTitle>You are the container, not the contents.</AlertTitle>
              <AlertDescription>
                Imagine your mind is a container. Your thoughts, feelings, memories, and sensations are the contents. You are the container itself—always there, holding the contents, but not the contents themselves.
              </AlertDescription>
            </Alert>

            <Card className="bg-muted/30">
                <CardHeader>
                    <CardTitle className="text-lg">Exercises to Connect with Your Observing Self</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="p-4 border rounded-lg">
                        <h4 className="font-semibold flex items-center gap-2"><Mountain className="size-5 text-primary" />The Mountain Meditation</h4>
                        <p className="text-sm text-muted-foreground mt-2">Sit comfortably and imagine yourself as a mountain. Your body is the solid, unmoving mountain. The "weather" around you represents your thoughts and feelings—clouds, storms, sun, wind. The weather changes constantly, but the mountain remains stable and still. Notice the weather without being the weather.</p>
                    </div>
                     <div className="p-4 border rounded-lg">
                        <h4 className="font-semibold flex items-center gap-2"><Telescope className="size-5 text-primary" />Notice Who is Noticing</h4>
                        <p className="text-sm text-muted-foreground mt-2">Take a moment to notice your thoughts. Now, notice that you are noticing your thoughts. Who is doing the noticing? This "noticer" is your observing self. You can do the same with feelings, sounds, or physical sensations. There is a part of you that is simply aware, separate from the experience itself.</p>
                    </div>
                     <div className="p-4 border rounded-lg">
                        <h4 className="font-semibold flex items-center gap-2"><Telescope className="size-5 text-primary" />Continuous 'You' Exercise</h4>
                        <p className="text-sm text-muted-foreground mt-2">Think back to yourself 10 years ago. Now 5 years ago. Now yesterday. Your body, thoughts, feelings, and roles have changed. What part of "you" has been there the whole time, observing all these changes? That consistent awareness is the "self-as-context."</p>
                    </div>
                </CardContent>
            </Card>

          </CardContent>
        </Card>
      </div>
    </main>
  );
}
