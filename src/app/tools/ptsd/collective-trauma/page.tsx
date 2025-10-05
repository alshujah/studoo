
import type { Metadata } from 'next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertTriangle, Building } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Collective Trauma Processing | Rejoyn',
};

export default function CollectiveTraumaPage() {
  return (
    <main className="flex flex-1 flex-col">
      <div className="sticky top-0 z-10 flex h-14 items-center border-b bg-background px-6">
        <h1 className="font-headline text-xl font-semibold">Collective Trauma Processing</h1>
      </div>
      <div className="flex-1 p-4 md:p-6">
        <Card>
          <CardHeader>
            <CardTitle className="font-headline">Wounds to a Community</CardTitle>
            <CardDescription>
              Collective trauma is a psychological wound inflicted on a group of people, a community, or an entire society. It can result from events like natural disasters, war, pandemics, terrorism, or systemic oppression.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <Alert>
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>Shared Experience, Shared Healing</AlertTitle>
              <AlertDescription>
                Unlike individual trauma, collective trauma is shared. It can shatter the basic fabric of a society, affecting trust, safety, and identity for the whole group. Healing often requires community-level responses. This page is for educational purposes.
              </AlertDescription>
            </Alert>

            <Card className="bg-muted/30">
                <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-3"><Building className="size-6 text-primary" />Impact of Collective Trauma</CardTitle>
                </CardHeader>
                <CardContent className="prose prose-sm max-w-none text-foreground">
                    <ul>
                        <li>A breakdown of social trust and cohesion.</li>
                        <li>A shared sense of grief, fear, or helplessness.</li>
                        <li>Changes in shared identity and cultural narratives.</li>
                        <li>Increased "us vs. them" thinking and intergroup conflict.</li>
                        <li>A collective memory of the event that shapes future generations.</li>
                    </ul>
                </CardContent>
            </Card>

             <Card>
                <CardHeader>
                    <CardTitle className="text-lg">Pathways to Collective Healing</CardTitle>
                    <CardDescription>Healing from collective trauma often involves community action and shared rituals.</CardDescription>
                </CardHeader>
                <CardContent className="prose prose-sm max-w-none text-foreground">
                    <ul>
                        <li><strong>Public Memorials and Rituals:</strong> Creating shared spaces and ceremonies to acknowledge the loss and honor the victims.</li>
                        <li><strong>Community Storytelling:</strong> Providing platforms for people to share their experiences and bear witness to others' stories in a safe context.</li>
                        <li><strong>Art and Expression:</strong> Using collective art, music, or theater to process and express the shared emotional experience.</li>
                        <li><strong>Truth and Reconciliation:</strong> In cases of societal violence, formal processes to establish a shared historical narrative and promote justice can be a key part of healing.</li>
                        <li><strong>Rebuilding Social Infrastructure:</strong> Investing in community centers, support groups, and local organizations to restore social connection.</li>
                    </ul>
                </CardContent>
            </Card>

          </CardContent>
        </Card>
      </div>
    </main>
  );
}
