
import type { Metadata } from 'next';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Anchor, Heart, Shield, AlertCircle, CircleHelp, HandHoldingHeart } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  title: 'Attachment-Based Therapy | Rejoyn',
};

const styles = [
    {
        title: 'Secure',
        icon: Shield,
        description: 'Comfortable with intimacy, can depend on others and have others depend on them.',
        href: '/tools/psychodynamic/attachment-theory/secure'
    },
    {
        title: 'Anxious (Preoccupied)',
        icon: Heart,
        description: 'Craves closeness and intimacy, but often worries about their partner\'s love and commitment.',
        href: '/tools/psychodynamic/attachment-theory/anxious'
    },
    {
        title: 'Avoidant (Dismissive)',
        icon: HandHoldingHeart,
        description: 'Highly independent, fears closeness, and tends to suppress emotions.',
        href: '/tools/psychodynamic/attachment-theory/avoidant'
    },
    {
        title: 'Disorganized (Fearful-Avoidant)',
        icon: AlertCircle,
        description: 'Desires intimacy but is also afraid of it. Often has a history of trauma.',
        href: '/tools/psychodynamic/attachment-theory/disorganized'
    }
];

export default function AttachmentTheoryPage() {
  return (
    <main className="flex flex-1 flex-col">
      <div className="sticky top-0 z-10 flex h-14 items-center border-b bg-background px-6">
        <h1 className="font-headline text-xl font-semibold">Attachment-Based Therapy</h1>
      </div>
      <div className="flex-1 p-4 md:p-6 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="font-headline">Understanding Your Relationship Blueprint</CardTitle>
            <CardDescription>
              Attachment theory explains how our earliest relationships with caregivers shape our "attachment style"—the way we perceive and respond to intimacy in our adult relationships. Understanding your style is the first step to building healthier, more secure connections.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Alert>
              <Anchor className="h-4 w-4" />
              <AlertTitle>Your Inner Working Model</AlertTitle>
              <AlertDescription>
                Your attachment style forms an "inner working model" for relationships. It's a set of unconscious rules and expectations about love, closeness, and dependency. By making this model conscious, you can begin to change it.
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>
        
        <Card>
            <CardHeader>
                <CardTitle>What's Your Style?</CardTitle>
                <CardDescription>Not sure which style resonates most with you? This self-assessment can provide some clarity.</CardDescription>
            </CardHeader>
            <CardContent>
                <Button asChild>
                    <Link href="/tools/psychodynamic/attachment-theory/assessment">
                        <CircleHelp className="mr-2"/>
                        Go to Self-Assessment
                    </Link>
                </Button>
            </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {styles.map(style => (
                <Link href={style.href} key={style.title}>
                    <Card className="h-full hover:bg-muted/50 transition-colors">
                        <CardHeader className="flex flex-row items-start gap-4">
                            <style.icon className="size-8 text-primary mt-1 shrink-0"/>
                            <div>
                                <CardTitle>{style.title}</CardTitle>
                                <CardDescription>{style.description}</CardDescription>
                            </div>
                        </CardHeader>
                    </Card>
                </Link>
            ))}
        </div>
      </div>
    </main>
  );
}
