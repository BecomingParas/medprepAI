import { NextResponse } from 'next/server';
import {
  ApiError,
  apiErrorResponse,
  createAdminClient,
  isRecord,
  parseJson,
  requireAuthenticatedUser,
} from '@/lib/server/api-auth';

const GATEWAY = 'https://ai.gateway.lovable.dev';
const MODEL = 'openai/gpt-image-2.5-sunburst';

export async function POST(request: Request) {
  try {
    const { supabase } = await requireAuthenticatedUser(request);
    const payload = await parseJson(request);
    if (!isRecord(payload) || typeof payload.questionId !== 'string') {
      throw new ApiError('A question id is required.', 400);
    }
    const { data: question, error } = await supabase
      .from('questions')
      .select('id,visual_prompt,image_url,subject')
      .eq('id', payload.questionId)
      .single();
    if (error || !question) throw new ApiError('Question not found.', 404);
    if (question.image_url) return NextResponse.json({ imageUrl: question.image_url });

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
        prompt: `${question.visual_prompt}. Accurate ${question.subject} study illustration for medical entrance students, clear readable English labels, minimal clutter.`,
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
    const { error: saveError } = await createAdminClient()
      .from('questions')
      .update({ image_url: imageUrl })
      .eq('id', question.id);
    if (saveError) throw new ApiError('The generated image could not be saved.', 500);
    return NextResponse.json({ imageUrl });
  } catch (error) {
    return apiErrorResponse(error);
  }
}
