
import type { Metadata } from 'next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { interpersonalEffectivenessSkills } from '@/lib/data/dbt-interpersonal-effectiveness-data';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Users } from 'lucide-react';
import { PageLayout } from '@/components/layout/page-layout';


export const metadata: Metadata = {
  title: 'Interpersonal Effectiveness Skills | Rejoyn',
};

export default function InterpersonalEffectivenessPage() {
  return (
    <PageLayout title="Interpersonal Effectiveness Skills">
        <div className="space-y-8">
            <Alert>
                <Users className="h-4 w-4" />
                <AlertTitle>Goal: Build Healthy Relationships</AlertTitle>
                <AlertDescription>
                    These skills help you ask for what you need, say no, and navigate conflict while maintaining your self-respect and healthy relationships.
                </AlertDescription>
            </Alert>

            {interpersonalEffectivenessSkills.map(skill => (
                <Card key={skill.acronym}>
                    <CardHeader>
                        <div className="flex items-center gap-4">
                            <skill.icon className="size-8 text-primary" />
                            <div>
                                <p className="font-bold text-primary">{skill.title}</p>
                                <CardTitle className="font-headline">{skill.acronym}</CardTitle>
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
