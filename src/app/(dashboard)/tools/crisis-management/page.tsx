
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import type { Metadata } from 'next';
import Link from 'next/link';
import { PageLayout } from '@/components/layout/page-layout';

export const metadata: Metadata = {
  title: 'Crisis Management | Zenith',
};

const crisisTools = [
    { title: "Crisis Support Hotline Links", description: "Direct connections to crisis services." },
    { title: "Safety Planning Tools", description: "Create personalized crisis plans." },
    { title: "Self-Harm Alternatives", description: "Find alternative coping strategies." },
    { title: "Panic Attack Assistance", description: "Guided help during a panic attack." },
    { href: "/tools/dbt/distress-tolerance", title: "SOS/Emergency Button", description: "Quick access to crisis skills like TIPP." },
    { title: "Warning Sign Identification", description: "Recognize your personal crisis warning signs." },
    { href: "/tools/relaxation", title: "Flashback Coping Strategies", description: "Tools to manage flashbacks." },
    { title: "Trigger Management Plans", description: "Develop plans to manage triggers." },
];

export default function CrisisManagementPage() {
  return (
    <PageLayout title="Crisis Management">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {crisisTools.map((tool) => {
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
          return <div key={tool.title}>{card}</div>;
        })}
      </div>
    </PageLayout>
  );
}
