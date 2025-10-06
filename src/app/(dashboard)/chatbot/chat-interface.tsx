
'use client';

import React, { useState, useRef, useEffect, useTransition, useMemo } from 'react';
import { Bot, Send, User, Loader, MessageSquare } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { ChatMessage } from '@/types';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { useAuth, useFirestore } from '@/lib/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { doc, setDoc, serverTimestamp, onSnapshot } from 'firebase/firestore';
import { errorEmitter } from '@/lib/firebase/error-emitter';
import { FirestorePermissionError } from '@/lib/firebase/errors';


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


  const chatDocRef = useMemo(() => {
    if (!user || !firestore || !chatId) return null;
    return doc(firestore, 'users', user.uid, 'chats', chatId);
  }, [user, firestore, chatId]);

  useEffect(() => {
    if (chatDocRef) {
        const unsubscribe = onSnapshot(chatDocRef, (doc) => {
            if (doc.exists()) {
                const data = doc.data();
                 if (data.messages && data.messages.length > 0) {
                    // Don't update if a stream is in progress
                    if (!isPending) {
                       setMessages(data.messages);
                    }
                } else {
                    setMessages(initialMessages);
                }
            } else {
                setMessages(initialMessages);
            }
        }, async (error) => {
            console.error("Error listening to chat document:", error);
            const permissionError = new FirestorePermissionError({
                path: chatDocRef.path,
                operation: 'get',
            });
            errorEmitter.emit('permission-error', permissionError);
        });
        return () => unsubscribe();
    } else {
        setMessages(initialMessages);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chatDocRef, isPending]);


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
    const optimisticInput = input;
    
    // Optimistically update the UI with the user's message
    setMessages(newMessages);
    setInput('');
    
    startTransition(async () => {
        // Add a placeholder for the streaming response
        setMessages(prev => [...prev, { role: 'assistant', content: '' }]);

        try {
            const response = await fetch('/api/chat', {
                method: 'POST',
                body: JSON.stringify({
                    messages: newMessages,
                    userId: user.uid,
                }),
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || "API request failed");
            }
            
            if (!response.body) {
                throw new Error("No response body");
            }

            const reader = response.body.getReader();
            const decoder = new TextDecoder();
            let streamedResponse = '';

            while (true) {
                const { done, value } = await reader.read();
                if (done) break;

                const chunk = decoder.decode(value, { stream: true });
                streamedResponse += chunk;

                setMessages(prev => {
                    const updatedMessages = [...prev];
                    updatedMessages[updatedMessages.length - 1] = { role: 'assistant', content: streamedResponse };
                    return updatedMessages;
                });
            }

            const finalMessages = [...newMessages, { role: 'assistant', content: streamedResponse }];
            const finalUpdate = {
                messages: finalMessages,
                updatedAt: serverTimestamp(),
            };
            
            // Final update to Firestore, no need to await this for UI purposes
            setDoc(chatDocRef, finalUpdate, { merge: true }).catch(err => {
                 const permissionError = new FirestorePermissionError({
                    path: chatDocRef.path,
                    operation: 'update',
                    requestResourceData: finalUpdate,
                });
                errorEmitter.emit('permission-error', permissionError);
            });

        } catch (error: any) {
            console.error('Error with streaming response:', error);
            toast({
              variant: "destructive",
              title: "Error",
              description: error.message || "An unknown error occurred.",
            });
            // Restore previous messages on error
            setMessages(messages);
            setInput(optimisticInput); // Restore user input
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
                    : 'bg-muted',
                  isPending && index === messages.length - 1 && 'flex items-center' // Add loader style for the last message during pending
                )}
              >
               {isPending && index === messages.length - 1 && !message.content ? (
                  <Loader className="animate-spin size-4" />
               ) : (
                  <p className="whitespace-pre-wrap">{message.content}</p>
               )}
              </div>
               {message.role === 'user' && (
                <Avatar className="h-8 w-8 border">
                  <AvatarFallback><User size={16}/></AvatarFallback>
                </Avatar>
              )}
            </div>
          ))}
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
