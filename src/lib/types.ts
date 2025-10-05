

import type { Timestamp } from 'firebase/firestore';

export type ChatMessage = {
  role: 'user' | 'assistant' | 'tool';
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

export interface ThoughtRecord {
    id: string;
    userId: string;
    situation: string;
    automaticThought: string;
    cognitiveDistortions: string[];
    alternativeThought: string;
    analysis: string;
    timestamp: Timestamp;
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

export interface WorryLog {
    id: string;
    userId: string;
    worry: string;
    scheduledTime: Timestamp;
    outcome?: string;
    didComeTrue?: boolean;
    createdAt: Timestamp;
}

export interface PanicLog {
  id: string;
  userId: string;
  timestamp: Timestamp;
  symptoms: string[];
  peakIntensity: number;
  durationInMinutes: number;
  trigger?: string;
  notes?: string;
}

export interface SleepLog {
  id: string;
  userId: string;
  date: string; // Should be a string in 'YYYY-MM-DD' format
  timeSlept: number; // in hours
  quality: 'Poor' | 'Fair' | 'Good' | 'Excellent';
  awakenings: number;
  notes?: string;
  createdAt: Timestamp;
}

export interface ActivityLog {
  id: string;
  userId: string;
  timestamp: Timestamp;
  activity?: string;
  durationInMinutes?: number;
  moodBefore?: string;
  moodAfter?: string;
  energyLevel?: number;
  physicalSymptoms?: string;
  screenTimeHours?: number;
  eatingHabits?: string;
  notes?: string;
}

export interface MedicationLog {
  id: string;
  userId: string;
  timestamp: Timestamp;
  medication: string;
  dosage: string;
  taken: boolean;
  sideEffects?: string;
}

export interface SubstanceUseLog {
    id: string;
    userId: string;
    timestamp: Timestamp;
    substance: string;
    amount: string;
    urgeIntensity: number;
    notes?: string;
}

export interface SocialSkillAssessment {
    id: string;
    userId: string;
    timestamp: Timestamp;
    scores: {
        'Listening': number;
        'Small Talk': number;
        'Empathy': number;
        'Nonverbal': number;
        'Assertiveness': number;
    };
    answers: Record<string, string>;
}

export interface Todo {
  id: string;
  text: string;
  completed: boolean;
  createdAt: Timestamp;
  userId: string;
}

export interface WemwbsScore {
    id: string;
    userId: string;
    score: number;
    answers: Record<string, string>;
    timestamp: Timestamp;
}

export interface LifeBalanceScore {
    id: string;
    userId: string;
    timestamp: Timestamp;
    domains: { name: string; satisfaction: number }[];
}

export interface BehavioralActivationActivity {
    id: string;
    userId: string;
    title: string;
    scheduledDate: Timestamp;
    completed: boolean;
    createdAt: Timestamp;
}
    