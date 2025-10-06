
'use client';

import { useState, useMemo, useEffect } from 'react';
import { useAuth, useFirestore, useMemoFirebase } from '@/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollection } from 'react-firebase-hooks/firestore';
import { collection, query, orderBy, addDoc, serverTimestamp, type Timestamp } from 'firebase/firestore';
import { format } from 'date-fns';
import { ChatInterface } from './chat-interface';
import { Button } from '@/components/ui/button';
import { Loader, MessageSquare, Plus } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useToast } from '@/hooks/use-toast';
import { FirestorePermissionError } from '@/firebase/errors';
import { errorEmitter } from '@/firebase/error-emitter';
import { useSearchParams, useRouter } from 'next/navigation';

export default function ChatbotPage() {
    const auth = useAuth();
    const [user] = useAuthState(auth);
    const firestore = useFirestore();
    const { toast } = useToast();
    const searchParams = useSearchParams();
    const router = useRouter();

    const activeChatId = searchParams.get('id');

    const chatsQuery = useMemoFirebase(() => {
        if (!user || !firestore) return null;
        return query(
            collection(firestore, 'users', user.uid, 'chats'),
            orderBy('updatedAt', 'desc')
        );
    }, [user, firestore]);

    const [chatsSnapshot, loadingChats, error] = useCollection(chatsQuery);
     
    useEffect(() => {
        if (error) {
            const permissionError = new FirestorePermissionError({
                path: `users/${user?.uid}/chats`,
                operation: 'list',
            });
            errorEmitter.emit('permission-error', permissionError);
        }
    }, [error, user]);


    const chatHistory = useMemo(() => {
        return chatsSnapshot?.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        })) || [];
    }, [chatsSnapshot]);

    useEffect(() => {
      // If no active chat is in the URL, and history exists, redirect to the most recent one.
      if (!activeChatId && chatHistory.length > 0) {
        router.replace(`/chatbot?id=${chatHistory[0].id}`);
      }
    }, [chatHistory, activeChatId, router]);


    const handleNewChat = async () => {
        if (!user || !firestore) {
            toast({
                variant: 'destructive',
                title: 'Not signed in',
                description: 'You must be signed in to start a new chat.',
            });
            return;
        }

        const initialMessages = [{ role: 'assistant', content: "Hello! I'm your AI Coach. I can now access your recent journal and mood logs to provide more personalized support. How can I help you today?" }];
        const newChatData = {
            messages: initialMessages,
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp(),
            userId: user.uid,
        };

        const chatsCollection = collection(firestore, 'users', user.uid, 'chats');

        addDoc(chatsCollection, newChatData)
            .then(newChatRef => {
                 router.push(`/chatbot?id=${newChatRef.id}`);
            })
            .catch(err => {
                const permissionError = new FirestorePermissionError({
                    path: `users/${user.uid}/chats`,
                    operation: 'create',
                    requestResourceData: newChatData,
                });
                errorEmitter.emit('permission-error', permissionError);
            });
    };
    
    const getChatTitle = (messages: any[]) => {
        if (!messages || messages.length <= 1) return "New Conversation";
        const firstUserMessage = messages.find(m => m.role === 'user');
        return firstUserMessage?.content.substring(0, 30) + '...' || "Conversation";
    }

    return (
        <main className="flex flex-1">
            <div className="hidden md:flex flex-col w-64 lg:w-72 border-r bg-muted/20">
                 <div className="flex items-center justify-between p-4 border-b">
                    <h2 className="font-headline text-lg">Chat History</h2>
                    <Button variant="ghost" size="icon" onClick={handleNewChat}>
                        <Plus className="size-4"/>
                        <span className="sr-only">New Chat</span>
                    </Button>
                </div>
                <ScrollArea className="flex-1">
                    {loadingChats && <div className="p-4"><Loader className="animate-spin" /></div>}
                    <nav className="grid gap-1 p-2">
                        {chatHistory.map(chat => (
                            <button
                                key={chat.id}
                                onClick={() => router.push(`/chatbot?id=${chat.id}`)}
                                className={cn(
                                    "flex flex-col items-start gap-2 rounded-lg border p-3 text-left text-sm transition-all hover:bg-accent",
                                    activeChatId === chat.id && "bg-accent"
                                )}
                            >
                                <div className="flex w-full flex-col gap-1">
                                    <div className="font-semibold truncate">
                                        {getChatTitle(chat.messages)}
                                    </div>
                                    <div className="text-xs text-muted-foreground">
                                        {chat.updatedAt ? format((chat.updatedAt as Timestamp).toDate(), 'MMM d, yyyy') : '...'}
                                    </div>
                                </div>
                            </button>
                        ))}
                    </nav>
                </ScrollArea>
            </div>
            <div className="flex-1">
                <ChatInterface chatId={activeChatId} />
            </div>
        </main>
    );
}
