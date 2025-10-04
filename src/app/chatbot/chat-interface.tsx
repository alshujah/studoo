'use client';

import React, { useState, useRef, useEffect, useTransition } from 'react';
import { Bot, Send, User, Loader, MessageSquare } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { ChatMessage } from '@/lib/types';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { getAiResponse } from './actions';
import { useToast } from '@/hooks/use-toast';
import { useAuth, useFirestore, useMemoFirebase } from '@/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { doc, setDoc, serverTimestamp, onSnapshot } from 'firebase/firestore';


const initialMessages: ChatMessage[] = [
    { role: 'assistant', content: "Hello! I'm your AI Coach. I can now access your recent journal and mood logs to provide more personalized support. How can I help you today?" },
];

interface ChatInterfaceProps {
    className?: string;
    chatId: string | null;
}

export function ChatInterface({ className, chatId }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [input, setInput] = useState('');
  const [isPending, startTransition] = useTransition();
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  const auth = useAuth();
  const [user] = useAuthState(auth);
  const firestore = useFirestore();


  const chatDocRef = useMemoFirebase(() => {
    if (!user || !firestore || !chatId) return null;
    return doc(firestore, 'users', user.uid, 'chats', chatId);
  }, [user, firestore, chatId]);

  useEffect(() => {
    if (chatDocRef) {
        const unsubscribe = onSnapshot(chatDocRef, (doc) => {
            if (doc.exists()) {
                const data = doc.data();
                 if (data.messages && data.messages.length > 0) {
                    setMessages(data.messages);
                } else {
                    setMessages(initialMessages);
                }
            }
        }, (error) => {
            console.error("Error listening to chat document:", error);
            toast({
                variant: "destructive",
                title: "Error",
                description: "Could not load chat.",
            });
        });
        return () => unsubscribe();
    } else {
        setMessages(initialMessages);
    }
  }, [chatDocRef, toast]);


  const scrollToBottom = () => {
    if (scrollAreaRef.current) {
        const viewport = scrollAreaRef.current.querySelector('div[data-radix-scroll-area-viewport]');
        if (viewport) {
            viewport.scrollTop = viewport.scrollHeight;
        }
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isPending || !user || !chatDocRef) return;

    const userMessage: ChatMessage = { role: 'user', content: input };
    const newMessages: ChatMessage[] = [...messages, userMessage];
    setMessages(newMessages);
    setInput('');

    startTransition(async () => {
      // Optimistically update Firestore with the user's message
      await setDoc(chatDocRef, {
        messages: newMessages,
        updatedAt: serverTimestamp(),
      }, { merge: true });
      
      const idToken = await user.getIdToken();
      
      const result = await fetch('/api/chat', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${idToken}`
          },
          body: JSON.stringify({ messages: newMessages })
      }).then(res => res.json());

      if (result.success && result.data) {
        const finalMessages = [...newMessages, result.data];
        setMessages(finalMessages);
        await setDoc(chatDocRef, {
            messages: finalMessages,
            updatedAt: serverTimestamp(),
        }, { merge: true });

      } else {
        toast({
          variant: "destructive",
          title: "Error",
          description: result.error || "An unknown error occurred.",
        });
        // Restore previous messages on error
        setMessages(messages);
      }
    });
  };
  
  if (!chatId) {
      return (
          <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
              <MessageSquare size={48} />
              <p className="mt-4 text-lg">Select a conversation or start a new one.</p>
          </div>
      )
  }

  return (
    <div className={cn("flex h-[calc(100vh-3.5rem)] flex-col md:h-full", className)}>
      <ScrollArea className="flex-1" ref={scrollAreaRef}>
        <div className="p-4 md:p-6">
          {messages.map((message, index) => (
            <div
              key={index}
              className={cn(
                'flex items-start gap-4 mb-6',
                message.role === 'user' ? 'justify-end' : 'justify-start'
              )}
            >
              {message.role === 'assistant' && (
                <Avatar className="h-8 w-8 border">
                  <AvatarFallback><Bot size={16}/></AvatarFallback>
                </Avatar>
              )}
              <div
                className={cn(
                  'max-w-md rounded-lg p-3 text-sm',
                  message.role === 'user'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted'
                )}
              >
                <p>{message.content}</p>
              </div>
               {message.role === 'user' && (
                <Avatar className="h-8 w-8 border">
                  <AvatarFallback><User size={16}/></AvatarFallback>
                </Avatar>
              )}
            </div>
          ))}
           {isPending && (
            <div className="flex items-start gap-4 mb-6 justify-start">
              <Avatar className="h-8 w-8 border">
                <AvatarFallback><Bot size={16}/></AvatarFallback>
              </Avatar>
              <div className="max-w-md rounded-lg p-3 bg-muted flex items-center">
                <Loader className="animate-spin size-4" />
              </div>
            </div>
          )}
        </div>
      </ScrollArea>
      <div className="border-t p-4 md:px-6 md:py-4">
        <form onSubmit={handleSubmit} className="flex items-center gap-4">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            autoComplete="off"
            disabled={isPending || !user}
            className="flex-1"
          />
          <Button type="submit" size="icon" disabled={isPending || !input.trim() || !user}>
            <Send className="h-4 w-4" />
            <span className="sr-only">Send</span>
          </Button>
        </form>
      </div>
    </div>
  );
}
