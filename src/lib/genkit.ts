
'use server';

import {genkit, configureGenkit} from 'genkit';
import {googleAI} from '@genkit-ai/google-genai';

// Note: The API key is loaded from the `GEMINI_API_KEY` environment variable.
// If the key is not set, the Google AI plugin will not be initialized.
// This prevents the application from crashing on the server if the key is missing.
const plugins = [];
if (process.env.GEMINI_API_KEY) {
    plugins.push(googleAI());
} else {
    console.warn(`
[WARNING] GEMINI_API_KEY is not set. 
The AI features of this application will be disabled. 
To enable them, please add your Google AI API key to the .env file.
You can get a key from https://aistudio.google.com/app/apikey.
`);
}

configureGenkit({
  plugins,
  logLevel: 'debug',
  enableTracingAndMetrics: true,
});

export const ai = genkit;
