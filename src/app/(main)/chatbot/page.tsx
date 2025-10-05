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

export default function ChatbotPage() {
    const auth = useAuth();
    const [user] = useAuthState(auth);
    const firestore = useFirestore();
    const { toast } = useToast();
    const [activeChatId, setActiveChatId] = useState<string | null>(null);

    const chatsQuery = useMemoFirebase(() => {
        if (!user) return null;
        return query(
            collection(firestore, 'users', user.uid, 'chats'),
            orderBy('updatedAt', 'desc')
        );
    }, [user, firestore]);

    const [chatsSnapshot, loadingChats] = useCollection(chatsQuery);

    const chatHistory = useMemo(() => {
        return chatsSnapshot?.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        })) || [];
    }, [chatsSnapshot]);

    useEffect(() => {
      // Set the first chat as active by default if none is selected
      if(!activeChatId && chatHistory.length > 0) {
        setActiveChatId(chatHistory[0].id);
      }
    }, [chatHistory, activeChatId]);


    const handleNewChat = async () => {
        if (!user) {
            toast({
                variant: 'destructive',
                title: 'Not signed in',
                description: 'You must be signed in to start a new chat.',
            });
            return;
        }

        const initialMessages = [{ role: 'assistant', content: "Hello! I'm your AI Coach. I can now access your recent journal and mood logs to provide more personalized support. How can I help you today?" }];
        try {
            const newChatRef = await addDoc(collection(firestore, 'users', user.uid, 'chats'), {
                messages: initialMessages,
                createdAt: serverTimestamp(),
                updatedAt: serverTimestamp(),
                userId: user.uid,
            });
            setActiveChatId(newChatRef.id);
        } catch (error) {
            console.error("Error creating new chat:", error);
            toast({
                variant: 'destructive',
                title: 'Error',
                description: 'Could not create a new chat session.',
            });
        }
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
                                onClick={() => setActiveChatId(chat.id)}
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
                <div className="sticky top-0 z-10 hidden h-14 items-center border-b bg-background px-6 md:flex">
                    <h1 className="font-headline text-xl font-semibold">AI Coach</h1>
                </div>
                <ChatInterface chatId={activeChatId} />
            </div>
        </main>
    );
}
