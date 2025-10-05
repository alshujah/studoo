
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Crisis Management | Rejoyn',
};

const crisisTools = [
    { href: "/tools/crisis-management/crisis-hotlines", title: "Crisis Support Hotline Links", description: "Direct connections to crisis services." },
    { href: "/tools/crisis-management/safety-plan", title: "Safety Planning Tools", description: "Create personalized crisis plans." },
    { href: "/tools/crisis-management/self-harm-alternatives", title: "Self-Harm Alternatives", description: "Find alternative coping strategies." },
    { href: "/tools/crisis-management/panic-attack-assistance", title: "Panic Attack Assistance", description: "Guided help during a panic attack." },
    { href: "/tools/dbt/tipp-technique", title: "SOS/Emergency Button", description: "Quick access to crisis skills like TIPP." },
    { href: "/tools/crisis-management/safety-plan", title: "Warning Sign Identification", description: "Recognize your personal crisis warning signs." },
    { href: "/tools/ptsd/grounding", title: "Flashback Coping Strategies", description: "Tools to manage flashbacks." },
    { href: "/tools/ptsd/triggers", title: "Trigger Management Plans", description: "Develop plans to manage triggers." },
];

export default function CrisisManagementPage() {
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <div className="flex items-center">
        <h1 className="font-headline text-2xl font-semibold md:text-3xl">Crisis Management</h1>
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {crisisTools.map((tool) => (
             <Link href={tool.href || '#'} key={tool.title} className="block hover:bg-muted/50 rounded-lg">
                <Card className="h-full">
                    <CardHeader>
                        <CardTitle>{tool.title}</CardTitle>
                        <CardDescription>{tool.description}</CardDescription>
                    </CardHeader>
                </Card>
            </Link>
        ))}
      </div>
    </main>
  );
}
