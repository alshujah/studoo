
import { PageLayout } from '@/components/layout/page-layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Anchor } from 'lucide-react';
import Link from 'next/link';

export default function GroundingPage() {
    return (
        <PageLayout title="Grounding Techniques">
            <Card>
                <CardHeader>
                    <CardTitle className="font-headline">The 5-4-3-2-1 Grounding Technique</CardTitle>
                    <CardDescription>A simple, powerful technique to bring you back to the present moment when feeling overwhelmed, anxious, or dissociated.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <Alert>
                        <Anchor className="h-4 w-4" />
                        <AlertTitle>Goal: Reconnect with the Present</AlertTitle>
                        <AlertDescription>
                           This technique works by deliberately engaging all five of your senses to gently pull your mind away from distressing thoughts or feelings and anchor it in your immediate environment.
                        </AlertDescription>
                    </Alert>

                    <div className="prose max-w-none">
                        <h4>How to Practice the 5-4-3-2-1 Technique</h4>
                        <p>Wherever you are, take a slow, deep breath and begin to notice the following:</p>
                        <ol>
                            <li>
                                <strong>5 Things You Can SEE:</strong> Look around you and find five different objects. Acknowledge them silently in your head. For example, "I see the blue pen," "I see the clock on the wall," "I see the leaves on the tree outside."
                            </li>
                            <li>
                                <strong>4 Things You Can FEEL:</strong> Bring your awareness to the physical sensations in your body. Notice four things you can touch or feel. For example, "I feel the soft fabric of my sweater," "I feel my feet flat on the floor," "I feel the cool surface of the table," "I feel the tension in my shoulders."
                            </li>
                            <li>
                                <strong>3 Things You Can HEAR:</strong> Listen carefully and identify three distinct sounds. It could be the hum of a computer, birds chirping, or the distant sound of traffic.
                            </li>
                            <li>
                                <strong>2 Things You Can SMELL:</strong> Try to identify two different smells in your environment. This might be the scent of your coffee, the soap on your hands, or the smell of rain. If you can't identify a smell, just notice the air itself.
                            </li>
                             <li>
                                <strong>1 Thing You Can TASTE:</strong> Focus on one thing you can taste. It could be the lingering taste of your last meal, or you can simply notice the taste inside your mouth.
                            </li>
                        </ol>
                        <p>After completing the exercise, take another deep breath. You can repeat this as many times as you need. For more exercises, see the <Link href="/tools/relaxation">Relaxation Techniques</Link> page.</p>
                    </div>

                </CardContent>
            </Card>
        </PageLayout>
    );
}
