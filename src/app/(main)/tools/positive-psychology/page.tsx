
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import type { Metadata } from 'next';
import Link from 'next/link';
import { PageLayout } from '@/components/layout/page-layout';

export const metadata: Metadata = {
  title: 'Positive Psychology Tools | Rejoyn',
};

const positivePsychologyTools = [
    { href: "/tools/positive-psychology/strengths-finder", title: "Strengths Identification", description: "Discover your character strengths." },
    { href: "/tools/positive-psychology/acts-of-kindness", title: "Acts of Kindness", description: "Track and plan acts of kindness." },
    { href: "/tools/positive-psychology/savoring", title: "Savoring Exercises", description: "Mindfully appreciate positive experiences." },
    { href: "/tools/positive-psychology/meaning-and-purpose", title: "Meaning and Purpose", description: "Explore your personal sense of purpose." },
    { href: "/track/journal/gratitude", title: "Gratitude Journaling", description: "Daily positive reflections." },
    { href: "/tools/positive-psychology/self-esteem", title: "Self-Esteem Building", description: "Exercises to build healthy self-esteem." },
    { href: "/tools/positive-psychology/optimism-training", title: "Optimism Training", description: "Cultivate a more positive outlook." },
    { href: "/tools/positive-psychology/life-satisfaction", title: "Life Satisfaction Assessments", description: "Evaluate your overall well-being." },
];

export default function PositivePsychologyPage() {
  return (
    <PageLayout title="Positive Psychology">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {positivePsychologyTools.map((tool) => (
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
