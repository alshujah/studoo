import { ToyBrick, Clapperboard, Heart, Brain, Vacation, HelpingHand, Droplets, Snowflake, Zap, Lung, Stretch, Puzzle, Flame, Camera, Sun, Leaf } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export type DistressToleranceSkill = {
    acronym: string;
    title: string;
    description: string;
    icon: LucideIcon;
    steps: {
        name: string;
        detail: string;
    }[];
};

export const distressToleranceSkills: DistressToleranceSkill[] = [
    {
        acronym: 'ACCEPTS',
        title: 'Activities, Contributing, Comparisons, Emotions, Pushing Away, Thoughts, Sensations',
        description: 'Skills to distract yourself from overwhelming emotions.',
        icon: Puzzle,
        steps: [
            { name: 'Activities', detail: 'Engage in a hobby, watch a movie, play a game, or do something that requires your attention.' },
            { name: 'Contributing', detail: 'Help someone else. Volunteer, make a gift, or do a favor for a friend or family member.' },
            { name: 'Comparisons', detail: 'Compare yourself to people who are coping the same or less well than you, or to a time when you were doing worse.' },
            { name: 'Emotions', detail: 'Create a different emotion. Watch a funny movie, listen to uplifting music, or read an exciting book.' },
            { name: 'Pushing Away', detail: 'Temporarily put the situation on a shelf. Imagine building a wall between yourself and the problem for a short time.' },
            { name: 'Thoughts', detail: 'Distract your mind. Count to 100, do a puzzle, or try to remember lyrics to a song.' },
            { name: 'Sensations', detail: 'Intensify other senses. Hold ice in your hand, take a hot shower, or listen to loud music.' }
        ]
    },
    {
        acronym: 'Self-Soothe',
        title: 'Self-Soothe with the Five Senses',
        description: 'Soothe yourself in a gentle, comforting way.',
        icon: Flame,
        steps: [
            { name: 'Vision', detail: 'Look at something beautiful. Go to a museum, look at flowers, or watch a visually pleasing movie.' },
            { name: 'Hearing', detail: 'Listen to calming or beautiful music. Pay attention to the sounds of nature, or play a soothing playlist.' },
            { name: 'Smell', detail: 'Use your sense of smell. Light a scented candle, bake cookies, or smell fresh flowers.' },
            { name: 'Taste', detail: 'Savor a favorite food or a warm, comforting drink. Eat mindfully, paying attention to each bite.' },
            { name: 'Touch', detail: 'Engage your sense of touch. Take a bubble bath, cuddle with a pet, or wrap yourself in a soft blanket.' }
        ]
    },
    {
        acronym: 'IMPROVE',
        title: 'IMPROVE the Moment',
        description: 'Make the current moment better, even if just a little.',
        icon: Camera,
        steps: [
            { name: 'Imagery', detail: 'Imagine a relaxing scene, like a peaceful beach or forest. Imagine everything is going well.' },
            { name: "Meaning", detail: 'Find purpose or meaning in what you are feeling. If you are in pain, you can find a reason to bear it.' },
            { name: 'Prayer', detail: 'Open your heart to a supreme being, a higher power, or your own wise mind. Ask for strength to bear the pain.' },
            { name: 'Relaxation', detail: 'Try progressive muscle relaxation, take a few deep breaths, or get a massage.' },
            { name: 'One thing in the moment', detail: 'Focus your entire attention on just one thing in the present moment. Notice everything about it.' },
            { name: 'Vacation', detail: 'Take a brief break. Sit on a park bench for 20 minutes, or take a one-hour break from your responsibilities.' },
            { name: 'Encouragement', detail: 'Be your own cheerleader. Say things like "I can handle this," or "This too shall pass."' }
        ]
    },
];
