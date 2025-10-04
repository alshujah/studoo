import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Psychodynamic Therapy | Rejoyn',
};

const psychodynamicTools = [
    { title: "IFS (Internal Family Systems)", description: "Parts work and self-compassion exercises." },
    { title: "Narrative Therapy Tools", description: "Story rewriting and externalization techniques." },
    { title: "Solution-Focused Brief Therapy", description: "Goal-setting and exception-finding exercises." },
    { title: "Gestalt Therapy Techniques", description: "Empty chair and awareness exercises." },
    { title: "Psychodynamic Exploration", description: "Dream work and unconscious pattern analysis." },
    { title: "Compassion-Focused Therapy", description: "Self-compassion and shame resilience exercises." },
    { title: "Schema Therapy Worksheets", description: "Core belief identification and modification." },
    { title: "Interpersonal Therapy (IPT)", description: "Relationship pattern analysis tools." },
];

export default function PsychodynamicPage() {
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <div className="flex items-center">
        <h1 className="font-headline text-2xl font-semibold md:text-3xl">Psychodynamic Approaches</h1>
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {psychodynamicTools.map((tool) => (
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
