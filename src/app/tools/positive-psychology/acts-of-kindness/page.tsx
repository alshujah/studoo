
import type { Metadata } from 'next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { HeartHandshake } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Acts of Kindness | Rejoyn',
};

export default function ActsOfKindnessPage() {
  return (
    <main className="flex flex-1 flex-col">
      <div className="sticky top-0 z-10 flex h-14 items-center border-b bg-background px-6">
        <h1 className="font-headline text-xl font-semibold">Positive Psychology: Acts of Kindness</h1>
      </div>
      <div className="flex-1 p-4 md:p-6">
        <Card>
          <CardHeader>
            <CardTitle className="font-headline">The Power of Kindness</CardTitle>
            <CardDescription>
              Performing acts of kindness is one of the most reliable ways to boost your own happiness and well-being, as well as that of others.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <Alert>
              <HeartHandshake className="h-4 w-4" />
              <AlertTitle>Kindness is a Win-Win</AlertTitle>
              <AlertDescription>
                Research shows that being kind to others reduces stress, improves mood, and increases feelings of connection.
              </AlertDescription>
            </Alert>

            <div className="grid md:grid-cols-2 gap-6">
                <Card className="bg-muted/30">
                    <CardHeader>
                        <CardTitle className="text-lg">Ideas for Acts of Kindness</CardTitle>
                    </CardHeader>
                    <CardContent className="prose prose-sm max-w-none text-foreground">
                        <ul>
                            <li>Give a genuine compliment to a friend, family member, or colleague.</li>
                            <li>Let someone go ahead of you in line.</li>
                            <li>Write a positive review for a local business you appreciate.</li>
                            <li>Send a thank-you note or text to someone who has helped you.</li>
                            <li>Leave a generous tip for a service worker.</li>
                            <li>Volunteer your time for a cause you care about.</li>
                            <li>Check in on a friend you haven't spoken to in a while.</li>
                            <li>Do a household chore for someone you live with without being asked.</li>
                        </ul>
                    </CardContent>
                </Card>
                <Card className="bg-muted/30">
                    <CardHeader>
                        <CardTitle className="text-lg">Kindness Reflection Exercise</CardTitle>
                    </CardHeader>
                    <CardContent className="prose prose-sm max-w-none text-foreground">
                        <p><strong>Plan:</strong> Choose one act of kindness you will perform today or this week. It can be big or small.</p>
                        <p><strong>Act:</strong> Carry out your planned act of kindness.</p>
                        <p><strong>Reflect:</strong> After you've done it, take a moment to journal or think about the following:</p>
                        <ul>
                            <li>What did you do?</li>
                            <li>How did the other person react?</li>
                            <li>How did you feel while doing it?</li>
                            <li>How did you feel afterward?</li>
                            <li>What did you learn from this experience?</li>
                        </ul>
                    </CardContent>
                </Card>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
