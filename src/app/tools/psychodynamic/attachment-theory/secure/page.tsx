
import type { Metadata } from 'next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Shield } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Secure Attachment | Rejoyn',
};

export default function SecureAttachmentPage() {
  return (
    <main className="flex flex-1 flex-col">
      <div className="sticky top-0 z-10 flex h-14 items-center border-b bg-background px-6">
        <h1 className="font-headline text-xl font-semibold">Attachment Style: Secure</h1>
      </div>
      <div className="flex-1 p-4 md:p-6">
        <Card>
          <CardHeader>
            <CardTitle className="font-headline flex items-center gap-3">
                <Shield className="size-8 text-primary"/>
                The Secure Base
            </CardTitle>
            <CardDescription>
              Secure attachment is characterized by a positive view of self and a positive view of others. Individuals with a secure attachment style feel comfortable with both intimacy and independence.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <Alert>
              <Shield className="h-4 w-4" />
              <AlertTitle>The Foundation of Healthy Relationships</AlertTitle>
              <AlertDescription>
                A secure attachment style is the foundation for healthy, fulfilling relationships. It is something that can be learned and cultivated at any stage of life, a process known as "earned security."
              </AlertDescription>
            </Alert>

            <Card className="bg-muted/30">
                <CardHeader>
                    <CardTitle className="text-lg">Characteristics of Secure Attachment</CardTitle>
                </CardHeader>
                <CardContent className="prose prose-sm max-w-none text-foreground">
                    <ul>
                        <li><strong>Trust:</strong> Able to trust others and be trusted.</li>
                        <li><strong>Emotional Regulation:</strong> Can manage emotions effectively without becoming overwhelmed.</li>
                        <li><strong>Communication:</strong> Communicates needs and feelings directly and respectfully.</li>
                        <li><strong>Conflict Resolution:</strong> Views conflict as a problem to be solved collaboratively, not as a threat to the relationship.</li>
                        <li><strong>Autonomy & Connection:</strong> Balances independence with healthy interdependence.</li>
                        <li><strong>Resilience:</strong> Can seek support when needed and bounce back from relationship setbacks.</li>
                    </ul>
                </CardContent>
            </Card>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
