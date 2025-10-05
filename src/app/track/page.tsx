
import type { Metadata } from 'next';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import Link from 'next/link';
import { Activity, BedDouble, Pill, Siren } from 'lucide-react';

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
    { title: "Social Interaction Tracking", description: "Log your social engagements." },
    { title: "Substance Use Tracking", description: "Monitor alcohol, caffeine, etc." },
    { href: "/track/journal/worry-log", title: "Worry/Rumination Logging", description: "Externalize and manage worries." },
    { title: "Success/Achievement Log", description: "Record your accomplishments." },
    { title: "Energy Level Monitoring", description: "Track your energy levels throughout the day." },
    { title: "Physical Symptom Recording", description: "Log headaches, tension, pain, etc." },
    { title: "Side Effect Documentation", description: "Note any medication side effects." },
    { title: "Screen Time Monitoring", description: "Track your time on digital devices." },
    { title: "Eating Habits Logging", description: "Monitor your nutritional intake." },
    { title: "Menstrual Cycle Mood Correlation", description: "Track mood changes with your cycle." },
    { title: "Self-Care Activities Checklist", description: "Ensure you're taking care of yourself." },
    { title: "Trigger Event Documentation", description: "Identify events that affect your mood." },
    { title: "Emotional Self-Awareness Scoring", description: "Track improvements in recognizing emotions." },
    { title: "Multi-dimensional Mood Tracking", description: "Track energy, anxiety, depression, and stress." },
    { title: "Habit Tracking", description: "Monitor and build positive habits." },
    { title: "Sleep Pattern Monitoring", description: "Analyze your sleep cycles." },
    { title: "Exercise Log", description: "Track your physical activity." },
    { title: "Thought Pattern Analysis", description: "Identify recurring thought patterns." },
    { title: "Coping Mechanism Usage", description: "Log which coping skills you use." },
    { title: "Hydration Tracking", description: "Monitor your daily water intake." },
    { title: "Mindfulness Minutes", description: "Track time spent in meditation." },
    { title: "Productivity Log", description: "Monitor your focus and productivity." },
    { title: "Relationship Interactions", description: "Log the quality of social interactions." },
    { title: "Burnout Symptom Tracking", description: "Monitor signs of burnout." },
    { title: "Self-Esteem Fluctuations", description: "Track your self-esteem over time." },
    { title: "Weather Correlation", description: "Track mood changes with the weather." },
    { title: "Medication Interaction Checker", description: "Check for interactions between medications." },
    { title: "Symptom Severity Scoring", description: "Score the severity of your symptoms." },
    { title: "Anger Thermometer", description: "Rate and track anger levels." },
    { title: "Anxiety Thermometer", description: "Rate and track anxiety levels." },
    { title: "Urge Surfing Tools", description: "Ride out cravings or urges." },
    { title: "Thought Stopping Techniques", description: "Learn to stop unwanted thoughts." },
    { title: "Worry Time Scheduling", description: "Set aside a specific time to worry." },
    { title: "Values Card Sort", description: "Sort values to clarify what's important." },
    { title: "Life Balance Wheel", description: "Assess and balance different life areas." },
    { title: "Well-being Assessments", description: "Warwick-Edinburgh Mental Well-Being Scale." },
    { title: "Personality Assessments", description: "Understand your personality traits." },
    { title: "Coping Style Evaluation", description: "Evaluate your coping self-efficacy." },
    { title: "PTSD Assessments", description: "Assessments for post-traumatic stress disorder." },
    { title: "Sobriety Tracking", description: "Track your journey in addiction recovery." },
    { title: "Chronic Pain Management", description: "Tools for managing chronic pain." },
    { title: "Bipolar Disorder Mood Stabilization", description: "Tools for mood stabilization." },
    { title: "Schizophrenia Symptom Management", description: "Tools to help manage symptoms." },
    { title: "Moon Phase Tracking", description: "For those interested in moon phases." },
    { title: "Biometric Integration", description: "Sync with heart rate and step counters." },
    { title: "Wearable Device Sync", description: "Connect your favorite wearable." }
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
