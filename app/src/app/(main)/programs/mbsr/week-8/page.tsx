
import type { Metadata } from 'next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeft, PartyPopper } from 'lucide-react';
import { PageLayout } from '@/components/layout/page-layout';

export const metadata: Metadata = {
  title: 'Week 8: A Mindful Life | MBSR Program | Zenith Wellness',
};

export default function MbsrWeek8Page() {
  return (
    <PageLayout title="Week 8: A Mindful Life">
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle className="font-headline">Conclusion: The End of the Beginning</CardTitle>
                    <CardDescription>
                        Congratulations on completing the 8-week program! This is not an end, but the beginning of a new way of being in the world. This week, we reflect on our journey, acknowledge our progress, and make a plan for continuing the practice.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                     <Alert>
                        <PartyPopper className="h-4 w-4" />
                        <AlertTitle>Core Theme: Continuing the Journey</AlertTitle>
                        <AlertDescription>
                            Mindfulness is a lifelong practice. The skills you've learned over the past eight weeks are now part of your toolkit. The challenge and opportunity is to keep using them, to keep beginning again, moment by moment.
                        </AlertDescription>
                    </Alert>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle className="font-headline">Planning for Your Future Practice</CardTitle>
                    <CardDescription>
                        Consistency is key. It's helpful to make a realistic plan for how you will continue to practice.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4 prose max-w-none">
                    <p>Consider the following questions and perhaps write about them in your journal:</p>
                    <ul>
                        <li>What have I learned about myself over these eight weeks?</li>
                        <li>Which formal practices (Body Scan, Sitting Meditation, Mindful Movement) have been most helpful?</li>
                        <li>Which informal practices have I found easiest to integrate into my day?</li>
                        <li>What is a realistic commitment I can make to formal practice going forward? (e.g., "15 minutes, 4 days a week")</li>
                        <li>What resources or tools in this app can continue to support me?</li>
                    </ul>
                    <Button asChild variant="outline">
                        <Link href="/track/journal/freeform">
                            Write Your Reflection
                        </Link>
                    </Button>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle className="font-headline">Final Encouragement</CardTitle>
                    <CardDescription>
                        Remember that there is no perfect way to practice. Some days will be easy, and some will be hard. The most important thing is to simply show up, be kind to yourself, and begin again. Thank you for taking this journey.
                    </CardDescription>
                </CardHeader>
            </Card>
            
            <div className="flex justify-between">
                <Button asChild variant="outline">
                    <Link href="/programs/mbsr/week-7">
                        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Week 7
                    </Link>
                </Button>
                <Button asChild>
                    <Link href="/programs/mbsr">
                         Back to Program Overview
                    </Link>
                </Button>
            </div>
        </div>
    </PageLayout>
  );
}
