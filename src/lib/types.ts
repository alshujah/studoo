import type { Timestamp } from 'firebase/firestore';

export type ChatMessage = {
  role: 'user' | 'assistant';
  content: string;
};

export interface JournalEntry {
  id: string;
  userId: string;
  content: string;
  timestamp: Timestamp;
  analysis?: string;
  keyThemes?: string[];
  suggestedToolName?: string;
  suggestedToolHref?: string;
}

export interface MoodLog {
    id: string;
    userId: string;
    situation: string;
    coreEmotion: string;
    intensity: number;
    thoughts: string;
    physicalSensations: string;
    timestamp: Timestamp | string; // Allow string for serialization
}
