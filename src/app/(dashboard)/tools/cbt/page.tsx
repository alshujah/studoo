
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import type { Metadata } from 'next';
import Link from 'next/link';
import { PageLayout } from '@/components/layout/page-layout';
import { BrainCircuit } from 'lucide-react';

export const metadata: Metadata = {
  title: 'CBT Tools | Zenith',
};

const cbtTools = [
    { href: "/tools/thought-record", title: "Thought Record", description: "Identify and challenge negative thoughts." },
    { href: "/tools/cbt/behavioral-experiments", title: "Behavioral Experiments", description: "Test your anxious beliefs like a scientist." },
    { href: "/track/activity-log", title: "Behavioral Activation", description: "Schedule activities to improve your mood." },
    { title: "Exposure Hierarchy", description: "Gradually face your fears." },
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
