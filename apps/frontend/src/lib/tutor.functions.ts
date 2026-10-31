import { postAuthenticated } from '@/lib/api-client';

export type TutorMessage = { role: 'user' | 'assistant'; content: string };

export const askTutor = ({ data }: { data: { messages: TutorMessage[] } }) =>
  postAuthenticated<{ reply: string }>('/api/tutor', {
    messages: data.messages.slice(-20),
  });
