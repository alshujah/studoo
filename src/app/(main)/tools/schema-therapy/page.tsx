
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import type { Metadata } from 'next';
import Link from 'next/link';
import { PageLayout } from '@/components/layout/page-layout';

export const metadata: Metadata = {
  title: 'Schema Therapy | Rejoyn',
};

const schemaTherapyTools = [
    { href: "/tools/schema-therapy/identification", title: "Schema Identification", description: "Discover your core self-defeating patterns." },
    { href: "/tools/schema-therapy/diary", title: "Schema Diary", description: "Track when your schemas are activated." },
    { href: "/tools/schema-therapy/imagery-rescripting", title: "Imagery Rescripting", description: "Heal past wounds by rewriting memories." },
    { href: "/tools/schema-therapy/modes", title: "Mode Work", description: "Understand and manage your different emotional states." },
];

export default function SchemaTherapyPage() {
  return (
    <PageLayout title="Schema Therapy">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {schemaTherapyTools.map((tool) => (
            <Link href={tool.href} key={tool.title} className="block hover:bg-muted/50 rounded-lg">
                <Card className="h-full">
                    <CardHeader>
                        <CardTitle>{tool.title}</CardTitle>
                        <CardDescription>{tool.description}</CardDescription>
                    </CardHeader>
                </Card>
            </Link>
        ))}
      </div>
    </PageLayout>
  );
}
