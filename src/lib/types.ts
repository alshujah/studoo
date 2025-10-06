

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

export interface GratitudeEntry {
    id: string;
    userId: string;
    entries: string[];
    timestamp: Timestamp;
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
  activity: string;
  durationInMinutes: number;
  moodBefore?: string;
  moodAfter?: string;
  energyLevel?: number;
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
    scores: {
        'Listening': number;
        'Small Talk': number;
        'Empathy': number;
        'Nonverbal': number;
        'Assertiveness': number;
    };
    answers: Record<string, string>;
    timestamp: Timestamp;
}

export interface Todo {
  id: string;
  text: string;
  completed: boolean;
  createdAt: Timestamp;
  userId: string;
}

export interface Gad7Score {
    id: string;
    userId: string;
    score: number;
    answers: Record<string, string>;
    timestamp: Timestamp;
}

export interface Phq9Score {
    id: string;
    userId: string;
    score: number;
    answers: Record<string, string>;
    timestamp: Timestamp;
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

export interface BehavioralChainAnalysis {
  id: string;
  userId: string;
  problemBehavior: string;
  promptingEvent: string;
  vulnerabilityFactors: string;
  chainOfEvents: string;
  consequences: string;
  solutions: string;
  createdAt: Timestamp;
}

export interface BehavioralExperiment {
    id: string;
    userId: string;
    createdAt: Timestamp;
    beliefToTest: string;
    experiment: string;
    prediction: string;
    outcome: string;
    whatILearned: string;
}

export interface OppositeActionLog {
    id: string;
    userId: string;
    emotion: string;
    intensity: number;
    actionUrge: string;
    oppositeAction: string;
    outcome: string;
    createdAt: Timestamp;
}

export interface CheckTheFactsLog {
  id: string;
  userId: string;
  emotion: string;
  promptingEvent: string;
  interpretations: string;
  isJustified: boolean;
  justification: string;
  createdAt: Timestamp;
}

export interface DearManScript {
    id: string;
    userId: string;
    situation: string;
    describe: string;
    express: string;
    assert: string;
    reinforce: string;
    mindful: string;
    appearConfident: string;
    negotiate: string;
    createdAt: Timestamp;
}

export interface ProblemSolvingWorksheet {
    id: string;
    userId: string;
    problemDescription: string;
    goal: string;
    brainstormedSolutions: string;
    actionPlan: string;
    createdAt: Timestamp;
}
