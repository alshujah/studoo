import type { Metadata } from 'next';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Track | Zenith',
};

const trackingModules = [
    { title: "Daily Mood Check-ins", description: "Record your emotional state." },
    { title: "Anxiety Symptom Checklist (GAD-7)", description: "Monitor anxiety symptoms." },
    { title: "Depression Symptom Monitoring (PHQ-9)", description: "Track symptoms using a standard scale." },
    { title: "Panic Attack Logging", description: "Record details of panic attacks." },
    { title: "Sleep Quality Tracking", description: "Monitor your sleep patterns." },
    { title: "Activity Logging", description: "Track daily activities and their impact." },
    { title: "Medication Adherence", description: "Track your medication intake." },
    { title: "Social Interaction Tracking", description: "Log your social engagements." },
    { title: "Substance Use Tracking", description: "Monitor alcohol, caffeine, etc." },
    { title: "Worry/Rumination Logging", description: "Externalize and manage worries." },
    { title: "Success/Achievement Logging", description: "Record your accomplishments." },
    { title: "Energy Level Monitoring", description: "Track your energy levels throughout the day." },
    { title: "Physical Symptom Recording", description: "Log headaches, tension, pain, etc." },
    { title: "Side Effect Documentation", description: "Note any medication side effects." },
    { title: "Screen Time Monitoring", description: "Track your time on digital devices." },
    { title: "Eating Habits Logging", description: "Monitor your nutritional intake." },
    { title: "Menstrual Cycle Mood Correlation", description: "Track mood changes related to your cycle." },
    { title: "Self-Care Activities Checklist", description: "Ensure you're taking care of yourself." },
    { title: "Trigger Event Documentation", description: "Identify events that affect your mood." },
    { title: "Emotional Self-Awareness Scoring", description: "Track improvements in recognizing emotions." },
    { title: "Multi-dimensional Mood Tracking", description: "Track energy, anxiety, depression, and stress." },
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
