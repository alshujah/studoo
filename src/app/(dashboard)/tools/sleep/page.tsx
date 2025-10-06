
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import type { Metadata } from 'next';
import Link from 'next/link';
import { PageLayout } from '@/components/layout/page-layout';

export const metadata: Metadata = {
  title: 'Sleep Management | Zenith',
};

const sleepTools = [
    { href: "/track/sleep-quality", title: "Sleep Diary", description: "Track sleep patterns and quality." },
    { title: "Sleep Hygiene Education", description: "Learn habits for better sleep." },
    { title: "Bedtime Routine Builder", description: "Create a relaxing pre-sleep routine." },
    { title: "Sleep Sounds/White Noise", description: "Drift off to calming sounds." },
    { title: "CBT for Insomnia (CBT-I)", description: "Specialized CBT for sleep issues." },
    { href: "/track/journal/dream", title: "Dream Journaling", description: "Record and explore your dreams." },
];

export default function SleepPage() {
  return (
    <PageLayout title="Sleep Management">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {sleepTools.map((tool) => {
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
