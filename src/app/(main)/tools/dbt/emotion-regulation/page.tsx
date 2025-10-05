
import type { Metadata } from 'next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { emotionRegulationSkills } from '@/lib/data/dbt-emotion-regulation-data';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { SlidersHorizontal } from 'lucide-react';
import { PageLayout } from '@/components/layout/page-layout';


export const metadata: Metadata = {
  title: 'Emotion Regulation Skills | Rejoyn',
};

export default function EmotionRegulationPage() {
  return (
    <PageLayout title="Emotion Regulation Skills">
        <div className="space-y-8">
            <Alert>
                <SlidersHorizontal className="h-4 w-4" />
                <AlertTitle>Goal: Understand and Change Your Emotions</AlertTitle>
                <AlertDescription>
                    These skills help you understand what emotions do for you, reduce your emotional vulnerability, and decrease emotional suffering.
                </AlertDescription>
            </Alert>

            {emotionRegulationSkills.map(skill => (
                <Card key={skill.title}>
                    <CardHeader>
                         <div className="flex items-center gap-4">
                            <skill.icon className="size-8 text-primary" />
                            <div>
                                <CardTitle className="font-headline">{skill.title}</CardTitle>
                                <CardDescription>{skill.description}</CardDescription>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent className="prose max-w-none">
                        {skill.pretext && <p>{skill.pretext}</p>}
                        <ul>
                            {skill.steps.map(step => (
                                <li key={step.name}>
                                    <strong>{step.name}:</strong> {step.detail}
                                </li>
                            ))}
                        </ul>
                    </CardContent>
                </Card>
            ))}
        </div>
    </PageLayout>
  );
}
