
'use server';
/**
 * @fileOverview A Genkit flow to score the GAD-7 anxiety assessment.
 *
 * This flow calculates the total score, determines the severity level,
 * and provides a brief interpretation of the results.
 */

import { z } from 'genkit';

export const ScoreGad7InputSchema = z.object({
  answers: z.record(z.string()).describe("An object where keys are question indices ('q0', 'q1', ...) and values are the numerical score for that question ('0', '1', '2', '3')."),
});
export type ScoreGad7Input = z.infer<typeof ScoreGad7InputSchema>;

export const ScoreGad7OutputSchema = z.object({
  score: z.number().describe('The total calculated score for the GAD-7 assessment.'),
  severity: z.string().describe('The clinical severity level (e.g., "Minimal", "Mild", "Moderate", "Severe").'),
  interpretation: z.string().describe('A brief, non-diagnostic interpretation of the score.'),
});
export type ScoreGad7Output = z.infer<typeof ScoreGad7OutputSchema>;


export async function scoreGad7(input: ScoreGad7Input): Promise<ScoreGad7Output> {
  // The logic for GAD-7 scoring is straightforward and doesn't require an LLM.
  // We can calculate it directly for accuracy and efficiency.
  const score = Object.values(input.answers).reduce((sum, value) => sum + parseInt(value, 10), 0);

  let severity = '';
  let interpretation = '';

  if (score >= 0 && score <= 4) {
    severity = 'Minimal anxiety';
    interpretation = 'Your score suggests you are experiencing minimal or no symptoms of anxiety. This is a great sign of your current mental well-being.';
  } else if (score >= 5 && score <= 9) {
    severity = 'Mild anxiety';
    interpretation = 'Your score suggests you may be experiencing mild anxiety. These are likely manageable symptoms, but it can be helpful to monitor them and practice coping strategies.';
  } else if (score >= 10 && score <= 14) {
    severity = 'Moderate anxiety';
    interpretation = 'Your score suggests you are experiencing moderate anxiety. It might be helpful to consider talking to a healthcare professional about what you are experiencing.';
  } else {
    severity = 'Severe anxiety';
    interpretation = 'Your score suggests you are experiencing severe anxiety. It is strongly recommended that you consult with a doctor or mental health professional to discuss your symptoms.';
  }

  return {
    score,
    severity,
    interpretation,
  };
}
