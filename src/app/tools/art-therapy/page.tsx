import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Expressive Arts Therapy | Rejoyn',
};

const artTherapyTools = [
    { title: "Art Therapy Canvas", description: "Digital art creation for emotional expression." },
    { title: "Music Therapy Playlists", description: "Mood-based curated playlists with binaural beats." },
    { title: "Writing Therapy Prompts", description: "Therapeutic writing exercises and journaling." },
    { title: "Play Therapy Elements", description: "Gamified therapeutic activities." },
    { title: "Pet Therapy Simulation", description: "Virtual pet companion for emotional support." },
    { title: "Laughter Therapy Sessions", description: "Curated content for therapeutic laughter." },
    { title: "Color Therapy Tools", description: "Chromotherapy exercises and environment customization." },
    { title: "Aromatherapy Guide", description: "Scent recommendations for emotional states." },
];

export default function ArtTherapyPage() {
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <div className="flex items-center">
        <h1 className="font-headline text-2xl font-semibold md:text-3xl">Expressive Arts Therapy</h1>
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {artTherapyTools.map((tool) => (
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
