import { getAiResponse } from '@/app/chatbot/actions';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    const body = await request.json();
    const { messages } = body;

    if (!messages) {
        return NextResponse.json({ success: false, error: 'Messages are required.' }, { status: 400 });
    }

    const result = await getAiResponse(messages);

    if (result.success) {
        return NextResponse.json(result);
    } else {
        console.error("API Error in /api/chat: ", result.error);
        return NextResponse.json({ success: false, error: result.error || 'An internal server error occurred.' }, { status: 500 });
    }
}
