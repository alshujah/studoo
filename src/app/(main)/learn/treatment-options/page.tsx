
import type { Metadata } from 'next';
import Image from 'next/image';
import { PageLayout } from '@/components/layout/page-layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { placeholderImages } from '@/lib/placeholder-images';
import { Brain, Sprout, Waves } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Treatment Options Overview | Zenith Wellness',
};

const therapies = [
  {
    name: 'Cognitive Behavioral Therapy (CBT)',
    icon: Brain,
    description: 'A practical, goal-oriented therapy focused on identifying and changing unhelpful thinking patterns and behaviors. It\'s one of the most studied forms of therapy.',
    bestFor: ['Depression', 'Anxiety Disorders', 'Panic Attacks', 'Phobias', 'OCD'],
    link: '/tools/cbt'
  },
  {
    name: 'Dialectical Behavior Therapy (DBT)',
    icon: Waves,
    description: 'A type of CBT that focuses on teaching skills in four key areas: mindfulness, distress tolerance, emotion regulation, and interpersonal effectiveness.',
    bestFor: ['Borderline Personality Disorder', 'Chronic Suicidal Thoughts', 'Self-Harm', 'PTSD', 'Eating Disorders'],
    link: '/tools/dbt'
  },
  {
    name: 'Acceptance and Commitment Therapy (ACT)',
    icon: Sprout,
    description: 'Focuses on accepting difficult thoughts and feelings rather than fighting them, and committing to actions that align with your personal values.',
    bestFor: ['Anxiety', 'Depression', 'Chronic Pain', 'Workplace Stress'],
    link: '/tools/act'
  }
];

export default function TreatmentOptionsPage() {
  const image = placeholderImages.find(p => p.id === 'forest-path');

  return (
    <PageLayout title="Treatment Options Overview">
      <div className="space-y-6">
        {image && (
          <div className="relative h-64 w-full rounded-lg overflow-hidden">
            <Image
              src={image.imageUrl}
              alt={image.description}
              fill
              className="object-cover"
              data-ai-hint={image.imageHint}
            />
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <h2 className="text-4xl font-headline text-white text-center p-4">Find the Right Path for You</h2>
            </div>
          </div>
        )}
        <p className="text-lg text-muted-foreground">
          Therapy isn't one-size-fits-all. Different approaches are designed to address different kinds of challenges. Below is an overview of some of the core, evidence-based therapies that power the tools in this app.
        </p>

        <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-3">
          {therapies.map((therapy) => (
            <Card key={therapy.name} className="flex flex-col">
              <CardHeader className="flex-row items-center gap-4">
                <therapy.icon className="size-10 text-primary" />
                <CardTitle className="font-headline text-xl">{therapy.name}</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow space-y-4">
                <p className="text-sm text-muted-foreground">{therapy.description}</p>
                <div>
                  <h4 className="font-semibold text-sm mb-2">Often helpful for:</h4>
                  <div className="flex flex-wrap gap-2">
                    {therapy.bestFor.map(condition => (
                      <span key={condition} className="text-xs bg-secondary text-secondary-foreground px-2 py-1 rounded-full">{condition}</span>
                    ))}
                  </div>
                </div>
                <Link href={therapy.link} className="text-sm font-semibold text-primary hover:underline">
                  Explore {therapy.name.split(' ')[0]} Tools &rarr;
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </PageLayout>
  );
}
