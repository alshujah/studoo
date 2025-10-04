import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import type { Metadata } from 'next';
import { BookOpen, Brain, ShieldCheck, Users, Leaf, BarChart, Group } from 'lucide-react';
import React from 'react';

export const metadata: Metadata = {
  title: 'Learn | Rejoyn',
};

const categories = [
    {
        title: "Understanding Mental Health",
        icon: Brain,
        modules: [
            { title: "Mental Health Condition Information", description: "Psychoeducation on various conditions." },
            { title: "Symptom Explanation Modules", description: "Understand the 'why' behind symptoms." },
            { title: "Neuroscience Basics", description: "How your brain works." },
            { title: "Stress Response Education", description: "Understand the fight-or-flight response." },
            { title: "Mental Health Myths Debunking", description: "Separating fact from fiction." },
            { title: "Cognitive Biases Education", description: "Learn about common thinking traps." },
            { title: "Research Article Summaries", description: "Digestible summaries of new research." },
        ]
    },
    {
        title: "Therapeutic Approaches",
        icon: BookOpen,
        modules: [
            { title: "Treatment Options Overview", description: "Learn about different therapeutic approaches." },
            { title: "Therapy Preparation Guides", description: "Get the most out of your therapy." },
            { title: "Evidence-Based Practice Explanations", description: "Understand what works and why." },
            { title: "Expert Interviews", description: "Hear from leading mental health experts." },
        ]
    },
    {
        title: "Building Skills",
        icon: BarChart,
        modules: [
            { title: "Communication Skills", description: "Improve your interpersonal effectiveness." },
            { title: "Coping Mechanisms Explained", description: "Learn how different strategies work." },
            { title: "Self-Advocacy Skills", description: "Learn to advocate for your own needs." },
            { title: "Relationship Management Tips", description: "Improve your relationships." },
            { title: "Conflict Resolution Strategies", description: "Learn to navigate disagreements." },
            { title: "Boundary-Setting Guidance", description: "Protect your energy and well-being." },
            { title: "Social Skills Training", description: "Practice and improve social interactions." },
        ]
    },
    {
        title: "Social Psychology",
        icon: Group,
        modules: [
            { title: "Social Perception & Biases", description: "How we see others and common errors in judgment." },
            { title: "The Psychology of Persuasion", description: "Understand the techniques of influence." },
            { title: "Group Behavior & Dynamics", description: "How we behave in the presence of others." },
            { title: "Attribution Theory", description: "Explaining our own and others' behavior." },
            { title: "Cognitive Dissonance", description: "Understanding mental discomfort from conflicting beliefs." },
        ]
    },
    {
        title: "Community & Support",
        icon: Users,
        modules: [
            { title: "Recovery Stories/Testimonials", description: "Read stories of hope and recovery." },
            { title: "Mental Health First Aid Training", description: "Learn how to help others." },
            { title: "Stigma Reduction Content", description: "Promoting open conversations." },
            { title: "Help-Seeking Education", description: "Learn how and when to seek help." },
            { title: "Family Education Resources", description: "Resources for your loved ones." },
            { title: "Caregiver Support Tools", description: "Support for those who care for others." },
        ]
    },
    {
        title: "Specialized Topics",
        icon: Leaf,
        modules: [
            { title: "Perinatal Mental Health", description: "Support for new and expecting parents." },
            { title: "Adolescent-Specific Content", description: "Content tailored for teenagers." },
            { title: "Geriatric Mental Health Tools", description: "Resources for older adults." },
            { title: "LGBTQ+ Specific Resources", description: "Culturally competent resources." },
            { title: "Cultural Adaptation Options", description: "Content adapted for different cultures." },
            { title: "Gender-Specific Content", description: "Content tailored to different gender identities." },
        ]
    },
    {
        title: "Screening & Assessment",
        icon: ShieldCheck,
        modules: [
            { title: "Coping Self-Efficacy Scale", description: "Evaluate your confidence in coping." },
            { title: "Trauma Screening Tools (PCL-5)", description: "Screen for post-traumatic stress." },
            { title: "Eating Disorder Screening", description: "Tools for early identification." },
            { title: "ADHD Assessment Tools", description: "Screening for attention-deficit hyperactivity." },
            { title: "Autism Spectrum Screening", description: "Tools for autism spectrum traits." },
            { title: "Relationship Health Evaluation", description: "Assess the health of your relationships." },
        ]
    }
];

export default function LearnPage() {
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <div className="flex items-center">
        <h1 className="font-headline text-2xl font-semibold md:text-3xl">Learn</h1>
      </div>
       <div className="space-y-8">
        {categories.map((category) => (
            <div key={category.title}>
                <div className="flex items-center gap-4 mb-4">
                    <category.icon className="size-8 text-primary" />
                    <h2 className="font-headline text-2xl">{category.title}</h2>
                </div>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {category.modules.map((module) => (
                        <Card key={module.title}>
                            <CardHeader>
                                <CardTitle>{module.title}</CardTitle>
                                <CardDescription>{module.description}</CardDescription>
                            </CardHeader>
                        </Card>
                    ))}
                </div>
            </div>
        ))}
      </div>
    </main>
  );
}
