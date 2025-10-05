

import type { Metadata } from 'next';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import Link from 'next/link';
import { Activity, BedDouble, FlaskConical, Pill, Siren, BarChart, Book, Brain, Calendar, CheckSquare, Clock, Edit, ListChecks, Sun, TrendingUp, Users, Smile } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Track | Rejoyn',
};

const trackingModules = [
    { href: "/track/mood", title: "Daily Mood Check-ins", description: "Record your emotional state.", icon: Smile },
    { href: "/track/gad-7", title: "Anxiety Symptom Checklist (GAD-7)", description: "Monitor anxiety symptoms.", icon: BarChart },
    { href: "/track/phq-9", title: "Depression Symptom Monitoring (PHQ-9)", description: "Track symptoms using a standard scale.", icon: BarChart },
    { href: "/track/journal", title: "Journaling", description: "A space for your thoughts.", icon: Book },
    { href: "/track/panic-log", title: "Panic Attack Logging", description: "Record details of panic attacks.", icon: Siren },
    { href: "/track/sleep-quality", title: "Sleep Quality Tracking", description: "Monitor your sleep patterns.", icon: BedDouble },
    { href: "/track/activity-log", title: "Activity Logging", description: "Track daily activities and their impact.", icon: Activity },
    { href: "/track/medication-log", title: "Medication Adherence", description: "Track your medication intake.", icon: Pill },
    { href: "/track/substance-use", title: "Substance Use Tracking", description: "Monitor alcohol, caffeine, etc.", icon: FlaskConical },
    { href: "/track/journal/worry-log", title: "Worry/Rumination Logging", description: "Externalize and manage worries.", icon: Brain },
    { href: "/tools/cbt/behavioral-activation", title: "Self-Care Activities Checklist", description: "Plan and track self-care activities.", icon: CheckSquare },
    { href: "/tools/ptsd/triggers", title: "Trigger Event Documentation", description: "Log and analyze your triggers.", icon: ListChecks },
    { href: "/track/life-balance-wheel", title: "Life Balance Wheel", description: "Assess your balance across life domains.", icon: Sun },
    { href: "/track/wemwbs", title: "Well-being Assessment (WEMWBS)", description: "Evaluate your overall well-being.", icon: TrendingUp },
];

export default function TrackPage() {
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <div className="flex items-center">
        <h1 className="font-headline text-2xl font-semibold md:text-3xl">Track</h1>
      </div>
       <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {trackingModules.map((module) => (
            <Link href={module.href} key={module.title} className="block hover:bg-muted/50 rounded-lg">
              <Card className="h-full">
                  <CardHeader>
                      <CardTitle>{module.title}</CardTitle>
                      <CardDescription>{module.description}</CardDescription>
                  </CardHeader>
              </Card>
            </Link>
        ))}
      </div>
    </main>
  );
}
