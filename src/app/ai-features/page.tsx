import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import type { Metadata } from 'next';
import { BrainCircuit, HeartPulse, Shield, Bot, Languages, MessageSquare, Mic, AlertTriangle, UserCheck, Activity, Droplets, Bed, Leaf, Bike, Zap, Brain, Smile, GitCommitHorizontal, Group, FolderKanban, Users, HandHeart, Eye } from 'lucide-react';
import React from 'react';

export const metadata: Metadata = {
  title: 'AI Features | Rejoyn',
};

const categories = [
  {
    title: "Core AI & Interaction",
    icon: Bot,
    features: [
      { title: "24/7 AI Therapist Avatar", description: "Personalized virtual therapist with customizable appearance and voice.", icon: UserCheck },
      { title: "Contextual Memory System", description: "AI remembers past conversations and personal history.", icon: Brain },
      { title: "Empathetic Response Generation", description: "Natural language processing for compassionate interactions.", icon: Smile },
      { title: "Multilingual Support", description: "AI communication in 50+ languages.", icon: Languages },
      { title: "Voice-based Therapy Sessions", description: "Natural conversation flow with voice recognition.", icon: Mic },
      { title: "Personal Growth Mentor", description: "Long-term development planning and tracking.", icon: GitCommitHorizontal },
    ]
  },
  {
    title: "Analysis & Insights",
    icon: BrainCircuit,
    features: [
      { title: "Emotional State Detection", description: "Real-time mood analysis through text, voice tone, and facial expressions.", icon: HeartPulse },
      { title: "Predictive Mental Health Alerts", description: "Early warning system for mental health deterioration.", icon: Zap },
      { title: "Personalized Coping Strategies", description: "AI-generated strategies based on user patterns.", icon: FolderKanban },
      { title: "Dream Analysis Assistant", description: "AI interpretation of dream journals.", icon: Bed },
      { title: "Sleep Pattern Analysis", description: "AI monitoring of sleep quality and recommendations.", icon: Droplets },
    ]
  },
  {
    title: "Safety & Support",
    icon: Shield,
    features: [
      { title: "Crisis Intervention System", description: "Immediate AI response for crisis situations with escalation protocols.", icon: AlertTriangle },
      { title: "Suicide Prevention Protocol", description: "Advanced detection and intervention system.", icon: HandHeart },
      { title: "Relapse Prevention Assistant", description: "Monitoring and early intervention for addiction.", icon: Eye },
      { title: "Self-Harm Prevention System", description: "Detection and alternative coping mechanisms.", icon: Shield },
    ]
  },
  {
    title: "Guided Therapeutic Modules",
    icon: Group,
    features: [
      { title: "Social Anxiety Coach", description: "Step-by-step guidance for social situations.", icon: Users },
      { title: "Panic Attack Management", description: "Real-time guidance during panic episodes.", icon: HeartPulse },
      { title: "Emotional Regulation Training", description: "Interactive exercises for emotional control.", icon: GitCommitHorizontal },
      { title: "Trauma Processing Assistant", description: "Gentle guidance through traumatic memories.", icon: HandHeart },
    ]
  },
  {
    title: "Wellness & Lifestyle",
    icon: Activity,
    features: [
      { title: "Medication Reminder System", description: "Smart reminders with side effect tracking.", icon: MessageSquare },
      { title: "Nutrition & Mental Health Advisor", description: "Dietary suggestions for mental wellness.", icon: Leaf },
      { title: "Exercise Recommendation Engine", description: "Personalized physical activity plans.", icon: Bike },
      { title: "Mindfulness Coach", description: "Guided meditation with real-time feedback.", icon: Smile },
      { title: "Breathing Exercise Guide", description: "AI-led breathing techniques with biometric monitoring.", icon: Wind },
      { title: "Positive Affirmation Generator", description: "Personalized daily affirmations.", icon: Sparkles },
    ]
  }
];


export default function AIFeaturesPage() {
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <div className="flex items-center">
        <h1 className="font-headline text-2xl font-semibold md:text-3xl">AI Features</h1>
      </div>
      <div className="space-y-8">
        {categories.map((category) => (
            <div key={category.title}>
                <div className="flex items-center gap-4 mb-4">
                    <category.icon className="size-8 text-primary" />
                    <h2 className="font-headline text-2xl">{category.title}</h2>
                </div>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {category.features.map((feature) => (
                        <Card key={feature.title} className="flex flex-col">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-3">
                                    <feature.icon className="size-6 text-muted-foreground" />
                                    <span>{feature.title}</span>
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="flex-grow">
                                <CardDescription>{feature.description}</CardDescription>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        ))}
      </div>
    </main>
  );
}
