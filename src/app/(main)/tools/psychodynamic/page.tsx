
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import type { Metadata } from 'next';
import Link from 'next/link';
import { CircleUser, HeartHandshake, Armchair, UsersRound, Anchor } from 'lucide-react';
import { PageLayout } from '@/components/layout/page-layout';

export const metadata: Metadata = {
  title: 'Psychodynamic Therapy | Rejoyn',
};

const psychodynamicTools = [
    { href: "#", title: "IFS (Internal Family Systems)", description: "Work with your inner 'parts' with self-compassion.", icon: CircleUser },
    { href: "#", title: "Compassion-Focused Therapy", description: "Cultivate your compassionate self to combat shame.", icon: HeartHandshake },
    { href: "#", title: "Gestalt Therapy Techniques", description: "Focus on the 'here and now' with awareness exercises.", icon: Armchair },
    { href: "#", title: "Defense Mechanisms", description: "Understand unconscious coping strategies.", icon: UsersRound },
    { href: "#", title: "Attachment-Based Therapy", description: "Explore how early bonds shape your current relationships.", icon: Anchor },
];

export default function PsychodynamicPage() {
  return (
    <PageLayout title="Psychodynamic Approaches">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {psychodynamicTools.map((tool) => (
            <Link href={tool.href} key={tool.title} className="block hover:bg-muted/50 rounded-lg">
                <Card className="h-full">
                    <CardHeader>
                        {tool.icon && <tool.icon className="size-6 text-primary mb-2" />}
                        <CardTitle>{tool.title}</CardTitle>
                        <CardDescription>{tool.description}</CardDescription>
                    </CardHeader>
                </Card>
            </Link>
        ))}
      </div>
    </PageLayout>
  );
}
