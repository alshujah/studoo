
import type { Metadata } from 'next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Hexagon, CheckCircle, Compass, Telescope, Eye, MessageCircle, GitCommitHorizontal } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Psychological Flexibility | Rejoyn',
};

const hexaflexPillars = [
    {
        name: 'Acceptance',
        description: 'Making room for painful feelings, sensations, and urges, instead of trying to suppress them or push them away.',
        icon: CheckCircle,
        href: '/tools/dbt/radical-acceptance'
    },
    {
        name: 'Cognitive Defusion',
        description: 'Stepping back and observing language, without being caught up in it. Seeing thoughts for what they are - just words and pictures.',
        icon: MessageCircle,
        href: '/tools/act/decentering'
    },
    {
        name: 'Present Moment Awareness',
        description: 'Bringing full awareness to your here-and-now experience with openness, interest, and receptiveness. (Contacting the Present Moment)',
        icon: Eye,
        href: '/tools/mindfulness'
    },
    {
        name: 'Self-as-Context',
        description: 'Accessing a transcendent sense of self; a continuous and secure "you" that is a safe and secure observer of your experiences.',
        icon: Telescope,
        href: '/tools/act/self-as-context'
    },
    {
        name: 'Values',
        description: 'Discovering what is most important to you; your heart\'s deepest desires for how you want to behave as a human being.',
        icon: Compass,
        href: '/tools/act/values-clarification'
    },
    {
        name: 'Committed Action',
        description: 'Setting goals, guided by your values, and taking effective action to achieve them.',
        icon: GitCommitHorizontal,
        href: '/tools/act/committed-action'
    },
];

export default function PsychologicalFlexibilityPage() {
  return (
    <main className="flex flex-1 flex-col">
      <div className="sticky top-0 z-10 flex h-14 items-center border-b bg-background px-6">
        <h1 className="font-headline text-xl font-semibold">ACT: Psychological Flexibility</h1>
      </div>
      <div className="flex-1 p-4 md:p-6">
        <Card>
          <CardHeader>
            <CardTitle className="font-headline">The Goal of ACT: Psychological Flexibility</CardTitle>
            <CardDescription>
              Psychological flexibility is the ability to stay in contact with the present moment and, depending on what the situation affords, to change or persist in behavior in the service of chosen values.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <Alert>
              <Hexagon className="h-4 w-4" />
              <AlertTitle>The ACT Hexaflex</AlertTitle>
              <AlertDescription>
                These six core processes work together to help you build psychological flexibility. They are not linear steps, but interconnected skills.
              </AlertDescription>
            </Alert>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {hexaflexPillars.map((pillar) => (
                     <Link href={pillar.href} key={pillar.name} className="block hover:bg-muted/50 rounded-lg">
                        <Card className="h-full">
                            <CardHeader>
                                <div className="flex items-center gap-3 mb-2">
                                    <pillar.icon className="size-6 text-primary" />
                                    <CardTitle className="text-lg">{pillar.name}</CardTitle>
                                </div>
                                <CardDescription>{pillar.description}</CardDescription>
                            </CardHeader>
                        </Card>
                    </Link>
                ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
