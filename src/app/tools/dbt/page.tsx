
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'DBT Tools | Rejoyn',
};

const dbtTools = [
    { href: "/tools/dbt/distress-tolerance", title: "Distress Tolerance Skills", description: "Survive crisis situations." },
    { href: "/tools/dbt/emotion-regulation", title: "Emotion Regulation Strategies", description: "Manage and change intense emotions." },
    { href: "#", title: "Interpersonal Effectiveness", description: "Maintain relationships and self-respect." },
    { href: "#", title: "Radical Acceptance Exercises", description: "Accept reality as it is." },
    { href: "/tools/dbt/stop-skill", title: "STOP Skill", description: "Stop, Take a step back, Observe, Proceed." },
    { href: "/tools/dbt/tipp-technique", title: "TIPP Technique", description: "Temperature, Intense exercise, Paced breathing, Paired muscle relaxation." },
    { href: "#", title: "Walking the Middle Path", description: "Find synthesis between opposites." },
    { href: "/tools/dbt/pros-and-cons", title: "Pros and Cons", description: "Weigh the advantages and disadvantages." },
    { href: "/tools/dbt/behavioral-chain-analysis", title: "Behavioral Chain Analysis", description: "Analyze the chain of events leading to a behavior." },
];

export default function DBTPage() {
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <div className="flex items-center">
        <h1 className="font-headline text-2xl font-semibold md:text-3xl">Dialectical Behavior Therapy (DBT)</h1>
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {dbtTools.map((tool) => (
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
    </main>
  );
}
