
import { PageLayout } from '@/components/layout/page-layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Footprints } from 'lucide-react';
import Link from 'next/link';

export default function WalkingMeditationPage() {
    return (
        <PageLayout title="Walking Meditation">
            <Card>
                <CardHeader>
                    <CardTitle className="font-headline">Walking Meditation</CardTitle>
                    <CardDescription>A form of meditation in action that practices mindfulness while walking.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <Alert>
                        <Footprints className="h-4 w-4" />
                        <AlertTitle>Goal: Awareness in Motion</AlertTitle>
                        <AlertDescription>
                            Instead of closing your eyes, you use the experience of walking to focus your attention and connect your mind and body.
                        </AlertDescription>
                    </Alert>

                    <div className="prose max-w-none">
                        <h4>How to Practice Walking Meditation</h4>
                        <ol>
                            <li>
                                <strong>Find a Path:</strong> Choose a quiet place where you can walk back and forth for 10-20 paces without interruption. This can be indoors or outdoors.
                            </li>
                            <li>
                                <strong>Stand Still:</strong> Begin by standing at one end of your path. Feel your feet on the ground. Notice the sensations of your body standing. Take a few deep breaths.
                            </li>
                            <li>
                                <strong>Begin Walking:</strong> Walk at a natural, slow pace. Pay close attention to the sensation of your feet. Notice the lifting of one foot, the movement through the air, the placement on the ground, and the shifting of weight.
                            </li>
                            <li>
                                <strong>Coordinate with Breath:</strong> You can coordinate your breath with your steps. For example, take a step as you breathe in, and another step as you breathe out. Find a rhythm that feels comfortable.
                            </li>
                            <li>
                                <strong>When the Mind Wanders:</strong> Just as in sitting meditation, your mind will wander. When you notice this, gently acknowledge the thought and guide your attention back to the physical sensation of walking.
                            </li>
                             <li>
                                <strong>Turning:</strong> When you reach the end of your path, pause for a moment. Consciously turn your body, and then begin walking back, maintaining your awareness.
                            </li>
                             <li>
                                <strong>Expand Awareness:</strong> As you get comfortable, you can expand your awareness to include the sensations in your legs and the rest of your body, the feeling of the air on your skin, and the sounds around you.
                            </li>
                        </ol>
                         <p>For more guided exercises, use the <strong>AI Guided Meditation</strong> tool and ask for a "walking meditation."</p>
                    </div>

                </CardContent>
            </Card>
        </PageLayout>
    );
}
