

import type { Metadata } from 'next';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import Link from 'next/link';
import { Activity, BedDouble, FlaskConical, Pill, Siren, BarChart, Book, Smile, TrendingUp, Sun, Brain } from 'lucide-react';
import { PageLayout } from '@/components/layout/page-layout';


export const metadata: Metadata = {
  title: 'Track | Rejoyn',
};

const trackingModules = [
    { href: "/track/mood", title: "Daily Mood Check-in", description: "Record your emotional state.", icon: Smile },
    { href: "/track/journal", title: "Journaling Tools", description: "A space for all your thoughts.", icon: Book },
    { href: "/track/sleep-quality", title: "Sleep Quality Tracking", description: "Monitor your sleep patterns.", icon: BedDouble },
    { href: "/track/gad-7", title: "Anxiety Screener (GAD-7)", description: "Monitor anxiety symptoms.", icon: BarChart },
    { href: "/track/phq-9", title: "Depression Screener (PHQ-9)", description: "Track symptoms using a standard scale.", icon: BarChart },
    { href: "/track/wemwbs", title: "Well-being Assessment (WEMWBS)", description: "Evaluate your overall well-being.", icon: TrendingUp },
    { href: "/track/activity-log", title: "Daily Activity Log", description: "Track activities and their impact.", icon: Activity },
    { href: "/track/panic-log", title: "Panic Attack Logging", description: "Record details of panic attacks.", icon: Siren },
    { href: "/track/medication-log", title: "Medication Adherence", description: "Track your medication intake.", icon: Pill },
    { href: "/track/substance-use", title: "Substance Use Tracking", description: "Monitor alcohol, caffeine, etc.", icon: FlaskConical },
    { href: "/track/journal/worry-log", title: "Worry & Rumination Log", description: "Externalize and manage worries.", icon: Brain },
    { href: "/track/life-balance-wheel", title: "Life Balance Wheel", description: "Assess your balance across life domains.", icon: Sun },
];

export default function TrackPage() {
  return (
    <PageLayout title="Tracking Tools">
       <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {trackingModules.map((module) => (
            <Link href={module.href} key={module.title} className="block hover:bg-muted/50 rounded-lg">
              <Card className="h-full flex flex-col">
                  <CardHeader>
                      <div className="flex items-center gap-4 mb-2">
                        <module.icon className="size-6 text-primary" />
                        <CardTitle className="text-lg">{module.title}</CardTitle>
                      </div>
                      <CardDescription>{module.description}</CardDescription>
                  </CardHeader>
              </Card>
            </Link>
        ))}
      </div>
    </PageLayout>
  );
}
