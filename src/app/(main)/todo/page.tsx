
'use client';

import React, { useState, useMemo } from 'react';
import { useAuth, useFirestore, useMemoFirebase } from '@/lib/firebase';
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
  type Timestamp,
} from 'firebase/firestore';
import { PageLayout } from '@/components/layout/page-layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { PlusIcon, Trash2, Loader, Check } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import type { Todo } from '@/lib/types';
import { cn } from '@/lib/utils';
import { errorEmitter } from '@/lib/firebase/error-emitter';
import { FirestorePermissionError, type SecurityRuleContext } from '@/lib/firebase/errors';

export default function TodoPage() {
  const auth = useAuth();
  const firestore = useFirestore();
  const [user, userLoading] = useAuthState(auth);
  const [taskText, setTaskText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const tasksQuery = useMemoFirebase(() => {
    if (!user) return null;
    return query(
      collection(firestore, 'users', user.uid, 'todos'),
      orderBy('createdAt', 'desc')
    );
  }, [user, firestore]);

  const [tasksSnapshot, tasksLoading, error] = useCollection(tasksQuery);

  const tasks = useMemo(
    () =>
      tasksSnapshot?.docs.map(
        (doc) => ({ id: doc.id, ...doc.data() } as Todo)
      ) || [],
    [tasksSnapshot]
  );
  
  const handleAddTask = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !taskText.trim()) {
      return;
    }
    setIsSubmitting(true);
    
    const taskData = {
        text: taskText,
        completed: false,
        createdAt: serverTimestamp(),
        userId: user.uid,
    };

    const tasksCollection = collection(firestore, 'users', user.uid, 'todos');
    addDoc(tasksCollection, taskData)
      .then(() => {
        setTaskText('');
        toast({ title: 'Task added!' });
      })
      .catch(async (serverError) => {
        const permissionError = new FirestorePermissionError({
          path: tasksCollection.path,
          operation: 'create',
          requestResourceData: taskData,
        });
        errorEmitter.emit('permission-error', permissionError);
      })
      .finally(() => {
          setIsSubmitting(false);
      });
  };

  const handleToggleTask = async (id: string, completed: boolean) => {
    if (!user) return;
    const docRef = doc(firestore, 'users', user.uid, 'todos', id);
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

  const handleDeleteTask = async (id: string) => {
    if (!user) return;
    const docRef = doc(firestore, 'users', user.uid, 'todos', id);

    deleteDoc(docRef)
        .then(() => {
            toast({ title: 'Task deleted.' });
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
    <PageLayout title="Todo List">
        <Card>
            <CardHeader>
                <CardTitle>My Tasks</CardTitle>
                <CardDescription>A simple and effective task manager to keep you organized.</CardDescription>
            </CardHeader>
            <CardContent>
                 <form onSubmit={handleAddTask} className="flex gap-2 mb-8">
                    <Input
                        type="text"
                        value={taskText}
                        onChange={(e) => setTaskText(e.target.value)}
                        placeholder="Add a new task..."
                        disabled={isSubmitting}
                    />
                    <Button
                        type="submit"
                        disabled={isSubmitting || !taskText.trim()}
                        aria-label="Add Task"
                    >
                        {isSubmitting ? (
                            <Loader className="animate-spin" />
                        ) : (
                            <PlusIcon />
                        )}
                    </Button>
                </form>

                {tasksLoading ? (
                    <div className="flex justify-center p-8">
                        <Loader className="animate-spin" />
                    </div>
                ) : tasks.length === 0 ? (
                    <div className="text-center py-10 px-4 bg-muted/50 rounded-lg">
                        <Check className="mx-auto h-12 w-12 text-muted-foreground" />
                        <h3 className="mt-4 text-lg font-medium text-foreground">All done!</h3>
                        <p className="mt-1 text-muted-foreground">You have no pending tasks. Add one above to get started.</p>
                    </div>
                ) : (
                    <ul className="space-y-3">
                       {tasks.map((task) => (
                           <li key={task.id} className={cn("flex items-center gap-4 p-3 rounded-lg shadow-sm transition-all border", task.completed ? "bg-muted/50" : "bg-card")}>
                                <Checkbox
                                    id={`task-${task.id}`}
                                    checked={task.completed}
                                    onCheckedChange={() => handleToggleTask(task.id, task.completed)}
                                />
                                <label htmlFor={`task-${task.id}`} className={cn("flex-1 text-sm cursor-pointer", task.completed ? 'line-through text-muted-foreground' : 'text-card-foreground')}>
                                    {task.text}
                                </label>
                                <Button
                                    onClick={() => handleDeleteTask(task.id)}
                                    variant="ghost"
                                    size="icon"
                                    aria-label="Delete task"
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

    