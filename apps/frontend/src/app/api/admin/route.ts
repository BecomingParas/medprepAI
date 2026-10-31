import { NextResponse } from 'next/server';
import {
  ApiError,
  apiErrorResponse,
  createAdminClient,
  isRecord,
  parseJson,
  requireAdmin,
  requireAuthenticatedUser,
} from '@/lib/server/api-auth';
import type { ChapterInput, QuestionInput } from '@/lib/admin.functions';

const SUBJECTS = ['Physics', 'Chemistry', 'Biology'];
const DIFFICULTIES = ['easy', 'medium', 'hard'];

function readQuestion(value: unknown): QuestionInput {
  if (!isRecord(value)) throw new ApiError('Question data is required.', 400);
  const { id, subject, chapter, difficulty, stem, options, correct_index, explanation } = value;
  const { visual_prompt, provenance, source_title, source_url, source_year, source_notes } = value;
  if (
    (id !== undefined && typeof id !== 'string') ||
    typeof subject !== 'string' ||
    typeof chapter !== 'string' ||
    typeof difficulty !== 'string' ||
    typeof stem !== 'string' ||
    !Array.isArray(options) ||
    !options.every((option) => typeof option === 'string') ||
    typeof correct_index !== 'number' ||
    typeof explanation !== 'string' ||
    (visual_prompt !== undefined && typeof visual_prompt !== 'string') ||
    (provenance !== 'sample' && provenance !== 'verified') ||
    (source_title !== null && source_title !== undefined && typeof source_title !== 'string') ||
    (source_url !== null && source_url !== undefined && typeof source_url !== 'string') ||
    (source_year !== null && source_year !== undefined && typeof source_year !== 'number') ||
    (source_notes !== null && source_notes !== undefined && typeof source_notes !== 'string')
  ) {
    throw new ApiError('Question data is invalid.', 400);
  }

  const question: QuestionInput = {
    ...(id ? { id } : {}),
    subject,
    chapter,
    difficulty,
    stem,
    options,
    correct_index,
    explanation,
    visual_prompt: typeof visual_prompt === 'string' ? visual_prompt : '',
    provenance,
    source_title: typeof source_title === 'string' ? source_title : null,
    source_url: typeof source_url === 'string' ? source_url : null,
    source_year: typeof source_year === 'number' ? source_year : null,
    source_notes: typeof source_notes === 'string' ? source_notes : null,
  };

  if (!SUBJECTS.includes(question.subject)) {
    throw new ApiError('Subject must be Physics, Chemistry or Biology.', 400);
  }
  if (!DIFFICULTIES.includes(question.difficulty)) {
    throw new ApiError('Difficulty must be easy, medium or hard.', 400);
  }
  if (!question.stem.trim()) throw new ApiError('Question text is required.', 400);
  if (!question.chapter.trim()) throw new ApiError('Chapter is required.', 400);
  if (question.options.length !== 4 || question.options.some((option) => !option.trim())) {
    throw new ApiError('Four answer options are required.', 400);
  }
  if (!Number.isInteger(question.correct_index) || question.correct_index < 0 || question.correct_index > 3) {
    throw new ApiError('Choose which option is correct.', 400);
  }
  if (!question.explanation.trim()) throw new ApiError('An explanation is required.', 400);
  if (question.provenance === 'verified' && !question.source_title?.trim()) {
    throw new ApiError('A verified question needs its source title so students can trust it.', 400);
  }
  return question;
}

function readChapter(value: unknown): ChapterInput {
  if (!isRecord(value)) throw new ApiError('Chapter data is required.', 400);
  const { id, subject, name, overview } = value;
  if (
    (id !== undefined && typeof id !== 'string') ||
    typeof subject !== 'string' ||
    typeof name !== 'string' ||
    typeof overview !== 'string'
  ) {
    throw new ApiError('Chapter data is invalid.', 400);
  }
  if (!SUBJECTS.includes(subject)) {
    throw new ApiError('Subject must be Physics, Chemistry or Biology.', 400);
  }
  if (!name.trim()) throw new ApiError('Chapter name is required.', 400);
  return { ...(id ? { id } : {}), subject, name: name.trim(), overview: overview.trim() };
}

function readId(value: unknown): string {
  if (!isRecord(value) || typeof value.id !== 'string' || !value.id.trim()) {
    throw new ApiError('A valid id is required.', 400);
  }
  return value.id;
}

export async function POST(request: Request) {
  try {
    const { supabase } = await requireAuthenticatedUser(request);
    await requireAdmin(supabase);
    const payload = await parseJson(request);
    if (!isRecord(payload) || typeof payload.action !== 'string') {
      throw new ApiError('A valid admin action is required.', 400);
    }

    const admin = createAdminClient();
    if (payload.action === 'saveQuestion') {
      const question = readQuestion(payload.data);
      const row = {
        subject: question.subject,
        chapter: question.chapter.trim(),
        difficulty: question.difficulty,
        stem: question.stem.trim(),
        options: question.options,
        correct_index: question.correct_index,
        explanation: question.explanation.trim(),
        visual_prompt: question.visual_prompt.trim() || question.stem.trim(),
        provenance: question.provenance,
        source_title: question.source_title?.trim() || null,
        source_url: question.source_url?.trim() || null,
        source_year: question.source_year,
        source_notes: question.source_notes?.trim() || null,
      };
      const result = question.id
        ? await admin.from('questions').update(row).eq('id', question.id)
        : await admin.from('questions').insert(row);
      if (result.error) throw new ApiError(result.error.message, 500);
      return NextResponse.json({ ok: true });
    }

    if (payload.action === 'deleteQuestion') {
      const id = readId(payload.data);
      const { error } = await admin.from('questions').delete().eq('id', id);
      if (error) throw new ApiError(error.message, 500);
      return NextResponse.json({ ok: true });
    }

    if (payload.action === 'saveChapter') {
      const chapter = readChapter(payload.data);
      const row = {
        subject: chapter.subject,
        name: chapter.name,
        overview: chapter.overview,
      };
      const result = chapter.id
        ? await admin.from('chapters').update(row).eq('id', chapter.id)
        : await admin.from('chapters').insert(row);
      if (result.error) throw new ApiError(result.error.message, 500);
      return NextResponse.json({ ok: true });
    }

    if (payload.action === 'deleteChapter') {
      const id = readId(payload.data);
      const { error } = await admin.from('chapters').delete().eq('id', id);
      if (error) throw new ApiError(error.message, 500);
      return NextResponse.json({ ok: true });
    }

    throw new ApiError('Unknown admin action.', 400);
  } catch (error) {
    return apiErrorResponse(error);
  }
}
