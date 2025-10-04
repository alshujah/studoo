import type { Metadata } from 'next';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

export const metadata: Metadata = {
  title: 'Track | Zenith',
};

const trackingModules = [
    { title: "Daily Mood Check-ins", description: "Record your emotional state." },
    { title: "Anxiety Symptom Checklist", description: "Monitor anxiety symptoms." },
    { title: "Depression Symptom Monitoring", description: "Track symptoms using PHQ-9." },
    { title: "Panic Attack Logging", description: "Record details of panic attacks." },
    { title: "Sleep Quality Tracking", description: "Monitor your sleep patterns." },
    { title: "Activity Logging", description: "Track daily activities and their impact." },
    { title: "Gratitude Journaling", description: "Daily positive reflections." },
    { title: "Medication Adherence", description: "Track your medication intake." },
];

export default function TrackPage() {
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <div className="flex items-center">
        <h1 className="font-headline text-2xl font-semibold md:text-3xl">Track</h1>
      </div>
       <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {trackingModules.map((module) => (
            <Card key={module.title}>
                <CardHeader>
                    <CardTitle>{module.title}</CardTitle>
                    <CardDescription>{module.description}</CardDescription>
                </CardHeader>
            </Card>
        ))}
      </div>
    </main>
  );
}
