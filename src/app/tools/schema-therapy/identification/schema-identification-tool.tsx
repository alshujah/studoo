'use client';

import React, { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { schemas, type Schema } from '@/lib/schema-therapy-data';
import { RotateCcw } from 'lucide-react';

export function SchemaIdentificationTool() {
  const [selectedSchemas, setSelectedSchemas] = useState<string[]>([]);
  const [step, setStep] = useState(1);

  const groupedSchemas = useMemo(() => {
    return schemas.reduce((acc, schema) => {
      if (!acc[schema.domain]) {
        acc[schema.domain] = [];
      }
      acc[schema.domain].push(schema);
      return acc;
    }, {} as Record<Schema['domain'], Schema[]>);
  }, []);

  const toggleSchema = (schemaName: string) => {
    setSelectedSchemas((prev) =>
      prev.includes(schemaName)
        ? prev.filter((s) => s !== schemaName)
        : [...prev, schemaName]
    );
  };

  const reset = () => {
    setSelectedSchemas([]);
    setStep(1);
  };

  const finalSelectedSchemas = schemas.filter(s => selectedSchemas.includes(s.name));

  return (
    <div className="w-full space-y-8">
      {step === 1 && (
        <Card>
          <CardHeader>
            <CardTitle>Step 1: Identify Your Schemas</CardTitle>
            <CardDescription>
              Read through the descriptions below. Select the schemas that feel familiar or true for you. There is no right or wrong number to select.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Accordion type="multiple" className="w-full space-y-4">
              {Object.entries(groupedSchemas).map(([domain, schemaList]) => (
                <AccordionItem value={domain} key={domain} className="border-b-0 rounded-lg border p-4 bg-muted/20">
                  <AccordionTrigger className="py-2 text-left">
                    <h3 className="text-lg font-semibold">{domain}</h3>
                  </AccordionTrigger>
                  <AccordionContent className="pt-4 space-y-4">
                    {schemaList.map((schema) => (
                      <div key={schema.name} className="flex items-start space-x-3">
                        <Checkbox
                          id={schema.name}
                          checked={selectedSchemas.includes(schema.name)}
                          onCheckedChange={() => toggleSchema(schema.name)}
                        />
                        <div className="grid gap-1.5 leading-none">
                          <Label htmlFor={schema.name} className="font-medium cursor-pointer">
                            {schema.name}
                          </Label>
                          <p className="text-sm text-muted-foreground">
                            {schema.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
            <div className="mt-8 flex justify-end">
              <Button onClick={() => setStep(2)} disabled={selectedSchemas.length === 0}>
                View My Summary
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {step === 2 && (
        <Card>
          <CardHeader>
            <CardTitle>Your Identified Schemas</CardTitle>
            <CardDescription>
              Below are the patterns you've identified. Reflect on how these may show up in your daily life. The first step to change is awareness.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
             {finalSelectedSchemas.length > 0 ? (
                finalSelectedSchemas.map((schema) => (
                    <Card key={schema.name} className="p-4">
                        <h3 className="font-semibold text-primary">{schema.name}</h3>
                        <p className="text-sm text-muted-foreground mt-1">{schema.domain}</p>
                        <p className="text-sm mt-2">{schema.description}</p>
                    </Card>
                ))
            ) : (
                <p className="text-muted-foreground">You did not select any schemas.</p>
            )}
            <div className="mt-8 flex justify-between">
               <Button variant="outline" onClick={() => setStep(1)}>
                Back
              </Button>
              <Button variant="outline" onClick={reset}>
                <RotateCcw className="mr-2 h-4 w-4" />
                Start Over
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
