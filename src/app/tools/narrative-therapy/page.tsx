import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Narrative Therapy | Rejoyn',
};

const narrativeTools = [
    { title: "Externalizing Conversations", description: "Separate yourself from the problem." },
    { title: "Re-authoring", description: "Rewrite your story to focus on your strengths and resilience." },
    { title: "Unique Outcomes", description: "Find exceptions to the problem's influence." },
    { title: "Statement of Position Map", description: "Map out the effects of the problem on your life." },
];

export default function NarrativeTherapyPage() {
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <div className="flex items-center">
        <h1 className="font-headline text-2xl font-semibold md:text-3xl">Narrative Therapy</h1>
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {narrativeTools.map((tool) => (
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
