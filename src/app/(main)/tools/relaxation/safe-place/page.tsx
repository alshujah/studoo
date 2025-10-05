
import { PageLayout } from '@/components/layout/page-layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Shield } from 'lucide-react';
import Link from 'next/link';

export default function SafePlacePage() {
    return (
        <PageLayout title="Safe Place Visualization">
            <Card>
                <CardHeader>
                    <CardTitle className="font-headline">Creating a Safe Place</CardTitle>
                    <CardDescription>A guided imagery exercise to create a mental sanctuary you can return to whenever you feel overwhelmed or distressed.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <Alert>
                        <Shield className="h-4 w-4" />
                        <AlertTitle>Goal: Cultivate Inner Calm and Safety</AlertTitle>
                        <AlertDescription>
                            Your imagination is a powerful tool. By creating a detailed, positive mental image, you can evoke feelings of peace and security in your body.
                        </AlertDescription>
                    </Alert>

                    <div className="prose max-w-none">
                        <h4>How to Create Your Safe Place</h4>
                        <ol>
                            <li>
                                <strong>Find a Quiet Space:</strong> Sit or lie down comfortably where you won't be disturbed. Close your eyes and take a few deep breaths.
                            </li>
                            <li>
                                <strong>Imagine Your Place:</strong> Think of a place where you feel completely safe, calm, and happy. This can be a real place you've been to (like a beach or a forest) or a completely imaginary one (like a cozy hobbit-hole or a cloud castle).
                            </li>
                            <li>
                                <strong>Engage All Your Senses:</strong> Make the image as vivid as possible by engaging all five senses.
                                <ul>
                                    <li><strong>Sight:</strong> What do you see? Notice the colors, the light, the objects around you.</li>
                                    <li><strong>Sound:</strong> What do you hear? The sound of waves, birds chirping, gentle music, or peaceful silence.</li>
                                    <li><strong>Smell:</strong> What do you smell? The scent of pine trees, salt water, or baking bread.</li>
                                    <li><strong>Touch:</strong> What do you feel? The warmth of the sun on your skin, a soft blanket, the cool grass beneath your feet.</li>
                                    <li><strong>Taste:</strong> Is there a taste associated with this place? Perhaps a favorite warm drink or a fresh piece of fruit.</li>
                                </ul>
                            </li>
                             <li>
                                <strong>Anchor the Feeling:</strong> As you immerse yourself in this place, notice the feeling of calm and safety in your body. Give this feeling a word, like "Peace," "Calm," or "Safe."
                            </li>
                             <li>
                                <strong>Practice Visiting:</strong> Spend a few minutes in your safe place. Know that you can return here anytime you need to. When you're ready, gently bring your awareness back to the present moment.
                            </li>
                        </ol>
                        <p>For a guided experience, try the <strong>AI Guided Meditation</strong> tool and ask for a "safe place visualization."</p>
                    </div>

                </CardContent>
            </Card>
        </PageLayout>
    );
}
