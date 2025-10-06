import { Target, Heart, Scale, type LucideIcon } from 'lucide-react';

export type InterpersonalEffectivenessSkill = {
    acronym: string;
    title: string;
    description: string;
    icon: LucideIcon;
    steps: {
        name: string;
        detail: string;
    }[];
};

export const interpersonalEffectivenessSkills: InterpersonalEffectivenessSkill[] = [
    {
        acronym: 'DEAR MAN',
        title: 'Objective Effectiveness',
        description: 'How to get what you want from someone.',
        icon: Target,
        steps: [
            { name: 'Describe', detail: 'Describe the current situation factually. Stick to the facts, no judgments.' },
            { name: 'Express', detail: 'Express your feelings and opinions about the situation. Use "I" statements (e.g., "I feel...", "I think...").' },
            { name: 'Assert', detail: 'Assert yourself by asking for what you want or saying "no" clearly. Do not assume others will know what you need.' },
            { name: 'Reinforce', detail: 'Reinforce (reward) the person ahead of time by explaining the positive effects of getting what you want.' },
            { name: 'Mindful', detail: 'Stay mindful of your objective. Keep your focus on your goal and avoid getting sidetracked by distractions.' },
            { name: 'Appear Confident', detail: 'Appear confident and effective. Use a confident tone of voice and physical manner; make good eye contact.' },
            { name: 'Negotiate', detail: 'Be willing to negotiate. Offer and ask for other solutions to the problem. Reduce your request. Say no, but offer to do something else.' }
        ]
    },
    {
        acronym: 'GIVE',
        title: 'Relationship Effectiveness',
        description: 'How to keep and improve the relationship.',
        icon: Heart,
        steps: [
            { name: 'Gentle', detail: 'Be gentle in your approach. Use a soft tone of voice. No attacks, threats, or judging.' },
            { name: 'Interested', detail: 'Act interested in the other person. Listen to their point of view, be patient, and don\'t interrupt.' },
            { name: 'Validate', detail: 'Validate the other person\'s feelings, thoughts, and opinions, even if you don\'t agree with them. Show you understand.' },
            { name: 'Easy Manner', detail: 'Use an easy, relaxed manner. A little humor can help. Smile. Be light-hearted.' }
        ]
    },
    {
        acronym: 'FAST',
        title: 'Self-Respect Effectiveness',
        description: 'How to keep your respect for yourself.',
        icon: Scale,
        steps: [
            { name: 'Fair', detail: 'Be fair to yourself and to the other person. Don\'t be over-apologetic, but also don\'t be entitled.' },
            { name: 'Apologies', detail: 'Don\'t apologize for making a request, having an opinion, or disagreeing. No overly apologetic behavior.' },
            { name: 'Stick to Values', detail: 'Stick to your own values and beliefs. Don\'t sell out your values or integrity for reasons that aren\'t very important.' },
            { name: 'Truthful', detail: 'Be truthful. Don\'t lie, act helpless, or exaggerate. This includes not making up excuses.' }
        ]
    }
];
