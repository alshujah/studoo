
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Programs | Rejoyn',
};

const programs = [
    { href: "/programs/social-cognition", title: "6-Week Social Cognition Training", description: "Improve emotional recognition and processing skills." },
    { href: "/programs/mbsr", title: "8-Week MBSR Program", description: "Mindfulness-Based Stress Reduction to cultivate awareness and reduce stress." },
];

export default function ProgramsPage() {
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <div className="flex items-center">
        <h1 className="font-headline text-2xl font-semibold md:text-3xl">Programs</h1>
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {programs.map((program) => (
            <Link href={program.href} key={program.href} className="block hover:bg-muted/50 rounded-lg">
                <Card className="h-full">
                    <CardHeader>
                        <CardTitle>{program.title}</CardTitle>
                        <CardDescription>{program.description}</CardDescription>
                    </CardHeader>
                </Card>
            </Link>
        ))}
      </div>
    </main>
  );
}
