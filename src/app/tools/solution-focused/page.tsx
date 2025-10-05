import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Solution-Focused Brief Therapy | Rejoyn',
};

const sfbtTools = [
    { href: "/tools/solution-focused/miracle-question", title: "Miracle Question", description: "Imagine your problem is solved and explore what's different." },
    { href: "#", title: "Scaling Questions", description: "Rate your progress towards your goals on a scale of 1-10." },
    { href: "#", title: "Exception Finding", description: "Identify times when the problem was less severe." },
    { href: "#", title: "Coping Questions", description: "Discover the strengths you're already using to cope." },
];

export default function SFBTPage() {
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <div className="flex items-center">
        <h1 className="font-headline text-2xl font-semibold md:text-3xl">Solution-Focused Brief Therapy (SFBT)</h1>
      </div>
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
    </main>
  );
}
