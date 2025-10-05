
import type { Metadata } from 'next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Lightbulb } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Externalizing Conversations | Rejoyn',
};

export default function ExternalizingPage() {
  return (
    <main className="flex flex-1 flex-col">
      <div className="sticky top-0 z-10 flex h-14 items-center border-b bg-background px-6">
        <h1 className="font-headline text-xl font-semibold">Narrative Therapy: Externalizing Conversations</h1>
      </div>
      <div className="flex-1 p-4 md:p-6">
        <Card>
          <CardHeader>
            <CardTitle className="font-headline">The Person is Not the Problem</CardTitle>
            <CardDescription>
              Externalizing is the process of separating a person from their problem. Instead of thinking "I am a depressed person," we might say "Depression is trying to take over." This simple shift in language creates space to examine the problem's influence on your life without blaming yourself.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <Alert>
              <Lightbulb className="h-4 w-4" />
              <AlertTitle>You are separate from your problems.</AlertTitle>
              <AlertDescription>
                By externalizing the problem, you can team up with others (and even parts of yourself) to push back against its influence. You are not the problem; the problem is the problem.
              </AlertDescription>
            </Alert>

            <Card className="bg-muted/30">
                <CardHeader>
                    <CardTitle className="text-lg">Externalizing Exercises</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="p-4 border rounded-lg">
                        <h4 className="font-semibold">1. Give the Problem a Name</h4>
                        <p className="text-sm text-muted-foreground mt-2">If your problem were a character, what would you call it? It could be something serious like "The Judge" or "The Fog," or something silly like "Mr. Worry-Wart." Giving it a name helps to solidify it as a separate thing.</p>
                        <p className="text-sm mt-4 italic">Example: "My anxiety is more like a creature I call 'The Gremlin.' It shows up and whispers worries in my ear."</p>
                    </div>
                     <div className="p-4 border rounded-lg">
                        <h4 className="font-semibold">2. Describe the Problem's Characteristics</h4>
                        <p className="text-sm text-muted-foreground mt-2">What does this problem look, sound, and feel like? What are its favorite tricks? When does it tend to show up? What are its intentions for your life?</p>
                         <p className="text-sm mt-4 italic">Example: "The Gremlin is small and fast. It likes to show up late at night when I'm tired. Its main trick is telling me all the 'what ifs' to keep me from sleeping. It wants to keep me small and safe, but it just makes me exhausted."</p>
                    </div>
                     <div className="p-4 border rounded-lg">
                        <h4 className="font-semibold">3. Map the Problem's Influence</h4>
                        <p className="text-sm text-muted-foreground mt-2">How has this problem affected different areas of your life? Consider its impact on your relationships, your work or school life, your feelings about yourself, and your future dreams.</p>
                        <p className="text-sm mt-4 italic">Example: "Because of The Gremlin, I avoid applying for new jobs. It has also made me irritable with my family because I'm always tired."</p>
                    </div>
                </CardContent>
            </Card>

          </CardContent>
        </Card>
      </div>
    </main>
  );
}
