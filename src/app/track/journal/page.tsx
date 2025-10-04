import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Journal | Zenith',
};

const journalModules = [
    { href: "/tools/thought-record", title: "Thought Record", description: "A CBT tool to challenge negative thoughts." },
    { title: "Gratitude Journal", description: "Daily positive reflections." },
    { title: "Worry/Rumination Log", description: "Externalize and manage worries." },
    { title: "Success/Achievement Log", description: "Record your accomplishments." },
    { title: "Dream Journal", description: "Record and explore your dreams." },
    { title: "Freeform Journal", description: "An open space for your thoughts and feelings." },
    { title: "Photo Journaling", description: "Use images to capture your moments." },
    { title: "Voice Journaling", description: "Speak your thoughts instead of writing." },
    { title: "Self-Compassion Journal", description: "Focus on kindness and understanding towards yourself." },
    { title: "Behavioral Chain Analysis", description: "Analyze the chain of events leading to a behavior." },
    { title: "Future Self Journaling", description: "Write to your future self to build hope." },
    { title: "Expressive Writing", description: "Write about traumatic or stressful events." },
    { title: "Sentence Completion", description: "Journal prompts to guide reflection." },
    { title: "Story-Based Journaling", description: "Write about your life as a story." },
    { title: "Unsent Letter", description: "Write a letter you don't intend to send." },
    { title: "Role-Playing Journal", description: "Explore situations from different perspectives." },
];

export default function JournalPage() {
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <div className="flex items-center">
        <h1 className="font-headline text-2xl font-semibold md:text-3xl">Journaling Tools</h1>
      </div>
       <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {journalModules.map((module) => (
            <Link href={module.href || "#"} key={module.title} className="block hover:bg-muted/50 rounded-lg">
                <Card className="h-full">
                    <CardHeader>
                        <CardTitle>{module.title}</CardTitle>
                        <CardDescription>{module.description}</CardDescription>
                    </CardHeader>
                </Card>
            </Link>
        ))}
      </div>
    </main>
  );
}
