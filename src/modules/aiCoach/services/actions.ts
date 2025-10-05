
'use server';

import { aiTherapyChatbot } from '@/modules/aiCoach/services/ai-therapy-chatbot';
import type { ChatMessage } from '@/lib/types';


export async function getAiResponse(
  messages: ChatMessage[],
  userId: string
): Promise<ReadableStream<string>> {
  try {
    const userMessage = messages[messages.length - 1];
    if (userMessage.role !== 'user') {
      throw new Error('Invalid message sequence.');
    }
    
    const chatHistory = messages.slice(0, -1).map(msg => ({
        role: msg.role as 'user' | 'assistant' | 'tool',
        content: msg.content
    }));

    const stream = await aiTherapyChatbot({
      message: userMessage.content,
      chatHistory: chatHistory,
      userId: userId
    });
    
    return stream;

  } catch (error) {
    console.error('Error getting AI response:', error);
    const errorStream = new ReadableStream({
      start(controller) {
        controller.enqueue(JSON.stringify({ error: 'Failed to get a response from the AI coach.' }));
        controller.close();
      }
    });
    return errorStream;
  }
}

    