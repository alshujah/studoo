
import type { Metadata } from 'next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { PageLayout } from '@/components/layout/page-layout';
import { schemas, type Schema } from '@/lib/data/schema-therapy-data';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Layers } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Schema Identification | Zenith',
};

export default function SchemaIdentificationPage() {
    
  const domains: Record<Schema['domain'], Schema[]> = {
    'Disconnection & Rejection': [],
    'Impaired Autonomy & Performance': [],
    'Impaired Limits': [],
    'Other-Directedness': [],
    'Overvigilance & Inhibition': [],
  };

  schemas.forEach(schema => {
    domains[schema.domain].push(schema);
  });


  return (
    <PageLayout title="Schema Identification">
        <Card>
            <CardHeader>
                <CardTitle className="font-headline">Understand Your Core Patterns</CardTitle>
                <CardDescription>
                    Schemas are deep-seated, self-defeating patterns of thinking and feeling that we develop in childhood. Identifying them is the first step to changing them.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Alert className="mb-8">
                    <Layers className="h-4 w-4" />
                    <AlertTitle>Read and Reflect</AlertTitle>
                    <AlertDescription>
                       As you read through these schemas, notice if any of them feel particularly familiar or resonate with your own experiences and feelings.
                    </AlertDescription>
                </Alert>

                <div className="space-y-8">
                   {Object.entries(domains).map(([domain, schemaList]) => (
                       <div key={domain}>
                           <h2 className="font-headline text-xl mb-4">{domain}</h2>
                           <div className="space-y-4">
                               {schemaList.map(schema => (
                                   <div key={schema.name} className="p-4 border rounded-lg">
                                       <h3 className="font-semibold text-lg text-primary">{schema.name}</h3>
                                       <p className="text-muted-foreground mt-1">{schema.description}</p>
                                   </div>
                               ))}
                           </div>
                       </div>
                   ))}
                </div>
            </CardContent>
        </Card>
    </PageLayout>
  );
}
