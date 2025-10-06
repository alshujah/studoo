
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import type { Metadata } from 'next';
import Link from 'next/link';
import { PageLayout } from '@/components/layout/page-layout';

export const metadata: Metadata = {
  title: 'Solution-Focused Brief Therapy | Rejoyn',
};

const sfbtTools = [
    { href: "/tools/solution-focused/miracle-question", title: "Miracle Question", description: "Imagine your problem is solved and explore what's different." },
    { title: "Exception Finding", description: "Identify times when the problem was less severe." },
    { title: "Scaling Questions", description: "Rate your progress towards your goals on a scale of 1-10." },
    { title: "Coping Questions", description: "Discover the strengths you're already using to cope." },
];

export default function SFBTPage() {
  return (
    <PageLayout title="Solution-Focused Brief Therapy (SFBT)">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {sfbtTools.map((tool) => {
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
