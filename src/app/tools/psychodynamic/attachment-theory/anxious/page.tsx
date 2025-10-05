
import type { Metadata } from 'next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Heart } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Anxious Attachment | Rejoyn',
};

export default function AnxiousAttachmentPage() {
  return (
    <main className="flex flex-1 flex-col">
      <div className="sticky top-0 z-10 flex h-14 items-center border-b bg-background px-6">
        <h1 className="font-headline text-xl font-semibold">Attachment Style: Anxious (Preoccupied)</h1>
      </div>
      <div className="flex-1 p-4 md:p-6 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="font-headline flex items-center gap-3">
                <Heart className="size-8 text-primary"/>
                The Pursuer
            </CardTitle>
            <CardDescription>
              Anxious or preoccupied attachment is characterized by a negative view of self but a positive view of others. Individuals with this style crave intimacy and closeness but are often insecure about their relationships, fearing abandonment.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <Alert>
              <Heart className="h-4 w-4" />
              <AlertTitle>Core Fear: Abandonment</AlertTitle>
              <AlertDescription>
                The underlying fear is that they are not worthy of love and that their partner will leave them. This can lead to "protest behaviors" (e.g., excessive calling, attempts to induce jealousy) designed to re-establish connection.
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>

        <Card>
            <CardHeader>
                <CardTitle>Exercises for Cultivating Security</CardTitle>
                <CardDescription>Practice these skills to develop a more secure attachment style.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                 <div className="p-4 border rounded-lg">
                    <h4 className="font-semibold">1. Develop Self-Soothing Skills</h4>
                    <p className="text-sm text-muted-foreground mt-2">When you feel anxious, your instinct may be to seek immediate reassurance from your partner. First, practice calming your own nervous system. Use grounding techniques, deep breathing, or mindfulness. This builds self-reliance.</p>
                </div>
                 <div className="p-4 border rounded-lg">
                    <h4 className="font-semibold">2. Identify Your Activating Strategies</h4>
                    <p className="text-sm text-muted-foreground mt-2">Become aware of your "protest behaviors." Do you check your phone constantly? Replay conversations? Pick fights? Just noticing these without judgment is the first step to changing them.</p>
                </div>
                 <div className="p-4 border rounded-lg">
                    <h4 className="font-semibold">3. Practice Assertive Communication</h4>
                    <p className="text-sm text-muted-foreground mt-2">Instead of using protest behaviors, learn to state your needs directly and calmly. For example, instead of withdrawing, try saying, "I'm feeling a little disconnected and would love to spend some quality time with you soon."</p>
                </div>
                 <div className="p-4 border rounded-lg">
                    <h4 className="font-semibold">4. Diversify Your Support System</h4>
                    <p className="text-sm text-muted-foreground mt-2">Reduce the pressure on your primary relationship by investing time and energy in friendships, hobbies, and your own interests. A full life outside your relationship provides a stronger foundation within it.</p>
                </div>
            </CardContent>
        </Card>
      </div>
    </main>
  );
}
