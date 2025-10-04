import { config } from 'dotenv';
config();

import '@/ai/flows/recommend-personalized-interventions.ts';
import '@/ai/flows/suggest-personalized-activities.ts';
import '@/ai/flows/summarize-insights-from-activity-log.ts';
import '@/ai/flows/ai-therapy-chatbot.ts';
import '@/ai/flows/identify-mood-triggers.ts';
