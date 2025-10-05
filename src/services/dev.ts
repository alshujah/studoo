
'use server';
import { config } from 'dotenv';
config();

import './flows/ai-therapy-chatbot.ts';
import './flows/analyze-journal-entry.ts';
import './tools/user-data';
import './flows/analyze-thought-record.ts';
import './flows/identify-mood-triggers.ts';
import './flows/generate-meditation-flow.ts';
import './flows/triage-user-issue.ts';
