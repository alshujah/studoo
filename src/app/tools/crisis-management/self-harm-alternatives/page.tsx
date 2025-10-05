import type { Metadata } from 'next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { HandHeart, Sparkles, Wind } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Self-Harm Alternatives | Rejoyn',
};

const alternatives = [
    {
        category: "To Express Pain & Intense Emotions",
        icon: Wind,
        suggestions: [
            "Write in a journal about your pain.",
            "Scribble on a piece of paper with a red pen.",
            "Listen to music that expresses how you feel.",
            "Rip up paper or smash ice cubes.",
            "Yell into a pillow.",
        ]
    },
    {
        category: "To Calm & Soothe Yourself",
        icon: HandHeart,
        suggestions: [
            "Take a warm bath or shower.",
            "Wrap yourself in a warm, soft blanket.",
            "Practice deep, slow breathing.",
            "Listen to calming music or nature sounds.",
            "Gently massage your hands or feet with lotion.",
        ]
    },
    {
        category: "To Feel Something (When Numb)",
        icon: Sparkles,
        suggestions: [
            "Hold an ice cube in your hand until it melts.",
            "Take a very cold shower.",
            "Clap your hands until they tingle.",
            "Bite into a lemon or a hot pepper.",
            "Use the TIPP skill from DBT.",
        ]
    }
]

export default function SelfHarmAlternativesPage() {
  return (
    <main className="flex flex-1 flex-col">
      <div className="sticky top-0 z-10 flex h-14 items-center border-b bg-background px-6">
        <h1 className="font-headline text-xl font-semibold">Self-Harm Alternatives</h1>
      </div>
      <div className="flex-1 p-4 md:p-6">
        <Card>
          <CardHeader>
            <CardTitle className="font-headline">Finding Safer Ways to Cope</CardTitle>
            <CardDescription>
              When you have the urge to self-harm, it's a sign that you are in immense pain. These alternatives are intended to provide a way to get through the urge without causing physical harm.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <Alert variant="destructive">
              <HandHeart className="h-4 w-4" />
              <AlertTitle>Your Safety is the Priority</AlertTitle>
              <AlertDescription>
                If you are struggling with self-harm, please reach out to a professional or a crisis line. These are coping strategies, not a replacement for therapy.
              </AlertDescription>
            </Alert>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {alternatives.map((category) => (
                    <Card key={category.category}>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-3"><category.icon className="size-6 text-primary"/>{category.category}</CardTitle>
                        </CardHeader>
                        <CardContent>
                             <ul className="list-disc pl-5 text-sm space-y-2 text-muted-foreground">
                                {category.suggestions.map(suggestion => (
                                    <li key={suggestion}>{suggestion}</li>
                                ))}
                            </ul>
                        </CardContent>
                    </Card>
                ))}
            </div>

          </CardContent>
        </Card>
      </div>
    </main>
  );
}
