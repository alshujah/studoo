import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'CBT Tools | Zenith',
};

const cbtTools = [
    { href: "/tools/thought-record", title: "Thought Records", description: "Track and reframe automatic thoughts." },
    { title: "Behavioral Experiments", description: "Test beliefs through real-world actions." },
    { title: "Behavioral Activation", description: "Schedule activities to combat depression." },
    { title: "Problem-Solving Skills", description: "Structured approach to solving problems." },
];

export default function CBTPage() {
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <div className="flex items-center">
        <h1 className="font-headline text-2xl font-semibold md:text-3xl">Cognitive Behavioral Therapy (CBT)</h1>
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {cbtTools.map((tool) => (
            <Link href={tool.href || "#"} key={tool.title} className="block hover:bg-muted/50 rounded-lg">
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
