
'use server';

import { aiTherapyChatbot } from '@/ai/flows/ai-therapy-chatbot';
import { analyzeJournalEntry, type AnalyzeJournalEntryOutput } from '@/ai/flows/analyze-journal-entry';
import type { ChatMessage } from '@/lib/types';
import { auth } from 'firebase-admin';
import { getApps, initializeApp, type App } from 'firebase-admin/app';
import { headers } from 'next/headers';

// Initialize Firebase Admin SDK
if (!getApps().length) {
  initializeApp();
}

export async function getAiResponse(
  messages: ChatMessage[],
  userId: string
): Promise<{ success: boolean; data?: ChatMessage; error?: string }> {
  try {
    const userMessage = messages[messages.length - 1];
    if (userMessage.role !== 'user') {
      return { success: false, error: 'Invalid message sequence.' };
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
