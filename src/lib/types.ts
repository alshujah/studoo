
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

    