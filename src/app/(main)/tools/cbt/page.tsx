
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import type { Metadata } from 'next';
import Link from 'next/link';
import { PageLayout } from '@/components/layout/page-layout';

export const metadata: Metadata = {
  title: 'CBT Tools | Zenith Wellness',
};

const cbtTools = [
    { href: "/track/journal?tab=thought-record", title: "Thought Record", description: "Track and reframe automatic thoughts." },
    { href: "/tools/cbt/behavioral-activation", title: "Behavioral Activation", description: "Schedule activities to combat depression." },
    { href: "/tools/cbt/behavioral-experiments", title: "Behavioral Experiments", description: "Test beliefs through real-world actions." },
    { title: "Problem-Solving Skills", description: "Structured approach to solving problems." },
    { href: "/track/journal?tab=thought-record", title: "Cognitive Reappraisal Exercises", description: "Change your interpretation of a situation." },
    { title: "Exposure Therapy Modules", description: "Gradual confrontation of fears." },
    { title: "Attention Training", description: "Practice focus redirection techniques." },
    { title: "Decentering Techniques", description: "Create distance from your thoughts." },
];

export default function CBTPage() {
  return (
    <PageLayout title="Cognitive Behavioral Therapy (CBT)">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {cbtTools.map((tool) => {
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

          return <div key={tool.title}>{card}</div>;
        })}
      </div>
    </PageLayout>
  );
}

    