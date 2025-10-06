
'use server';
/**
 * @fileOverview A Genkit flow to score the PHQ-9 depression assessment.
 *
 * This flow calculates the total score, determines the severity level,
 * and provides a brief interpretation of the results.
 */

import { z } from 'genkit';

export const ScorePhq9InputSchema = z.object({
  answers: z.record(z.string()).describe("An object where keys are question indices ('q0', 'q1', ...) and values are the numerical score for that question ('0', '1', '2', '3')."),
});
export type ScorePhq9Input = z.infer<typeof ScorePhq9InputSchema>;

export const ScorePhq9OutputSchema = z.object({
  score: z.number().describe('The total calculated score for the PHQ-9 assessment.'),
  severity: z.string().describe('The clinical severity level (e.g., "None-minimal", "Mild", "Moderate", "Moderately Severe", "Severe").'),
  interpretation: z.string().describe('A brief, non-diagnostic interpretation of the score.'),
  hasSuicidalIdeation: z.boolean().describe('Whether the user indicated any thoughts of self-harm (answer to question 9 > 0).'),
});
export type ScorePhq9Output = z.infer<typeof ScorePhq9OutputSchema>;


export async function scorePhq9(input: ScorePhq9Input): Promise<ScorePhq9Output> {
  // PHQ-9 scoring is deterministic, so we calculate it directly.
  const score = Object.values(input.answers).slice(0, 9).reduce((sum, value) => sum + parseInt(value, 10), 0);
  const hasSuicidalIdeation = parseInt(input.answers['q9'], 10) > 0;

  let severity = '';
  let interpretation = '';

  if (score >= 0 && score <= 4) {
    severity = 'None-minimal';
    interpretation = 'Your score suggests you are experiencing minimal or no symptoms of depression.';
  } else if (score >= 5 && score <= 9) {
    severity = 'Mild depression';
    interpretation = 'Your score suggests you may be experiencing mild depression. Monitoring your symptoms and using self-help strategies can be beneficial.';
  } else if (score >= 10 && score <= 14) {
    severity = 'Moderate depression';
    interpretation = 'Your score suggests moderate depression. It is advisable to discuss your symptoms with a doctor or mental health professional.';
  } else if (score >= 15 && score <= 19) {
    severity = 'Moderately severe depression';
    interpretation = 'Your score suggests moderately severe depression. It is highly recommended to seek professional help.';
  } else {
    severity = 'Severe depression';
    interpretation = 'Your score indicates severe depression. It is very important to seek professional help as soon as possible.';
  }
  
  if (hasSuicidalIdeation) {
    interpretation += " Importantly, you indicated some thoughts of self-harm. This is serious, and we strongly urge you to talk to someone right away. You can reach the 988 Suicide & Crisis Lifeline by calling or texting 988 in the US and Canada, or 111 in the UK."
  }


  return {
    score,
    severity,
    interpretation,
    hasSuicidalIdeation,
  };
}
