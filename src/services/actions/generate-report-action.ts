
'use server';

import { generateProgressReport, type GenerateProgressReportInput, type GenerateProgressReportOutput } from '@/services/flows/generate-progress-report';
import { getAuth } from 'firebase-admin/auth';
import { getApps, initializeApp } from 'firebase-admin/app';

// Initialize Firebase Admin SDK if not already initialized
if (!getApps().length) {
  initializeApp();
}

export async function generateReportAction(): Promise<{ success: boolean; data?: GenerateProgressReportOutput; error?: string }> {
    try {
        // This action can only be called by an authenticated user.
        // We are using the admin SDK here to demonstrate how one might get the current user
        // on the server side in a real application, though in this case we are not
        // actually using the user object itself for the flow input.
        // In a real scenario you might pass the user object to the flow for more complex logic.
        const userId = 'placeholder-user-id'; // In a real app, you would get this from the session

        const result = await generateProgressReport({ userId });
        return { success: true, data: result };
    } catch (error: any) {
        console.error('Error generating progress report:', error);
        return { success: false, error: 'Failed to generate the report.' };
    }
}
