
'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RotateCcw } from 'lucide-react';

export function ProsAndConsTool() {
  const [urge, setUrge] = useState('');
  const [actingPros, setActingPros] = useState('');
  const [actingCons, setActingCons] = useState('');
  const [resistingPros, setResistingPros] = useState('');
  const [resistingCons, setResistingCons] = useState('');
  
  const resetForm = () => {
    setUrge('');
    setActingPros('');
    setActingCons('');
    setResistingPros('');
    setResistingCons('');
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="urge" className="text-base">What is the crisis behavior or urge you're struggling with?</Label>
        <Input 
          id="urge" 
          placeholder="e.g., Avoiding my responsibilities, starting an argument, etc." 
          value={urge} 
          onChange={(e) => setUrge(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Acting On The Urge</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="acting-pros">Pros</Label>
              <Textarea 
                id="acting-pros"
                placeholder="What are the immediate benefits or relief?" 
                value={actingPros}
                onChange={(e) => setActingPros(e.target.value)}
                className="min-h-32"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="acting-cons">Cons</Label>
              <Textarea 
                id="acting-cons"
                placeholder="What are the negative consequences, long-term and short-term?" 
                value={actingCons}
                onChange={(e) => setActingCons(e.target.value)}
                className="min-h-32"
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Resisting The Urge</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="resisting-pros">Pros</Label>
              <Textarea 
                id="resisting-pros"
                placeholder="What are the benefits of not giving in?" 
                value={resistingPros}
                onChange={(e) => setResistingPros(e.target.value)}
                className="min-h-32"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="resisting-cons">Cons</Label>
              <Textarea 
                id="resisting-cons"
                placeholder="What is difficult about resisting the urge?" 
                value={resistingCons}
                onChange={(e) => setResistingCons(e.target.value)}
                className="min-h-32"
              />
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="flex justify-end">
        <Button variant="outline" onClick={resetForm}>
          <RotateCcw className="mr-2" />
          Start Over
        </Button>
      </div>
    </div>
  );
}
