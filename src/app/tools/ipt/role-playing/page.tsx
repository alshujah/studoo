
import type { Metadata } from 'next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Copy } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Role-Playing | Rejoyn',
};

export default function RolePlayingPage() {
  return (
    <main className="flex flex-1 flex-col">
      <div className="sticky top-0 z-10 flex h-14 items-center border-b bg-background px-6">
        <h1 className="font-headline text-xl font-semibold">IPT: Role-Playing</h1>
      </div>
      <div className="flex-1 p-4 md:p-6">
        <Card>
          <CardHeader>
            <CardTitle className="font-headline">Practicing Difficult Conversations</CardTitle>
            <CardDescription>
              Role-playing is a technique used to practice social interactions in a safe and controlled way. It allows you to try out different communication strategies, anticipate challenges, and build confidence before you have a real conversation.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <Alert>
              <Copy className="h-4 w-4" />
              <AlertTitle>Rehearsal for Real Life</AlertTitle>
              <AlertDescription>
                Think of role-playing like a dress rehearsal for a play. It gives you a chance to work out the kinks so you feel more prepared when the curtain goes up.
              </AlertDescription>
            </Alert>

            <Card className="bg-muted/30">
                <CardHeader>
                    <CardTitle className="text-lg">How to Use Role-Playing</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 prose prose-sm max-w-none text-foreground">
                    <div>
                        <h4><strong>Step 1: Identify the Situation</strong></h4>
                        <p>Choose a specific, upcoming interpersonal situation that you are feeling anxious about. For example: asking your boss for a raise, setting a boundary with a family member, or telling a friend you're upset.</p>
                    </div>
                    <div>
                        <h4><strong>Step 2: Define Your Goal</strong></h4>
                        <p>What is your primary goal for this conversation? What do you want to happen? (Use the DEAR MAN skill to clarify this).</p>
                    </div>
                     <div>
                        <h4><strong>Step 3: Write a Script</strong></h4>
                        <p>Write out what you want to say. Focus on using "I" statements and being assertive, not aggressive or passive. This is your starting point.</p>
                    </div>
                    <div>
                        <h4><strong>Step 4: Practice (Solo or with a Partner)</strong></h4>
                        <p><strong>Solo:</strong> Say your script out loud. Practice in front of a mirror. Pay attention to your tone of voice, facial expression, and body language. Imagine what the other person might say in response and practice how you would reply.</p>
                        <p><strong>With a Partner:</strong> Ask a trusted friend, family member, or therapist to role-play with you. Have them play the part of the other person. This provides more realistic practice and allows for feedback.</p>
                    </div>
                     <div>
                        <h4><strong>Step 5: Get Feedback and Refine</strong></h4>
                        <p>After a practice run, reflect on how it went. What felt good? What was difficult? If you have a partner, ask for their feedback. Refine your script and your approach based on what you learned, and try again.</p>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle className="text-lg">Role-Playing Scenarios</CardTitle>
                    <CardDescription>Here are some common situations you can use to practice:</CardDescription>
                </CardHeader>
                <CardContent className="prose prose-sm max-w-none text-foreground">
                    <ul>
                        <li>Asking your roommate to clean up their dishes.</li>
                        <li>Returning a faulty item to a store.</li>
                        <li>Telling a friend you can't lend them money.</li>
                        <li>Giving your partner constructive feedback about something that bothered you.</li>
                        <li>Disagreeing respectfully with a colleague in a meeting.</li>
                    </ul>
                </CardContent>
            </Card>

          </CardContent>
        </Card>
      </div>
    </main>
  );
}
