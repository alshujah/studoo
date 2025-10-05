
import type { Metadata } from 'next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Footprints } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Walking Meditation | Rejoyn',
};

export default function WalkingMeditationPage() {
  return (
    <main className="flex flex-1 flex-col">
      <div className="sticky top-0 z-10 flex h-14 items-center border-b bg-background px-6">
        <h1 className="font-headline text-xl font-semibold">Walking Meditation</h1>
      </div>
      <div className="flex-1 p-4 md:p-6">
        <Card>
          <CardHeader>
            <CardTitle className="font-headline">Mindfulness in Motion</CardTitle>
            <CardDescription>
              Walking meditation is the practice of bringing mindful awareness to the simple act of walking. It's a great way to practice mindfulness if you find it difficult to sit still, and it helps you integrate mindfulness into your daily activities.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <Alert>
              <Footprints className="h-4 w-4" />
              <AlertTitle>Anywhere, Anytime</AlertTitle>
              <AlertDescription>
                You can practice walking meditation anywhere—in a hallway, in your backyard, in a park, or even on your way to the grocery store.
              </AlertDescription>
            </Alert>

            <Card className="bg-muted/30">
                <CardHeader>
                    <CardTitle className="text-lg">How to Practice Walking Meditation</CardTitle>
                </CardHeader>
                <CardContent className="prose prose-sm max-w-none text-foreground">
                    <ol>
                        <li><strong>Find a path.</strong> Choose a short, clear path where you can walk back and forth, perhaps 10-20 paces long.</li>
                        <li><strong>Stand for a moment.</strong> Before you start, stand still and bring awareness to your body. Feel your feet on the ground.</li>
                        <li><strong>Begin to walk slowly.</strong> Walk at a natural, perhaps slightly slower than usual, pace. Keep your hands in a comfortable position, perhaps clasped behind your back or in front of you.</li>
                        <li><strong>Focus on your feet.</strong> Bring your full attention to the sensation of walking. Notice the lifting and falling of each foot. Feel the contact of your foot with the ground—the heel, the sole, the toes.</li>
                        <li><strong>Notice the rhythm.</strong> Pay attention to the rhythm and flow of your movement. You can mentally note "Lifting... Moving... Placing..." for each step if it helps you stay focused.</li>
                        <li><strong>Expand your awareness.</strong> Once you feel settled, you can expand your awareness to include other bodily sensations—the feeling of the air on your skin, the movement of your arms. You can also open up to sounds around you.</li>
                        <li><strong>Turn mindfully.</strong> When you reach the end of your path, pause for a moment. Consciously turn around and then begin walking back, maintaining your awareness.</li>
                        <li><strong>Handle distractions.</strong> Just like in sitting meditation, your mind will wander. When it does, gently acknowledge the distraction and then guide your focus back to the sensation of walking.</li>
                    </ol>
                </CardContent>
            </Card>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
