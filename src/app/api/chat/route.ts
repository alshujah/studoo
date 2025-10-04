import { getAiResponse } from '@/app/chatbot/actions';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { messages } = body;

        if (!messages) {
            return NextResponse.json({ success: false, error: 'Messages are required.' }, { status: 400 });
        }

        const result = await getAiResponse(messages);

        if (result.success) {
            return NextResponse.json(result);
        } else {
            return NextResponse.json(result, { status: 500 });
        }

    } catch (error) {
        console.error("API Error in /api/chat: ", error);
        return NextResponse.json({ success: false, error: 'An internal server error occurred.' }, { status: 500 });
    }
}
