
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { PageLayout } from '@/components/layout/page-layout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { placeholderImages } from '@/lib/placeholder-images';
import { cognitiveDistortions } from '@/lib/data/cbt-data';
import { BrainCircuit, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  title: 'Cognitive Biases | Zenith Wellness',
};

// Extending the cognitiveDistortions data with examples
const distortionsWithExamples = cognitiveDistortions.map(d => {
    switch (d.name) {
        case "All-or-Nothing Thinking": return { ...d, example: "If I'm not perfect, I have failed." };
        case "Overgeneralization": return { ...d, example: "I didn't get the job, so I'll never get any job." };
        case "Mental Filter": return { ...d, example: "I got one critical comment on my project, so the whole thing must be terrible." };
        case "Disqualifying the Positive": return { ...d, example: "They only said they liked my presentation because they were being nice." };
        case "Jumping to Conclusions": return { ...d, example: "" }; // Parent, will handle with children
        case "Mind Reading": return { ...d, example: "My friend is quiet, so they must be mad at me." };
        case "Fortune Teller Error": return { ...d, example: "I'm going to be so awkward at the party, I know it." };
        case "Magnification (Catastrophizing) or Minimization": return { ...d, example: "I made a small mistake, and now everything is ruined." };
        case "Emotional Reasoning": return { ...d, example: "I feel like an idiot, so I must be one." };
        case "Should Statements": return { ...d, example: "I should be exercising more. I'm so lazy." };
        case "Labeling and Mislabeling": return { ...d, example: "I made a mistake, therefore I am a failure." };
        case "Personalization": return { ...d, example: "The team project failed because I wasn't good enough." };
        default: return { ...d, example: "No example available." };
    }
}).filter(d => d.name !== "Jumping to Conclusions");


export default function CognitiveBiasesPage() {
  const image = placeholderImages.find(p => p.id === 'abstract-thought');

  return (
    <PageLayout title="Cognitive Biases: Your Thinking Traps">
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
            <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
              <h2 className="text-4xl font-headline text-white text-center p-4">Are Your Thoughts Facts?</h2>
            </div>
          </div>
        )}
        
        <Alert>
            <BrainCircuit className="h-4 w-4" />
            <AlertTitle>What is a Cognitive Bias?</AlertTitle>
            <AlertDescription>
                Cognitive biases, or distortions, are unhelpful thinking patterns that our minds use automatically. They are like mental shortcuts that can lead to negative interpretations of reality, anxiety, and depression. Learning to spot them is the first step to challenging them.
            </AlertDescription>
        </Alert>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {distortionsWithExamples.map((distortion) => (
            <Card key={distortion.name} className="flex flex-col">
              <CardHeader>
                <CardTitle>{distortion.name}</CardTitle>
                <CardDescription>{distortion.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-sm italic text-muted-foreground p-3 bg-muted/50 rounded-md">
                  Example: "{distortion.example}"
                </p>
              </CardContent>
              <CardFooter>
                 <Button asChild variant="link" className="p-0">
                    <Link href="/track/journal?tab=thought-record">
                        Challenge this thought <ArrowRight className="ml-2" />
                    </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </PageLayout>
  );
}

    