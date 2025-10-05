
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import type { Metadata } from 'next';
import Link from 'next/link';
import { PageLayout } from '@/components/layout/page-layout';

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
    <PageLayout title="Narrative Therapy">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {narrativeTools.map((tool) => (
            <div key={tool.title}>
                <Card className="h-full">
                    <CardHeader>
                        <CardTitle>{tool.title}</CardTitle>
                        <CardDescription>{tool.description}</CardDescription>
                    </CardHeader>
                </Card>
            </div>
        ))}
      </div>
    </PageLayout>
  );
}
