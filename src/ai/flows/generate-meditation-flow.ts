
'use server';

/**
 * @fileoverview A Genkit flow that generates a personalized, voiced guided meditation.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import wav from 'wav';
import { googleAI } from '@genkit-ai/google-genai';


// Define input and output schemas
const GenerateMeditationInputSchema = z.object({
  topic: z.string().describe('The topic or feeling the user wants to focus on for the meditation.'),
});
export type GenerateMeditationInput = z.infer<typeof GenerateMeditationInputSchema>;

const GenerateMeditationOutputSchema = z.object({
  script: z.string().describe('The text of the guided meditation.'),
  audioDataUri: z.string().describe("A data URI of the meditation audio in WAV format. Format: 'data:audio/wav;base64,<encoded_data>'."),
});
export type GenerateMeditationOutput = z.infer<typeof GenerateMeditationOutputSchema>;


// Exported server action that the frontend will call
export async function generateMeditation(
  input: GenerateMeditationInput
): Promise<GenerateMeditationOutput> {
  return generateMeditationFlow(input);
}


// Internal Genkit flow
const generateMeditationFlow = ai.defineFlow(
  {
    name: 'generateMeditationFlow',
    inputSchema: GenerateMeditationInputSchema,
    outputSchema: GenerateMeditationOutputSchema,
  },
  async ({ topic }) => {
    // 1. Generate the meditation script
    const scriptGeneration = await ai.generate({
        prompt: `Create a short, calming, 2-minute guided meditation script focused on the following topic: "${topic}". The script should be gentle, reassuring, and use simple language. Start with a brief instruction to get comfortable and end by gently bringing the user back to the present moment.`,
        config: {
            temperature: 0.8
        }
    });

    const script = scriptGeneration.text;

    // 2. Convert the script to speech
    const { media } = await ai.generate({
      model: googleAI.model('gemini-2.5-flash-preview-tts'),
      config: {
        responseModalities: ['AUDIO'],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: { voiceName: 'Algenib' },
          },
        },
      },
      prompt: script,
    });

    if (!media) {
      throw new Error('Audio generation failed.');
    }
    
    const pcmData = Buffer.from(
      media.url.substring(media.url.indexOf(',') + 1),
      'base64'
    );

    // 3. Convert PCM audio to WAV format
    const wavData = await toWav(pcmData);

    return {
      script: script,
      audioDataUri: 'data:audio/wav;base64,' + wavData,
    };
  }
);


// Helper function to convert raw PCM audio data to a base64 encoded WAV file
async function toWav(
  pcmData: Buffer,
  channels = 1,
  rate = 24000,
  sampleWidth = 2
): Promise<string> {
  return new Promise((resolve, reject) => {
    const writer = new wav.Writer({
      channels,
      sampleRate: rate,
      bitDepth: sampleWidth * 8,
    });

    const bufs: any[] = [];
    writer.on('error', reject);
    writer.on('data', function (d) {
      bufs.push(d);
    });
    writer.on('end', function () {
      resolve(Buffer.concat(bufs).toString('base64'));
    });

    writer.write(pcmData);
    writer.end();
  });
}
