
import type { Metadata } from 'next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { HeartHandshake, CheckCircle2 } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Radical Acceptance | Rejoyn',
};

export default function RadicalAcceptancePage() {
  return (
    <main className="flex flex-1 flex-col">
      <div className="sticky top-0 z-10 flex h-14 items-center border-b bg-background px-6">
        <h1 className="font-headline text-xl font-semibold">DBT: Radical Acceptance</h1>
      </div>
      <div className="flex-1 p-4 md:p-6">
        <Card>
          <CardHeader>
            <CardTitle className="font-headline">Radical Acceptance</CardTitle>
            <CardDescription>
              Radical acceptance is the skill of acknowledging and accepting reality as it is, without judgment, approval, or resignation. It is about letting go of the fight against what you cannot change.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <Alert>
              <HeartHandshake className="h-4 w-4" />
              <AlertTitle>Acceptance is NOT Approval</AlertTitle>
              <AlertDescription>
                Accepting reality does not mean you like it, condone it, or are powerless to change it in the future. It simply means acknowledging the facts of the present moment so you can respond effectively instead of reacting emotionally.
              </AlertDescription>
            </Alert>

            <Card className="bg-muted/30">
                <CardHeader>
                    <CardTitle className="text-lg">When to Use Radical Acceptance</CardTitle>
                </CardHeader>
                <CardContent className="prose prose-sm max-w-none text-foreground">
                    <ul>
                        <li>When you are experiencing intense pain (physical or emotional) that you cannot change right now.</li>
                        <li>When you are fighting against a reality that is unchangeable (e.g., a past event, a chronic illness).</li>
                        <li>When you find yourself saying "It shouldn't be this way!" or "This isn't fair!".</li>
                        <li>When non-acceptance is leading to more suffering, like bitterness, anger, or shame.</li>
                    </ul>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle className="text-lg">Radical Acceptance Exercises</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="p-4 border rounded-lg">
                        <h4 className="font-semibold flex items-center gap-2"><CheckCircle2 className="size-5 text-primary" />Turning the Mind</h4>
                        <p className="text-sm text-muted-foreground mt-2">Make a conscious choice to turn your mind toward acceptance. Notice when you are fighting reality and gently, repeatedly, turn your mind back to the choice to accept. You may have to do this over and over again.</p>
                    </div>
                     <div className="p-4 border rounded-lg">
                        <h4 className="font-semibold flex items-center gap-2"><CheckCircle2 className="size-5 text-primary" />Willingness</h4>
                        <p className="text-sm text-muted-foreground mt-2">Cultivate a willingness to experience reality as it is. Notice the physical sensations of willfulness (e.g., clenched fists, tight jaw) and try to adopt a more open and willing posture. Breathe and let go.</p>
                    </div>
                     <div className="p-4 border rounded-lg">
                        <h4 className="font-semibold flex items-center gap-2"><CheckCircle2 className="size-5 text-primary" />Notice the 'Why'</h4>
                        <p className="text-sm text-muted-foreground mt-2">Observe when your thoughts get stuck on "Why me?" or "Why did this happen?". Acknowledge that you may never have a satisfying answer, and gently redirect your focus to "What can I do now?".</p>
                    </div>
                    <div className="p-4 border rounded-lg">
                        <h4 className="font-semibold flex items-center gap-2"><CheckCircle2 className="size-5 text-primary" />Use Coping Statements</h4>
                        <p className="text-sm text-muted-foreground mt-2">Repeat phrases to yourself that reinforce acceptance, such as: "It is what it is.", "I can't change what has already happened.", "I can get through this.", "This moment is exactly as it should be, given all that has come before it."</p>
                    </div>
                </CardContent>
            </Card>

          </CardContent>
        </Card>
      </div>
    </main>
  );
}
