
import type { Metadata } from 'next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertTriangle, ShieldBan } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Sexual Trauma Recovery | Rejoyn',
};

export default function SexualTraumaRecoveryPage() {
  return (
    <main className="flex flex-1 flex-col">
      <div className="sticky top-0 z-10 flex h-14 items-center border-b bg-background px-6">
        <h1 className="font-headline text-xl font-semibold">Sexual Trauma Recovery</h1>
      </div>
      <div className="flex-1 p-4 md:p-6">
        <Card>
          <CardHeader>
            <CardTitle className="font-headline">A Path Toward Healing</CardTitle>
            <CardDescription>
              Healing from sexual trauma is a profound journey of reclaiming your safety, self-worth, and connection to your body. It is a path that requires courage, patience, and support.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <Alert variant="destructive">
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>Support is Available</AlertTitle>
              <AlertDescription>
                This content is for educational purposes. If you are a survivor of sexual assault, you can call the National Sexual Assault Hotline at 800-656-HOPE or visit RAINN's website. Healing is possible.
              </AlertDescription>
            </Alert>

            <Card className="bg-muted/30">
                <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-3"><ShieldBan className="size-6 text-primary" />Common Impacts of Sexual Trauma</CardTitle>
                </CardHeader>
                <CardContent className="prose prose-sm max-w-none text-foreground">
                    <ul>
                        <li><strong>Shame and Self-Blame:</strong> Internalizing feelings of fault, even though the trauma was never your fault.</li>
                        <li><strong>Body Image Issues & Disconnection:</strong> Feeling estranged from or unsafe in your own body.</li>
                        <li><strong>Intimacy and Trust Challenges:</strong> Difficulty forming or maintaining healthy, trusting relationships.</li>
                        <li><strong>Symptoms of PTSD:</strong> Including flashbacks, nightmares, hypervigilance, and avoidance.</li>
                        <li><strong>Emotional Dysregulation:</strong> Intense mood swings, numbness, or difficulty managing feelings.</li>
                    </ul>
                </CardContent>
            </Card>

             <Card>
                <CardHeader>
                    <CardTitle className="text-lg">Key Elements of Recovery</CardTitle>
                    <CardDescription>Recovery is not linear, but often involves these core components.</CardDescription>
                </CardHeader>
                <CardContent className="prose prose-sm max-w-none text-foreground">
                    <ul>
                        <li><strong>Establishing Safety:</strong> The first and most critical step is ensuring your physical and emotional safety.</li>
                        <li><strong>Trauma-Informed Therapy:</strong> Working with a therapist who specializes in trauma is crucial. Modalities like Trauma-Focused CBT, EMDR, and Somatic Experiencing are often used.</li>
                        <li><strong>Reclaiming Your Body:</strong> Gentle, body-based practices like trauma-informed yoga or dance can help you reconnect with your body in a safe way.</li>
                        <li><strong>Setting Boundaries:</strong> Learning to set and enforce healthy boundaries in relationships is a key part of reclaiming your power.</li>
                        <li><strong>Building a Support System:</strong> Connecting with trusted friends, family, or support groups can combat the isolation that often accompanies trauma.</li>
                    </ul>
                </CardContent>
            </Card>

          </CardContent>
        </Card>
      </div>
    </main>
  );
}
