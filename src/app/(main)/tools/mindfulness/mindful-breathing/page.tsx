
import { PageLayout } from '@/components/layout/page-layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Lung } from 'lucide-react';
import Link from 'next/link';

export default function MindfulBreathingPage() {
    return (
        <PageLayout title="Mindful Breathing">
            <Card>
                <CardHeader>
                    <CardTitle className="font-headline">Mindful Breathing Exercise</CardTitle>
                    <CardDescription>An exercise to anchor you in the present moment using the natural rhythm of your breath.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <Alert>
                        <Lung className="h-4 w-4" />
                        <AlertTitle>Goal: Anchor in the Now</AlertTitle>
                        <AlertDescription>
                            Your breath is always with you, in the present moment. By focusing on it, you can gently pull your mind away from worries about the past or future.
                        </AlertDescription>
                    </Alert>

                    <div className="prose max-w-none">
                        <h4>How to Practice Mindful Breathing</h4>
                        <ol>
                            <li>
                                <strong>Find a Comfortable Position:</strong> Sit upright in a chair with your feet flat on the floor, or sit cross-legged on a cushion. Your posture should be dignified but not stiff.
                            </li>
                            <li>
                                <strong>Notice Your Breath:</strong> Gently close your eyes or lower your gaze. Bring your attention to the physical sensation of breathing. Notice where you feel it most vividly—in the abdomen, the chest, or the nostrils.
                            </li>
                            <li>
                                <strong>Stay with the Sensation:</strong> Rest your awareness on this sensation of breathing in and breathing out. You don't need to change your breath; just observe it.
                            </li>
                            <li>
                                <strong>When the Mind Wanders:</strong> Your mind will inevitably wander. This is not a mistake. When you notice your thoughts have drifted, gently acknowledge where they went and then softly guide your attention back to your breath.
                            </li>
                            <li>
                                <strong>Be Kind to Yourself:</strong> You may have to bring your attention back dozens of times. The practice is the gentle returning, not in achieving a perfectly still mind. Treat yourself with kindness each time you notice you've wandered.
                            </li>
                             <li>
                                <strong>Continue for a Few Minutes:</strong> Start with just 3-5 minutes. As you get more comfortable, you can extend the time.
                            </li>
                             <li>
                                <strong>Gently Conclude:</strong> When your time is up, broaden your awareness to include the sounds around you and the feeling of your body. When you're ready, slowly open your eyes.
                            </li>
                        </ol>
                        <p>For more structured breathing exercises, check out the <Link href="/tools/relaxation">Relaxation Techniques</Link> page, or use the <strong>AI Guided Meditation</strong> tool and ask for a "breathing meditation."</p>
                    </div>

                </CardContent>
            </Card>
        </PageLayout>
    );
}
