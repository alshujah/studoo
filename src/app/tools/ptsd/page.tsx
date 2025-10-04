import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'PTSD Support | Rejoyn',
};

const ptsdTools = [
    { title: "Trauma Timeline Creator", description: "Visual mapping of traumatic events." },
    { title: "Trigger Identification System", description: "Comprehensive trigger logging and pattern analysis." },
    { title: "Flashback Grounding Toolkit", description: "5-4-3-2-1 technique and other grounding exercises." },
    { title: "Nightmares Rescripting Tool", description: "Imagery rehearsal therapy for trauma nightmares." },
    { title: "Hypervigilance Reduction Training", description: "Exercises to reduce constant alertness." },
    { title: "Dissociation Management Tools", description: "Reality testing and anchoring techniques." },
    { title: "Complex PTSD Workbook", description: "Specialized modules for developmental trauma." },
    { title: "Military/Combat PTSD Support", description: "Veteran-specific resources and peer support." },
    { title: "Sexual Trauma Recovery Program", description: "Specialized healing pathway." },
    { title: "Childhood Trauma Integration", description: "Inner child work and reparenting exercises." },
    { title: "Trauma Memory Reconsolidation", description: "Safe memory processing techniques." },
    { title: "Post-Trauma Growth Tracking", description: "Measuring positive changes after trauma." },
    { title: "Vicarious Trauma Support", description: "For healthcare workers and first responders." },
    { title: "Collective Trauma Processing", description: "Community healing spaces." },
    { title: "Intergenerational Trauma Work", description: "Family system healing approaches." },
];

export default function PTSDPage() {
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <div className="flex items-center">
        <h1 className="font-headline text-2xl font-semibold md:text-3xl">PTSD Support Tools</h1>
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {ptsdTools.map((tool) => (
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
