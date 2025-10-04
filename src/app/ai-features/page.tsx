import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AI Features | Zenith',
};

const aiFeatures = [
    { title: "24/7 AI Therapist Avatar", description: "Personalized virtual therapist with customizable appearance and voice." },
    { title: "Emotional State Detection", description: "Real-time mood analysis through text, voice tone, and facial expressions." },
    { title: "Crisis Intervention System", description: "Immediate AI response for crisis situations with escalation protocols." },
    { title: "Contextual Memory System", description: "AI remembers past conversations and personal history." },
    { title: "Empathetic Response Generation", description: "Natural language processing for compassionate interactions." },
    { title: "Multilingual Support", description: "AI communication in 50+ languages." },
    { title: "Voice-based Therapy Sessions", description: "Natural conversation flow with voice recognition." },
    { title: "Predictive Mental Health Alerts", description: "Early warning system for mental health deterioration." },
    { title: "Personalized Coping Strategies", description: "AI-generated strategies based on user patterns." },
    { title: "Dream Analysis Assistant", description: "AI interpretation of dream journals." },
    { title: "Medication Reminder System", description: "Smart reminders with side effect tracking." },
    { title: "Sleep Pattern Analysis", description: "AI monitoring of sleep quality and recommendations." },
    { title: "Nutrition & Mental Health Advisor", description: "Dietary suggestions for mental wellness." },
    { title: "Exercise Recommendation Engine", description: "Personalized physical activity plans." },
    { title: "Mindfulness Coach", description: "Guided meditation with real-time feedback." },
    { title: "Breathing Exercise Guide", description: "AI-led breathing techniques with biometric monitoring." },
    { title: "Positive Affirmation Generator", description: "Personalized daily affirmations." },
    { title: "Suicide Prevention Protocol", description: "Advanced detection and intervention system." },
    { title: "Relapse Prevention Assistant", description: "Monitoring and early intervention for addiction." },
    { title: "Social Anxiety Coach", description: "Step-by-step guidance for social situations." },
    { title: "Panic Attack Management", description: "Real-time guidance during panic episodes." },
    { title: "Emotional Regulation Training", description: "Interactive exercises for emotional control." },
    { title: "Self-Harm Prevention System", description: "Detection and alternative coping mechanisms." },
    { title: "Trauma Processing Assistant", description: "Gentle guidance through traumatic memories." },
    { title: "Personal Growth Mentor", description: "Long-term development planning and tracking." },
];

export default function AIFeaturesPage() {
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <div className="flex items-center">
        <h1 className="font-headline text-2xl font-semibold md:text-3xl">AI Features</h1>
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {aiFeatures.map((module) => (
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
