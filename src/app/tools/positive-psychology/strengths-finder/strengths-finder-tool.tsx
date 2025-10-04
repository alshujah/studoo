'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check, ChevronsUpDown, RotateCcw } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { characterStrengths } from '@/lib/positive-psychology-data';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';

export function StrengthsFinderTool() {
  const [selectedStrengths, setSelectedStrengths] = useState<string[]>([]);
  const [step, setStep] = useState(1);

  const toggleStrength = (value: string) => {
    setSelectedStrengths((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
  };

  const reset = () => {
    setSelectedStrengths([]);
    setStep(1);
  };

  const prioritizedStrengths = selectedStrengths.slice(0, 5);

  return (
    <div className="w-full space-y-8">
      {step === 1 && (
        <Card>
          <CardHeader>
            <CardTitle>Step 1: Choose Your Strengths</CardTitle>
            <CardDescription>
              From the list below, select all the strengths that feel like they truly represent you. Don't overthink it; just go with your gut feeling. Aim for 7-10 strengths.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {characterStrengths.map((strength) => (
                <button key={strength.name} onClick={() => toggleStrength(strength.name)}>
                  <Badge
                    variant={selectedStrengths.includes(strength.name) ? 'default' : 'secondary'}
                    className="cursor-pointer text-sm"
                  >
                    {strength.name}
                  </Badge>
                </button>
              ))}
            </div>
            <div className="mt-8 flex items-center justify-between">
              <p className="text-sm font-medium">Selected: {selectedStrengths.length}</p>
              <Button onClick={() => setStep(2)} disabled={selectedStrengths.length === 0}>
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
              Now, review your selected strengths. Which ones are your signature strengths—the most essential to who you are? We'll consider the first 5 you selected as your top 5.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {prioritizedStrengths.map((value, index) => (
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
              These are your top 5 signature strengths. Now, let's think about how you can use them more.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {prioritizedStrengths.map((strengthName) => {
              const strengthDetails = characterStrengths.find((s) => s.name === strengthName);
              return (
                <Collapsible key={strengthName} className="rounded-md border p-4">
                  <CollapsibleTrigger className="flex w-full items-center justify-between">
                    <h3 className="text-lg font-semibold text-primary">{strengthName}</h3>
                    <ChevronsUpDown className="h-4 w-4" />
                  </CollapsibleTrigger>
                  <CollapsibleContent className="prose prose-sm max-w-none pt-4 text-foreground">
                    <p className="italic">{strengthDetails?.description}</p>
                    <p className="font-semibold">
                      Reflection Question: How can I use this strength in a new way this week?
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
