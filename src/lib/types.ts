

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

export interface BehavioralActivationActivity {
    id: string;
    userId: string;
    title: string;
    scheduledDate: Timestamp;
    completed: boolean;
    createdAt: Timestamp;
}

export interface BehavioralExperiment {
    id: string;
    userId: string;
    belief: string;
    prediction: string;
    experiment: string;
    outcome: string;
    whatILearned: string;
    createdAt: Timestamp;
}

export interface ProblemSolvingSession {
    id: string;
    userId: string;
    problem: string;
    solutions: { solution: string; pros: string; cons: string }[];
    chosenSolution: string;
    actionPlan: string;
    outcome: string;
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

export interface ExposureHierarchy {
    id: string;
    userId: string;
    fear: string;
    createdAt: Timestamp;
    steps: {
        step: string;
        suds: number;
    }[];
}

export interface PanicLog {
  id: string;
  userId: string;
  timestamp: Timestamp;
  symptoms: string[];
  peakIntensity: number;
  durationInMinutes: number;
  trigger: string;
  notes: string;
}

export interface SleepLog {
  id: string;
  userId: string;
  date: Timestamp;
  timeSlept: number; // in hours
  quality: 'Poor' | 'Fair' | 'Good' | 'Excellent';
  awakenings: number;
  notes: string;
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
  sideEffects: string;
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

export interface SfbtMiracleQuestion {
    id: string;
    userId: string;
    answer: string;
    timestamp: Timestamp;
}

export interface MbsrProgress {
    id: string;
    userId: string;
    currentWeek: number;
    updatedAt: Timestamp;
}
