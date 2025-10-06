
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import type { Metadata } from 'next';
import Link from 'next/link';
import { PageLayout } from '@/components/layout/page-layout';

export const metadata: Metadata = {
  title: 'Expressive Arts Therapy | Zenith',
};

const artTherapyTools = [
    { title: "Art Therapy Canvas", description: "Digital art creation for emotional expression." },
    { title: "Creative Wellness", description: "Use sound, words, and color for healing." },
    { title: "Dance/Movement Therapy", description: "Express emotions through body movement." },
    { title: "Play Therapy Elements", description: "Rediscover spontaneity and joy through play." },
    { title: "Pet Therapy", description: "Explore the healing power of animal companionship." },
    { title: "Laughter Therapy Sessions", description: "Boost mood through guided laughter." },
    { title: "Aromatherapy Guide", description: "Use scent to influence your mood." },
];

export default function ArtTherapyPage() {
  return (
    <PageLayout title="Expressive Arts Therapy">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {artTherapyTools.map((tool) => (
            <div key={tool.title}>
                <Card className="h-full">
                    <CardHeader>
                        <CardTitle>{tool.title}</CardTitle>
                        <CardDescription>{tool.description}</CardDescription>
                    </CardHeader>
                </Card>
            </div>
        ))}
      </div>
    </PageLayout>
  );
}
