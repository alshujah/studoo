
'use server';

import { identifyMoodTriggers, type IdentifyMoodTriggersOutput, type IdentifyMoodTriggersInput } from "@/services/flows/identify-mood-triggers";
import { triageUserIssue as triageUserIssueFlow, type TriageUserIssueInput, type TriageUserIssueOutput } from '@/services/flows/triage-user-issue';


export async function getMoodTriggers(
    input: IdentifyMoodTriggersInput
): Promise<{ success: boolean; data?: IdentifyMoodTriggersOutput; error?: string }> {
    try {
        const result = await identifyMoodTriggers(input);
        return { success: true, data: result };
    } catch (error: any) {
        console.error('Error getting mood triggers:', error);
        return { success: false, error: 'Failed to get insights from the AI coach.' };
    }
}


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
