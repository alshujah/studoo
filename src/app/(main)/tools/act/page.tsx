
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import type { Metadata } from 'next';
import Link from 'next/link';
import { PageLayout } from '@/components/layout/page-layout';

export const metadata: Metadata = {
  title: 'ACT Tools | Rejoyn',
};

const actTools = [
    { href: "/tools/act/values-clarification", title: "Values Clarification", description: "Identify what truly matters to you." },
    { title: "Committed Action Planning", description: "Take steps towards your values." },
    { title: "Decentering/Defusion Techniques", description: "Create distance from thoughts." },
    { title: "Acceptance Training", description: "Promote tolerance of distressing emotions." },
    { title: "Attention Training", description: "Focus redirection techniques." },
    { title: "Psychological Flexibility Training", description: "Embrace thoughts and feelings." },
    { title: "Metaphor-Based Learning", description: "Understand concepts through stories." },
    { title: "Self-as-Context Exercises", description: "Observe your thoughts without attachment." },
];

export default function ACTPage() {
  return (
    <PageLayout title="Acceptance & Commitment Therapy (ACT)">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {actTools.map((tool) => {
            const card = (
                <Card className="h-full">
                    <CardHeader>
                        <CardTitle>{tool.title}</CardTitle>
                        <CardDescription>{tool.description}</CardDescription>
                    </CardHeader>
                </Card>
            );

            if (tool.href) {
                return (
                    <Link href={tool.href} key={tool.title} className="block hover:bg-muted/50 rounded-lg">
                        {card}
                    </Link>
                );
            }
            return <div key={tool.title}>{card}</div>
        })}
      </div>
    </PageLayout>
  );
}
