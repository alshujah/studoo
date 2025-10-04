import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'DBT Tools | Rejoyn',
};

const dbtTools = [
    { title: "Distress Tolerance Skills", description: "Survive crisis situations." },
    { title: "Emotion Regulation Strategies", description: "Manage and change intense emotions." },
    { title: "Interpersonal Effectiveness", description: "Maintain relationships and self-respect." },
    { title: "Radical Acceptance Exercises", description: "Accept reality as it is." },
    { title: "STOP Skill", description: "Stop, Take a step back, Observe, Proceed." },
    { title: "TIPP Technique", description: "Temperature, Intense exercise, Paced breathing, Paired muscle relaxation." },
    { title: "Walking the Middle Path", description: "Find synthesis between opposites." },
    { title: "Pros and Cons", description: "Weigh the advantages and disadvantages." },
    { title: "Behavioral Chain Analysis", description: "Analyze the chain of events leading to a behavior." },
];

export default function DBTPage() {
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <div className="flex items-center">
        <h1 className="font-headline text-2xl font-semibold md:text-3xl">Dialectical Behavior Therapy (DBT)</h1>
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {dbtTools.map((tool) => (
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
