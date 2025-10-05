
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import type { Metadata } from 'next';
import Link from 'next/link';
import { PageLayout } from '@/components/layout/page-layout';

export const metadata: Metadata = {
  title: 'Expressive Arts Therapy | Rejoyn',
};

const artTherapyTools = [
    { href: "#", title: "Art Therapy Canvas", description: "Digital art creation for emotional expression." },
    { href: "#", title: "Creative Wellness", description: "Use sound, words, and color for healing." },
    { href: "#", title: "Dance/Movement Therapy", description: "Express emotions through body movement." },
    { href: "#", title: "Play Therapy Elements", description: "Rediscover spontaneity and joy through play." },
    { href: "#", title: "Pet Therapy", description: "Explore the healing power of animal companionship." },
    { href: "#", title: "Laughter Therapy Sessions", description: "Boost mood through guided laughter." },
    { href: "#", title: "Aromatherapy Guide", description: "Use scent to influence your mood." },
];

export default function ArtTherapyPage() {
  return (
    <PageLayout title="Expressive Arts Therapy">
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
    </PageLayout>
  );
}
