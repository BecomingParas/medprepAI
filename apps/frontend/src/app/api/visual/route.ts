import { NextResponse } from 'next/server';
import {
  ApiError,
  apiErrorResponse,
  isRecord,
  parseJson,
  requireAdmin,
  requireAuthenticatedUser,
} from '@/lib/server/api-auth';
import { prisma } from '@sass-project/database';

const GATEWAY = 'https://ai.gateway.lovable.dev';
const MODEL = 'openai/gpt-image-2.5-sunburst';

export async function POST(request: Request) {
  try {
    const user = await requireAuthenticatedUser(request);
    requireAdmin(user);
    const payload = await parseJson(request);
    if (!isRecord(payload) || typeof payload.questionId !== 'string') {
      throw new ApiError('A question id is required.', 400);
    }
    const question = await prisma.question.findUnique({ where: { id: payload.questionId } });
    if (!question) throw new ApiError('Question not found.', 404);
    if (question.imageUrl) return NextResponse.json({ imageUrl: question.imageUrl });

    const apiKey = process.env.LOVABLE_API_KEY;
    if (!apiKey) throw new ApiError('AI is not configured.', 503);
    const response = await fetch(`${GATEWAY}/v1/images/generations`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: MODEL,
        prompt: `${question.visualPrompt}. Accurate ${question.subject} study illustration for medical entrance students, clear readable English labels, minimal clutter.`,
        quality: 'low',
        size: '1024x1024',
        output_format: 'jpeg',
      }),
    });
    if (!response.ok) {
      if (response.status === 429) {
        throw new ApiError('Too many requests right now. Please try again in a minute.', 429);
      }
      if (response.status === 402) {
        throw new ApiError('AI credits are used up. Please add credits to continue.', 402);
      }
      throw new ApiError(`Image generation failed (${response.status}).`, 502);
    }

    const result = (await response.json()) as { data?: { b64_json?: string }[] };
    const base64 = result.data?.[0]?.b64_json;
    if (!base64) throw new ApiError('No image was returned.', 502);
    const imageUrl = `data:image/jpeg;base64,${base64}`;
    await prisma.question.update({ where: { id: question.id }, data: { imageUrl } });
    return NextResponse.json({ imageUrl });
  } catch (error) {
    return apiErrorResponse(error);
  }
}
