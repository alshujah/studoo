
import type { Metadata } from 'next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { TrendingUp, Lightbulb } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Post-Traumatic Growth | Rejoyn',
};

export default function PostTraumaGrowthPage() {
  return (
    <main className="flex flex-1 flex-col">
      <div className="sticky top-0 z-10 flex h-14 items-center border-b bg-background px-6">
        <h1 className="font-headline text-xl font-semibold">Post-Traumatic Growth</h1>
      </div>
      <div className="flex-1 p-4 md:p-6">
        <Card>
          <CardHeader>
            <CardTitle className="font-headline">Positive Change After Adversity</CardTitle>
            <CardDescription>
              Post-Traumatic Growth (PTG) refers to the positive psychological changes experienced as a result of struggling with major life crises or traumatic events. It's not about ignoring the pain, but about finding meaning and growth alongside it.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <Alert>
              <Lightbulb className="h-4 w-4" />
              <AlertTitle>Growth is a Byproduct, Not a Goal</AlertTitle>
              <AlertDescription>
                PTG is not something to be forced or expected. The primary focus of trauma recovery is always safety and healing. Growth is often a natural byproduct of that difficult work, not a requirement. Comparing your journey to others' is not helpful.
              </AlertDescription>
            </Alert>

            <Card className="bg-muted/30">
                <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-3"><TrendingUp className="size-6 text-primary" />The Five Domains of Growth</CardTitle>
                </CardHeader>
                <CardContent className="prose prose-sm max-w-none text-foreground">
                    <p>Research has identified five main areas where people often report growth after trauma:</p>
                    <ul>
                        <li><strong>Greater Appreciation of Life:</strong> A changed sense of priorities and a deeper appreciation for the value of one's own life.</li>
                        <li><strong>Warmer, More Intimate Relationships:</strong> An increased sense of connection to others who have suffered, and more compassion and empathy.</li>
                        <li><strong>A Greater Sense of Personal Strength:</strong> A belief that if one can survive the trauma, one can handle anything. "I am more resilient than I thought."</li>
                        <li><strong>Recognition of New Possibilities:</strong> Developing new interests, creating a new life path, or finding new opportunities that weren't available before.</li>
                        <li><strong>Spiritual or Existential Development:</strong> A deepened spiritual life or a significant change in one's philosophy of life.</li>
                    </ul>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Reflection Prompts for Exploring Growth</CardTitle>
                </CardHeader>
                <CardContent className="prose prose-sm max-w-none text-foreground">
                    <p>When you feel ready, you can use these questions for journaling:</p>
                    <ul>
                        <li>"In what ways have my priorities changed since my difficult experiences?"</li>
                        <li>"Are there any relationships that have become more meaningful to me?"</li>
                        <li>"What have I learned about my own strength and resilience?"</li>
                        <li>"Has this experience opened up any new paths or possibilities for me that I hadn't considered before?"</li>
                        <li>"How has my understanding of life, meaning, or spirituality shifted?"</li>
                    </ul>
                </CardContent>
            </Card>

          </CardContent>
        </Card>
      </div>
    </main>
  );
}
