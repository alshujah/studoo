
'use server';

/**
 * @fileOverview An AI agent that generates a comprehensive progress report for a user.
 *
 * - generateProgressReport - A function that generates the report.
 * - GenerateProgressReportInput - The input type for the generateProgressReport function.
 * - GenerateProgressReportOutput - The return type for the generateProgressReport function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import { runInUserContext, getCurrentUserId } from '@/services/user-context';
import { db } from '@/lib/firebase/admin';
import type { Timestamp } from 'firebase-admin/firestore';
import { subDays } from 'date-fns';

// --- Tool Definitions ---

const getUserData = ai.defineTool(
    {
        name: 'getUserData',
        description: "Retrieves a user's mood logs, journal entries, GAD-7, and PHQ-9 scores from the last 30 days.",
        inputSchema: z.object({}),
        outputSchema: z.string().describe('A JSON string of all the user data.'),
    },
    async () => {
        const userId = getCurrentUserId();
        if (!userId) {
            return JSON.stringify({ error: "User not authenticated." });
        }
        
        const thirtyDaysAgo = subDays(new Date(), 30);
        
        const fetchData = async (collectionName: string) => {
            const query = db.collection(`users/${userId}/${collectionName}`)
                .where('timestamp', '>=', thirtyDaysAgo)
                .orderBy('timestamp', 'desc');
            const snapshot = await query.get();
            if (snapshot.empty) return [];
            return snapshot.docs.map(doc => {
                const data = doc.data();
                return {
                    ...data,
                    timestamp: (data.timestamp as Timestamp).toDate().toISOString(),
                };
            });
        };

        const [moodLogs, journalEntries, gad7Scores, phq9Scores] = await Promise.all([
            fetchData('moodLogs'),
            fetchData('journalEntries'),
            fetchData('gad7Scores'),
            fetchData('phq9Scores'),
        ]);

        return JSON.stringify({ moodLogs, journalEntries, gad7Scores, phq9Scores });
    }
);


// --- Flow Definition ---

const GenerateProgressReportInputSchema = z.object({
  userId: z.string().describe('The user ID for whom to generate the report.'),
});
export type GenerateProgressReportInput = z.infer<typeof GenerateProgressReportInputSchema>;

const GenerateProgressReportOutputSchema = z.object({
  reportMarkdown: z.string().describe('The formatted progress report in Markdown.'),
});
export type GenerateProgressReportOutput = z.infer<typeof GenerateProgressReportOutputSchema>;

export async function generateProgressReport(
  input: GenerateProgressReportInput
): Promise<GenerateProgressReportOutput> {
  return runInUserContext(input.userId, generateProgressReportFlow);
}


const generateProgressReportFlow = ai.defineFlow(
  {
    name: 'generateProgressReportFlow',
    outputSchema: GenerateProgressReportOutputSchema,
  },
  async () => {
    const { output } = await ai.generate({
      prompt: `Generate a comprehensive 30-day progress report for a user based on their data. The report should be formatted in Markdown and suitable for sharing with a therapist.

      The report must include the following sections:
      1.  **Overview**: A brief, 1-2 paragraph summary of the user's overall journey in the last 30 days, highlighting key emotional trends and accomplishments.
      2.  **Key Themes from Journaling**: A bulleted list summarizing the 3-4 most prominent themes that appeared in the user's journal entries.
      3.  **Mood & Anxiety Trends**:
          - A brief analysis of the mood log data.
          - A summary of the GAD-7 (anxiety) and PHQ-9 (depression) score trends.
      4.  **Recommendations & Discussion Points**: A bulleted list of 3-4 potential topics for discussion with a therapist, based on the data.
      
      Begin by calling the 'getUserData' tool to fetch all necessary data. Then, synthesize this information into the report structure described above. Your tone should be objective, clinical, and supportive.`,
      tools: [getUserData],
    });
    
    return { reportMarkdown: output || 'No data available to generate a report.' };
  }
);
