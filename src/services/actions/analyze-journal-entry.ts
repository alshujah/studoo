
'use server';

import { analyzeJournalEntry, type AnalyzeJournalEntryInput, type AnalyzeJournalEntryOutput } from '@/app/api/ai/flows/analyze-journal-entry';

export async function getJournalAnalysis(
  input: AnalyzeJournalEntryInput
): Promise<{ success: boolean; data?: AnalyzeJournalEntryOutput; error?: string }> {
  try {
    if (!input.journalEntry.trim()) {
      return { success: false, error: 'Journal entry cannot be empty.' };
    }
    const result = await analyzeJournalEntry(input);
    return { success: true, data: result };
  } catch (error)
 {
    console.error('Error getting journal analysis:', error);
    return { success: false, error: 'Failed to get analysis from the AI coach.' };
  }
}
