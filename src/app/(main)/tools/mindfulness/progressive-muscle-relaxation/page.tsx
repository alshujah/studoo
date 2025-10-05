
import { PageLayout } from '@/components/layout/page-layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Hand } from 'lucide-react';
import Link from 'next/link';

export default function PMRPage() {
    return (
        <PageLayout title="Progressive Muscle Relaxation">
            <Card>
                <CardHeader>
                    <CardTitle className="font-headline">Progressive Muscle Relaxation (PMR)</CardTitle>
                    <CardDescription>A deep relaxation technique based on the simple practice of tensing and then relaxing muscle groups.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <Alert>
                        <Hand className="h-4 w-4" />
                        <AlertTitle>Goal: Release Physical Tension</AlertTitle>
                        <AlertDescription>
                            By tensing and then releasing, you can become more aware of physical tension and learn to let it go, which also helps to calm the mind.
                        </AlertDescription>
                    </Alert>

                    <div className="prose max-w-none">
                        <h4>How to Practice PMR</h4>
                        <ol>
                            <li>
                                <strong>Get Comfortable:</strong> Find a quiet place where you won't be disturbed. Lie down or sit in a comfortable chair. Take a few deep breaths to begin.
                            </li>
                            <li>
                                <strong>Hands:</strong> Start by tensing the muscles in your hands and lower arms by making a tight fist. Hold for 5-10 seconds, feeling the tension. Then, release completely and notice the feeling of relaxation for 15-20 seconds.
                            </li>
                            <li>
                                <strong>Upper Arms:</strong> Tense your biceps by bringing your forearms toward your shoulders. Hold the tension, then release. Notice the difference.
                            </li>
                             <li>
                                <strong>Face:</strong> Tense your facial muscles by squinting your eyes, wrinkling your forehead, and clenching your jaw. Hold, then release. Let your jaw hang loose.
                            </li>
                             <li>
                                <strong>Shoulders and Neck:</strong> Tense your shoulders by shrugging them up towards your ears. Hold, then release, letting them drop.
                            </li>
                            <li>
                                <strong>Chest and Stomach:</strong> Tense your chest and stomach muscles by taking a deep breath and holding it. Hold, then exhale and release the tension.
                            </li>
                            <li>
                                <strong>Legs and Feet:</strong> Tense your thighs and calves. Curl your toes downward. Hold the tension, and then release everything.
                            </li>
                            <li>
                                <strong>Full Body Scan:</strong> After moving through the muscle groups, enjoy the feeling of deep relaxation for a few minutes. Scan your body for any remaining tension and consciously release it.
                            </li>
                        </ol>
                        <p>For a guided experience, try the <strong>AI Guided Meditation</strong> tool and ask for a "progressive muscle relaxation script."</p>
                    </div>
                </CardContent>
            </Card>
        </PageLayout>
    );
}
