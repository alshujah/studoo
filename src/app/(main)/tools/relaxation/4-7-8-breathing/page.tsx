
import { PageLayout } from '@/components/layout/page-layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Zap } from 'lucide-react';
import Link from 'next/link';

export default function Breathing478Page() {
    return (
        <PageLayout title="4-7-8 Breathing Technique">
            <Card>
                <CardHeader>
                    <CardTitle className="font-headline">The 4-7-8 Breathing Technique</CardTitle>
                    <CardDescription>A simple but powerful breathing exercise, also known as "relaxing breath," that promotes calm and can help you fall asleep.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <Alert>
                        <Zap className="h-4 w-4" />
                        <AlertTitle>Goal: Activate the Relaxation Response</AlertTitle>
                        <AlertDescription>
                           This technique is designed to activate your parasympathetic nervous system, which is responsible for rest and digestion.
                        </AlertDescription>
                    </Alert>

                    <div className="prose max-w-none">
                        <h4>How to Practice 4-7-8 Breathing</h4>
                        <ol>
                            <li>
                                <strong>Preparation:</strong> Sit or lie down in a comfortable position. Place the tip of your tongue against the ridge of tissue just behind your upper front teeth and keep it there throughout the entire exercise.
                            </li>
                            <li>
                                <strong>Exhale Completely:</strong> Exhale completely through your mouth, making a whoosh sound.
                            </li>
                            <li>
                                <strong>Inhale (4 seconds):</strong> Close your mouth and inhale quietly through your nose to a mental count of <strong>four</strong>.
                            </li>
                            <li>
                                <strong>Hold Your Breath (7 seconds):</strong> Hold your breath for a count of <strong>seven</strong>.
                            </li>
                            <li>
                                <strong>Exhale (8 seconds):</strong> Exhale completely through your mouth, making a whoosh sound to a count of <strong>eight</strong>.
                            </li>
                             <li>
                                <strong>Repeat:</strong> This is one breath. Now inhale again and repeat the cycle three more times for a total of four breaths.
                            </li>
                        </ol>
                        <p>Practice this at least twice a day, but you can do it more often if you like. Do not do more than four breaths at one time for the first month of practice. You can gradually increase it to eight breaths after a month.</p>
                        <p>For more guided exercises, use the <strong>AI Guided Meditation</strong> tool and ask for a "4-7-8 breathing exercise."</p>
                    </div>

                </CardContent>
            </Card>
        </PageLayout>
    );
}
