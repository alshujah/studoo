
import type { Metadata } from 'next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Waves, Cloudy, Leaf, Mic, Tv } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Decentering & Defusion | Rejoyn',
};

export default function DecenteringPage() {
  return (
    <main className="flex flex-1 flex-col">
      <div className="sticky top-0 z-10 flex h-14 items-center border-b bg-background px-6">
        <h1 className="font-headline text-xl font-semibold">ACT: Decentering & Cognitive Defusion</h1>
      </div>
      <div className="flex-1 p-4 md:p-6">
        <Card>
          <CardHeader>
            <CardTitle className="font-headline">Notice Your Thoughts, Don't Be Them</CardTitle>
            <CardDescription>
              Cognitive Defusion, or decentering, is the practice of creating distance from your thoughts and feelings. Instead of being caught up in them, you learn to observe them as passing mental events.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <Alert>
              <Waves className="h-4 w-4" />
              <AlertTitle>You are the sky, not the weather.</AlertTitle>
              <AlertDescription>
                Your thoughts, feelings, and sensations are like the weather—constantly changing. You are the sky—the vast, open space in which the weather happens. This exercise helps you remember that you are bigger than your thoughts.
              </AlertDescription>
            </Alert>

            <Card className="bg-muted/30">
                <CardHeader>
                    <CardTitle className="text-lg">Cognitive Defusion Exercises</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="p-4 border rounded-lg">
                        <h4 className="font-semibold flex items-center gap-2"><Cloudy className="size-5 text-primary" />"I'm having the thought that..."</h4>
                        <p className="text-sm text-muted-foreground mt-2">When you have a difficult thought like "I'm a failure," rephrase it by saying, "I'm having the thought that I'm a failure." This simple change reminds you that a thought is a mental event, not an objective truth.</p>
                    </div>
                     <div className="p-4 border rounded-lg">
                        <h4 className="font-semibold flex items-center gap-2"><Leaf className="size-5 text-primary" />Leaves on a Stream</h4>
                        <p className="text-sm text-muted-foreground mt-2">Close your eyes and visualize a gently flowing stream. As thoughts pop into your head, imagine placing each one on a leaf and letting it float by. Don't try to change the thoughts or make the stream go faster. Just watch them come and go.</p>
                    </div>
                     <div className="p-4 border rounded-lg">
                        <h4 className="font-semibold flex items-center gap-2"><Mic className="size-5 text-primary" />Silly Voices</h4>
                        <p className="text-sm text-muted-foreground mt-2">Take a distressing thought and repeat it in your mind using a silly cartoon character's voice, or sing it to the tune of "Happy Birthday." This helps to strip the thought of its power and seriousness.</p>
                    </div>
                    <div className="p-4 border rounded-lg">
                        <h4 className="font-semibold flex items-center gap-2"><Tv className="size-5 text-primary" />Name Your Stories</h4>
                        <p className="text-sm text-muted-foreground mt-2">Our minds often play the same "greatest hits" of negative stories (e.g., the "I'm not good enough" story, the "It's going to be a disaster" story). When you notice one of these playing, simply label it. "Ah, there's my 'not good enough' story again." This acknowledges the thought without getting lost in its content.</p>
                    </div>
                </CardContent>
            </Card>

          </CardContent>
        </Card>
      </div>
    </main>
  );
}
