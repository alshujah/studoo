
'use server';

/**
 * @fileOverview Implements an AI therapy chatbot that uses evidence-based techniques and
 * develops a "Theory of Mind" about the user based on their data by using tools.
 *
 * - aiTherapyChatbot - A function that handles the chatbot interaction.
 * - AiTherapyChatbotInput - The input type for the aiTherapyChatbot function.
 * - AiTherapyChatbotOutput - The return type for the aiTherapyChatbot function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import { runInUserContext, getCurrentUserId } from '@/services/user-context';
import { AIMessage, HumanMessage, SystemMessage, ToolMessage, Message } from 'genkit';
import { firebaseConfig } from '@/firebase/config';
import { initializeApp, getApps } from 'firebase/app';
import { getFirestore, collection, query, where, orderBy, limit, getDocs, Timestamp } from 'firebase/firestore';
import { subDays } from 'date-fns';

if (!getApps().length) {
    initializeApp(firebaseConfig);
}
const db = getFirestore();


// ----------------- Tool Definitions -----------------

const getRecentMoodLogs = ai.defineTool(
    {
        name: 'getRecentMoodLogs',
        description: "Retrieves the user's mood logs from the last 7 days to understand their recent emotional state. Call this if the user mentions feeling a certain way (e.g., 'sad', 'anxious', 'stressed') to get context.",
        inputSchema: z.object({}),
        outputSchema: z.string().describe('A JSON string of recent mood logs. Returns an empty array if none are found.'),
    },
    async () => {
        const userId = getCurrentUserId();
        if (!userId) {
            return JSON.stringify({ error: "User not authenticated. Cannot fetch mood logs." });
        }
        
        const sevenDaysAgo = subDays(new Date(), 7);
        const logsQuery = query(
            collection(db, 'users', userId, 'moodLogs'),
            where('timestamp', '>=', sevenDaysAgo),
            orderBy('timestamp', 'desc')
        );

        const snapshot = await getDocs(logsQuery);
        if (snapshot.empty) {
            return JSON.stringify([]);
        }

        const logs = snapshot.docs.map(doc => {
            const data = doc.data();
            return {
                ...data,
                timestamp: (data.timestamp as Timestamp).toDate().toISOString(),
            };
        });

        return JSON.stringify(logs);
    }
);

const getRecentJournalEntries = ai.defineTool(
    {
        name: 'getRecentJournalEntries',
        description: "Retrieves the user's journal entries from the last 7 days. Call this to get context on the user's recent thoughts, reflections, and experiences, especially if they mention a specific event or topic.",
        inputSchema: z.object({}),
        outputSchema: z.string().describe('A JSON string of recent journal entries. Returns an empty array if none are found.'),
    },
    async () => {
        const userId = getCurrentUserId();
        if (!userId) {
            return JSON.stringify({ error: "User not authenticated. Cannot fetch journal entries." });
        }

        const sevenDaysAgo = subDays(new Date(), 7);
        const entriesQuery = query(
            collection(db, 'users', userId, 'journalEntries'),
            where('timestamp', '>=', sevenDaysAgo),
            orderBy('timestamp', 'desc'),
            limit(5)
        );

        const snapshot = await getDocs(entriesQuery);
        if (snapshot.empty) {
            return JSON.stringify([]);
        }
        
        const entries = snapshot.docs.map(doc => {
            const data = doc.data();
            return {
                content: data.content,
                timestamp: (data.timestamp as Timestamp).toDate().toISOString(),
                analysis: data.analysis,
                keyThemes: data.keyThemes,
            };
        });
        
        return JSON.stringify(entries);
    }
);


// ----------------- Flow Definition -----------------

const AiTherapyChatbotInputSchema = z.object({
  message: z.string().describe('The user message to the chatbot.'),
  chatHistory: z.array(z.object({
    role: z.enum(['user', 'assistant', 'tool']).describe('The role of the message sender.'),
    content: z.string().describe('The content of the message.'),
  })).optional().describe('The chat history between the user and the chatbot.'),
  userId: z.string().describe('The user ID.'),
});
export type AiTherapyChatbotInput = z.infer<typeof AiTherapyChatbotInputSchema>;

const AiTherapyChatbotOutputSchema = z.object({
  response: z.string().describe('The chatbot response to the user message.'),
});
export type AiTherapyChatbotOutput = z.infer<typeof AiTherapyChatbotOutputSchema>;


export async function aiTherapyChatbot(input: AiTherapyChatbotInput): Promise<AiTherapyChatbotOutput> {
  return runInUserContext(input.userId, () => aiTherapyChatbotFlow(input));
}

const systemPrompt = `You are Zenith, a compassionate and supportive AI mental health companion. Your role is to act as a coach, guiding users through evidence-based therapeutic techniques. You are not a replacement for a human therapist.

Your primary goal is to understand the user's current state by synthesizing information from the current conversation, your chat history, and by using the tools available to you to access the user's personal data (mood logs and journal entries).

**Core Instructions:**

1.  **Listen & Clarify:** If a user's message is vague (e.g., "I feel awful"), your first step is ALWAYS to ask a gentle, clarifying question to understand more before providing advice (e.g., "I'm sorry to hear that. Could you tell me a little more about what 'awful' feels like for you?").

2.  **Use Tools for Context:** Once you have a clearer understanding, use the \`getRecentMoodLogs\` or \`getRecentJournalEntries\` tools to see if their past data relates to their current feeling. Connect the past to the present in your response (e.g., "That makes sense. I see you've been feeling anxious a few times this week. I'm wondering if this is related?").

3.  **Be Empathetic & Concise:** Always start with a warm, validating tone. Keep your responses brief (2-4 sentences) and use questions to guide the user.

4.  **Guide, Don't Prescribe:** After understanding and connecting, gently guide the user toward a structured exercise if appropriate (e.g., suggesting a breathing exercise for anxiety or a thought record for negative thoughts).

5.  **Safety First (CRITICAL):** If a user expresses thoughts of self-harm, suicide, or crisis, you MUST immediately stop and respond with ONLY the following: "It sounds like you are going through a lot right now. If you are in crisis or need immediate support, please reach out to the 988 Suicide & Crisis Lifeline by calling or texting 988 in the US and Canada, or calling 111 in the UK. You are not alone, and help is available."`;


const aiTherapyChatbotFlow = ai.defineFlow(
  {
    name: 'aiTherapyChatbotFlow',
    inputSchema: AiTherapyChatbotInputSchema,
    outputSchema: AiTherapyChatbotOutputSchema,
    // Register the tools directly with the flow
    tools: [getRecentMoodLogs, getRecentJournalEntries],
  },
  async (input) => {

    const history: Message[] = [new SystemMessage(systemPrompt)];
    if (input.chatHistory) {
      for (const msg of input.chatHistory) {
        if (msg.role === 'user') {
          history.push(new HumanMessage(msg.content));
        } else if (msg.role === 'assistant') {
          history.push(new AIMessage(msg.content));
        }
      }
    }

    const llmResponse = await ai.generate({
      history,
      prompt: input.message,
    });
    
    return {
      response: llmResponse.text,
    };
  }
);
