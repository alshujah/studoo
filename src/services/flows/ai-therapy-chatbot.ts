
'use server';

/**
 * @fileOverview Implements an AI therapy chatbot that uses evidence-based techniques and
 * develops a "Theory of Mind" about the user based on their data by using tools.
 *
 * - aiTherapyChatbot - A function that handles the chatbot interaction.
 * - AiTherapyChatbotInput - The input type for the aiTherapyChatbot function.
 */

import { ai } from '@/services/genkit';
import { z } from 'genkit';
import { runInUserContext, getCurrentUserId } from '@/services/user-context';
import { getApps, initializeApp } from 'firebase-admin/app';
import { getFirestore, Timestamp } from 'firebase-admin/firestore';
import { subDays } from 'date-fns';

// Initialize Firebase Admin SDK if not already initialized
if (!getApps().length) {
  initializeApp();
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
        const logsQuery = db.collection(`users/${userId}/moodLogs`)
            .where('timestamp', '>=', sevenDaysAgo)
            .orderBy('timestamp', 'desc');

        const snapshot = await logsQuery.get();
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
        const entriesQuery = db.collection(`users/${userId}/journalEntries`)
            .where('timestamp', '>=', sevenDaysAgo)
            .orderBy('timestamp', 'desc')
            .limit(5);

        const snapshot = await entriesQuery.get();
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


const getRecentAnxietyScores = ai.defineTool(
    {
        name: 'getRecentAnxietyScores',
        description: "Retrieves the user's GAD-7 anxiety assessment scores from the last 30 days. Use this to understand trends in their anxiety levels.",
        inputSchema: z.object({}),
        outputSchema: z.string().describe('A JSON string of recent GAD-7 scores. Returns an empty array if none are found.'),
    },
    async () => {
        const userId = getCurrentUserId();
        if (!userId) {
            return JSON.stringify({ error: "User not authenticated." });
        }
        
        const thirtyDaysAgo = subDays(new Date(), 30);
        const scoresQuery = db.collection(`users/${userId}/gad7Scores`)
            .where('timestamp', '>=', thirtyDaysAgo)
            .orderBy('timestamp', 'desc');

        const snapshot = await scoresQuery.get();
        if (snapshot.empty) return JSON.stringify([]);

        const scores = snapshot.docs.map(doc => {
            const data = doc.data();
            return {
                score: data.score,
                timestamp: (data.timestamp as Timestamp).toDate().toISOString(),
            };
        });

        return JSON.stringify(scores);
    }
);

const getRecentDepressionScores = ai.defineTool(
    {
        name: 'getRecentDepressionScores',
        description: "Retrieves the user's PHQ-9 depression assessment scores from the last 30 days. Use this to understand trends in their depressive symptoms.",
        inputSchema: z.object({}),
        outputSchema: z.string().describe('A JSON string of recent PHQ-9 scores. Returns an empty array if none are found.'),
    },
    async () => {
        const userId = getCurrentUserId();
        if (!userId) {
            return JSON.stringify({ error: "User not authenticated." });
        }
        
        const thirtyDaysAgo = subDays(new Date(), 30);
        const scoresQuery = db.collection(`users/${userId}/phq9Scores`)
            .where('timestamp', '>=', thirtyDaysAgo)
            .orderBy('timestamp', 'desc');
            
        const snapshot = await scoresQuery.get();
        if (snapshot.empty) return JSON.stringify([]);

        const scores = snapshot.docs.map(doc => {
            const data = doc.data();
            return {
                score: data.score,
                timestamp: (data.timestamp as Timestamp).toDate().toISOString(),
            };
        });
        
        return JSON.stringify(scores);
    }
);


// ----------------- Flow Definition -----------------

const AiTherapyChatbotInputSchema = z.object({
  messages: z.array(z.object({
    role: z.enum(['user', 'assistant', 'tool']).describe('The role of the message sender.'),
    content: z.string().describe('The content of the message.'),
  })).describe('The chat history, with the most recent user message last.'),
  userId: z.string().describe('The user ID.'),
});
export type AiTherapyChatbotInput = z.infer<typeof AiTherapyChatbotInputSchema>;


export async function aiTherapyChatbot(input: AiTherapyChatbotInput): Promise<ReadableStream<string>> {
  // Use runInUserContext to make the userId available to the tools
  return runInUserContext(input.userId, async () => {
    
    const hours = new Date().getHours();
    let greeting = "Hello";
    if (hours < 12) {
      greeting = "Good morning";
    } else if (hours < 18) {
      greeting = "Good afternoon";
    } else {
      greeting = "Good evening";
    }
    
    const systemPrompt = `You are AuraCoach, a compassionate, adaptive, and emotionally intelligent AI mentor. Your purpose is to help the user improve their mental clarity, motivation, and self-understanding in real time. You are not a replacement for a human therapist. Your opening greeting should be appropriate for the time of day, which is currently: ${greeting}.

    Your primary goal is to develop a "Theory of Mind" about the user by synthesizing information from the current conversation, your chat history, and by using the tools available to you to access the user's personal data (mood logs, journal entries, and assessment scores).
    
    **Core Instructions & Persona:**
    
    1.  **Persona & Tone:** Your tone is motivational and human-like. Adapt your tone dynamically. If the user is calm and positive, focus on motivation, planning, and a growth mindset. If the user expresses distress, shift to a more gentle, therapeutic, and validating tone.
    
    2.  **Empathize & Clarify First:** ALWAYS start with a warm, empathetic, and validating tone. If a user's message is vague (e.g., "I feel awful"), your first step is to ask a gentle, clarifying question to understand more before providing advice (e.g., "I'm sorry to hear that. Could you tell me a little more about what 'awful' feels like right now?").
    
    3.  **Use Tools for Deep Context:** Once you have a clearer understanding of the immediate issue, use your tools (\`getRecentMoodLogs\`, \`getRecentJournalEntries\`, \`getRecentAnxietyScores\`, \`getRecentDepressionScores\`) to gather context. Look for patterns. Is this a recurring feeling? Does it connect to a recent journal entry or a spike in their assessment scores?
    
    4.  **Synthesize and Reflect:** Connect the past to the present in your response. This shows the user you are listening and understanding them on a deeper level. For example: "That makes sense you're feeling overwhelmed. Looking back, I can see your anxiety scores have been a bit higher this week, and you wrote about a stressful project at work. I'm wondering if this might all be connected?"
    
    5.  **Guide, Don't Prescribe (Therapy Integration):** After understanding and connecting, gently guide the user toward ONE relevant, structured exercise from the app if they express negative thinking. Automatically apply CBT/DBT/ACT principles in your suggestions. Frame it as a collaborative suggestion. For example: "It sounds like there are a lot of stressful thoughts swirling around. Sometimes, getting them down on paper can help. Would you be open to trying a 'Thought Record' to examine some of these thoughts more closely?"
    
    6.  **Mindful Grounding:** If your tools or the conversation suggest high stress or anxiety (e.g., words like 'panic', 'overwhelmed', 'can't breathe'), dynamically activate a grounding exercise. For example: "It sounds incredibly stressful right now. Before we go any further, would you be open to trying a quick 1-minute breathing exercise with me to help calm your body?"
    
    7.  **Be Concise:** Keep your responses brief and focused (2-4 sentences is ideal). Use questions to encourage user reflection and guide the conversation. Avoid long, multi-paragraph lectures. Use markdown for lists where appropriate.
    
    8.  **Safety First (CRITICAL & NON-NEGOTIABLE):** If a user expresses any thoughts of self-harm, suicide, or being in a crisis, you MUST IMMEDIATELY and ONLY respond with the following text. Do not add any other words.
        "It sounds like you are going through a lot right now, and I'm concerned for your safety. If you are in crisis or need immediate support, please reach out to the 988 Suicide & Crisis Lifeline by calling or texting 988 in the US and Canada, or calling 111 in the UK. You are not alone, and help is available."`;

    const { stream } = await ai.generate({
        model: 'googleai/gemini-2.5-pro',
        history: [
            { role: 'system', content: systemPrompt },
            ...input.messages
        ],
        tools: [getRecentMoodLogs, getRecentJournalEntries, getRecentAnxietyScores, getRecentDepressionScores],
        stream: true,
        config: {
            temperature: 0.7,
        },
    });

    const outputStream = new ReadableStream({
      async start(controller) {
        for await (const chunk of stream) {
            if (chunk.text) {
                controller.enqueue(chunk.text);
            }
        }
        controller.close();
      }
    });

    return outputStream;
  });
}
