
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import type { Metadata } from 'next';
import Link from 'next/link';
import { PageLayout } from '@/components/layout/page-layout';
import { BarChart, Smile, Book, Bed, FileText, Activity, Pill, Bot, Beaker } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Track | Zenith',
};

const trackingTools = [
    { href: "/track/mood", title: "Mood Check-in", description: "Log your mood and emotions.", icon: Smile },
    { href: "/track/journal", title: "Journaling", description: "Write freely or use a guided prompt.", icon: Book },
    { href: "/track/sleep-quality", title: "Sleep Quality", description: "Track your sleep patterns.", icon: Bed },
    { href: "/track/gad-7", title: "GAD-7 Anxiety", description: "A 7-item anxiety screening tool.", icon: FileText },
    { href: "/track/phq-9", title: "PHQ-9 Depression", description: "A 9-item depression screening tool.", icon: FileText },
    { href: "/track/activity-log", title: "Activity Log", description: "Log daily activities and their impact.", icon: Activity },
    { href: "/track/medication-log", title: "Medication Log", description: "Track your medication intake.", icon: Pill },
    { href: "/track/panic-log", title: "Panic Attack Log", description: "Record details after a panic attack.", icon: Bot },
    { href: "/track/substance-use", title: "Substance Use Log", description: "Log your use of substances like caffeine.", icon: Beaker },
    { href: "/track/wemwbs", title: "Well-being (WEMWBS)", description: "Assess your overall mental well-being.", icon: BarChart },
];

export default function TrackingPage() {
  return (
    <PageLayout title="Tracking & Assessment">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {trackingTools.map((tool) => (
            <Link href={tool.href} key={tool.title} className="block hover:bg-muted/50 rounded-lg">
                <Card className="h-full">
                    <CardHeader>
                        <tool.icon className="size-6 text-primary mb-2" />
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
