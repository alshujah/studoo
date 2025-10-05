
import type { Metadata } from 'next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Shield } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Self-Esteem Building | Rejoyn',
};

export default function SelfEsteemPage() {
  return (
    <main className="flex flex-1 flex-col">
      <div className="sticky top-0 z-10 flex h-14 items-center border-b bg-background px-6">
        <h1 className="font-headline text-xl font-semibold">Positive Psychology: Self-Esteem</h1>
      </div>
      <div className="flex-1 p-4 md:p-6">
        <Card>
          <CardHeader>
            <CardTitle className="font-headline">Building Healthy Self-Esteem</CardTitle>
            <CardDescription>
              Healthy self-esteem is about viewing yourself as a fundamentally worthwhile person, independent of your achievements or others' opinions.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <Alert>
              <Shield className="h-4 w-4" />
              <AlertTitle>Self-Esteem vs. Self-Compassion</AlertTitle>
              <AlertDescription>
                While related, self-esteem is about your worth, and self-compassion is about how you treat yourself, especially when you fail. Both are important.
              </AlertDescription>
            </Alert>

            <Card className="bg-muted/30">
                <CardHeader>
                    <CardTitle className="text-lg">Exercises for Building Self-Esteem</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="p-4 border rounded-lg bg-background">
                        <h4 className="font-semibold">Create a "Success Log"</h4>
                        <p className="text-sm text-muted-foreground mt-2">Each day, write down at least one thing you did that you feel good about. It can be small (like making your bed) or large (like finishing a big project). This trains your brain to notice your capabilities.</p>
                    </div>
                     <div className="p-4 border rounded-lg bg-background">
                        <h4 className="font-semibold">Practice Positive Affirmations</h4>
                        <p className="text-sm text-muted-foreground mt-2">Create a list of positive statements about yourself (e.g., "I am capable," "I am learning and growing," "I deserve to be happy"). Repeat them to yourself daily, especially when you're feeling down.</p>
                    </div>
                     <div className="p-4 border rounded-lg bg-background">
                        <h4 className="font-semibold">Identify and Use Your Strengths</h4>
                        <p className="text-sm text-muted-foreground mt-2">Use the "Strengths Identification" tool to find your core strengths. Then, find one new way to use one of your top strengths this week. Using your strengths builds confidence and competence.</p>
                    </div>
                    <div className="p-4 border rounded-lg bg-background">
                        <h4 className="font-semibold">Challenge Negative Self-Talk</h4>
                        <p className="text-sm text-muted-foreground mt-2">When you catch yourself thinking something negative about yourself, stop and ask: "Is this 100% true? What's a more balanced and compassionate way to look at this?" Use the "Thought Record" tool for this.</p>
                    </div>
                    <div className="p-4 border rounded-lg bg-background">
                        <h4 className="font-semibold">Set and Achieve Small, Meaningful Goals</h4>
                        <p className="text-sm text-muted-foreground mt-2">Accomplishment is a powerful self-esteem builder. Set a small, achievable goal for the day or week (e.g., "Go for a 10-minute walk"). The act of setting a goal and meeting it reinforces your sense of agency.</p>
                    </div>
                </CardContent>
            </Card>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
