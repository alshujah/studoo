
import type { Metadata } from 'next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { HeartHandshake, Brain, Shield } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Compassion-Focused Therapy | Rejoyn',
};

export default function CFTPage() {
  return (
    <main className="flex flex-1 flex-col">
      <div className="sticky top-0 z-10 flex h-14 items-center border-b bg-background px-6">
        <h1 className="font-headline text-xl font-semibold">Compassion-Focused Therapy (CFT)</h1>
      </div>
      <div className="flex-1 p-4 md:p-6 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="font-headline">Cultivating Self-Compassion</CardTitle>
            <CardDescription>
              Compassion-Focused Therapy (CFT) is an approach that emphasizes the importance of developing compassion for oneself and others to alleviate distress and promote well-being, especially for those who struggle with high levels of shame and self-criticism.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Alert>
              <HeartHandshake className="h-4 w-4" />
              <AlertTitle>The Antidote to Shame</AlertTitle>
              <AlertDescription>
                CFT helps you train your mind to be supportive and kind to yourself, rather than critical and punishing, which is crucial for healing.
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>
        
        <Card>
            <CardHeader>
                <CardTitle>The Three Emotional Systems</CardTitle>
                <CardDescription>CFT proposes we have three main types of emotion regulation systems.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="p-4 border rounded-lg bg-red-500/10">
                    <h4 className="font-semibold text-lg text-red-700 flex items-center gap-2"><Shield className="size-5" />Threat System</h4>
                    <p className="text-sm text-muted-foreground mt-1">Responsible for detecting and responding to danger. Feelings: Anger, anxiety, disgust. Its job is to keep you safe ("Better safe than sorry").</p>
                </div>
                <div className="p-4 border rounded-lg bg-blue-500/10">
                    <h4 className="font-semibold text-lg text-blue-700 flex items-center gap-2"><Brain className="size-5" />Drive System</h4>
                    <p className="text-sm text-muted-foreground mt-1">Responsible for motivation, seeking resources, and achieving goals. Feelings: Excitement, pleasure, ambition. Its job is to get you to "go for it."</p>
                </div>
                <div className="p-4 border rounded-lg bg-green-500/10">
                    <h4 className="font-semibold text-lg text-green-700 flex items-center gap-2"><HeartHandshake className="size-5" />Soothing System</h4>
                    <p className="text-sm text-muted-foreground mt-1">Responsible for managing distress and promoting bonding. Feelings: Calm, contentment, safety, connection. Its job is to help you "rest and digest." For many people with high self-criticism, this system is underdeveloped.</p>
                </div>
            </CardContent>
        </Card>

        <Card>
            <CardHeader>
                <CardTitle>Building Your Compassionate Self</CardTitle>
                <CardDescription>The core of CFT practice is to build up your "Compassionate Self," which has the qualities of wisdom, strength, warmth, and non-judgment.</CardDescription>
            </CardHeader>
            <CardContent className="prose prose-sm max-w-none text-foreground">
                <p>An exercise to practice this:</p>
                <ul>
                    <li><strong>Imagine Your Ideal Compassionate Figure:</strong> Think about what the ideal compassionate friend or mentor would be like. How would they sound? What would their facial expression be? What qualities would they have? (Wisdom, warmth, strength, non-judgment).</li>
                    <li><strong>Breathe Compassionately:</strong> Breathe slowly and deeply. As you breathe in, imagine you are breathing in compassion. As you breathe out, imagine you are breathing out kindness.</li>
                    <li><strong>Embody the Compassionate Self:</strong> Imagine yourself embodying these compassionate qualities. Sit up a little straighter (strength), soften your facial muscles (warmth), and adopt a kind inner voice.</li>
                    <li><strong>Compassionate Letter Writing:</strong> From this "Compassionate Self" perspective, write a kind and understanding letter to the part of you that is struggling.</li>
                </ul>
            </CardContent>
        </Card>
      </div>
    </main>
  );
}
