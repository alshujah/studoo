
import type { Metadata } from 'next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Lightbulb, Scan, Footprints } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'MBSR Week 1 | Rejoyn',
};

export default function MbsrWeek1Page() {
  return (
    <main className="flex flex-1 flex-col">
      <div className="sticky top-0 z-10 flex h-14 items-center border-b bg-background px-6">
        <h1 className="font-headline text-xl font-semibold">MBSR: Week 1</h1>
      </div>
      <div className="flex-1 p-4 md:p-6 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="font-headline">Waking Up from Automatic Pilot</CardTitle>
            <CardDescription>
              This week's theme is about recognizing how often we operate on "automatic pilot," lost in thought and disconnected from the present moment. Mindfulness is the practice of waking up from this state.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Alert>
              <Lightbulb className="h-4 w-4" />
              <AlertTitle>Core Idea: Being vs. Doing</AlertTitle>
              <AlertDescription>
                Our minds are often in "doing mode"—analyzing, planning, and problem-solving. Mindfulness introduces "being mode," where we simply allow ourselves to be present with our experience as it is, without needing to change anything.
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>

        <Card>
            <CardHeader>
                <CardTitle className="text-2xl font-headline flex items-center gap-3"><Scan className="size-6 text-primary" />Formal Practice: The Body Scan Meditation</CardTitle>
                <CardDescription>The core formal practice for this week is the Body Scan Meditation. The goal is to bring a curious, non-judgmental awareness to different parts of your body, one by one.</CardDescription>
            </CardHeader>
            <CardContent className="prose prose-sm max-w-none text-foreground">
                <p>This is not a relaxation exercise, though you might feel relaxed. The intention is to practice paying attention and to become more familiar with the landscape of your body. You can find a guided version of this practice in our tools.</p>
                <Link href="/tools/mindfulness/body-scan" className="text-primary underline">Go to Body Scan Meditation script</Link>
            </CardContent>
        </Card>

         <Card>
            <CardHeader>
                <CardTitle className="text-2xl font-headline flex items-center gap-3"><Footprints className="size-6 text-primary" />Informal Practice: Mindful Routine Activity</CardTitle>
                <CardDescription>The informal practice is about bringing mindfulness to everyday life.</CardDescription>
            </CardHeader>
            <CardContent className="prose prose-sm max-w-none text-foreground">
               <p>Choose one routine activity that you usually do on autopilot (like brushing your teeth, washing dishes, or taking a shower). For this week, try to do it with full awareness.</p>
               <ul>
                    <li>Notice all the sensations involved: the feel of the water, the smell of the soap, the movement of your muscles.</li>
                    <li>When your mind wanders (which it will!), gently notice where it went and then guide your attention back to the activity.</li>
                    <li>The goal isn't to do the activity perfectly, but to practice returning to the present moment again and again.</li>
               </ul>
            </CardContent>
        </Card>

      </div>
    </main>
  );
}
