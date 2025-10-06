
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import type { Metadata } from 'next';
import Link from 'next/link';
import { PageLayout } from '@/components/layout/page-layout';

export const metadata: Metadata = {
  title: 'DBT Tools | Rejoyn',
};

const dbtTools = [
    { href: "/tools/dbt/distress-tolerance", title: "Distress Tolerance Skills", description: "Survive crisis situations." },
    { href: "/tools/dbt/emotion-regulation", title: "Emotion Regulation Strategies", description: "Manage and change intense emotions." },
    { href: "/tools/dbt/interpersonal-effectiveness", title: "Interpersonal Effectiveness", description: "Maintain relationships and self-respect." },
    { href: "/tools/dbt/behavioral-chain-analysis", title: "Behavioral Chain Analysis", description: "Analyze the chain of events leading to a behavior." },
    { title: "Radical Acceptance Exercises", description: "Accept reality as it is." },
    { href: "/tools/dbt/distress-tolerance", title: "STOP Skill", description: "Stop, Take a step back, Observe, Proceed." },
    { href: "/tools/dbt/distress-tolerance", title: "TIPP Technique", description: "Temperature, Intense exercise, Paced breathing, Paired muscle relaxation." },
    { title: "Walking the Middle Path", description: "Find synthesis between opposites." },
    { title: "Pros and Cons", description: "Weigh the advantages and disadvantages." },
];

export default function DBTPage() {
  return (
    <PageLayout title="Dialectical Behavior Therapy (DBT)">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {dbtTools.map((tool) => {
            const card = (
                <Card className="h-full">
                    <CardHeader>
                        <CardTitle>{tool.title}</CardTitle>
                        <CardDescription>{tool.description}</CardDescription>
                    </CardHeader>
                </Card>
            );
            if ((tool as any).href) {
                return (
                    <Link href={(tool as any).href} key={tool.title} className="block hover:bg-muted/50 rounded-lg">
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
