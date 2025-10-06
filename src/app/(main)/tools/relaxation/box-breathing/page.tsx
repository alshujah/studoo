
import { PageLayout } from '@/components/layout/page-layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Box } from 'lucide-react';
import { BoxBreathingAnimator } from './box-breathing-animator';

export default function BoxBreathingPage() {
    return (
        <PageLayout title="Box Breathing (4-4-4-4)">
            <Card>
                <CardHeader>
                    <CardTitle className="font-headline">Box Breathing Technique</CardTitle>
                    <CardDescription>A simple and effective technique for calming your nervous system and reducing stress using a guided visual.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-8">
                   <BoxBreathingAnimator />
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
                                <strong>Step 1: Inhale (4 seconds):</strong> Slowly inhale through your nose to a count of four as the box expands.
                            </li>
                            <li>
                                <strong>Step 2: Hold (4 seconds):</strong> Hold your breath for a count of four as the box stays expanded.
                            </li>
                            <li>
                                <strong>Step 3: Exhale (4 seconds):</strong> Slowly exhale through your mouth for a count of four as the box shrinks.
                            </li>
                            <li>
                                <strong>Step 4: Hold (4 seconds):</strong> Hold your breath for a count of four as the box stays small.
                            </li>
                             <li>
                                <strong>Repeat:</strong> Continue this cycle until you feel a sense of calm.
                            </li>
                        </ol>
                    </div>

                </CardContent>
            </Card>
        </PageLayout>
    );
}
