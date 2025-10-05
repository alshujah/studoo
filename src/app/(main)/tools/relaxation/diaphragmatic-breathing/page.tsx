
import { PageLayout } from '@/components/layout/page-layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { ArrowDownUp } from 'lucide-react';
import Link from 'next/link';

export default function DiaphragmaticBreathingPage() {
    return (
        <PageLayout title="Diaphragmatic Breathing">
            <Card>
                <CardHeader>
                    <CardTitle className="font-headline">Diaphragmatic (Belly) Breathing</CardTitle>
                    <CardDescription>A foundational relaxation technique that encourages full oxygen exchange and can slow the heartbeat and stabilize blood pressure.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <Alert>
                        <ArrowDownUp className="h-4 w-4" />
                        <AlertTitle>Goal: Engage Your Diaphragm</AlertTitle>
                        <AlertDescription>
                           Many of us breathe shallowly from our chest. Belly breathing helps you use your diaphragm, the large muscle at the base of the lungs, for a deeper, more relaxing breath.
                        </AlertDescription>
                    </Alert>

                    <div className="prose max-w-none">
                        <h4>How to Practice Diaphragmatic Breathing</h4>
                        <ol>
                            <li>
                                <strong>Get Comfortable:</strong> Lie on your back on a flat surface with your knees bent, or sit in a chair with your back straight.
                            </li>
                            <li>
                                <strong>Hand Placement:</strong> Place one hand on your upper chest and the other hand on your belly, just below your rib cage.
                            </li>
                            <li>
                                <strong>Breathe In:</strong> Breathe in slowly through your nose. As you inhale, feel your stomach rise and push your hand up. Try to keep the hand on your chest as still as possible.
                            </li>
                            <li>
                                <strong>Breathe Out:</strong> Tighten your stomach muscles and let them fall inward as you exhale through pursed lips (like you're whistling). The hand on your chest should remain as still as possible.
                            </li>
                             <li>
                                <strong>Continue:</strong> Practice this for 5 to 10 minutes, 2-3 times per day. As you get more comfortable, you can practice without placing hands on your chest and belly.
                            </li>
                        </ol>
                        <p>For a guided experience, use the <strong>AI Guided Meditation</strong> tool and ask for a "belly breathing meditation."</p>
                    </div>
                </CardContent>
            </Card>
        </PageLayout>
    );
}
