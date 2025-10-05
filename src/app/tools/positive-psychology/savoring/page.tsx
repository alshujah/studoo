
import type { Metadata } from 'next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Camera } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Savoring Exercises | Rejoyn',
};

export default function SavoringPage() {
  return (
    <main className="flex flex-1 flex-col">
      <div className="sticky top-0 z-10 flex h-14 items-center border-b bg-background px-6">
        <h1 className="font-headline text-xl font-semibold">Positive Psychology: Savoring</h1>
      </div>
      <div className="flex-1 p-4 md:p-6">
        <Card>
          <CardHeader>
            <CardTitle className="font-headline">The Art of Savoring</CardTitle>
            <CardDescription>
              Savoring is the practice of mindfully attending to, appreciating, and enhancing positive experiences. It's about getting the most "juice" out of life's good moments.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <Alert>
              <Camera className="h-4 w-4" />
              <AlertTitle>Take a Mental Snapshot</AlertTitle>
              <AlertDescription>
                Savoring is like taking a mental photograph of a happy moment that you can look back on later.
              </AlertDescription>
            </Alert>

            <Card className="bg-muted/30">
                <CardHeader>
                    <CardTitle className="text-lg">Savoring Techniques</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="p-4 border rounded-lg bg-background">
                        <h4 className="font-semibold">Savoring the Present Moment</h4>
                        <p className="text-sm text-muted-foreground mt-2">When you're in a pleasant moment (eating a good meal, enjoying a sunny day, listening to music), consciously direct your attention to it. Notice the details: the sights, sounds, smells, tastes, and textures. Tell yourself "This is a good moment," and try to absorb the positive feelings.</p>
                    </div>
                     <div className="p-4 border rounded-lg bg-background">
                        <h4 className="font-semibold">Savoring the Past (Reminiscing)</h4>
                        <p className="text-sm text-muted-foreground mt-2">Think back to a happy memory. Close your eyes and try to re-experience it as vividly as possible. Who was there? What was happening? What did you feel? You can do this by looking at old photos or just using your memory.</p>
                    </div>
                     <div className="p-4 border rounded-lg bg-background">
                        <h4 className="font-semibold">Savoring the Future (Anticipating)</h4>
                        <p className="text-sm text-muted-foreground mt-2">Look forward to an upcoming positive event. Imagine it in detail. Think about what you'll do, who you'll be with, and how you'll feel. This builds positive anticipation and can make the actual event even more enjoyable.</p>
                    </div>
                    <div className="p-4 border rounded-lg bg-background">
                        <h4 className="font-semibold">Sharing Your Joy</h4>
                        <p className="text-sm text-muted-foreground mt-2">Tell someone else about a positive experience you had. Sharing good news with a supportive person can amplify your positive feelings and strengthen your connection.</p>
                    </div>
                </CardContent>
            </Card>

          </CardContent>
        </Card>
      </div>
    </main>
  );
}
