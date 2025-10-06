
import { aiTherapyChatbot } from '@/modules/aiCoach/services/ai-therapy-chatbot';
import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const { messages, userId } = await req.json();

    if (!messages || !userId) {
      return new NextResponse(JSON.stringify({ error: 'Missing messages or userId' }), { status: 400 });
    }

    // Call the Genkit flow which returns a ReadableStream
    const stream = await aiTherapyChatbot({ messages, userId });
    
    // Return the stream directly to the client
    return new Response(stream, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
      },
    });

  } catch (error: any) {
    console.error('Error in chat API route:', error);
    return new NextResponse(JSON.stringify({ error: error.message || 'An internal server error occurred.' }), { status: 500 });
  }
}
