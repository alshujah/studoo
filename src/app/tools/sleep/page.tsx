
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Sleep Management | Rejoyn',
};

const sleepTools = [
    { href: "/track/sleep-quality", title: "Sleep Diary", description: "Track sleep patterns and quality." },
    { href: "/tools/sleep/sleep-hygiene", title: "Sleep Hygiene Education", description: "Learn habits for better sleep." },
    { href: "/tools/sleep/bedtime-routine", title: "Bedtime Routine Builder", description: "Create a relaxing pre-sleep routine." },
    { href: "/tools/relaxation/sound-therapy", title: "Sleep Sounds/White Noise", description: "Drift off to calming sounds." },
    { href: "/tools/sleep/cbt-i", title: "CBT for Insomnia (CBT-I)", description: "Specialized CBT for sleep issues." },
    { href: "/track/journal/dream", title: "Dream Journaling", description: "Record and explore your dreams." },
];

export default function SleepPage() {
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <div className="flex items-center">
        <h1 className="font-headline text-2xl font-semibold md:text-3xl">Sleep Management</h1>
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {sleepTools.map((tool) => (
            <Link href={tool.href} key={tool.title} className="block hover:bg-muted/50 rounded-lg">
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
