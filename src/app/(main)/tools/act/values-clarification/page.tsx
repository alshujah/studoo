
'use client';

import React, { useState } from 'react';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors, type DragEndEvent } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { coreValues } from '@/lib/data/act-data';
import { SortableItem } from './sortable-item';
import { Button } from '@/components/ui/button';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Award } from 'lucide-react';
import { PageLayout } from '@/components/layout/page-layout';

type ValueItem = {
    id: string;
    name: string;
    description: string;
};

export default function ValuesClarificationPage() {
    const initialItems: ValueItem[] = coreValues.map(v => ({ id: v.name, ...v }));
    const [unselected, setUnselected] = useState<ValueItem[]>(initialItems);
    const [selected, setSelected] = useState<ValueItem[]>([]);
    const [isFinished, setIsFinished] = useState(false);

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    const handleSelect = (value: ValueItem) => {
        if (selected.length < 10) {
            setUnselected(unselected.filter(item => item.id !== value.id));
            setSelected([...selected, value]);
        }
    };

    const handleDeselect = (value: ValueItem) => {
        setSelected(selected.filter(item => item.id !== value.id));
        setUnselected([value, ...unselected]);
    };

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;
        if (over && active.id !== over.id) {
            setSelected((items) => {
                const oldIndex = items.findIndex(item => item.id === active.id);
                const newIndex = items.findIndex(item => item.id === over.id);
                return arrayMove(items, oldIndex, newIndex);
            });
        }
    };

    const handleFinish = () => {
        setIsFinished(true);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    if (isFinished) {
        return (
            <PageLayout title="Your Top 10 Values">
                <Card>
                    <CardHeader>
                        <CardTitle className="font-headline">Congratulations!</CardTitle>
                        <CardDescription>You've identified and ranked your top 10 core values. This is your personal compass.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                         <Alert>
                            <Award className="h-4 w-4" />
                            <AlertTitle>What's Next?</AlertTitle>
                            <AlertDescription>
                                Use these values to guide your decisions. When you feel stuck, ask yourself: "What would a person who values {selected[0].name.toLowerCase()} and {selected[1].name.toLowerCase()} do in this situation?"
                            </AlertDescription>
                        </Alert>

                        <ol className="list-decimal list-inside space-y-3">
                            {selected.map((item, index) => (
                                <li key={item.id} className="p-4 border rounded-md bg-background">
                                    <h3 className="font-semibold text-lg text-primary">{index + 1}. {item.name}</h3>
                                    <p className="text-sm text-muted-foreground">{item.description}</p>
                                </li>
                            ))}
                        </ol>
                        <Button onClick={() => setIsFinished(false)} variant="outline">Edit My Values</Button>
                    </CardContent>
                </Card>
            </PageLayout>
        );
    }

    return (
        <PageLayout title="Values Clarification">
            <Card>
                <CardHeader>
                    <CardTitle className="font-headline">Discover What Matters Most to You</CardTitle>
                    <CardDescription>Follow the steps below to identify your core values.</CardDescription>
                </CardHeader>
                <CardContent className="grid md:grid-cols-2 gap-8">
                    <div>
                        <h3 className="font-semibold mb-2">Step 1: Select Your Top 10 Values</h3>
                        <p className="text-sm text-muted-foreground mb-4">
                            From the list below, choose up to 10 values that resonate most with you.
                        </p>
                        <div className="space-y-2 max-h-96 overflow-y-auto p-1">
                            {unselected.map(item => (
                                <button key={item.id} onClick={() => handleSelect(item)} className="w-full text-left p-3 border rounded-md hover:bg-accent transition-colors">
                                    <p className="font-medium">{item.name}</p>
                                    <p className="text-xs text-muted-foreground">{item.description}</p>
                                </button>
                            ))}
                        </div>
                    </div>
                    <div>
                        <h3 className="font-semibold mb-2">Step 2: Rank Your Selected Values</h3>
                        <p className="text-sm text-muted-foreground mb-4">
                            Drag and drop your chosen values to rank them from most important (top) to least important (bottom).
                        </p>
                        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                            <SortableContext items={selected.map(item => item.id)} strategy={verticalListSortingStrategy}>
                                <div className="space-y-2 p-1 rounded-md bg-muted/50 min-h-96">
                                    {selected.map((item, index) => (
                                        <SortableItem key={item.id} id={item.id} onDeselect={() => handleDeselect(item)}>
                                            <span className="font-bold mr-2">{index + 1}.</span> {item.name}
                                        </SortableItem>
                                    ))}
                                    {selected.length === 0 && <p className="text-center text-muted-foreground p-8">Your selected values will appear here.</p>}
                                </div>
                            </SortableContext>
                        </DndContext>
                        {selected.length === 10 && (
                             <Button onClick={handleFinish} className="mt-4 w-full">Finish & View My Values</Button>
                        )}
                    </div>
                </CardContent>
            </Card>
        </PageLayout>
    );
}
