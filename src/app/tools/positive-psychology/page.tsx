import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Positive Psychology Tools | Rejoyn',
};

const positivePsychologyTools = [
    { title: "Strengths Identification", description: "Discover your character strengths." },
    { title: "Acts of Kindness", description: "Track and plan acts of kindness." },
    { title: "Savoring Exercises", description: "Mindfully appreciate positive experiences." },
    { title: "Meaning and Purpose", description: "Explore your personal sense of purpose." },
    { title: "Gratitude Journaling", description: "Daily positive reflections." },
    { title: "Self-Esteem Building", description: "Exercises to build healthy self-esteem." },
    { title: "Optimism Training", description: "Cultivate a more positive outlook." },
    { title: "Life Satisfaction Assessments", description: "Evaluate your overall well-being." },
];

export default function PositivePsychologyPage() {
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <div className="flex items-center">
        <h1 className="font-headline text-2xl font-semibold md:text-3xl">Positive Psychology</h1>
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {positivePsychologyTools.map((tool) => (
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
