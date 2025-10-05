
import type { Metadata } from 'next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertTriangle, Network } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Complex PTSD Workbook | Rejoyn',
};

export default function ComplexPTSDPage() {
  return (
    <main className="flex flex-1 flex-col">
      <div className="sticky top-0 z-10 flex h-14 items-center border-b bg-background px-6">
        <h1 className="font-headline text-xl font-semibold">Understanding Complex PTSD</h1>
      </div>
      <div className="flex-1 p-4 md:p-6">
        <Card>
          <CardHeader>
            <CardTitle className="font-headline">Complex PTSD (C-PTSD)</CardTitle>
            <CardDescription>
              C-PTSD results from repeated, prolonged trauma, especially in childhood, where the victim has little or no chance of escape. It impacts one's sense of self, relationships, and emotional regulation.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <Alert variant="destructive">
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>Professional Guidance is Essential</AlertTitle>
              <AlertDescription>
                The content on this page is for informational purposes only. C-PTSD is a serious condition that requires diagnosis and treatment by a qualified mental health professional.
              </AlertDescription>
            </Alert>

            <Card className="bg-muted/30">
                <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-3"><Network className="size-6 text-primary" />Key Areas Affected by C-PTSD</CardTitle>
                </CardHeader>
                <CardContent className="prose prose-sm max-w-none text-foreground">
                    <ul>
                        <li><strong>Emotional Regulation:</strong> Difficulty managing intense emotions, persistent sadness, or suicidal thoughts.</li>
                        <li><strong>Consciousness:</strong> Forgetting traumatic events (dissociation) or feeling detached from one's mind or body.</li>
                        <li><strong>Self-Perception:</strong> Feeling helpless, shame, guilt, and a sense of being permanently damaged.</li>
                        <li><strong>Relationships:</strong> Difficulty with trust, isolating oneself, or repeatedly seeking a rescuer.</li>
                        <li><strong>Somatic Symptoms:</strong> Chronic pain, fatigue, and other physical symptoms without a clear medical cause.</li>
                        <li><strong>Systems of Meaning:</strong> Loss of faith or a sense of hopelessness and despair.</li>
                    </ul>
                </CardContent>
            </Card>

             <Card>
                <CardHeader>
                    <CardTitle className="text-lg">Pathways to Healing</CardTitle>
                    <CardDescription>Healing from C-PTSD is a long-term journey focused on safety, remembrance and mourning, and reconnection.</CardDescription>
                </CardHeader>
                <CardContent className="prose prose-sm max-w-none text-foreground">
                    <p>Therapeutic approaches often include:</p>
                    <ul>
                        <li><strong>Phase-Oriented Treatment:</strong> A structured approach focusing first on safety and stabilization before processing traumatic memories.</li>
                        <li><strong>Somatic Therapies:</strong> Body-based approaches like Somatic Experiencing or EMDR to help release trapped trauma from the body.</li>
                        <li><strong>Parts Work (e.g., IFS):</strong> Understanding and healing the different "parts" of yourself that developed to cope with trauma.</li>
                        <li><strong>DBT:</strong> Learning concrete skills for emotional regulation, distress tolerance, and interpersonal effectiveness.</li>
                    </ul>
                </CardContent>
            </Card>

          </CardContent>
        </Card>
      </div>
    </main>
  );
}
