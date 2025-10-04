import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Interpersonal Therapy (IPT) | Rejoyn',
};

const iptTools = [
    { title: "Communication Analysis", description: "Analyze and improve your communication patterns." },
    { title: "Interpersonal Inventory", description: "Identify key relationships and their impact." },
    { title: "Role-Playing", description: "Practice difficult conversations in a safe space." },
    { title: "Social Rhythm Tracking", description: "Monitor daily routines and social interactions." },
];

export default function IPTPage() {
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <div className="flex items-center">
        <h1 className="font-headline text-2xl font-semibold md:text-3xl">Interpersonal Therapy (IPT)</h1>
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {iptTools.map((tool) => (
            <Card key={tool.title}>
                <CardHeader>
                    <CardTitle>{tool.title}</CardTitle>
                    <CardDescription>{tool.description}</CardDescription>
                </CardHeader>
            </Card>
        ))}
      </div>
    </main>
  );
}
