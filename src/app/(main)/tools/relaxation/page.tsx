
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import type { Metadata } from 'next';
import Link from 'next/link';
import { PageLayout } from '@/components/layout/page-layout';

export const metadata: Metadata = {
  title: 'Relaxation Techniques | Rejoyn',
};

const relaxationTools = [
    { href: "/tools/relaxation/box-breathing", title: "Box Breathing (4-4-4-4)", description: "A simple and effective breathing exercise." },
    { href: "/tools/relaxation/diaphragmatic-breathing", title: "Diaphragmatic Breathing", description: "Deep belly breathing to calm your body." },
    { href: "/tools/relaxation/4-7-8-breathing", title: "4-7-8 Breathing Technique", description: "A popular technique for relaxation and sleep." },
    { href: "/tools/ptsd/grounding", title: "Grounding Techniques", description: "Use the 5-4-3-2-1 sensory exercise." },
    { href: "/tools/relaxation/safe-place", title: "Safe Place Visualization", description: "Create a calming mental sanctuary." },
    { href: "/tools/relaxation/sound-therapy", title: "Binaural Beats/Sound Therapy", description: "Listen to sounds designed for relaxation." },
];

export default function RelaxationPage() {
  return (
    <PageLayout title="Relaxation Techniques">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {relaxationTools.map((tool) => {
            const card = (
                <Card className='h-full'>
                    <CardHeader>
                        <CardTitle>{tool.title}</CardTitle>
                        <CardDescription>{tool.description}</CardDescription>
                    </CardHeader>
                </Card>
            );

            if ((tool as any).href) {
                return (
                    <Link href={(tool as any).href} key={tool.title} className="block hover:bg-muted/50 rounded-lg">
                        {card}
                    </Link>
                )
            }

            return <div key={tool.title}>{card}</div>
        })}
      </div>
    </PageLayout>
  );
}
