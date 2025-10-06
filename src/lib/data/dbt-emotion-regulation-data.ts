import { Check, ShieldQuestion, Lightbulb, type LucideIcon } from 'lucide-react';

export type EmotionRegulationSkill = {
    title: string;
    description: string;
    icon: LucideIcon;
    pretext?: string;
    steps: {
        name: string;
        detail: string;
    }[];
};

export const emotionRegulationSkills: EmotionRegulationSkill[] = [
    {
        title: 'Check the Facts',
        description: 'Check if your emotional reaction fits the facts of the situation.',
        icon: Check,
        pretext: 'Ask yourself the following questions to determine if your emotional response is justified by the situation.',
        steps: [
            { name: 'What is the emotion I want to change?', detail: 'Identify the specific emotion (e.g., sadness, anger, fear).' },
            { name: 'What is the event prompting my emotion?', detail: 'Describe the facts of what happened, without interpretations or judgments.' },
            { name: 'What are my interpretations, thoughts, and assumptions about the event?', detail: 'Write down your beliefs and thoughts about the situation.' },
            { name: 'Am I assuming a threat?', detail: 'If so, what is the threat? Label the threat.' },
            { name: 'What’s the catastrophe?', detail: 'Imagine the worst possible outcome. What is it?' },
            { name: 'Does my emotion and its intensity fit the actual facts?', detail: 'Check if your emotional intensity is appropriate for the factual situation. If it is, this emotion is justified. If not, it is not.' }
        ]
    },
    {
        title: 'Opposite Action',
        description: 'Act opposite to the action urge of your emotion when the emotion is unjustified or ineffective.',
        icon: ShieldQuestion,
        pretext: 'When your emotion does not fit the facts, or when acting on it would be ineffective, use Opposite Action. Identify the emotion\'s urge and do the opposite.',
        steps: [
            { name: 'For Fear', detail: 'The urge is to avoid. Do what you are afraid of, over and over. Approach events, places, tasks, and people you are afraid of.' },
            { name: 'For Anger', detail: 'The urge is to attack. Gently avoid the person you are angry with. Do something kind for them. Imagine understanding and empathy for them.' },
            { name: 'For Sadness/Depression', detail: 'The urge is to withdraw and isolate. Get active. Do things that give you a sense of mastery or pleasure, even if you don’t feel like it.' },
            { name: 'For Shame', detail: 'The urge is to hide. Share your experience with someone you trust. Apologize for your actions if needed, and then let it go.' }
        ]
    },
    {
        title: 'Problem Solving',
        description: 'When the facts justify your emotion, but the intensity is causing distress, solve the problem.',
        icon: Lightbulb,
        pretext: 'If your emotion is justified by the facts of the situation, but the situation is the problem, use these steps to figure out what to do.',
        steps: [
            { name: 'Figure out and describe the problem situation.', detail: 'Be specific and factual about what the problem is.' },
            { name: 'Check the facts.', detail: 'Ensure that your understanding of the problem aligns with reality.' },
            { name: 'Identify your goal in solving the problem.', detail: 'What do you want to achieve? What would be a better outcome?' },
            { name: 'Brainstorm lots of solutions.', detail: 'List all possible solutions that come to mind, without judgment.' },
            { name: 'Choose a solution that fits the goal and is likely to work.', detail: 'Evaluate the pros and cons of your top solutions and pick one.' },
            { name: 'Put the solution into action.', detail: 'Take the first step to implement your chosen solution.' },
            { name: 'Evaluate the outcome.', detail: 'Did it work? If not, try another solution from your list or start the process over.' },
        ]
    },
];
