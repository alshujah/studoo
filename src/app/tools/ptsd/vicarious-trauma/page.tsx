
import type { Metadata } from 'next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertTriangle, Users } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Vicarious Trauma Support | Rejoyn',
};

export default function VicariousTraumaPage() {
  return (
    <main className="flex flex-1 flex-col">
      <div className="sticky top-0 z-10 flex h-14 items-center border-b bg-background px-6">
        <h1 className="font-headline text-xl font-semibold">Vicarious Trauma Support</h1>
      </div>
      <div className="flex-1 p-4 md:p-6">
        <Card>
          <CardHeader>
            <CardTitle className="font-headline">For Helpers and Healers</CardTitle>
            <CardDescription>
              Vicarious trauma (or secondary trauma) is the emotional and psychological impact of exposure to the trauma of others. It is common among therapists, first responders, doctors, nurses, and other helping professionals.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <Alert>
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>The Cost of Caring</AlertTitle>
              <AlertDescription>
                Your empathy is your greatest tool, but it can also make you vulnerable. Recognizing and addressing vicarious trauma is essential for sustainable, long-term caregiving.
              </AlertDescription>
            </Alert>

            <Card className="bg-muted/30">
                <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-3"><Users className="size-6 text-primary" />Signs of Vicarious Trauma</CardTitle>
                </CardHeader>
                <CardContent className="prose prose-sm max-w-none text-foreground">
                    <ul>
                        <li>Feeling emotionally numb or detached.</li>
                        <li>Increased cynicism, pessimism, or irritability.</li>
                        <li>Intrusive thoughts or images related to a client's trauma.</li>
                        <li>Difficulty maintaining professional boundaries.</li>
                        <li>A diminished sense of personal accomplishment (burnout).</li>
                        <li>Disrupted worldview and changes in beliefs about safety, trust, and control.</li>
                    </ul>
                </CardContent>
            </Card>

             <Card>
                <CardHeader>
                    <CardTitle className="text-lg">The "ABCs" of Prevention and Management</CardTitle>
                    <CardDescription>A framework for building resilience.</CardDescription>
                </CardHeader>
                <CardContent className="prose prose-sm max-w-none text-foreground">
                    <ul>
                        <li><strong>Awareness:</strong> Be aware of your own needs, limits, emotions, and resources. Practice regular self-check-ins.</li>
                        <li><strong>Balance:</strong> Maintain a healthy balance between your work life, personal life, and leisure activities. Protect your time off.</li>
                        <li><strong>Connection:</strong> Seek connection with colleagues, supervisors, and your personal support system. Peer support and supervision are vital for processing difficult material.</li>
                    </ul>
                </CardContent>
            </Card>

          </CardContent>
        </Card>
      </div>
    </main>
  );
}
