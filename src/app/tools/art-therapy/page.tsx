
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Expressive Arts Therapy | Rejoyn',
};

const artTherapyTools = [
    { href: "/tools/art-therapy/canvas", title: "Art Therapy Canvas", description: "Digital art creation for emotional expression." },
    { href: "/tools/art-therapy/creative-wellness", title: "Creative Wellness", description: "Use sound, words, and color for healing." },
    { href: "/tools/dance-therapy", title: "Dance/Movement Therapy", description: "Express emotions through body movement." },
    { href: "/tools/art-therapy/play-therapy", title: "Play Therapy Elements", description: "Rediscover spontaneity and joy through play." },
    { href: "/tools/art-therapy/pet-therapy", title: "Pet Therapy", description: "Explore the healing power of animal companionship." },
    { href: "/tools/art-therapy/laughter-therapy", title: "Laughter Therapy Sessions", description: "Boost mood through guided laughter." },
    { href: "/tools/art-therapy/aromatherapy", title: "Aromatherapy Guide", description: "Use scent to influence your mood." },
];

export default function ArtTherapyPage() {
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <div className="flex items-center">
        <h1 className="font-headline text-2xl font-semibold md:text-3xl">Expressive Arts Therapy</h1>
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {artTherapyTools.map((tool) => (
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
