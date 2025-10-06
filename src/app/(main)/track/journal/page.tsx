

import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import type { Metadata } from 'next';
import Link from 'next/link';
import { PageLayout } from '@/components/layout/page-layout';

export const metadata: Metadata = {
  title: 'Journal | Rejoyn',
};

const journalModules = [
    { href: "/track/journal/freeform", title: "Freeform Journal", description: "An open space for your thoughts and feelings." },
    { href: "/tools/thought-record", title: "Thought Record", description: "A CBT tool to challenge negative thoughts." },
    { href: "/track/journal/gratitude", title: "Gratitude Journal", description: "Daily positive reflections." },
    { href: "/track/journal/photo", title: "Photo Journal", description: "Use images to capture your moments." },
    { href: "/track/journal/voice", title: "Voice Journal", description: "Speak your thoughts instead of writing." },
    { href: "/track/journal/worry-log", title: "Worry & Rumination Log", description: "Externalize and manage worries." },
    { href: "/track/journal/dream", title: "Dream Journal", description: "Record and explore your dreams." },
];

export default function JournalPage() {
  return (
    <PageLayout title="Journaling Tools">
       <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {journalModules.map((module) => (
            <Link href={module.href} key={module.title} className="block hover:bg-muted/50 rounded-lg">
                <Card className="h-full">
                    <CardHeader>
                        <CardTitle>{module.title}</CardTitle>
                        <CardDescription>{module.description}</CardDescription>
                    </CardHeader>
                </Card>
            </Link>
        ))}
      </div>
    </PageLayout>
  );
}
