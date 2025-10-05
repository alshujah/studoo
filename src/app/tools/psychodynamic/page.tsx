

import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import type { Metadata } from 'next';
import Link from 'next/link';
import { CircleUser, HeartHandshake, Armchair, UsersRound, Anchor } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Psychodynamic Therapy | Rejoyn',
};

const psychodynamicTools = [
    { href: "/tools/psychodynamic/ifs", title: "IFS (Internal Family Systems)", description: "Work with your inner 'parts' with self-compassion.", icon: CircleUser },
    { href: "/tools/psychodynamic/cft", title: "Compassion-Focused Therapy", description: "Cultivate your compassionate self to combat shame.", icon: HeartHandshake },
    { href: "/tools/psychodynamic/gestalt", title: "Gestalt Therapy Techniques", description: "Focus on the 'here and now' with awareness exercises.", icon: Armchair },
    { href: "/tools/psychodynamic/defense-mechanisms", title: "Defense Mechanisms", description: "Understand unconscious coping strategies.", icon: UsersRound },
    { href: "/tools/psychodynamic/attachment-theory", title: "Attachment-Based Therapy", description: "Explore how early bonds shape your current relationships.", icon: Anchor },
];

export default function PsychodynamicPage() {
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <div className="flex items-center">
        <h1 className="font-headline text-2xl font-semibold md:text-3xl">Psychodynamic Approaches</h1>
      </div>
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
    </main>
  );
}
