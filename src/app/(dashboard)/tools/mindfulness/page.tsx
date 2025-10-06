
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import type { Metadata } from 'next';
import Link from 'next/link';
import { PageLayout } from '@/components/layout/page-layout';
import { Brain, Wind, Coffee, Ear, Footprints } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Mindfulness Tools | Zenith',
};

const mindfulnessTools = [
    { href: "/tools/relaxation/breathing-exercises", title: "Breathing Exercises", description: "Anchor yourself with your breath.", icon: Wind },
    { title: "Mindful Observation", description: "Engage your senses to notice the world around you.", icon: Ear },
    { title: "Mindful Awareness", description: "Acknowledge thoughts and feelings without judgment.", icon: Brain },
    { title: "Mindful Walking", description: "Pay attention to the sensation of walking.", icon: Footprints },
    { title: "Mindful Eating", description: "Savor your food and the act of eating.", icon: Coffee },
];

export default function MindfulnessPage() {
  return (
    <PageLayout title="Mindfulness">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {mindfulnessTools.map((tool) => {
            const card = (
                <Card className="h-full">
                    <CardHeader>
                        <tool.icon className="size-6 text-primary mb-2" />
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
