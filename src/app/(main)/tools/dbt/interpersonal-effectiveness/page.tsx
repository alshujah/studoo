

import type { Metadata } from 'next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { interpersonalEffectivenessSkills } from '@/lib/data/dbt-interpersonal-effectiveness-data';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Users, Target, ArrowRight } from 'lucide-react';
import { PageLayout } from '@/components/layout/page-layout';
import Link from 'next/link';


export const metadata: Metadata = {
  title: 'Interpersonal Effectiveness Skills | Rejoyn',
};

const interactiveTools = [
    {
        href: "/tools/dbt/interpersonal-effectiveness/dear-man",
        title: "DEAR MAN Script Builder",
        description: "Practice getting what you want effectively.",
        icon: Target
    }
]

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
            
            <Card>
                <CardHeader>
                    <CardTitle className="font-headline">Interactive Tools</CardTitle>
                </CardHeader>
                <CardContent className="grid md:grid-cols-2 gap-4">
                     {interactiveTools.map(tool => (
                        <Link href={tool.href} key={tool.href} className="block hover:bg-muted/20 p-4 border rounded-lg">
                            <div className="flex items-center gap-4 mb-2">
                                <tool.icon className="size-6 text-primary" />
                                <h3 className="font-semibold">{tool.title}</h3>
                            </div>
                            <p className="text-sm text-muted-foreground">{tool.description}</p>
                             <div className="flex items-center text-primary text-sm font-semibold mt-4">
                                <span>Start Exercise</span>
                                <ArrowRight className="size-4 ml-2" />
                            </div>
                        </Link>
                    ))}
                </CardContent>
            </Card>


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
