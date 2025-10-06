
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import type { Metadata } from 'next';
import Link from 'next/link';
import { PageLayout } from '@/components/layout/page-layout';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Waves, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'DBT Tools | Rejoyn',
};

const dbtSkills = [
    { href: "/tools/dbt/distress-tolerance", title: "Distress Tolerance Skills", description: "Survive crisis situations without making them worse." },
    { href: "/tools/dbt/emotion-regulation", title: "Emotion Regulation Strategies", description: "Understand and manage intense emotions." },
    { href: "/tools/dbt/interpersonal-effectiveness", title: "Interpersonal Effectiveness", description: "Maintain relationships and self-respect." },
    { title: "Radical Acceptance Exercises", description: "Accept reality as it is." },
    { href: "/tools/dbt/distress-tolerance", title: "STOP Skill", description: "Stop, Take a step back, Observe, Proceed." },
    { href: "/tools/dbt/distress-tolerance", title: "TIPP Technique", description: "A fast-acting set of crisis survival skills." },
    { title: "Walking the Middle Path", description: "Find synthesis between opposites." },
    { title: "Pros and Cons", description: "Weigh the advantages and disadvantages of your urges." },
];

const interactiveTools = [
    {
        href: "/tools/dbt/behavioral-chain-analysis",
        title: "Behavioral Chain Analysis",
        description: "Analyze the chain of events leading to a problem behavior."
    }
]

export default function DBTPage() {
  return (
    <PageLayout title="Dialectical Behavior Therapy (DBT)">
        <Alert className="mb-8">
            <Waves className="h-4 w-4" />
            <AlertTitle>Live a Life Worth Living</AlertTitle>
            <AlertDescription>
                DBT is designed to help people who experience emotions very intensely. It teaches skills to manage painful emotions and decrease conflict in relationships, balancing acceptance and change.
            </AlertDescription>
        </Alert>

        <Card className="mb-8">
            <CardHeader>
                <CardTitle className="font-headline">Interactive DBT Exercises</CardTitle>
                <CardDescription>Practice core DBT skills with these guided tools.</CardDescription>
            </CardHeader>
            <CardContent>
                 {interactiveTools.map((tool) => (
                    <Link href={tool.href} key={tool.title} className="block hover:bg-muted/50 rounded-lg p-4 -m-4">
                        <h3 className="font-semibold">{tool.title}</h3>
                        <p className="text-sm text-muted-foreground">{tool.description}</p>
                         <div className="flex items-center text-primary text-sm font-semibold mt-2">
                            <span>Start Exercise</span>
                            <ArrowRight className="size-4 ml-2" />
                        </div>
                    </Link>
                ))}
            </CardContent>
        </Card>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {dbtSkills.map((tool) => {
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
