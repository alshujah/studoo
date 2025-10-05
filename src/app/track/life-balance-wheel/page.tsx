
'use client';

import type { Metadata } from 'next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Target } from 'lucide-react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';

const lifeDomains = [
    { name: "Career / Work", satisfaction: 7 },
    { name: "Finances", satisfaction: 5 },
    { name: "Health", satisfaction: 8 },
    { name: "Family & Friends", satisfaction: 9 },
    { name: "Romance", satisfaction: 6 },
    { name: "Personal Growth", satisfaction: 8 },
    { name: "Fun & Recreation", satisfaction: 5 },
    { name: "Environment", satisfaction: 7 },
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
                <div className="w-full aspect-square">
                     <ResponsiveContainer width="100%" height="100%">
                        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={lifeDomains}>
                          <PolarGrid />
                          <PolarAngleAxis dataKey="name" />
                          <PolarRadiusAxis angle={30} domain={[0, 10]} />
                          <Radar name="Satisfaction" dataKey="satisfaction" stroke="hsl(var(--primary))" fill="hsl(var(--primary))" fillOpacity={0.6} />
                        </RadarChart>
                      </ResponsiveContainer>
                </div>

                <Card className="bg-muted/30">
                    <CardHeader>
                        <CardTitle className="text-lg">How to Use the Wheel</CardTitle>
                    </CardHeader>
                    <CardContent className="prose prose-sm max-w-none text-foreground">
                        <ol>
                            <li><strong>Consider Each Domain:</strong> Look at the 8 life domains shown in the chart.</li>
                            <li><strong>Rate Your Satisfaction:</strong> In a private journal, rate your current level of satisfaction in each area on a scale of 1 (not at all satisfied) to 10 (fully satisfied).</li>
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
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
