
'use server';

import { aiTherapyChatbot } from '@/modules/aiCoach/services/ai-therapy-chatbot';
import type { ChatMessage } from '@/lib/types';


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
