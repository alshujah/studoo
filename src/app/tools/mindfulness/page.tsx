import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Mindfulness Tools | Zenith',
};

const mindfulnessTools = [
    { title: "Guided Meditation", description: "Sessions for various lengths and styles." },
    { title: "Body Scan Exercises", description: "Bring awareness to your physical self." },
    { title: "Mindful Breathing", description: "Anchor yourself in the present moment." },
    { title: "Walking Meditation", description: "Practice mindfulness in motion." },
    { title: "Loving-Kindness Meditation", description: "Cultivate compassion for self and others." },
    { title: "Progressive Muscle Relaxation", description: "Release physical tension." },
    { title: "Grounding Techniques", description: "Use the 5-4-3-2-1 sensory exercise." },
    { title: "Visualization Exercises", description: "Create calming mental imagery." },
    { title: "Mindfulness Bells/Reminders", description: "Periodic sounds to bring you to the present." },
    { title: "Present-Moment Awareness", description: "Exercises to focus on the here and now." },
];

export default function MindfulnessPage() {
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <div className="flex items-center">
        <h1 className="font-headline text-2xl font-semibold md:text-3xl">Mindfulness & Meditation</h1>
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {mindfulnessTools.map((tool) => (
            <Card key={tool.title}>
                <CardHeader>
                    <CardTitle>{tool.title}</CardTitle>
                    <CardDescription>{tool.description}</CardDescription>
                </CardHeader>
            </Card>
        ))}
      </div>
    </main>
  );
}
