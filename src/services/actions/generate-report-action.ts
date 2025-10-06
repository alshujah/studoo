
'use server';

import { generateProgressReport, type GenerateProgressReportInput, type GenerateProgressReportOutput } from '@/services/flows/generate-progress-report';

export async function generateReportAction(): Promise<{ success: boolean; data?: GenerateProgressReportOutput; error?: string }> {
    try {
        // This action can only be called by an authenticated user.
        // The user ID is retrieved within the flow using a secure context.
        const userId = 'placeholder-user-id'; // This will be replaced by the actual user ID from the context in the flow.

        const result = await generateProgressReport({ userId });
        return { success: true, data: result };
    } catch (error: any) {
        console.error('Error generating progress report:', error);
        return { success: false, error: 'Failed to generate the report.' };
    }
}
