
import type { Metadata } from 'next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertTriangle, Workflow } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Intergenerational Trauma Work | Rejoyn',
};

export default function IntergenerationalTraumaPage() {
  return (
    <main className="flex flex-1 flex-col">
      <div className="sticky top-0 z-10 flex h-14 items-center border-b bg-background px-6">
        <h1 className="font-headline text-xl font-semibold">Intergenerational Trauma</h1>
      </div>
      <div className="flex-1 p-4 md:p-6">
        <Card>
          <CardHeader>
            <CardTitle className="font-headline">The Legacy of Trauma</CardTitle>
            <CardDescription>
              Intergenerational trauma (or transgenerational trauma) is trauma that is passed down from those who directly experience a traumatic event to subsequent generations.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <Alert variant="destructive">
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>Requires Professional Guidance</AlertTitle>
              <AlertDescription>
                This is a deep and complex topic often rooted in family and cultural history. Exploring it is powerful but can be very challenging and is best done with the support of a culturally-sensitive, trauma-informed therapist. This page is for educational purposes only.
              </AlertDescription>
            </Alert>

            <Card className="bg-muted/30">
                <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-3"><Workflow className="size-6 text-primary" />How Trauma is Transmitted</CardTitle>
                </CardHeader>
                <CardContent className="prose prose-sm max-w-none text-foreground">
                    <p>Trauma can be passed down through several channels:</p>
                    <ul>
                        <li><strong>Behavioral Patterns:</strong> Parents who experienced trauma may develop coping mechanisms (e.g., emotional numbing, hypervigilance) that affect their parenting style, which children then learn and internalize.</li>
                        <li><strong>Family Narratives:</strong> Stories (or silence) about the trauma within a family can shape a child's identity, beliefs about the world, and sense of safety.</li>
                        <li><strong>Attachment:</strong> A parent's unresolved trauma can impact their ability to form a secure attachment with their child, affecting the child's own ability to regulate emotions and form healthy relationships.</li>
                        <li><strong>Epigenetics:</strong> Emerging research suggests that trauma can cause changes in how genes are expressed, and these changes can potentially be passed down, affecting stress responses in offspring.</li>
                    </ul>
                </CardContent>
            </Card>

             <Card>
                <CardHeader>
                    <CardTitle className="text-lg">Pathways to Healing</CardTitle>
                    <CardDescription>Healing involves acknowledging the past and breaking the cycle.</CardDescription>
                </CardHeader>
                <CardContent className="prose prose-sm max-w-none text-foreground">
                    <ul>
                        <li><strong>Making the Unspoken Spoken:</strong> Gently and safely talking about the family history and the "elephant in the room."</li>
                        <li><strong>Understanding, Not Blaming:</strong> Developing compassion for previous generations and understanding the circumstances they faced, without excusing harmful behavior.</li>
                        <li><strong>Connecting with Cultural Roots:</strong> For trauma related to cultural oppression, reconnecting with cultural traditions, language, and community can be a powerful source of healing and resilience.</li>
                        <li><strong>Individual and Family Therapy:</strong> Working to heal one's own trauma and change the patterns of interaction within the family system.</li>
                    </ul>
                </CardContent>
            </Card>

          </CardContent>
        </Card>
      </div>
    </main>
  );
}
