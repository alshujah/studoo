
'use server';
import { config } from 'dotenv';
config();

import '@/app/api/ai/flows/ai-therapy-chatbot';
import '@/app/api/ai/flows/analyze-journal-entry';
import '@/app/api/ai/flows/analyze-thought-record';
import '@/app/api/ai/flows/identify-mood-triggers';
import '@/app/api/ai/flows/generate-meditation-flow';
import '@/app/api/ai/flows/triage-user-issue';
import '@/app/api/ai/flows/miracle-question-flow';
import '@/app/api/ai/flows/score-gad7-flow';
import '@/app/api/ai/flows/score-phq-9-flow';
import '@/app/api/ai/flows/generate-progress-report';
import '@/app/api/ai/flows/recommend-personalized-interventions';
import '@/app/api/ai/flows/suggest-personalized-activities';
import '@/app/api/ai/flows/summarize-insights-from-activity-log';
