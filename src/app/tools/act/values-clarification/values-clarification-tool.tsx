'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check, ChevronsUpDown, RotateCcw } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { coreValues } from '@/lib/act-data';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';

export function ValuesClarificationTool() {
  const [selectedValues, setSelectedValues] = useState<string[]>([]);
  const [step, setStep] = useState(1);

  const toggleValue = (value: string) => {
    setSelectedValues((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
  };

  const reset = () => {
    setSelectedValues([]);
    setStep(1);
  };

  const prioritizedValues = selectedValues.slice(0, 5);

  return (
    <div className="w-full space-y-8">
      {step === 1 && (
        <Card>
          <CardHeader>
            <CardTitle>Step 1: Choose Your Values</CardTitle>
            <CardDescription>
              From the list below, select all the values that feel important to you. Don't
              overthink it; just go with your gut feeling. Aim for 10-15 values.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {coreValues.map((value) => (
                <button key={value.name} onClick={() => toggleValue(value.name)}>
                  <Badge
                    variant={selectedValues.includes(value.name) ? 'default' : 'secondary'}
                    className="cursor-pointer text-sm"
                  >
                    {value.name}
                  </Badge>
                </button>
              ))}
            </div>
            <div className="mt-8 flex items-center justify-between">
              <p className="text-sm font-medium">Selected: {selectedValues.length}</p>
              <Button onClick={() => setStep(2)} disabled={selectedValues.length === 0}>
                Next: Prioritize
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {step === 2 && (
        <Card>
          <CardHeader>
            <CardTitle>Step 2: Prioritize Your Top 5</CardTitle>
            <CardDescription>
              Now, review your selected values. Which ones are the most essential to who you are and
              who you want to be? Drag and drop to order your top 5, with #1 being the most
              important.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4 text-sm">
              Note: A drag-and-drop interface would be implemented here. For now, we will consider
              the first 5 you selected as your top 5.
            </p>
            <div className="space-y-2">
              {prioritizedValues.map((value, index) => (
                <div
                  key={value}
                  className="flex items-center rounded-md border bg-background p-3"
                >
                  <Badge variant="default" className="mr-4 text-lg">
                    {index + 1}
                  </Badge>
                  <h3 className="font-semibold">{value}</h3>
                </div>
              ))}
            </div>
            <div className="mt-8 flex justify-between">
              <Button variant="outline" onClick={() => setStep(1)}>
                Back
              </Button>
              <Button onClick={() => setStep(3)}>Next: Reflect</Button>
            </div>
          </CardContent>
        </Card>
      )}

      {step === 3 && (
        <Card>
          <CardHeader>
            <CardTitle>Step 3: Reflection & Commitment</CardTitle>
            <CardDescription>
              These are your prioritized core values. Now, let's think about how to live by them.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {prioritizedValues.map((valueName) => {
              const valueDetails = coreValues.find((v) => v.name === valueName);
              return (
                <Collapsible key={valueName} className="rounded-md border p-4">
                  <CollapsibleTrigger className="flex w-full items-center justify-between">
                    <h3 className="text-lg font-semibold text-primary">{valueName}</h3>
                    <ChevronsUpDown className="h-4 w-4" />
                  </CollapsibleTrigger>
                  <CollapsibleContent className="prose prose-sm max-w-none pt-4 text-foreground">
                    <p className="italic">{valueDetails?.description}</p>
                    <p className="font-semibold">
                      Reflection Question: What is one small action I can take this week that aligns
                      with this value?
                    </p>
                  </CollapsibleContent>
                </Collapsible>
              );
            })}
            <div className="mt-8 flex justify-end">
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
