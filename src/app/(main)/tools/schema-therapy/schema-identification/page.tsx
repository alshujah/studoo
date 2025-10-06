
'use client';
import { PageLayout } from '@/components/layout/page-layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { schemas } from '@/lib/data/schema-therapy-data';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { useState } from 'react';
import { BrainCircuit, Award } from 'lucide-react';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';

export default function SchemaIdentificationPage() {
    const [selectedSchemas, setSelectedSchemas] = useState<string[]>([]);
    const [isFinished, setIsFinished] = useState(false);

    const handleSelect = (schemaName: string) => {
        if (selectedSchemas.includes(schemaName)) {
            setSelectedSchemas(selectedSchemas.filter(s => s !== schemaName));
        } else {
            if (selectedSchemas.length < 5) {
                setSelectedSchemas([...selectedSchemas, schemaName]);
            }
        }
    };
    
    const handleFinish = () => {
        setIsFinished(true);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    
    const groupedSchemas = schemas.reduce((acc, schema) => {
        if (!acc[schema.domain]) {
            acc[schema.domain] = [];
        }
        acc[schema.domain].push(schema);
        return acc;
    }, {} as Record<string, typeof schemas>);

    if (isFinished) {
        return (
            <PageLayout title="Your Top 5 Schemas">
                 <Card>
                    <CardHeader>
                        <CardTitle className="font-headline">Your Identified Schemas</CardTitle>
                        <CardDescription>These are the core themes you feel most apply to you. Awareness is the first step toward change.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <Alert>
                            <Award className="h-4 w-4" />
                            <AlertTitle>What's Next?</AlertTitle>
                            <AlertDescription>
                                Now that you've identified these patterns, you can begin to notice when they show up in your daily life. The next step in Schema Therapy is often to track these activations in a "Schema Diary".
                            </AlertDescription>
                        </Alert>
                        <div className="space-y-3">
                            {selectedSchemas.map(schemaName => {
                                const schema = schemas.find(s => s.name === schemaName);
                                if (!schema) return null;
                                return (
                                    <div key={schema.name} className="p-4 border rounded-md bg-background">
                                        <h3 className="font-semibold text-lg text-primary">{schema.name}</h3>
                                        <p className="text-sm text-muted-foreground">{schema.description}</p>
                                    </div>
                                );
                            })}
                        </div>
                        <Button onClick={() => setIsFinished(false)} variant="outline">Edit My Selections</Button>
                    </CardContent>
                </Card>
            </PageLayout>
        )
    }

    return (
        <PageLayout title="Schema Identification">
            <Card>
                <CardHeader>
                    <CardTitle className="font-headline">Discover Your Core Schemas</CardTitle>
                    <CardDescription>Select up to 5 lifelong patterns, or "schemas," that you feel best describe you. Read the descriptions and choose the ones that resonate most strongly.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-8">
                     {Object.entries(groupedSchemas).map(([domain, schemaList]) => (
                        <div key={domain}>
                            <h3 className="font-headline text-xl mb-4">{domain}</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {schemaList.map((schema) => (
                                    <div key={schema.name} className="flex items-start space-x-3 p-4 border rounded-lg hover:bg-muted/50 transition-colors h-full">
                                        <Checkbox
                                            id={schema.name}
                                            checked={selectedSchemas.includes(schema.name)}
                                            onCheckedChange={() => handleSelect(schema.name)}
                                            disabled={!selectedSchemas.includes(schema.name) && selectedSchemas.length >= 5}
                                        />
                                        <div className="grid gap-1.5 leading-none">
                                            <label htmlFor={schema.name} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                                {schema.name}
                                            </label>
                                            <p className="text-sm text-muted-foreground">
                                                {schema.description}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                     {selectedSchemas.length > 0 && (
                        <div className="sticky bottom-4 mt-4">
                             <Card className="w-fit mx-auto shadow-lg">
                                <CardContent className="p-4 flex items-center gap-4">
                                     <p className="text-sm font-medium">{selectedSchemas.length} of 5 selected.</p>
                                    <Button onClick={handleFinish} disabled={selectedSchemas.length === 0}>
                                        View My Top Schemas
                                    </Button>
                                </CardContent>
                            </Card>
                        </div>
                    )}
                </CardContent>
            </Card>
        </PageLayout>
    );
}
