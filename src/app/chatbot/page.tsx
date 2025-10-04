import type { Metadata } from 'next';
import { ChatInterface } from './chat-interface';

export const metadata: Metadata = {
  title: 'AI Coach | Zenith Wellness',
};

export default function ChatbotPage() {
  return (
    <main className="flex flex-1 flex-col">
      <div className="sticky top-0 z-10 hidden h-14 items-center border-b bg-background px-6 md:flex">
         <h1 className="font-headline text-xl font-semibold">AI Coach</h1>
      </div>
      <ChatInterface />
    </main>
  );
}
