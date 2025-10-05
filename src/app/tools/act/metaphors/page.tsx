
import type { Metadata } from 'next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Lightbulb, Bus, Users } from 'lucide-react';

export const metadata: Metadata = {
  title: 'ACT Metaphors | Rejoyn',
};

const metaphors = [
    {
        title: "Passengers on the Bus",
        icon: Bus,
        description: "Your thoughts and feelings are like unruly passengers on a bus. You are the driver. The passengers might yell, criticize, or try to grab the wheel, but you don't have to listen to them or go where they say. Your job is to keep driving the bus in the direction of your values, even with the noisy passengers on board.",
        meaning: "You are not your thoughts. You can notice them and still choose your actions based on what's important to you."
    },
    {
        title: "The Unwanted Party Guest",
        icon: Users,
        description: "Anxiety (or another difficult feeling) is like an unwanted guest who shows up at your party. You have three choices: 1) Try to fight them and throw them out (which ruins the party for everyone), 2) Only do things to avoid them (which means you miss your own party), or 3) Acknowledge they are there and let them hang out in the corner while you go on enjoying your party.",
        meaning: "Fighting with or avoiding painful feelings often gives them more power and costs you your life. Acceptance means letting them be present so you can continue to live meaningfully."
    },
     {
        title: "Quicksand",
        icon: Lightbulb,
        description: "When you're stuck in quicksand, your natural instinct is to struggle and fight to get out. But this only makes you sink faster. The way to survive quicksand is to spread your body out, lie flat, and make as much contact with the sand as possible. This is counter-intuitive but effective.",
        meaning: "When dealing with painful emotions, our instinct is to struggle against them. Often, this emotional struggle (e.g., 'I shouldn't feel this way!') is what makes the situation worse. Acceptance is like lying flat in the quicksand - it's a non-struggle approach that helps you get through."
    },
];

export default function MetaphorsPage() {
  return (
    <main className="flex flex-1 flex-col">
      <div className="sticky top-0 z-10 flex h-14 items-center border-b bg-background px-6">
        <h1 className="font-headline text-xl font-semibold">ACT: Metaphor-Based Learning</h1>
      </div>
      <div className="flex-1 p-4 md:p-6">
        <Card>
          <CardHeader>
            <CardTitle className="font-headline">Learning Through Stories</CardTitle>
            <CardDescription>
              Metaphors and stories are a core part of ACT. They can help you understand key concepts in a deeper, more intuitive way.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <Alert>
              <Lightbulb className="h-4 w-4" />
              <AlertTitle>Connect with the Core Message</AlertTitle>
              <AlertDescription>
                As you read these, don't worry about analyzing them too much. Just see which ones resonate with you and what they might mean for your own experience.
              </AlertDescription>
            </Alert>
            <div className="grid grid-cols-1 gap-6">
                {metaphors.map((metaphor) => (
                    <Card key={metaphor.title}>
                         <CardHeader className="flex flex-row items-start gap-4">
                            <metaphor.icon className="size-8 text-primary mt-1" />
                            <div>
                                <CardTitle>{metaphor.title}</CardTitle>
                                <CardDescription>{metaphor.description}</CardDescription>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm font-semibold italic text-muted-foreground">Meaning: {metaphor.meaning}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
