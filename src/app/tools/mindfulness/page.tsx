
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Bell } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Mindfulness Tools | Rejoyn',
};

const mindfulnessTools = [
    { href: "/tools/mindfulness/guided-meditation", title: "Guided Meditation", description: "Sessions for various lengths and styles." },
    { href: "/tools/mindfulness/body-scan", title: "Body Scan Exercises", description: "Bring awareness to your physical self." },
    { href: "/tools/mindfulness/mindful-breathing", title: "Mindful Breathing", description: "Anchor yourself in the present moment." },
    { href: "/tools/mindfulness/walking-meditation", title: "Walking Meditation", description: "Practice mindfulness in motion." },
    { href: "/tools/mindfulness/loving-kindness", title: "Loving-Kindness Meditation", description: "Cultivate compassion for self and others." },
    { href: "/tools/mindfulness/progressive-muscle-relaxation", title: "Progressive Muscle Relaxation", description: "Release physical tension." },
    { href: "/tools/ptsd/grounding", title: "Grounding Techniques", description: "Use the 5-4-3-2-1 sensory exercise." },
    { href: "/tools/relaxation/safe-place", title: "Visualization Exercises", description: "Create calming mental imagery." },
    { href: "#", title: "Mindfulness Bells/Reminders", description: "Periodic sounds to bring you to the present.", icon: Bell },
    { href: "/tools/mindfulness/mindful-breathing", title: "Present-Moment Awareness", description: "Exercises to focus on the here and now." },
];

export default function MindfulnessPage() {
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <div className="flex items-center">
        <h1 className="font-headline text-2xl font-semibold md:text-3xl">Mindfulness & Meditation</h1>
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {mindfulnessTools.map((tool) => (
            <Link href={tool.href || "#"} key={tool.title} className="block hover:bg-muted/50 rounded-lg">
                <Card className="h-full">
                    <CardHeader>
                        <CardTitle>{tool.title}</CardTitle>
                        <CardDescription>{tool.description}</CardDescription>
                    </CardHeader>
                </Card>
            </Link>
        ))}
      </div>
    </main>
  );
}
