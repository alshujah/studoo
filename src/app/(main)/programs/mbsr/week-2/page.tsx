
import type { Metadata } from 'next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, Sun, Mic, Edit, CheckSquare } from 'lucide-react';
import { PageLayout } from '@/components/layout/page-layout';

export const metadata: Metadata = {
  title: 'Week 2: Pleasant Events | MBSR Program | Zenith Wellness',
};

export default function MbsrWeek2Page() {
  return (
    <PageLayout title="Week 2: Mindful Awareness of Pleasant Events">
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle className="font-headline">Introduction to Week 2</CardTitle>
                    <CardDescription>
                        This week, we shift our focus from the broad Body Scan to the more subtle sensations of the breath in Sitting Meditation. We also begin to train our minds to notice the good that is already present in our lives through the Pleasant Events Calendar.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                     <Alert>
                        <Sun className="h-4 w-4" />
                        <AlertTitle>Core Theme: Perception and Awareness</AlertTitle>
                        <AlertDescription>
                            Our minds have a negativity bias, often focusing on what's wrong. This week is about intentionally shifting our perception to also include what is pleasant, no matter how small.
                        </AlertDescription>
                    </Alert>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle className="font-headline">Formal Practice: Sitting Meditation</CardTitle>
                    <CardDescription>
                        The main formal practice this week is a 10-20 minute sitting meditation focused on the breath. The goal is to anchor your awareness in the simple, rhythmic sensation of breathing.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <p>Aim to practice Sitting Meditation 6 days this week. You can continue with the Body Scan as well, perhaps alternating days.</p>
                    <Button asChild>
                        <Link href="/tools/mindfulness/guided-meditation?topic=10-minute+sitting+meditation+for+beginners">
                            <Mic className="mr-2" /> Start AI Guided Sitting Meditation
                        </Link>
                    </Button>
                     <div className="prose max-w-none text-sm text-muted-foreground pt-4">
                        <h4>How to Practice:</h4>
                        <ol>
                            <li>Find a comfortable but upright sitting posture. Your back should be straight but not stiff.</li>
                            <li>Gently close your eyes and bring your attention to the place in your body where you feel the breath most clearly (e.g., the nostrils, the chest, the belly).</li>
                            <li>Rest your awareness on the sensation of the breath, following it all the way in and all the way out.</li>
                            <li>When your mind wanders (which it will), gently notice where it went, and then kindly escort your attention back to the breath.</li>
                            <li>Continue this for the duration of your practice.</li>
                        </ol>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle className="font-headline">Informal Practice: Pleasant Events Calendar</CardTitle>
                    <CardDescription>
                        Each day, make a note of one pleasant event. It doesn't have to be a big event. The key is to notice the pleasant physical and emotional sensations that came with it.
                    </CardDescription>
                </CardHeader>
                 <CardContent className="flex flex-col sm:flex-row gap-4">
                    <Button asChild variant="outline">
                        <Link href="/track/journal/gratitude">
                            <Edit className="mr-2" /> Log a Pleasant Event
                        </Link>
                    </Button>
                </CardContent>
            </Card>
            
            <div className="flex justify-between">
                <Button asChild variant="outline">
                    <Link href="/programs/mbsr/week-1">
                        <ArrowLeft className="mr-2" /> Back to Week 1
                    </Link>
                </Button>
                <Button asChild>
                    <Link href="/programs/mbsr/week-3">
                        Proceed to Week 3 <ArrowRight className="ml-2" />
                    </Link>
                </Button>
            </div>
        </div>
    </PageLayout>
  );
}
