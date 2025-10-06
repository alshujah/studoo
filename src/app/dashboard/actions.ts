
'use server';

import { triageUserIssue as triageUserIssueFlow, type TriageUserIssueInput, type TriageUserIssueOutput } from '@/services/flows/triage-user-issue';


export async function triageIssue(
  input: TriageUserIssueInput
): Promise<{ success: boolean; data?: TriageUserIssueOutput; error?: string }> {
  try {
    if (!input.issue.trim()) {
      return { success: false, error: 'Issue description cannot be empty.' };
    }
    const result = await triageUserIssueFlow(input);
    return { success: true, data: result };
  } catch (error) {
    console.error('Error getting triage recommendation:', error);
    return { success: false, error: 'Failed to get a recommendation.' };
  }
}
