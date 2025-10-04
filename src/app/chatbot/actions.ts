'use server';

import { aiTherapyChatbot } from '@/ai/flows/ai-therapy-chatbot';
import { analyzeJournalEntry, type AnalyzeJournalEntryOutput } from '@/ai/flows/analyze-journal-entry';
import type { ChatMessage } from '@/lib/types';
import { getAuth } from 'firebase/auth';
import { getApps, initializeApp } from 'firebase/app';
import { firebaseConfig } from '@/firebase/config';
import { headers, cookies } from 'next/headers';


// This is a workaround to get the user ID on the server.
// In a real app, you would have a more robust way to get the user.
// NOTE: This is not a secure way to get the user ID. It is for demonstration purposes only.
async function getUserId(): Promise<string | null> {
    
    // We need a temporary auth instance on the server to verify the token.
    // This should not be used for client-side authentication.
    const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig, "server-auth-check");
    const auth = getAuth(app);

    try {
        const session = await auth.verifySessionCookie(cookies().get('session')?.value || '', true);
        return session.uid;
    } catch (e) {
        console.error("Error verifying session cookie", e);
        
        // Fallback for when session cookie is not available (e.g. during dev)
        const headersList = headers();
        const authorization = headersList.get('Authorization');
        if (!authorization?.startsWith('Bearer ')) {
            return null;
        }
        const idToken = authorization.split('Bearer ')[1];

        if (!idToken) return null;
        
        try {
            const decodedToken = await auth.verifyIdToken(idToken);
            return decodedToken.uid;
        } catch (e) {
             console.error("Error verifying ID token", e);
             return null;
        }
    }
}


export async function getAiResponse(
  messages: ChatMessage[]
): Promise<{ success: boolean; data?: ChatMessage; error?: string }> {
  try {
    const userMessage = messages[messages.length - 1];
    if (userMessage.role !== 'user') {
      return { success: false, error: 'Invalid message sequence.' };
    }
    
    const userId = await getUserId();
    if (!userId) {
        return { success: false, error: 'User not authenticated.' };
    }
    
    const chatHistory = messages.slice(0, -1).map(msg => ({
        role: msg.role as 'user' | 'assistant' | 'tool',
        content: msg.content
    }));

    const result = await aiTherapyChatbot({
      message: userMessage.content,
      chatHistory: chatHistory,
      userId: userId
    });
    
    const assistantMessage: ChatMessage = { role: 'assistant' as const, content: result.response };

    return { success: true, data: assistantMessage };

  } catch (error) {
    console.error('Error getting AI response:', error);
    return { success: false, error: 'Failed to get a response from the AI coach.' };
  }
}


export async function getJournalAnalysis(
  journalEntry: string
): Promise<{ success: boolean; data?: AnalyzeJournalEntryOutput; error?: string }> {
  try {
    if (!journalEntry.trim()) {
      return { success: false, error: 'Journal entry cannot be empty.' };
    }
    const result = await analyzeJournalEntry({ journalEntry });
    return { success: true, data: result };
  } catch (error) {
    console.error('Error getting journal analysis:', error);
    return { success: false, error: 'Failed to get analysis from the AI coach.' };
  }
}
