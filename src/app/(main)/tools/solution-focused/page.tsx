
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import type { Metadata } from 'next';
import Link from 'next/link';
import { PageLayout } from '@/components/layout/page-layout';

export const metadata: Metadata = {
  title: 'Solution-Focused Brief Therapy | Rejoyn',
};

const sfbtTools = [
    { href: "/tools/solution-focused/miracle-question", title: "Miracle Question", description: "Imagine your problem is solved and explore what's different." },
    { href: "/tools/solution-focused/scaling-questions", title: "Scaling Questions", description: "Rate your progress towards your goals on a scale of 1-10." },
    { href: "/tools/solution-focused/exception-finding", title: "Exception Finding", description: "Identify times when the problem was less severe." },
    { href: "/tools/solution-focused/coping-questions", title: "Coping Questions", description: "Discover the strengths you're already using to cope." },
];

export default function SFBTPage() {
  return (
    <PageLayout title="Solution-Focused Brief Therapy (SFBT)">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {sfbtTools.map((tool) => (
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
