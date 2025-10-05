

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
    { href: "/track/journal/freeform", title: "Success/Achievement Log", description: "Record your accomplishments." },
    { href: "/track/activity-log", title: "Energy Level Monitoring", description: "Track your energy levels throughout the day." },
    { href: "/track/activity-log", title: "Physical Symptom Recording", description: "Log headaches, tension, pain, etc." },
    { href: "/track/medication-log", title: "Side Effect Documentation", description: "Note any medication side effects." },
    { href: "/track/activity-log", title: "Screen Time Monitoring", description: "Track your time on digital devices." },
    { href: "/track/activity-log", title: "Eating Habits Logging", description: "Monitor your nutritional intake." },
    { href: "/track/activity-log", title: "Menstrual Cycle Mood Correlation", description: "Track mood changes with your cycle." },
    { href: "/tools/cbt/behavioral-activation", title: "Self-Care Activities Checklist", description: "Ensure you're taking care of yourself." },
    { href: "/tools/ptsd/triggers", title: "Trigger Event Documentation", description: "Identify events that affect your mood." },
    { href: "/track/mood", title: "Emotional Self-Awareness Scoring", description: "Track improvements in recognizing emotions." },
    { href: "/track/mood", title: "Multi-dimensional Mood Tracking", description: "Track energy, anxiety, depression, and stress." },
    { href: "/track/activity-log", title: "Habit Tracking", description: "Monitor and build positive habits." },
    { href: "/track/sleep-quality", title: "Sleep Pattern Monitoring", description: "Analyze your sleep cycles." },
    { href: "/track/activity-log", title: "Exercise Log", description: "Track your physical activity." },
    { href: "/tools/thought-record", title: "Thought Pattern Analysis", description: "Identify recurring thought patterns." },
    { href: "/track/activity-log", title: "Coping Mechanism Usage", description: "Log which coping skills you use." },
    { href: "/track/activity-log", title: "Hydration Tracking", description: "Monitor your daily water intake." },
    { href: "/tools/mindfulness", title: "Mindfulness Minutes", description: "Track time spent in meditation." },
    { href: "/track/activity-log", title: "Productivity Log", description: "Monitor your focus and productivity." },
    { href: "/track/activity-log", title: "Relationship Interactions", description: "Log the quality of social interactions." },
    { href: "/track/activity-log", title: "Burnout Symptom Tracking", description: "Monitor signs of burnout." },
    { href: "/track/journal/freeform", title: "Self-Esteem Fluctuations", description: "Track your self-esteem over time." },
    { href: "/track/activity-log", title: "Weather Correlation", description: "Track mood changes with the weather." },
    { href: "/track/phq-9", title: "Symptom Severity Scoring", description: "Score the severity of your symptoms." },
    { href: "/track/mood", title: "Anger Thermometer", description: "Rate and track anger levels." },
    { href: "/track/mood", title: "Anxiety Thermometer", description: "Rate and track anxiety levels." },
    { href: "/tools/dbt/distress-tolerance", title: "Urge Surfing Tools", description: "Ride out cravings or urges." },
    { href: "/tools/thought-record", title: "Thought Stopping Techniques", description: "Learn to stop unwanted thoughts." },
    { href: "/track/journal/worry-log", title: "Worry Time Scheduling", description: "Set aside a specific time to worry." },
    { href: "/tools/act/values-clarification", title: "Values Card Sort", description: "Sort values to clarify what's important." },
    { href: "/tools/gad-7", title: "Coping Style Evaluation", description: "Evaluate your coping self-efficacy." },
    { href: "/tools/ptsd", title: "PTSD Assessments", description: "Assessments for post-traumatic stress." },
    { href: "/track/substance-use", title: "Sobriety Tracking", description: "Track your journey in addiction recovery." },
    { href: "/track/activity-log", title: "Chronic Pain Management", description: "Tools for managing chronic pain." },
    { href: "/track/mood", title: "Bipolar Disorder Mood Stabilization", description: "Tools for mood stabilization." },
    { href: "/track/activity-log", title: "Schizophrenia Symptom Management", description: "Tools to help manage symptoms." },
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
