

import type { Metadata } from 'next';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import Link from 'next/link';
import { Activity, BedDouble, FlaskConical, Pill, Siren } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Track | Rejoyn',
};

const trackingModules = [
    { href: "/track/mood", title: "Daily Mood Check-ins", description: "Record your emotional state." },
    { href: "/track/gad-7", title: "Anxiety Symptom Checklist (GAD-7)", description: "Monitor anxiety symptoms." },
    { href: "/track/phq-9", title: "Depression Symptom Monitoring (PHQ-9)", description: "Track symptoms using a standard scale." },
    { href: "/track/journal", title: "Journaling", description: "A space for your thoughts." },
    { href: "/track/panic-log", title: "Panic Attack Logging", description: "Record details of panic attacks.", icon: Siren },
    { href: "/track/sleep-quality", title: "Sleep Quality Tracking", description: "Monitor your sleep patterns.", icon: BedDouble },
    { href: "/track/activity-log", title: "Activity Logging", description: "Track daily activities and their impact.", icon: Activity },
    { href: "/track/medication-log", title: "Medication Adherence", description: "Track your medication intake.", icon: Pill },
    { href: "/track/activity-log", title: "Social Interaction Tracking", description: "Log your social engagements." },
    { href: "/track/substance-use", title: "Substance Use Tracking", description: "Monitor alcohol, caffeine, etc.", icon: FlaskConical },
    { href: "/track/journal/worry-log", title: "Worry/Rumination Logging", description: "Externalize and manage worries." },
    { href: "/track/activity-log", title: "Energy Level Monitoring", description: "Track your energy levels throughout the day." },
    { href: "/track/activity-log", title: "Physical Symptom Recording", description: "Log headaches, tension, pain, etc." },
    { href: "/track/medication-log", title: "Side Effect Documentation", description: "Note any medication side effects." },
    { href: "/track/activity-log", title: "Screen Time Monitoring", description: "Track your time on digital devices." },
    { href: "/track/activity-log", title: "Eating Habits Logging", description: "Monitor your nutritional intake." },
    { href: "/track/activity-log", title: "Exercise Log", description: "Track your physical activity." },
    { href: "/track/activity-log", title: "Hydration Tracking", description: "Monitor your daily water intake." },
    { href: "/track/activity-log", title: "Productivity Log", description: "Monitor your focus and productivity." },
    { href: "/track/phq-9", title: "Symptom Severity Scoring", description: "Score the severity of your symptoms." },
    { href: "/track/mood", title: "Anger Thermometer", description: "Rate and track anger levels." },
    { href: "/track/mood", title: "Anxiety Thermometer", description: "Rate and track anxiety levels." },
    { href: "/track/life-balance-wheel", title: "Life Balance Wheel", description: "Assess your balance across life domains." },
    { href: "/tools/positive-psychology/life-satisfaction", title: "Well-being Assessments", description: "Evaluate your overall well-being." },
    { href: "/tools/positive-psychology/strengths-finder", title: "Personality Assessments", description: "Discover your character strengths." },
];

export default function TrackPage() {
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <div className="flex items-center">
        <h1 className="font-headline text-2xl font-semibold md:text-3xl">Track</h1>
      </div>
       <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {trackingModules.map((module) => (
            <Link href={module.href || "#"} key={module.title} className="block hover:bg-muted/50 rounded-lg">
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
