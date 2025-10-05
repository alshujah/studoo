
'use client';

import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Button } from '@/components/ui/button';
import { Grip, X } from 'lucide-react';

export function SortableItem(props: { id: string; children: React.ReactNode; onDeselect: () => void; }) {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: props.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    return (
        <div ref={setNodeRef} style={style} className="flex items-center gap-2 p-2 bg-background border rounded-md shadow-sm">
             <Button variant="ghost" size="icon" {...attributes} {...listeners} className="cursor-grab">
                <Grip className="h-5 w-5 text-muted-foreground" />
             </Button>
            <div className="flex-grow">
                {props.children}
            </div>
             <Button variant="ghost" size="icon" onClick={props.onDeselect}>
                <X className="h-4 w-4 text-muted-foreground" />
             </Button>
        </div>
    );
}
