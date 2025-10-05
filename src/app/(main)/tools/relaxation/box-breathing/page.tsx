
import { PageLayout } from '@/components/layout/page-layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Box } from 'lucide-react';
import Link from 'next/link';

export default function BoxBreathingPage() {
    return (
        <PageLayout title="Box Breathing (4-4-4-4)">
            <Card>
                <CardHeader>
                    <CardTitle className="font-headline">Box Breathing Technique</CardTitle>
                    <CardDescription>A simple and effective technique for calming your nervous system and reducing stress.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <Alert>
                        <Box className="h-4 w-4" />
                        <AlertTitle>Goal: Regulate Your Breath and Focus</AlertTitle>
                        <AlertDescription>
                            By creating a "box" with your breath, you give your mind a simple, rhythmic pattern to focus on, which can quiet anxious thoughts.
                        </AlertDescription>
                    </Alert>

                    <div className="prose max-w-none">
                        <h4>How to Practice Box Breathing</h4>
                        <ol>
                            <li>
                                <strong>Step 1: Inhale (4 seconds):</strong> Slowly inhale through your nose to a count of four. Feel the air fill your lungs.
                            </li>
                            <li>
                                <strong>Step 2: Hold (4 seconds):</strong> Hold your breath for a count of four. Try not to clamp your mouth or throat shut. Simply pause.
                            </li>
                            <li>
                                <strong>Step 3: Exhale (4 seconds):</strong> Slowly exhale through your mouth for a count of four.
                            </li>
                            <li>
                                <strong>Step 4: Hold (4 seconds):</strong> Hold your breath for a count of four before starting the next cycle.
                            </li>
                             <li>
                                <strong>Repeat:</strong> Continue this cycle for 1-5 minutes, or until you feel a sense of calm.
                            </li>
                        </ol>
                        <p>For a guided experience, use the <strong>AI Guided Meditation</strong> tool and ask for a "box breathing exercise."</p>
                    </div>

                </CardContent>
            </Card>
        </PageLayout>
    );
}
