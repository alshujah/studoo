
'use server';
import { config } from 'dotenv';
config();

import './flows/ai-therapy-chatbot';
import './flows/analyze-journal-entry';
import './flows/analyze-thought-record';
import './flows/identify-mood-triggers';
import './flows/generate-meditation-flow';
import './flows/triage-user-issue';
import './flows/miracle-question-flow';
import './flows/score-gad7-flow';
import './flows/score-phq-9-flow';
import './flows/generate-progress-report';
