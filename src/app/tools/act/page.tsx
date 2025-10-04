import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'ACT Tools | Zenith',
};

const actTools = [
    { title: "Values Clarification Exercises", description: "Identify what truly matters to you." },
    { title: "Committed Action Planning", description: "Take steps towards your values." },
    { title: "Psychological Flexibility Training", description: "Embrace thoughts and feelings." },
    { title: "Metaphor-Based Learning", description: "Understand concepts through stories." },
    { title: "Decentering/Defusion Techniques", description: "Create distance from thoughts." },
    { title: "Attention Training", description: "Focus redirection techniques." },
];

export default function ACTPage() {
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <div className="flex items-center">
        <h1 className="font-headline text-2xl font-semibold md:text-3xl">Acceptance & Commitment Therapy (ACT)</h1>
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {actTools.map((tool) => (
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
