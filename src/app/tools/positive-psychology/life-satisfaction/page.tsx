
import type { Metadata } from 'next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { BarChartHorizontal } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Life Satisfaction Assessment | Rejoyn',
};

const swlsItems = [
    "In most ways my life is close to my ideal.",
    "The conditions of my life are excellent.",
    "I am satisfied with my life.",
    "So far I have gotten the important things I want in life.",
    "If I could live my life over, I would change almost nothing.",
];

export default function LifeSatisfactionPage() {
  return (
    <main className="flex flex-1 flex-col">
      <div className="sticky top-0 z-10 flex h-14 items-center border-b bg-background px-6">
        <h1 className="font-headline text-xl font-semibold">Life Satisfaction Assessment</h1>
      </div>
      <div className="flex-1 p-4 md:p-6">
        <Card>
          <CardHeader>
            <CardTitle className="font-headline">The Satisfaction with Life Scale (SWLS)</CardTitle>
            <CardDescription>
              Developed by Ed Diener, this scale is a short, simple tool to help you reflect on your overall life satisfaction.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <Alert>
              <BarChartHorizontal className="h-4 w-4" />
              <AlertTitle>For Reflection, Not Diagnosis</AlertTitle>
              <AlertDescription>
                This is a self-reflection tool, not a clinical assessment. Use it to get a quick snapshot of your current feelings about your life as a whole.
              </AlertDescription>
            </Alert>

            <Card className="bg-muted/30">
                <CardHeader>
                    <CardTitle className="text-lg">Instructions</CardTitle>
                    <CardDescription>
                        Below are five statements that you may agree or disagree with. Using the 1-7 scale below, indicate your agreement with each item by writing the number that best describes your feelings.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4 prose prose-sm max-w-none text-foreground">
                    <div className="p-4 border rounded-md bg-background">
                        <p className="font-semibold">7 - Strongly agree</p>
                        <p className="font-semibold">6 - Agree</p>
                        <p className="font-semibold">5 - Slightly agree</p>
                        <p className="font-semibold">4 - Neither agree nor disagree</p>
                        <p className="font-semibold">3 - Slightly disagree</p>
                        <p className="font-semibold">2 - Disagree</p>
                        <p className="font-semibold">1 - Strongly disagree</p>
                    </div>

                    <ol className="list-decimal pl-5 space-y-2">
                        {swlsItems.map(item => (
                            <li key={item}>{item}</li>
                        ))}
                    </ol>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle className="text-lg">Scoring</CardTitle>
                </CardHeader>
                <CardContent className="prose prose-sm max-w-none text-foreground">
                    <p>Add up your scores for the 5 items. Your total score can range from 5 to 35.</p>
                    <ul>
                        <li><strong>31-35:</strong> Extremely satisfied</li>
                        <li><strong>26-30:</strong> Satisfied</li>
                        <li><strong>21-25:</strong> Slightly satisfied</li>
                        <li><strong>20:</strong> Neutral</li>
                        <li><strong>15-19:</strong> Slightly dissatisfied</li>
                        <li><strong>10-14:</strong> Dissatisfied</li>
                        <li><strong>5-9:</strong> Extremely dissatisfied</li>
                    </ul>
                     <p className="text-xs text-muted-foreground mt-4">This scale is in the public domain. Diener, E., Emmons, R. A., Larsen, R. J., & Griffin, S. (1985). The Satisfaction with Life Scale. Journal of Personality Assessment, 49, 71-75.</p>
                </CardContent>
            </Card>

          </CardContent>
        </Card>
      </div>
    </main>
  );
}
