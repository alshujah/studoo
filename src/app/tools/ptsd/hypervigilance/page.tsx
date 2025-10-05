
import type { Metadata } from 'next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { ShieldAlert, Eye, Brain } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Hypervigilance Reduction Training | Rejoyn',
};

export default function HypervigilancePage() {
  return (
    <main className="flex flex-1 flex-col">
      <div className="sticky top-0 z-10 flex h-14 items-center border-b bg-background px-6">
        <h1 className="font-headline text-xl font-semibold">Hypervigilance Reduction Training</h1>
      </div>
      <div className="flex-1 p-4 md:p-6">
        <Card>
          <CardHeader>
            <CardTitle className="font-headline">Calibrating Your Internal Alarm</CardTitle>
            <CardDescription>
              Hypervigilance is a state of increased alertness and sensitivity to your surroundings, as if you are constantly scanning for threats. It's a common symptom of PTSD, but it can be exhausting. These exercises are designed to help you recalibrate your internal "threat-o-meter."
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <Alert>
              <ShieldAlert className="h-4 w-4" />
              <AlertTitle>You Are Safe Now</AlertTitle>
              <AlertDescription>
                Your brain and body learned to be on high alert to protect you. The goal now is to gently teach them that you are safe in the present moment.
              </AlertDescription>
            </Alert>

            <Card className="bg-muted/30">
                <CardHeader>
                    <CardTitle className="text-lg">Exercises for Reducing Hypervigilance</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="p-4 border rounded-lg bg-background">
                        <h4 className="font-semibold flex items-center gap-2"><Eye className="size-5 text-primary" />1. Discriminating between Past and Present</h4>
                        <p className="text-sm text-muted-foreground mt-2">When you feel your alert system activating, pause and orient yourself to your current surroundings. Name 5 things you can see right now. Remind yourself: "That was then, this is now. In this moment, I am safe."</p>
                    </div>
                     <div className="p-4 border rounded-lg bg-background">
                        <h4 className="font-semibold flex items-center gap-2"><Brain className="size-5 text-primary" />2. Reality-Testing Your Thoughts</h4>
                        <p className="text-sm text-muted-foreground mt-2">When you notice a thought that assumes danger (e.g., "That person looks angry"), gently challenge it. Ask yourself: "What is the evidence for that thought? What is the evidence against it? Is there a more neutral or positive explanation?"</p>
                    </div>
                     <div className="p-4 border rounded-lg bg-background">
                        <h4 className="font-semibold flex items-center gap-2"><Eye className="size-5 text-primary" />3. Practice "Soft Eyes"</h4>
                        <p className="text-sm text-muted-foreground mt-2">Hypervigilance often involves a sharp, focused gaze. Practice softening your focus. Allow your peripheral vision to expand. Instead of scanning, let the visual field come to you. This can send a signal of safety to your nervous system.</p>
                    </div>
                     <div className="p-4 border rounded-lg bg-background">
                        <h4 className="font-semibold flex items-center gap-2"><Brain className="size-5 text-primary" />4. Behavioral Experiments</h4>
                        <p className="text-sm text-muted-foreground mt-2">If you find yourself avoiding certain places because they feel "unsafe," design a small, safe experiment. For example, go to a grocery store during a quiet time for just 5 minutes with the sole purpose of observing that nothing bad happens. Start small and build confidence. Use the "Behavioral Experiments" tool for a more structured approach.</p>
                    </div>
                </CardContent>
            </Card>

          </CardContent>
        </Card>
      </div>
    </main>
  );
}
