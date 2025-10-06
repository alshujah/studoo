
'use client';

import React, { useState, useMemo } from 'react';
import { useAuth, useFirestore, useMemoFirebase } from '@/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollection } from 'react-firebase-hooks/firestore';
import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  serverTimestamp,
  query,
  orderBy,
  updateDoc,
  Timestamp,
} from 'firebase/firestore';
import { PageLayout } from '@/components/layout/page-layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { PlusIcon, Trash2, Loader, CalendarIcon, PartyPopper } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import type { BehavioralActivationActivity } from '@/lib/types';
import { cn } from '@/lib/utils';
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError } from '@/firebase/errors';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';

export default function BehavioralActivationPage() {
  const auth = useAuth();
  const firestore = useFirestore();
  const [user, userLoading] = useAuthState(auth);
  const [activityText, setActivityText] = useState('');
  const [scheduledDate, setScheduledDate] = useState<Date | undefined>(new Date());
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const activitiesQuery = useMemoFirebase(() => {
    if (!user) return null;
    return query(
      collection(firestore, 'users', user.uid, 'behavioralActivation'),
      orderBy('createdAt', 'desc')
    );
  }, [user, firestore]);

  const [activitiesSnapshot, activitiesLoading] = useCollection(activitiesQuery);

  const activities = useMemo(
    () =>
      activitiesSnapshot?.docs.map(
        (doc) => ({ id: doc.id, ...doc.data() } as BehavioralActivationActivity)
      ) || [],
    [activitiesSnapshot]
  );
  
  const handleAddActivity = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !activityText.trim() || !scheduledDate) {
      toast({ variant: 'destructive', title: 'Missing information', description: 'Please provide an activity title and a date.'});
      return;
    }
    setIsSubmitting(true);
    
    const activityData = {
        title: activityText,
        completed: false,
        scheduledDate: Timestamp.fromDate(scheduledDate),
        createdAt: serverTimestamp(),
        userId: user.uid,
    };

    const activitiesCollection = collection(firestore, 'users', user.uid, 'behavioralActivation');
    addDoc(activitiesCollection, activityData)
      .then(() => {
        setActivityText('');
        toast({ title: 'Activity scheduled!' });
      })
      .catch(async (serverError) => {
        const permissionError = new FirestorePermissionError({
          path: activitiesCollection.path,
          operation: 'create',
          requestResourceData: activityData,
        });
        errorEmitter.emit('permission-error', permissionError);
      })
      .finally(() => {
          setIsSubmitting(false);
      });
  };

  const handleToggleActivity = async (id: string, completed: boolean) => {
    if (!user) return;
    const docRef = doc(firestore, 'users', user.uid, 'behavioralActivation', id);
    const updatedData = { completed: !completed };
    
    updateDoc(docRef, updatedData)
        .catch(async (serverError) => {
            const permissionError = new FirestorePermissionError({
                path: docRef.path,
                operation: 'update',
                requestResourceData: updatedData,
            });
            errorEmitter.emit('permission-error', permissionError);
        });
  };

  const handleDeleteActivity = async (id: string) => {
    if (!user) return;
    const docRef = doc(firestore, 'users', user.uid, 'behavioralActivation', id);

    deleteDoc(docRef)
        .then(() => {
            toast({ title: 'Activity deleted.' });
        })
        .catch(async (serverError) => {
            const permissionError = new FirestorePermissionError({
                path: docRef.path,
                operation: 'delete',
            });
            errorEmitter.emit('permission-error', permissionError);
        });
  };

  if (userLoading) {
    return (
      <div className="flex h-screen w-full flex-col items-center justify-center gap-4">
        <Loader className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <PageLayout title="Behavioral Activation">
        <Card>
            <CardHeader>
                <CardTitle>Schedule Meaningful Activities</CardTitle>
                <CardDescription>Combat depression and low motivation by scheduling activities that bring you a sense of pleasure or mastery. Start small!</CardDescription>
            </CardHeader>
            <CardContent>
                 <form onSubmit={handleAddActivity} className="flex flex-wrap items-end gap-2 mb-8">
                    <div className="grid gap-2 flex-1 min-w-48">
                        <label className="text-sm font-medium">Activity</label>
                        <Input
                            type="text"
                            value={activityText}
                            onChange={(e) => setActivityText(e.target.value)}
                            placeholder="e.g., Go for a 10-minute walk"
                            disabled={isSubmitting}
                        />
                    </div>
                     <div className="grid gap-2">
                        <label className="text-sm font-medium">Date</label>
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button
                                  variant={"outline"}
                                  className={cn(
                                    "w-[240px] justify-start text-left font-normal",
                                    !scheduledDate && "text-muted-foreground"
                                  )}
                                >
                                  <CalendarIcon className="mr-2 h-4 w-4" />
                                  {scheduledDate ? format(scheduledDate, "PPP") : <span>Pick a date</span>}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0">
                                <Calendar
                                    mode="single"
                                    selected={scheduledDate}
                                    onSelect={setScheduledDate}
                                    initialFocus
                                />
                            </PopoverContent>
                        </Popover>
                    </div>
                    <Button
                        type="submit"
                        disabled={isSubmitting || !activityText.trim()}
                        aria-label="Add Activity"
                    >
                        {isSubmitting ? (
                            <Loader className="animate-spin" />
                        ) : (
                            <PlusIcon />
                        )}
                        <span className="sr-only sm:not-sr-only sm:ml-2">Schedule</span>
                    </Button>
                </form>

                {activitiesLoading ? (
                    <div className="flex justify-center p-8">
                        <Loader className="animate-spin" />
                    </div>
                ) : activities.length === 0 ? (
                    <div className="text-center py-10 px-4 bg-muted/50 rounded-lg">
                        <PartyPopper className="mx-auto h-12 w-12 text-muted-foreground" />
                        <h3 className="mt-4 text-lg font-medium text-foreground">No activities scheduled.</h3>
                        <p className="mt-1 text-muted-foreground">Add one above to get started.</p>
                    </div>
                ) : (
                    <ul className="space-y-3">
                       {activities.map((activity) => (
                           <li key={activity.id} className={cn("flex items-center gap-4 p-3 rounded-lg shadow-sm transition-all border", activity.completed ? "bg-muted/50" : "bg-card")}>
                                <Checkbox
                                    id={`activity-${activity.id}`}
                                    checked={activity.completed}
                                    onCheckedChange={() => handleToggleActivity(activity.id, activity.completed)}
                                />
                                <div className="flex-1">
                                    <label htmlFor={`activity-${activity.id}`} className={cn("text-sm cursor-pointer", activity.completed ? 'line-through text-muted-foreground' : 'text-card-foreground')}>
                                        {activity.title}
                                    </label>
                                     <p className="text-xs text-muted-foreground">{format(activity.scheduledDate.toDate(), 'EEE, MMM d')}</p>
                                </div>
                                <Button
                                    onClick={() => handleDeleteActivity(activity.id)}
                                    variant="ghost"
                                    size="icon"
                                    aria-label="Delete activity"
                                >
                                    <Trash2 className="text-muted-foreground transition-colors hover:text-destructive h-4 w-4"/>
                                </Button>
                            </li>
                       ))}
                    </ul>
                )}
            </CardContent>
        </Card>
    </PageLayout>
  );
}
