
import type { Metadata } from 'next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { BrainCircuit, Shield, Fire, User, CircleUser } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Internal Family Systems (IFS) | Rejoyn',
};

const parts = [
    {
        title: 'Managers',
        icon: Shield,
        description: 'These are the proactive, protective parts that try to manage your life to prevent pain and distress. They might manifest as the inner critic, the perfectionist, or the planner. Their intention is to keep you safe by controlling situations and emotions.',
    },
    {
        title: 'Firefighters',
        icon: Fire,
        description: 'These are the reactive, emergency-response parts. When painful emotions (from Exiles) break through, Firefighters jump in to douse the emotional fire immediately, often through impulsive or numbing behaviors like substance use, overeating, or zoning out. Their goal is distraction at any cost.',
    },
     {
        title: 'Exiles',
        icon: User,
        description: 'These are the young, vulnerable parts that hold the pain, shame, and trauma from past experiences. Managers and Firefighters work hard to keep these parts locked away ("exiled") so their overwhelming feelings don\'t flood your system.',
    },
];

export default function IFSPage() {
  return (
    <main className="flex flex-1 flex-col">
      <div className="sticky top-0 z-10 flex h-14 items-center border-b bg-background px-6">
        <h1 className="font-headline text-xl font-semibold">Internal Family Systems (IFS)</h1>
      </div>
      <div className="flex-1 p-4 md:p-6 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="font-headline">Getting to Know Your Inner World</CardTitle>
            <CardDescription>
              Internal Family Systems (IFS) is a model of psychotherapy that views the mind as being made up of multiple "parts" and a core "Self." The goal of IFS is not to eliminate parts, but to understand them and heal them, bringing your inner system into balance.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Alert>
              <BrainCircuit className="h-4 w-4" />
              <AlertTitle>All Parts are Welcome</AlertTitle>
              <AlertDescription>
                A core assumption of IFS is that there are no bad parts. Every part has a positive intention for you, even if its actions cause problems.
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>
        
        <Card>
            <CardHeader>
                <CardTitle>The Main Types of Parts</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {parts.map((part) => (
                    <Card key={part.title}>
                        <CardHeader className="flex flex-row items-start gap-4">
                            <part.icon className="size-8 text-primary mt-1" />
                            <div>
                                <CardTitle>{part.title}</CardTitle>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-muted-foreground">{part.description}</p>
                        </CardContent>
                    </Card>
                ))}
            </CardContent>
        </Card>

        <Card>
            <CardHeader className="items-center text-center">
                <div className="p-3 bg-primary/10 rounded-full w-fit">
                    <CircleUser className="size-8 text-primary" />
                </div>
                <CardTitle>The Self</CardTitle>
                <CardDescription>
                    Underneath all the parts is your core Self. The Self is inherently calm, curious, compassionate, confident, connected, creative, and courageous. It is the natural leader of your inner system. The goal of IFS therapy is to help the Self connect with and heal the parts, allowing them to unburden their pain and take on healthier roles.
                </CardDescription>
            </CardHeader>
        </Card>

      </div>
    </main>
  );
}
