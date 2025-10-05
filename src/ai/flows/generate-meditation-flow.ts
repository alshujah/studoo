'use server';

/**
 * @fileoverview Genkit flows for generating personalized, voiced guided meditations.
 * - generateMeditationScript: Creates the text script for a meditation.
 * - generateMeditationAudio: Converts a script into voiced audio.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import wav from 'wav';
import { googleAI } from '@genkit-ai/google-genai';

// --- Script Generation ---

const GenerateMeditationScriptInputSchema = z.object({
  topic: z.string().describe('The topic or feeling for the meditation.'),
});
export type GenerateMeditationScriptInput = z.infer<typeof GenerateMeditationScriptInputSchema>;

const GenerateMeditationScriptOutputSchema = z.object({
  script: z.string().describe('The text of the guided meditation script.'),
});
export type GenerateMeditationScriptOutput = z.infer<typeof GenerateMeditationScriptOutputSchema>;

export async function generateMeditationScript(
  input: GenerateMeditationScriptInput
): Promise<GenerateMeditationScriptOutput> {
  return generateMeditationScriptFlow(input);
}

const generateMeditationScriptFlow = ai.defineFlow(
  {
    name: 'generateMeditationScriptFlow',
    inputSchema: GenerateMeditationScriptInputSchema,
    outputSchema: GenerateMeditationScriptOutputSchema,
  },
  async ({ topic }) => {
    const llmResponse = await ai.generate({
      prompt: `Create a short, calming, 2-minute guided meditation script focused on the following topic: "${topic}". The script should be gentle, reassuring, and use simple language. Start with a brief instruction to get comfortable and end by gently bringing the user back to the present moment.`,
      config: {
        temperature: 0.8,
      },
    });

    return {
      script: llmResponse.text,
    };
  }
);


// --- Audio Generation ---

const GenerateMeditationAudioInputSchema = z.object({
    script: z.string().describe('The meditation script to be converted to audio.'),
});
export type GenerateMeditationAudioInput = z.infer<typeof GenerateMeditationAudioInputSchema>;

const GenerateMeditationAudioOutputSchema = z.object({
  audioDataUri: z.string().describe("A data URI of the meditation audio in WAV format. Format: 'data:audio/wav;base64,<encoded_data>'."),
});
export type GenerateMeditationAudioOutput = z.infer<typeof GenerateMeditationAudioOutputSchema>;

export async function generateMeditationAudio(
    input: GenerateMeditationAudioInput
): Promise<GenerateMeditationAudioOutput> {
    return generateMeditationAudioFlow(input);
}


const generateMeditationAudioFlow = ai.defineFlow(
  {
    name: 'generateMeditationAudioFlow',
    inputSchema: GenerateMeditationAudioInputSchema,
    outputSchema: GenerateMeditationAudioOutputSchema,
  },
  async ({ script }) => {
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

    const wavData = await toWav(pcmData);

    return {
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
