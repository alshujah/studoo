
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import type { Metadata } from 'next';
import Link from 'next/link';
import { PageLayout } from '@/components/layout/page-layout';

export const metadata: Metadata = {
  title: 'Somatic Therapy | Rejoyn',
};

const somaticTools = [
    { href: "/tools/somatic-therapy/emdr-tool", title: "EMDR Bilateral Stimulation", description: "Digital visual aid for bilateral stimulation." },
    { title: "Somatic Experiencing Exercises", description: "Body-based trauma release techniques." },
    { title: "Dance/Movement Therapy", description: "Guided movement exercises with motion tracking." },
    { title: "Nature Therapy (Ecotherapy)", description: "Virtual nature experiences and outdoor activity planning." },
];

export default function SomaticTherapyPage() {
  return (
    <PageLayout title="Somatic Therapy">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {somaticTools.map((tool) => {
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
