
import type { Metadata } from 'next';
import { FreeformJournalClient } from './freeform/freeform-journal-client';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { PageLayout } from '@/components/layout/page-layout';
import Link from 'next/link';
import { PenSquare, Sparkle, Brain, Bed } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Journaling | Zenith',
};

const journalTypes = [
    { href: "/track/journal/freeform", title: "Freeform Journal", description: "Write freely about what's on your mind.", icon: PenSquare },
    { href: "/track/journal/gratitude", title: "Gratitude Journal", description: "Focus on the good things in your life.", icon: Sparkle },
    { href: "/track/journal/worry-log", title: "Worry & Rumination Log", description: "Schedule a time to worry, and then let it go.", icon: Brain },
    { href: "/track/journal/dream", title: "Dream Journal", description: "Record and explore the landscape of your dreams.", icon: Bed },
];

export default function JournalPage() {
  return (
    <PageLayout title="Journaling">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {journalTypes.map(journal => (
                 <Link href={journal.href} key={journal.title} className="block hover:bg-muted/50 rounded-lg">
                    <Card className="h-full">
                        <CardHeader>
                            <journal.icon className="size-6 text-primary mb-2" />
                            <CardTitle>{journal.title}</CardTitle>
                            <CardDescription>{journal.description}</CardDescription>
                        </CardHeader>
                    </Card>
                </Link>
            ))}
        </div>
    </PageLayout>
  );
}
