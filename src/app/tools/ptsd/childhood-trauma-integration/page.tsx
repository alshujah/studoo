
import type { Metadata } from 'next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertTriangle, Baby } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Childhood Trauma Integration | Rejoyn',
};

export default function ChildhoodTraumaPage() {
  return (
    <main className="flex flex-1 flex-col">
      <div className="sticky top-0 z-10 flex h-14 items-center border-b bg-background px-6">
        <h1 className="font-headline text-xl font-semibold">Childhood Trauma Integration</h1>
      </div>
      <div className="flex-1 p-4 md:p-6">
        <Card>
          <CardHeader>
            <CardTitle className="font-headline">Understanding and Healing Early Wounds</CardTitle>
            <CardDescription>
              Childhood trauma, or adverse childhood experiences (ACEs), can have a lasting impact on development, shaping beliefs about oneself, others, and the world. Integration is the process of acknowledging these experiences and weaving them into your life story in a way that promotes healing rather than continued suffering.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <Alert variant="destructive">
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>Professional Support is Key</AlertTitle>
              <AlertDescription>
                Healing from childhood trauma is a deep and complex process. This content is for informational purposes only and is not a substitute for therapy with a qualified, trauma-informed professional.
              </AlertDescription>
            </Alert>

            <Card className="bg-muted/30">
                <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-3"><Baby className="size-6 text-primary" />Core Concepts in Healing</CardTitle>
                </CardHeader>
                <CardContent className="prose prose-sm max-w-none text-foreground">
                    <ul>
                        <li><strong>Inner Child Work:</strong> Connecting with and reparenting the wounded child part of you. This involves offering the comfort, safety, and validation that you may not have received as a child.</li>
                        <li><strong>Schema Therapy:</strong> Identifying and changing the long-standing, self-defeating patterns (schemas) that developed as coping mechanisms in childhood.</li>
                        <li><strong>Attachment Theory:</strong> Understanding how early bonds with caregivers shaped your current relationship patterns and working to develop a "secure" attachment style with yourself and others.</li>
                        <li><strong>Narrative Therapy:</strong> Re-authoring your life story to focus on your resilience and strength, rather than defining yourself by the trauma.</li>
                    </ul>
                </CardContent>
            </Card>

             <Card>
                <CardHeader>
                    <CardTitle className="text-lg">The Goal: Integration, Not Erasure</CardTitle>
                    <CardDescription>Healing doesn't mean forgetting the past.</CardDescription>
                </CardHeader>
                <CardContent className="prose prose-sm max-w-none text-foreground">
                    <p>The goal of integrating childhood trauma is not to erase what happened, but to reduce its emotional charge. It's about acknowledging the impact of the past while recognizing that you are no longer that helpless child. You are an adult with resources, choices, and the capacity to create a life of meaning and connection now.</p>
                </CardContent>
            </Card>

          </CardContent>
        </Card>
      </div>
    </main>
  );
}
