
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import type { Metadata } from 'next';
import Link from 'next/link';
import { PageLayout } from '@/components/layout/page-layout';
import { Gift, Pen, Star, HandHeart, Sparkles } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Positive Psychology Tools | Zenith',
};

const positivePsychologyTools = [
    { href: "/track/journal/gratitude", title: "Gratitude Journaling", description: "Focus on what's good in your life.", icon: Gift },
    { href: "/tools/positive-psychology/character-strengths", title: "Character Strengths", description: "Identify and leverage your best qualities.", icon: Star },
    { title: "Best Possible Self", description: "Visualize a future where you have succeeded.", icon: Sparkles },
    { title: "Acts of Kindness", description: "Plan and track intentional acts of kindness.", icon: HandHeart },
    { title: "Three Good Things", description: "Reflect on three positive things that happened each day.", icon: Pen },
];

export default function PositivePsychologyPage() {
  return (
    <PageLayout title="Positive Psychology">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {positivePsychologyTools.map((tool) => {
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
