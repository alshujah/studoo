
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'PTSD Support | Rejoyn',
};

const ptsdTools = [
    { href: "/tools/ptsd/timeline", title: "Trauma Timeline Creator", description: "Visual mapping of traumatic events." },
    { href: "/tools/ptsd/triggers", title: "Trigger Identification System", description: "Comprehensive trigger logging and pattern analysis." },
    { href: "/tools/ptsd/grounding", title: "Flashback Grounding Toolkit", description: "5-4-3-2-1 technique and other grounding exercises." },
    { href: "/tools/ptsd/nightmare-rescripting", title: "Nightmares Rescripting Tool", description: "Imagery rehearsal therapy for trauma nightmares." },
    { href: "/tools/ptsd/hypervigilance", title: "Hypervigilance Reduction Training", description: "Exercises to reduce constant alertness." },
    { href: "/tools/ptsd/grounding", title: "Dissociation Management Tools", description: "Reality testing and anchoring techniques." },
    { href: "#", title: "Complex PTSD Workbook", description: "Specialized modules for developmental trauma." },
    { href: "#", title: "Military/Combat PTSD Support", description: "Veteran-specific resources and peer support." },
    { href: "#", title: "Sexual Trauma Recovery Program", description: "Specialized healing pathway." },
    { href: "#", a: "Childhood Trauma Integration", description: "Inner child work and reparenting exercises." },
    { href: "#", title: "Trauma Memory Reconsolidation", description: "Safe memory processing techniques." },
    { href: "#", title: "Post-Trauma Growth Tracking", description: "Measuring positive changes after trauma." },
    { href: "#", title: "Vicarious Trauma Support", description: "For healthcare workers and first responders." },
    { href: "#", title: "Collective Trauma Processing", description: "Community healing spaces." },
    { href: "#", title: "Intergenerational Trauma Work", description: "Family system healing approaches." },
];

export default function PTSDPage() {
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <div className="flex items-center">
        <h1 className="font-headline text-2xl font-semibold md:text-3xl">PTSD Support Tools</h1>
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {ptsdTools.map((tool) => (
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
