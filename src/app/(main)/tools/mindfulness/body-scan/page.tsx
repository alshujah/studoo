
import { PageLayout } from '@/components/layout/page-layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Footprints } from 'lucide-react';

export default function BodyScanPage() {
    return (
        <PageLayout title="The Body Scan">
            <Card>
                <CardHeader>
                    <CardTitle className="font-headline">Body Scan Meditation</CardTitle>
                    <CardDescription>A foundational mindfulness practice to connect with your physical self and cultivate awareness.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <Alert>
                        <Footprints className="h-4 w-4" />
                        <AlertTitle>Goal: Non-Judgmental Awareness</AlertTitle>
                        <AlertDescription>
                            The aim is not to change or fix any sensation, but simply to notice it as it is. Whether it's warmth, tingling, tightness, or nothing at all, your only job is to be aware.
                        </AlertDescription>
                    </Alert>

                    <div className="prose max-w-none">
                        <h4>How to Practice the Body Scan</h4>
                        <ol>
                            <li>
                                <strong>Get Comfortable:</strong> Lie down on your back, if possible, or sit comfortably in a chair. Let your arms rest by your sides, palms up, and your feet fall gently apart. Close your eyes if you feel comfortable doing so.
                            </li>
                            <li>
                                <strong>Bring Awareness to Breath:</strong> Start by bringing your attention to the sensation of your breath. Notice the rise and fall of your abdomen without trying to change your breathing in any way.
                            </li>
                            <li>
                                <strong>Focus on the Toes:</strong> Direct your attention to the toes of your left foot. Notice any sensations—tingling, warmth, coolness, pressure, or even a lack of sensation. Spend about 30 seconds here.
                            </li>
                            <li>
                                <strong>Move Through the Body:</strong> Slowly, begin to move your awareness up through your body, part by part: the sole of the foot, the heel, the ankle, the lower leg, the knee, the thigh. Spend time with each part, simply noticing.
                            </li>
                            <li>
                                <strong>Scan Both Sides:</strong> Repeat the process for your right leg. Then move your awareness up through your pelvis, your lower back, your abdomen, your chest, your upper back, and your shoulders.
                            </li>
                             <li>
                                <strong>Scan the Arms and Hands:</strong> Bring your attention down one arm to your fingertips, and then back up the other arm.
                            </li>
                             <li>
                                <strong>Focus on the Head and Face:</strong> Finally, move your awareness to your neck, throat, face, and the top of your head. Notice the small muscles around your eyes, jaw, and forehead.
                            </li>
                             <li>
                                <strong>Expand to the Whole Body:</strong> Once you have scanned each part, try to feel your body as a whole, breathing. Rest in this full-body awareness for a few minutes.
                            </li>
                             <li>
                                <strong>Gently Return:</strong> When you are ready, gently bring your awareness back to the room. Wiggle your fingers and toes, and open your eyes when you feel ready.
                            </li>
                        </ol>
                        <p>For a guided experience, try the <strong>AI Guided Meditation</strong> tool and ask for a "body scan meditation."</p>
                    </div>

                </CardContent>
            </Card>
        </PageLayout>
    );
}
