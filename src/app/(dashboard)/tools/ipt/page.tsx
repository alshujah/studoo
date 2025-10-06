
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import type { Metadata } from 'next';
import Link from 'next/link';
import { PageLayout } from '@/components/layout/page-layout';

export const metadata: Metadata = {
  title: 'Interpersonal Therapy (IPT) | Zenith',
};

const iptTools = [
    { href: "/tools/ipt/social-skills-assessment", title: "Social Skills Assessment", description: "Evaluate your skills in key social domains." },
    { title: "Communication Analysis", description: "Analyze and improve your communication patterns." },
    { title: "Interpersonal Inventory", description: "Identify key relationships and their impact." },
    { title: "Role-Playing", description: "Practice difficult conversations in a safe space." },
    { title: "Social Rhythm Tracking", description: "Monitor daily routines and social interactions." },
];

export default function IPTPage() {
  return (
    <PageLayout title="Interpersonal Therapy (IPT)">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {iptTools.map((tool) => {
          const card = (
            <Card className="h-full">
              <CardHeader>
                <CardTitle>{tool.title}</CardTitle>
                <CardDescription>{tool.description}</CardDescription>
              </CardHeader>
            </Card>
          );
          if ((tool as any).href) {
            return (
              <Link href={(tool as any).href} key={tool.title} className="block hover:bg-muted/50 rounded-lg">
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
