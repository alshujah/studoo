'use client';

import React, { useState, useMemo } from 'react';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useAuth, useFirestore, useMemoFirebase } from '@/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useToast } from '@/hooks/use-toast';
import { addDoc, collection, query, where, orderBy, updateDoc, doc, serverTimestamp, Timestamp } from 'firebase/firestore';
import { useCollection } from 'react-firebase-hooks/firestore';
import { startOfDay, endOfDay, format } from 'date-fns';
import { Checkbox } from '@/components/ui/checkbox';
import { Loader } from 'lucide-react';
import type { BehavioralActivationActivity } from '@/lib/types';

export function ActivityScheduler() {
    const { toast } = useToast();
    const auth = useAuth();
    const [user] = useAuthState(auth);
    const firestore = useFirestore();
    
    const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
    const [newActivity, setNewActivity] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const activitiesQuery = useMemoFirebase(() => {
        if (!user || !selectedDate) return null;
        const start = startOfDay(selectedDate);
        const end = endOfDay(selectedDate);
        return query(
            collection(firestore, 'users', user.uid, 'behavioralActivation'),
            where('scheduledDate', '>=', start),
            where('scheduledDate', '<=', end),
            orderBy('scheduledDate', 'asc')
        );
    }, [user, firestore, selectedDate]);

    const [activitiesSnapshot, loadingActivities] = useCollection(activitiesQuery);

    const activities = useMemo(() => {
        return activitiesSnapshot?.docs.map(doc => ({ id: doc.id, ...doc.data() } as BehavioralActivationActivity)) || [];
    }, [activitiesSnapshot]);

    const handleAddActivity = async () => {
        if (!user || !selectedDate || !newActivity.trim()) return;

        setIsSubmitting(true);
        try {
            await addDoc(collection(firestore, 'users', user.uid, 'behavioralActivation'), {
                userId: user.uid,
                title: newActivity,
                scheduledDate: Timestamp.fromDate(selectedDate),
                completed: false,
                createdAt: serverTimestamp(),
            });
            setNewActivity('');
            toast({ title: 'Activity Added', description: 'Your activity has been scheduled.' });
        } catch (error) {
            console.error('Error adding activity:', error);
            toast({ variant: 'destructive', title: 'Error', description: 'Could not schedule your activity.' });
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleToggleComplete = async (activityId: string, completed: boolean) => {
        if (!user) return;
        try {
            await updateDoc(doc(firestore, 'users', user.uid, 'behavioralActivation', activityId), {
                completed: !completed
            });
        } catch (error) {
            console.error('Error updating activity:', error);
            toast({ variant: 'destructive', title: 'Error', description: 'Could not update your activity.' });
        }
    };
    
    const activityExamples = [
        "Go for a 10-minute walk",
        "Listen to one favorite song",
        "Tidy up one surface",
        "Stretch for 5 minutes",
        "Call a friend",
        "Read one chapter of a book"
    ];

    return (
        <div className="grid md:grid-cols-2 gap-8">
            <div className="flex flex-col gap-8">
                <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    className="rounded-md border self-center"
                />
                 <Card>
                    <CardHeader>
                        <CardTitle>Activity Ideas</CardTitle>
                        <CardDescription>Not sure where to start? Try one of these.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ul className="list-disc pl-5 text-sm space-y-2 text-muted-foreground">
                            {activityExamples.map(idea => (
                                <li key={idea}>{idea}</li>
                            ))}
                        </ul>
                    </CardContent>
                </Card>
            </div>
            <div>
                <Card>
                    <CardHeader>
                        <CardTitle>Activities for {selectedDate ? format(selectedDate, 'MMMM d, yyyy') : '...'}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex gap-2 mb-4">
                            <Input 
                                placeholder="e.g., Go for a walk"
                                value={newActivity}
                                onChange={(e) => setNewActivity(e.target.value)}
                                disabled={isSubmitting}
                            />
                            <Button onClick={handleAddActivity} disabled={isSubmitting || !newActivity.trim()}>
                                {isSubmitting ? <Loader className="animate-spin"/> : 'Add'}
                            </Button>
                        </div>
                        <div className="space-y-2 min-h-48">
                            {loadingActivities && <Loader className="mx-auto mt-4 animate-spin"/>}
                            {!loadingActivities && activities.length === 0 && (
                                <p className="text-sm text-muted-foreground pt-4 text-center">No activities scheduled for this day.</p>
                            )}
                            {activities.map(activity => (
                                <div key={activity.id} className="flex items-center gap-3 p-2 rounded-md border bg-background">
                                    <Checkbox 
                                        id={activity.id}
                                        checked={activity.completed}
                                        onCheckedChange={() => handleToggleComplete(activity.id, activity.completed)}
                                    />
                                    <label htmlFor={activity.id} className={`flex-1 text-sm ${activity.completed ? 'line-through text-muted-foreground' : ''}`}>
                                        {activity.title}
                                    </label>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
