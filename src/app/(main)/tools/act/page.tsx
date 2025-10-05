
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import type { Metadata } from 'next';
import Link from 'next/link';
import { PageLayout } from '@/components/layout/page-layout';

export const metadata: Metadata = {
  title: 'ACT Tools | Rejoyn',
};

const actTools = [
    { href: "/tools/act/values-clarification", title: "Values Clarification Exercises", description: "Identify what truly matters to you." },
    { href: "/tools/act/committed-action", title: "Committed Action Planning", description: "Take steps towards your values." },
    { href: "/tools/act/decentering", title: "Decentering/Defusion Techniques", description: "Create distance from thoughts." },
    { href: "/tools/dbt/radical-acceptance", title: "Acceptance Training", description: "Promote tolerance of distressing emotions." },
    { href: "/tools/cbt/attention-training", title: "Attention Training", description: "Focus redirection techniques." },
    { href: "/tools/act/psychological-flexibility", title: "Psychological Flexibility Training", description: "Embrace thoughts and feelings." },
    { href: "/tools/act/metaphors", title: "Metaphor-Based Learning", description: "Understand concepts through stories." },
    { href: "/tools/act/self-as-context", title: "Self-as-Context Exercises", description: "Observe your thoughts without attachment." },
];

export default function ACTPage() {
  return (
    <PageLayout title="Acceptance & Commitment Therapy (ACT)">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {actTools.map((tool) => (
            <Link href={tool.href || '#'} key={tool.title} className="block hover:bg-muted/50 rounded-lg">
                <Card className="h-full">
                    <CardHeader>
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
