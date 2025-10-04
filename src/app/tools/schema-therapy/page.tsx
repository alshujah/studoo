import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Schema Therapy | Rejoyn',
};

const schemaTherapyTools = [
    { title: "Schema Identification", description: "Discover your core self-defeating patterns." },
    { title: "Schema Diary", description: "Track when your schemas are activated." },
    { title: "Imagery Rescripting", description: "Heal past wounds by rewriting memories." },
    { title: "Mode Work", description: "Understand and manage your different emotional states." },
];

export default function SchemaTherapyPage() {
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <div className="flex items-center">
        <h1 className="font-headline text-2xl font-semibold md:text-3xl">Schema Therapy</h1>
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {schemaTherapyTools.map((tool) => (
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
