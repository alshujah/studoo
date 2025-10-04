'use server';
/**
 * @fileoverview Genkit tools for securely accessing user data from Firestore.
 */

import { ai } from '@/ai/genkit';
import { getCurrentUserId } from '@/ai/user-context';
import { firebaseConfig } from '@/firebase/config';
import { initializeApp, getApps } from 'firebase/app';
import { getFirestore, collection, query, where, orderBy, limit, getDocs, Timestamp } from 'firebase/firestore';
import { z } from 'genkit';
import { subDays } from 'date-fns';

if (!getApps().length) {
    initializeApp(firebaseConfig);
}
const db = getFirestore();

export const getRecentMoodLogs = ai.defineTool(
    {
        name: 'getRecentMoodLogs',
        description: "Retrieves the user's mood logs from the last 7 days to understand their recent emotional state.",
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

export const getRecentJournalEntries = ai.defineTool(
    {
        name: 'getRecentJournalEntries',
        description: "Retrieves the user's journal entries from the last 7 days to understand their recent thoughts and reflections.",
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
            limit(5) // Limit to the 5 most recent entries in that period
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
