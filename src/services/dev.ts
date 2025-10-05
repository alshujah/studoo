
'use server';
import { config } from 'dotenv';
config();

import '@/modules/aiCoach/services/ai-therapy-chatbot';
import './flows/analyze-journal-entry.ts';
import './flows/analyze-thought-record.ts';
import './flows/identify-mood-triggers.ts';
import './flows/generate-meditation-flow.ts';
import './flows/triage-user-issue.ts';
