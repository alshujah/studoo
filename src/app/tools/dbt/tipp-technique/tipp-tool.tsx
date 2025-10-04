
'use client';

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Snowflake, Zap, Lung, Stretch } from 'lucide-react';

const tippSteps = [
    {
        id: 'temperature',
        title: 'Temperature',
        icon: Snowflake,
        description: 'Tip the temperature of your face with cold water to calm down fast.',
        instructions: [
            "Find a bowl or sink and fill it with cold water.",
            "Hold your breath and put your face in the water for about 30 seconds.",
            "Alternatively, hold a cold pack or ziplock bag of ice on your eyes and cheeks.",
            "This activates the 'dive response,' which quickly slows your heart rate.",
        ]
    },
    {
        id: 'exercise',
        title: 'Intense Exercise',
        icon: Zap,
        description: 'Get your heart rate up to match the intensity of your emotion.',
        instructions: [
            "Engage in a brief burst of intense aerobic exercise.",
            "Examples: Run in place, do jumping jacks, or climb stairs as fast as you can.",
            "Aim for just a short period, like one minute, to burn off the anxious energy.",
            "This helps your body and mind regulate back to a baseline level."
        ]
    },
    {
        id: 'breathing',
        title: 'Paced Breathing',
        icon: Lung,
        description: 'Slow your breathing way down to reverse the effects of adrenaline.',
        instructions: [
            "Breathe in slowly through your nose for a count of 4-5 seconds.",
            "Breathe out even more slowly through your mouth for a count of 6-8 seconds.",
            "Make your exhale longer than your inhale. This is key.",
            "Continue this for 1-2 minutes, focusing only on the count and your breath.",
        ]
    },
    {
        id: 'relaxation',
        title: 'Paired Muscle Relaxation',
        icon: Stretch,
        description: 'Tense and then relax your muscles to release physical tension.',
        instructions: [
            "As you breathe in, tense a muscle group (like your hands or shoulders), but not to the point of pain.",
            "Hold the tension for a few seconds.",
            "As you breathe out, say the word 'Relax' in your mind and completely let go of the tension.",
            "Notice the difference between the feeling of tension and relaxation. Work through different muscle groups in your body.",
        ]
    }
]

export function TippTool() {
  return (
    <Accordion type="single" collapsible className="w-full">
        {tippSteps.map((step) => (
             <AccordionItem value={step.id} key={step.id}>
                <AccordionTrigger>
                    <div className='flex items-center gap-4'>
                        <step.icon className="size-6 text-primary" />
                        <div className='text-left'>
                            <h3 className="font-semibold text-lg">{step.title}</h3>
                            <p className="text-sm text-muted-foreground">{step.description}</p>
                        </div>
                    </div>
                </AccordionTrigger>
                <AccordionContent>
                    <div className="prose prose-sm max-w-none text-foreground">
                        <ul>
                           {step.instructions.map((instruction, index) => (
                               <li key={index}>{instruction}</li>
                           ))}
                        </ul>
                    </div>
                </AccordionContent>
          </AccordionItem>
        ))}
    </Accordion>
  );
}
