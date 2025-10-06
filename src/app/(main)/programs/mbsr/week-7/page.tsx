
import type { Metadata } from 'next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, Sprout, Mic } from 'lucide-react';
import { PageLayout } from '@/components/layout/page-layout';

export const metadata: Metadata = {
  title: 'Week 7: Taking Care of Myself | MBSR Program | Zenith Wellness',
};

export default function MbsrWeek7Page() {
  return (
    <PageLayout title="Week 7: How Can I Best Take Care of Myself?">
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle className="font-headline">Introduction to Week 7</CardTitle>
                    <CardDescription>
                        As we near the end of the program, our focus shifts to integration. How can we weave mindfulness into the fabric of our daily lives as an act of self-care? This week is about choosing practices that nourish you and making mindfulness your own.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                     <Alert>
                        <Sprout className="h-4 w-4" />
                        <AlertTitle>Core Theme: Integrating Mindfulness</AlertTitle>
                        <AlertDescription>
                            The goal of MBSR is not to become a "good meditator," but to live with more awareness, kindness, and wisdom. This week, we experiment with different practices to see what best supports us in our daily lives.
                        </AlertDescription>
                    </Alert>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle className="font-headline">Formal Practice: Choosing Your Practice</CardTitle>
                    <CardDescription>
                        This week, you have a choice. You can continue with Sitting Meditation, return to the Body Scan, or try Mindful Movement. You might also explore a Loving-Kindness meditation, which is a wonderful practice for self-care. Choose what feels most needed and nourishing for you right now.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <p>Practice for at least 20 minutes, 6 days this week, choosing the form that serves you best.</p>
                    <div className="flex flex-wrap gap-2">
                        <Button asChild>
                            <Link href="/tools/mindfulness/guided-meditation?topic=loving-kindness+meditation">
                                <Mic className="mr-2" /> Try Loving-Kindness
                            </Link>
                        </Button>
                        <Button asChild variant="outline">
                            <Link href="/tools/mindfulness/guided-meditation?topic=body+scan+meditation">
                                <Mic className="mr-2" /> Revisit Body Scan
                            </Link>
                        </Button>
                        <Button asChild variant="outline">
                            <Link href="/tools/mindfulness/guided-meditation?topic=sitting+meditation">
                                <Mic className="mr-2" /> Continue Sitting
                            </Link>
                        </Button>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle className="font-headline">Informal Practice: A Mindful Pause</CardTitle>
                    <CardDescription>
                        Several times a day, intentionally pause. Take just three conscious breaths. Notice: What is happening right now? What do you need? This simple "STOP" (Stop, Take a breath, Observe, Proceed) practice can be a powerful form of self-care throughout your day.
                    </CardDescription>
                </CardHeader>
            </Card>
            
            <div className="flex justify-between">
                <Button asChild variant="outline">
                    <Link href="/programs/mbsr/week-6">
                        <ArrowLeft className="mr-2" /> Back to Week 6
                    </Link>
                </Button>
                <Button asChild>
                    <Link href="/programs/mbsr/week-8">
                        Proceed to Week 8 <ArrowRight className="ml-2" />
                    </Link>
                </Button>
            </div>
        </div>
    </PageLayout>
  );
}
