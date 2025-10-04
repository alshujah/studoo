import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Relaxation Techniques | Rejoyn',
};

const relaxationTools = [
    { href: "/tools/relaxation/box-breathing", title: "Box Breathing (4-4-4-4)", description: "A simple and effective breathing exercise." },
    { title: "Diaphragmatic Breathing", description: "Deep belly breathing to calm your body." },
    { title: "4-7-8 Breathing Technique", description: "A popular technique for relaxation and sleep." },
    { title: "Grounding Techniques", description: "Use the 5-4-3-2-1 sensory exercise." },
    { title: "Safe Place Visualization", description: "Create a calming mental sanctuary." },
    { title: "Binaural Beats/Sound Therapy", description: "Listen to sounds designed for relaxation." },
];

export default function RelaxationPage() {
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <div className="flex items-center">
        <h1 className="font-headline text-2xl font-semibold md:text-3xl">Relaxation Techniques</h1>
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {relaxationTools.map((tool) => (
          <Link href={tool.href || "#"} key={tool.title} className="block hover:bg-muted/50 rounded-lg">
            <Card className='h-full'>
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
