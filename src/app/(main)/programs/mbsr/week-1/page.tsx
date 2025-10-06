
import type { Metadata } from 'next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight, Footprints, Mic, Edit, CheckSquare } from 'lucide-react';
import { PageLayout } from '@/components/layout/page-layout';

export const metadata: Metadata = {
  title: 'Week 1: Automatic Pilot | MBSR Program | Zenith Wellness',
};

export default function MbsrWeek1Page() {
  return (
    <PageLayout title="Week 1: Waking Up from Automatic Pilot">
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle className="font-headline">Introduction to Week 1</CardTitle>
                    <CardDescription>
                        This week, our focus is on recognizing the "automatic pilot" mode we so often live in. We'll begin the practice of intentionally shifting our awareness to the present moment, using the body as our primary anchor.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                     <Alert>
                        <Footprints className="h-4 w-4" />
                        <AlertTitle>Core Theme: Body as an Anchor</AlertTitle>
                        <AlertDescription>
                            Our minds are constantly wandering to the past or future. The sensations in our body, however, are always happening right now. By learning to rest our attention on physical sensations, we give ourselves an anchor to the present moment.
                        </AlertDescription>
                    </Alert>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle className="font-headline">Formal Practice: The Body Scan</CardTitle>
                    <CardDescription>
                        The main practice for this week is the Body Scan meditation. The goal is not to feel relaxed (though you might), but to bring a curious and non-judgmental awareness to the sensations in your body, moment by moment.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <p>Aim to practice the Body Scan 6 days this week, for about 30-45 minutes each time.</p>
                    <Button asChild>
                        <Link href="/tools/mindfulness/guided-meditation?topic=30-minute+body+scan+meditation">
                            <Mic className="mr-2" /> Start AI Guided Body Scan
                        </Link>
                    </Button>
                     <div className="prose max-w-none text-sm text-muted-foreground pt-4">
                        <h4>How to Practice:</h4>
                        <ol>
                            <li>Lie down on your back in a comfortable position.</li>
                            <li>Bring your attention to the sensations of your breath in your belly.</li>
                            <li>Shift your focus down to your left foot, noticing any sensations in your toes.</li>
                            <li>Slowly, "sweep" your awareness up through your body, part by part (foot, ankle, leg, etc.), noticing any and all sensations without judgment.</li>
                            <li>Once you've scanned your entire body, rest in awareness of the body as a whole, breathing.</li>
                        </ol>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle className="font-headline">Informal Practice: Mindful Activity</CardTitle>
                    <CardDescription>
                        Choose one routine activity you do every day (like brushing your teeth, drinking coffee, or washing dishes) and do it with full awareness. Pay attention to all the sensations: the sight, sound, smell, and touch involved in the activity. Notice when your mind wanders, and gently bring it back.
                    </CardDescription>
                </CardHeader>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle className="font-headline">Weekly Log & Reflection</CardTitle>
                    <CardDescription>
                        Take a few moments at the end of the week to reflect on your practice.
                    </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col sm:flex-row gap-4">
                    <Button asChild variant="outline">
                        <Link href="/track/journal/freeform">
                            <Edit className="mr-2" /> Write a Journal Entry
                        </Link>
                    </Button>
                     <Button asChild variant="outline">
                        <Link href="/track/activity-log">
                            <CheckSquare className="mr-2" /> Log Your Practice
                        </Link>
                    </Button>
                </CardContent>
            </Card>
            
            <div className="flex justify-end">
                <Button asChild>
                    <Link href="/programs/mbsr/week-2">
                        Proceed to Week 2 <ArrowRight className="ml-2" />
                    </Link>
                </Button>
            </div>
        </div>
    </PageLayout>
  );
}
