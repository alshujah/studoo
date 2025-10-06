
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import type { Metadata } from 'next';
import Link from 'next/link';
import { CircleUser, HeartHandshake, Armchair, UsersRound, Anchor, Shield } from 'lucide-react';
import { PageLayout } from '@/components/layout/page-layout';

export const metadata: Metadata = {
  title: 'Psychodynamic Approaches | Zenith',
};

const psychodynamicTools = [
    { title: "Internal Family Systems (IFS)", description: "Work with your inner 'parts' with self-compassion.", icon: UsersRound },
    { title: "Compassion-Focused Therapy", description: "Cultivate your compassionate self to combat shame.", icon: HeartHandshake },
    { title: "Gestalt Therapy Techniques", description: "Focus on the 'here and now' with awareness exercises.", icon: Armchair },
    { title: "Defense Mechanism Education", description: "Understand unconscious coping strategies.", icon: Shield },
    { title: "Attachment-Based Therapy", description: "Explore how early bonds shape your current relationships.", icon: Anchor },
];

export default function PsychodynamicPage() {
  return (
    <PageLayout title="Psychodynamic & Relational Approaches">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {psychodynamicTools.map((tool) => (
            <div key={tool.title}>
                <Card className="h-full">
                    <CardHeader>
                        {tool.icon && <tool.icon className="size-6 text-primary mb-2" />}
                        <CardTitle>{tool.title}</CardTitle>
                        <CardDescription>{tool.description}</CardDescription>
                    </CardHeader>
                </Card>
            </div>
        ))}
      </div>
    </PageLayout>
  );
}
