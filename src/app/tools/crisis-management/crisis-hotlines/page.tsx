import type { Metadata } from 'next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertTriangle, Phone } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Crisis Support Hotlines | Rejoyn',
};

const hotlines = [
    {
        name: "988 Suicide & Crisis Lifeline",
        contact: "Call or Text 988",
        description: "Free, confidential support for people in distress, 24/7. Available in the US and Canada.",
        href: "https://988lifeline.org/"
    },
    {
        name: "Crisis Text Line",
        contact: "Text HOME to 741741",
        description: "Free, 24/7 crisis counseling via text message. Available in the US, Canada, UK, and Ireland.",
        href: "https://www.crisistextline.org/"
    },
    {
        name: "The Trevor Project",
        contact: "Call 1-866-488-7386 or Text START to 678-678",
        description: "Specialized crisis support for LGBTQ young people.",
        href: "https://www.thetrevorproject.org/"
    },
    {
        name: "Veterans Crisis Line",
        contact: "Call 988, then press 1",
        description: "Confidential crisis support for Veterans and their families.",
        href: "https://www.veteranscrisisline.net/"
    },
];

export default function CrisisHotlinesPage() {
  return (
    <main className="flex flex-1 flex-col">
      <div className="sticky top-0 z-10 flex h-14 items-center border-b bg-background px-6">
        <h1 className="font-headline text-xl font-semibold">Crisis Support Resources</h1>
      </div>
      <div className="flex-1 p-4 md:p-6">
        <Card>
          <CardHeader>
            <CardTitle className="font-headline">Immediate Help is Available</CardTitle>
            <CardDescription>
              If you are in a crisis or emotional distress, please reach out to one of the resources below. You are not alone.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <Alert variant="destructive">
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>If you are in immediate danger, call 911.</AlertTitle>
              <AlertDescription>
                These resources are for support, but they are not a substitute for emergency services.
              </AlertDescription>
            </Alert>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {hotlines.map((hotline) => (
                    <Card key={hotline.name}>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2"><Phone className="size-5 text-primary"/>{hotline.name}</CardTitle>
                            <p className="text-lg font-bold text-primary pt-2">{hotline.contact}</p>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-muted-foreground">{hotline.description}</p>
                             <Link href={hotline.href} target="_blank" rel="noopener noreferrer" className="text-sm text-primary underline mt-2 inline-block">
                                Visit Website
                            </Link>
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
