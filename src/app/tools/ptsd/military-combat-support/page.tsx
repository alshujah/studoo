
import type { Metadata } from 'next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertTriangle, Swords } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Military/Combat PTSD Support | Rejoyn',
};

export default function MilitaryCombatPTSDPage() {
  return (
    <main className="flex flex-1 flex-col">
      <div className="sticky top-0 z-10 flex h-14 items-center border-b bg-background px-6">
        <h1 className="font-headline text-xl font-semibold">Military & Combat PTSD Support</h1>
      </div>
      <div className="flex-1 p-4 md:p-6">
        <Card>
          <CardHeader>
            <CardTitle className="font-headline">Support for Service Members & Veterans</CardTitle>
            <CardDescription>
              Combat-related PTSD presents unique challenges due to the nature of military experience, including exposure to high-stress situations, loss, and moral injury.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <Alert variant="destructive">
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>You Are Not Alone</AlertTitle>
              <AlertDescription>
                This content is for informational purposes. If you are a veteran in crisis, please contact the Veterans Crisis Line at 988 (then press 1), or text 838255.
              </AlertDescription>
            </Alert>

            <Card className="bg-muted/30">
                <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-3"><Swords className="size-6 text-primary" />Unique Aspects of Combat PTSD</CardTitle>
                </CardHeader>
                <CardContent className="prose prose-sm max-w-none text-foreground">
                    <ul>
                        <li><strong>Moral Injury:</strong> Distress from actions (or inaction) that violate one's moral code.</li>
                        <li><strong>Loss and Grief:</strong> Grieving fallen comrades and the loss of identity after leaving the service.</li>
                        <li><strong>Hypervigilance:</strong> A heightened state of alert that is adaptive in combat but maladaptive in civilian life.</li>
                        <li><strong>Difficulty with Civilian Life:</strong> Feeling disconnected from civilians who don't understand military experiences.</li>
                        <li><strong>Co-occurring Issues:</strong> Higher rates of substance use, depression, and traumatic brain injury (TBI).</li>
                    </ul>
                </CardContent>
            </Card>

             <Card>
                <CardHeader>
                    <CardTitle className="text-lg">Resources & Therapies</CardTitle>
                    <CardDescription>Evidence-based treatments can help you manage symptoms and reclaim your life.</CardDescription>
                </CardHeader>
                <CardContent className="prose prose-sm max-w-none text-foreground">
                    <p>Effective therapies often include:</p>
                    <ul>
                        <li><strong>Cognitive Processing Therapy (CPT):</strong> Helps you challenge and modify unhelpful beliefs related to the trauma.</li>
                        <li><strong>Prolonged Exposure (PE):</strong> Gradually helps you confront trauma-related memories, feelings, and situations.</li>
                        <li><strong>EMDR:</strong> Uses bilateral stimulation to help process traumatic memories.</li>
                        <li><strong>Group Therapy:</strong> Connecting with other veterans can reduce isolation and provide a unique form of support.</li>
                    </ul>
                    <p className="font-bold">Many national and local organizations (like the VA) offer specialized mental health services for veterans.</p>
                </CardContent>
            </Card>

          </CardContent>
        </Card>
      </div>
    </main>
  );
}
