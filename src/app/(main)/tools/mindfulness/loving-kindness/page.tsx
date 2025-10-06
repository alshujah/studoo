
import { PageLayout } from '@/components/layout/page-layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Heart } from 'lucide-react';
import Link from 'next/link';

export default function LovingKindnessPage() {
    return (
        <PageLayout title="Loving-Kindness Meditation">
            <Card>
                <CardHeader>
                    <CardTitle className="font-headline">Loving-Kindness Meditation (Metta)</CardTitle>
                    <CardDescription>A powerful practice for cultivating compassion, connection, and warmth towards yourself and others.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <Alert>
                        <Heart className="h-4 w-4" />
                        <AlertTitle>Goal: Develop Unconditional, Inclusive Love</AlertTitle>
                        <AlertDescription>
                            The practice involves silently repeating phrases that express benevolent wishes, directing them in sequence toward yourself, loved ones, neutral people, difficult people, and finally all living beings.
                        </AlertDescription>
                    </Alert>

                    <div className="prose max-w-none">
                        <h4>Core Phrases</h4>
                        <p>The traditional phrases are, but you can adapt them to what feels most authentic to you:</p>
                        <ul>
                            <li>May I be happy.</li>
                            <li>May I be safe.</li>
                            <li>May I be healthy.</li>
                            <li>May I live with ease.</li>
                        </ul>

                        <h4>How to Practice Loving-Kindness Meditation</h4>
                        <ol>
                            <li>
                                <strong>Get Comfortable:</strong> Find a relaxed, comfortable posture. You can sit in a chair or on a cushion. Gently close your eyes and take a few deep breaths to settle in.
                            </li>
                            <li>
                                <strong>Start with Yourself:</strong> Begin by offering the phrases to yourself. Silently repeat: "May I be happy. May I be safe. May I be healthy. May I live with ease." Try to connect with the intention behind the words.
                            </li>
                            <li>
                                <strong>A Loved One:</strong> Now, bring to mind someone you care about deeply, a good friend or family member. Picture them clearly and extend the phrases to them: "May you be happy. May you be safe. May you be healthy. May you live with ease."
                            </li>
                            <li>
                                <strong>A Neutral Person:</strong> Think of someone you don't know well, someone you feel neutral about—perhaps a cashier at a store or a person you see on your commute. Extend the same wishes to them: "May you be happy. May you be safe..."
                            </li>
                            <li>
                                <strong>A Difficult Person:</strong> This can be challenging. Bring to mind someone with whom you have a difficult relationship. If this is too hard, you can skip this step or choose someone only mildly irritating. Extend the phrases to them as an act of generosity: "May you be happy. May you be safe..."
                            </li>
                             <li>
                                <strong>All Beings:</strong> Finally, expand your awareness to include all living beings everywhere, without exception. Extend the phrases to everyone: "May all beings be happy. May all beings be safe. May all beings be healthy. May all beings live with ease."
                            </li>
                             <li>
                                <strong>Conclude:</strong> Rest for a few moments, noticing the feelings in your body and heart. When you're ready, gently open your eyes.
                            </li>
                        </ol>
                        <p>For a guided experience, use the <strong>AI Guided Meditation</strong> tool and ask for a "loving-kindness meditation."</p>
                    </div>

                </CardContent>
            </Card>
        </PageLayout>
    );
}
