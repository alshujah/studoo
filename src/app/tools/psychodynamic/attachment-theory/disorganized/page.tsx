
import type { Metadata } from 'next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertTriangle, AlertCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Disorganized Attachment | Rejoyn',
};

export default function DisorganizedAttachmentPage() {
  return (
    <main className="flex flex-1 flex-col">
      <div className="sticky top-0 z-10 flex h-14 items-center border-b bg-background px-6">
        <h1 className="font-headline text-xl font-semibold">Attachment Style: Disorganized (Fearful-Avoidant)</h1>
      </div>
      <div className="flex-1 p-4 md:p-6">
        <Card>
          <CardHeader>
            <CardTitle className="font-headline flex items-center gap-3">
                <AlertCircle className="size-8 text-primary"/>
                The Fearful-Avoidant
            </CardTitle>
            <CardDescription>
              Disorganized attachment is characterized by a fluctuating or confused view of self and others. Individuals with this style both crave and fear intimacy. They often come from a background of trauma, abuse, or chaos where their caregiver was both a source of comfort and a source of fear.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <Alert variant="destructive">
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>Core Conflict: "Come here... go away."</AlertTitle>
              <AlertDescription>
                The central conflict is that the person they want to turn to for safety is also the person they are afraid of. This creates a "fright without solution" and leads to contradictory behaviors in adult relationships.
              </AlertDescription>
            </Alert>
            
            <Card className="bg-muted/30">
                <CardHeader>
                    <CardTitle className="text-lg">Professional Support is Essential</CardTitle>
                </CardHeader>
                <CardContent className="prose prose-sm max-w-none text-foreground">
                   <p>
                    Because disorganized attachment is often rooted in trauma, working through it requires the safety and guidance of a trained, trauma-informed therapist. Self-help tools can be a useful supplement, but they are not a substitute for professional care.
                   </p>
                   <p>
                    A therapist can help you:
                   </p>
                    <ul>
                        <li><strong>Establish Safety:</strong> The first and most important step is creating a sense of safety in your body and your life.</li>
                        <li><strong>Process Trauma:</strong> Use evidence-based modalities like EMDR, Somatic Experiencing, or Trauma-Focused CBT to process traumatic memories.</li>
                        <li><strong>Develop Coherent Narratives:</strong> Make sense of your life story and understand how your past experiences impact your present.</li>
                        <li><strong>Build Earned Security:</strong> Gradually build a new, secure attachment style through a safe and consistent therapeutic relationship.</li>
                    </ul>
                </CardContent>
            </Card>

          </CardContent>
        </Card>
      </div>
    </main>
  );
}
