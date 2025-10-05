
import type { Metadata } from 'next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Target } from 'lucide-react';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Life Balance Wheel | Rejoyn',
};

const lifeDomains = [
    "Career / Work",
    "Finances",
    "Health (Physical & Mental)",
    "Family & Friends",
    "Romance & Intimacy",
    "Personal Growth",
    "Fun & Recreation",
    "Physical Environment (Home)",
];

export default function LifeBalanceWheelPage() {
  return (
    <main className="flex flex-1 flex-col">
      <div className="sticky top-0 z-10 flex h-14 items-center border-b bg-background px-6">
        <h1 className="font-headline text-xl font-semibold">Life Balance Wheel</h1>
      </div>
      <div className="flex-1 p-4 md:p-6">
        <Card>
          <CardHeader>
            <CardTitle className="font-headline">Assess Your Life Balance</CardTitle>
            <CardDescription>
              The Life Balance Wheel is a coaching tool that helps you visualize your level of satisfaction in different areas of your life. It provides a snapshot to help you identify which areas might need more attention.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <Alert>
              <Target className="h-4 w-4" />
              <AlertTitle>A Tool for Reflection</AlertTitle>
              <AlertDescription>
                This exercise is for self-reflection. There are no right or wrong answers. The goal is to increase your awareness of how you're distributing your energy and attention.
              </AlertDescription>
            </Alert>
            
            <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className="w-full aspect-square rounded-lg bg-muted flex items-center justify-center border relative overflow-hidden">
                    <Image 
                        src="https://picsum.photos/seed/lifebalance/600/600"
                        alt="Life Balance Wheel Diagram"
                        data-ai-hint="abstract chart"
                        fill
                        objectFit="cover"
                    />
                </div>

                <Card className="bg-muted/30">
                    <CardHeader>
                        <CardTitle className="text-lg">How to Use the Wheel</CardTitle>
                    </CardHeader>
                    <CardContent className="prose prose-sm max-w-none text-foreground">
                        <ol>
                            <li><strong>Consider Each Domain:</strong> Look at the 8 life domains listed below.</li>
                            <li><strong>Rate Your Satisfaction:</strong> For each domain, rate your current level of satisfaction on a scale of 1 (not at all satisfied) to 10 (fully satisfied). The center of the wheel is 1, and the outer edge is 10.</li>
                            <li><strong>Connect the Dots:</strong> In a journal or on a piece of paper, draw a circle, divide it into 8 sections, and label them. Mark your rating in each section and connect the dots to see your "wheel."</li>
                            <li><strong>Reflect:</strong>
                                <ul>
                                    <li>Is your wheel bumpy or smooth? A bumpy wheel might indicate an imbalance.</li>
                                    <li>Which areas are you most satisfied with? What's working well there?</li>
                                    <li>Which areas are you least satisfied with?</li>
                                    <li>What would a "+1" improvement look like in one of your lower-rated areas? What is one small step you could take?</li>
                                </ul>
                            </li>
                        </ol>
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>The 8 Domains of Life</CardTitle>
                </CardHeader>
                <CardContent>
                     <ul className="list-disc pl-5 text-sm space-y-2 font-medium">
                        {lifeDomains.map(domain => <li key={domain}>{domain}</li>)}
                    </ul>
                </CardContent>
            </Card>

          </CardContent>
        </Card>
      </div>
    </main>
  );
}
