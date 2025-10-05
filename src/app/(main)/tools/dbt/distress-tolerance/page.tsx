
import type { Metadata } from 'next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { distressToleranceSkills } from '@/lib/data/dbt-data';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Wind } from 'lucide-react';
import { PageLayout } from '@/components/layout/page-layout';

export const metadata: Metadata = {
  title: 'Distress Tolerance Skills | Rejoyn',
};

export default function DistressTolerancePage() {
  return (
    <PageLayout title="Distress Tolerance Skills">
      <div className="space-y-8">
        <Alert>
            <Wind className="h-4 w-4" />
            <AlertTitle>Goal: Survive Crisis Moments</AlertTitle>
            <AlertDescription>
                These skills are for tolerating painful events and emotions when you cannot make things better right away. They help you get through a crisis without making it worse.
            </AlertDescription>
        </Alert>

        {distressToleranceSkills.map(skill => (
            <Card key={skill.acronym}>
                <CardHeader>
                    <div className="flex items-center gap-4">
                        <skill.icon className="size-8 text-primary" />
                        <div>
                            <CardTitle className="font-headline">{skill.acronym}: {skill.title}</CardTitle>
                            <CardDescription>{skill.description}</CardDescription>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="prose max-w-none">
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

