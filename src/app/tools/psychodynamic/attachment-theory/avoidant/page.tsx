
import type { Metadata } from 'next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { HandHoldingHeart } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Avoidant Attachment | Rejoyn',
};

export default function AvoidantAttachmentPage() {
  return (
    <main className="flex flex-1 flex-col">
      <div className="sticky top-0 z-10 flex h-14 items-center border-b bg-background px-6">
        <h1 className="font-headline text-xl font-semibold">Attachment Style: Avoidant (Dismissive)</h1>
      </div>
      <div className="flex-1 p-4 md:p-6 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="font-headline flex items-center gap-3">
                <HandHoldingHeart className="size-8 text-primary"/>
                The Withdrawer
            </CardTitle>
            <CardDescription>
              Avoidant or dismissive attachment is characterized by a positive view of self but a negative view of others. Individuals with this style are highly self-sufficient and independent, often avoiding true intimacy because they see it as a threat to their freedom.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <Alert>
              <HandHoldingHeart className="h-4 w-4" />
              <AlertTitle>Core Fear: Engulfment</AlertTitle>
              <AlertDescription>
                The underlying fear is being controlled, smothered, or losing one's independence. This can lead to "deactivating strategies" (e.g., focusing on flaws, emotional distancing, pulling away) designed to suppress intimacy needs.
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
                    <h4 className="font-semibold">1. Practice Identifying Your Feelings</h4>
                    <p className="text-sm text-muted-foreground mt-2">You may be used to suppressing your emotions. Start small by using a Mood Check-in tool once a day. At first, it might be hard to name your feelings. Just notice what's happening in your body (e.g., 'my jaw is tight,' 'my stomach feels fluttery').</p>
                </div>
                 <div className="p-4 border rounded-lg">
                    <h4 className="font-semibold">2. Identify Your Deactivating Strategies</h4>
                    <p className="text-sm text-muted-foreground mt-2">Become aware of how you create distance. Do you find flaws in your partner? Focus on work to avoid being home? Fantasize about other people? Notice these patterns without judgment.</p>
                </div>
                 <div className="p-4 border rounded-lg">
                    <h4 className="font-semibold">3. Experiment with Small Bids for Connection</h4>
                    <p className="text-sm text-muted-foreground mt-2">Challenge your self-sufficiency by making a small request of a trusted person. This could be asking for advice, help with a small task, or simply sharing a brief feeling. Notice that depending on someone doesn't mean losing your independence.</p>
                </div>
                 <div className="p-4 border rounded-lg">
                    <h4 className="font-semibold">4. Schedule 'Together' Time</h4>
                    <p className="text-sm text-muted-foreground mt-2">To counteract the urge to pull away, intentionally schedule shared activities with a partner or friend. This can make connection feel less like a spontaneous threat and more like a planned, safe activity.</p>
                </div>
            </CardContent>
        </Card>
      </div>
    </main>
  );
}
