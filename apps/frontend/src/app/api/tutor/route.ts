import { NextResponse } from 'next/server';
import {
  ApiError,
  apiErrorResponse,
  isRecord,
  parseJson,
  requireAuthenticatedUser,
} from '@/lib/server/api-auth';

type Message = { role: 'user' | 'assistant'; content: string };

export async function POST(request: Request) {
  try {
    await requireAuthenticatedUser(request);
    const payload = await parseJson(request);
    if (!isRecord(payload) || !Array.isArray(payload.messages)) {
      throw new ApiError('Tutor messages are required.', 400);
    }
    const messages = payload.messages.slice(-20).map((value): Message => {
      if (
        !isRecord(value) ||
        (value.role !== 'user' && value.role !== 'assistant') ||
        typeof value.content !== 'string'
      ) {
        throw new ApiError('A tutor message is invalid.', 400);
      }
      return { role: value.role, content: value.content };
    });

    const apiKey = process.env.LOVABLE_API_KEY;
    if (!apiKey) throw new ApiError('AI is not configured.', 503);
    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-3-flash-preview',
        messages: [
          {
            role: 'system',
            content:
              'You are MedPrep AI, a friendly tutor for Nepali students preparing for the MBBS entrance exam (MECEE-BL). Explain Physics, Chemistry and Biology clearly and briefly, use simple English, step-by-step reasoning, and quick memory tricks. Stay on exam topics.',
          },
          ...messages,
        ],
      }),
    });
    if (!response.ok) {
      if (response.status === 429) {
        throw new ApiError('Too many requests right now. Please try again in a minute.', 429);
      }
      if (response.status === 402) {
        throw new ApiError('AI credits are used up. Please add credits to continue.', 402);
      }
      throw new ApiError(`Tutor failed (${response.status}).`, 502);
    }

    const result = (await response.json()) as {
      choices?: { message?: { content?: string } }[];
    };
    return NextResponse.json({
      reply: result.choices?.[0]?.message?.content ?? "Sorry, I couldn't answer that.",
    });
  } catch (error) {
    return apiErrorResponse(error);
  }
}
