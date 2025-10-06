
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import type { Metadata } from 'next';
import Link from 'next/link';
import { PageLayout } from '@/components/layout/page-layout';

export const metadata: Metadata = {
  title: 'Schema Therapy | Rejoyn',
};

const schemaTherapyTools = [
    { href: "/tools/schema-therapy/schema-identification", title: "Schema Identification", description: "Discover your core self-defeating patterns." },
    { title: "Schema Diary", description: "Track when your schemas are activated." },
    { title: "Imagery Rescripting", description: "Heal past wounds by rewriting memories." },
    { title: "Mode Work", description: "Understand and manage your different emotional states." },
];

export default function SchemaTherapyPage() {
  return (
    <PageLayout title="Schema Therapy">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {schemaTherapyTools.map((tool) => {
            const card = (
                <Card className="h-full">
                    <CardHeader>
                        <CardTitle>{tool.title}</CardTitle>
                        <CardDescription>{tool.description}</CardDescription>
                    </CardHeader>
                </Card>
            );

            if (tool.href) {
                return (
                    <Link href={tool.href} key={tool.title} className="block hover:bg-muted/50 rounded-lg">
                        {card}
                    </Link>
                );
            }

            return <div key={tool.title}>{card}</div>
        })}
      </div>
    </PageLayout>
  );
}
