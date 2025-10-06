
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import type { Metadata } from 'next';
import Link from 'next/link';
import { PageLayout } from '@/components/layout/page-layout';
import { interpersonalEffectivenessSkills } from '@/lib/data/dbt-interpersonal-effectiveness-data';
import { distressToleranceSkills } from '@/lib/data/dbt-data';
import { emotionRegulationSkills } from '@/lib/data/dbt-emotion-regulation-data';
import { Badge } from '@/components/ui/badge';

export const metadata: Metadata = {
  title: 'DBT Tools | Zenith',
};

const dbtModules = [
  {
    name: 'Mindfulness',
    description: 'The core of DBT, helping you focus on the present and observe your thoughts and feelings without judgment.',
    tools: [
      { href: '/tools/mindfulness', title: 'Core Mindfulness', description: 'Practice "What" and "How" skills.' },
    ],
  },
  {
    name: 'Distress Tolerance',
    description: 'Skills for surviving crises without making things worse. These skills help you cope with and tolerate distress.',
    tools: distressToleranceSkills.map(skill => ({
      href: `/tools/dbt/distress-tolerance`,
      title: skill.acronym,
      description: skill.description
    })),
  },
  {
    name: 'Emotion Regulation',
    description: 'Skills for understanding and changing your emotions, and reducing emotional vulnerability.',
    tools: [
      { href: '/tools/dbt/emotion-regulation/check-the-facts', title: 'Check the Facts', description: 'Check if your emotion fits the facts.' },
      { href: '/tools/dbt/emotion-regulation/opposite-action', title: 'Opposite Action', description: 'Act opposite to your emotion\'s urge.' },
      { href: '/tools/dbt/emotion-regulation/problem-solving', title: 'Problem Solving', description: 'Solve the problem when emotion is justified.' },
    ],
  },
  {
    name: 'Interpersonal Effectiveness',
    description: 'Skills for maintaining relationships and self-respect while getting what you want and need.',
    tools: [
        { href: '/tools/dbt/interpersonal-effectiveness/dear-man', title: 'DEAR MAN', description: 'Get what you want effectively.' },
        { href: '/tools/dbt/behavioral-chain-analysis', title: 'Behavioral Chain Analysis', description: 'Analyze problem behaviors.' }
    ],
  },
];

export default function DBTPage() {
  return (
    <PageLayout title="Dialectical Behavior Therapy (DBT)">
        <div className="space-y-8">
        {dbtModules.map((mod) => (
            <div key={mod.name}>
                <div className="mb-4">
                    <h2 className="font-headline text-2xl">{mod.name}</h2>
                    <p className="text-muted-foreground">{mod.description}</p>
                </div>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {mod.tools.map((tool) => (
                        <Link href={tool.href} key={tool.title} className="block hover:bg-muted/50 rounded-lg">
                            <Card className="h-full">
                                <CardHeader>
                                    <CardTitle>{tool.title}</CardTitle>
                                    <CardDescription>{tool.description}</CardDescription>
                                </CardHeader>
                            </Card>
                        </Link>
                    ))}
                </div>
            </div>
        ))}
        </div>
    </PageLayout>
  );
}
