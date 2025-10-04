import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Somatic Therapy | Rejoyn',
};

const somaticTools = [
    { href: "/tools/emdr", title: "EMDR (Eye Movement Desensitization)", description: "Digital bilateral stimulation for trauma." },
    { href: "#", title: "Somatic Experiencing Exercises", description: "Body-based trauma release techniques." },
    { href: "/tools/dance-therapy", title: "Dance/Movement Therapy", description: "Guided movement exercises with motion tracking." },
    { href: "#", title: "Nature Therapy (Ecotherapy)", description: "Virtual nature experiences and outdoor activity planning." },
];

export default function SomaticTherapyPage() {
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <div className="flex items-center">
        <h1 className="font-headline text-2xl font-semibold md:text-3xl">Somatic Therapy</h1>
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {somaticTools.map((tool) => (
            <Link href={tool.href || "#"} key={tool.title} className="block hover:bg-muted/50 rounded-lg">
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
