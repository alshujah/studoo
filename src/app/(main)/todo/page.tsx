
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
  type Timestamp,
} from 'firebase/firestore';
import { PageLayout } from '@/components/layout/page-layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { PlusIcon, Trash2, Loader, Check } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';

interface Todo {
  id: string;
  text: string;
  completed: boolean;
  createdAt: Timestamp;
}

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

  const [tasksSnapshot, tasksLoading] = useCollection(tasksQuery);

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
    try {
      await addDoc(collection(firestore, 'users', user.uid, 'todos'), {
        text: taskText,
        completed: false,
        createdAt: serverTimestamp(),
      });
      setTaskText('');
      toast({ title: 'Task added!' });
    } catch (error) {
      console.error('Error adding task: ', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to add task.',
      });
    } finally {
        setIsSubmitting(false);
    }
  };

  const handleToggleTask = async (id: string, completed: boolean) => {
    if (!user) return;
    try {
        await updateDoc(doc(firestore, 'users', user.uid, 'todos', id), {
            completed: !completed,
        });
    } catch (error) {
        console.error('Error toggling task: ', error);
        toast({
            variant: 'destructive',
            title: 'Error',
            description: 'Failed to update task.',
        });
    }
  };

  const handleDeleteTask = async (id: string) => {
    if (!user) return;
    try {
      await deleteDoc(doc(firestore, 'users', user.uid, 'todos', id));
      toast({ title: 'Task deleted.' });
    } catch (error) {
      console.error('Error deleting task: ', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to delete task.',
      });
    }
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
                <CardDescription>A modern and professional task manager.</CardDescription>
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
                    >
                        {isSubmitting ? (
                            <Loader className="animate-spin" />
                        ) : (
                            <PlusIcon />
                        )}
                        <span className="sr-only">Add Task</span>
                    </Button>
                </form>

                {tasksLoading ? (
                    <div className="flex justify-center p-8">
                        <Loader className="animate-spin" />
                    </div>
                ) : tasks.length === 0 ? (
                    <div className="text-center py-10 px-4 bg-muted/50 rounded-lg">
                        <h3 className="text-lg font-medium text-foreground">You have no tasks yet.</h3>
                        <p className="text-muted-foreground">Add one to get started!</p>
                    </div>
                ) : (
                    <ul className="space-y-3">
                       {tasks.map((task) => (
                           <li key={task.id} className="flex items-center gap-4 p-3 bg-card rounded-lg shadow-sm transition hover:shadow-md border">
                                <Checkbox
                                    id={`task-${task.id}`}
                                    checked={task.completed}
                                    onCheckedChange={() => handleToggleTask(task.id, task.completed)}
                                />
                                <label htmlFor={`task-${task.id}`} className={`flex-1 text-sm ${task.completed ? 'line-through text-muted-foreground' : 'text-card-foreground'}`}>
                                    {task.text}
                                </label>
                                <Button
                                    onClick={() => handleDeleteTask(task.id)}
                                    variant="ghost"
                                    size="icon"
                                >
                                    <Trash2 className="text-muted-foreground hover:text-destructive"/>
                                    <span className="sr-only">Delete task</span>
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
