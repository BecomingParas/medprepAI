import { createServerFn } from '@tanstack/react-start';
import { requireSupabaseAuth } from '@/integrations/supabase/auth-middleware';

const SUBJECTS = ['Physics', 'Chemistry', 'Biology'];
const DIFFICULTIES = ['easy', 'medium', 'hard'];

export type QuestionInput = {
  id?: string;
  subject: string;
  chapter: string;
  difficulty: string;
  stem: string;
  options: string[];
  correct_index: number;
  explanation: string;
  visual_prompt: string;
  provenance: 'sample' | 'verified';
  source_title: string | null;
  source_url: string | null;
  source_year: number | null;
  source_notes: string | null;
};

export type ChapterInput = {
  id?: string;
  subject: string;
  name: string;
  overview: string;
};

async function assertAdmin(context: { supabase: any; userId: string }) {
  const { data, error } = await context.supabase.from('user_roles').select('role');
  if (error) throw new Error(error.message);
  if (!data?.some((r: { role: string }) => r.role === 'admin')) throw new Error('Admin access required.');
}

function validateQuestion(q: QuestionInput) {
  if (!SUBJECTS.includes(q.subject)) throw new Error('Subject must be Physics, Chemistry or Biology.');
  if (!DIFFICULTIES.includes(q.difficulty)) throw new Error('Difficulty must be easy, medium or hard.');
  if (!q.stem.trim()) throw new Error('Question text is required.');
  if (!q.chapter.trim()) throw new Error('Chapter is required.');
  if (!Array.isArray(q.options) || q.options.length !== 4 || q.options.some(o => !String(o).trim()))
    throw new Error('Four answer options are required.');
  if (q.correct_index < 0 || q.correct_index > 3) throw new Error('Choose which option is correct.');
  if (!q.explanation.trim()) throw new Error('An explanation is required.');
  if (q.provenance === 'verified' && !q.source_title?.trim())
    throw new Error('A verified question needs its source title so students can trust it.');
}

export const saveQuestion = createServerFn({ method: 'POST' })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: QuestionInput) => input)
  .handler(async ({ data, context }) => {
    await assertAdmin(context);
    validateQuestion(data);
    const row = {
      subject: data.subject,
      chapter: data.chapter.trim(),
      difficulty: data.difficulty,
      stem: data.stem.trim(),
      options: data.options.map(String),
      correct_index: data.correct_index,
      explanation: data.explanation.trim(),
      visual_prompt: data.visual_prompt.trim() || data.stem.trim(),
      provenance: data.provenance,
      source_title: data.source_title?.trim() || null,
      source_url: data.source_url?.trim() || null,
      source_year: data.source_year ?? null,
      source_notes: data.source_notes?.trim() || null,
    };
    const { supabaseAdmin } = await import('@/integrations/supabase/client.server');
    const query = data.id
      ? supabaseAdmin.from('questions').update(row).eq('id', data.id)
      : supabaseAdmin.from('questions').insert(row);
    const { error } = await query;
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const deleteQuestion = createServerFn({ method: 'POST' })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: { id: string }) => input)
  .handler(async ({ data, context }) => {
    await assertAdmin(context);
    const { supabaseAdmin } = await import('@/integrations/supabase/client.server');
    const { error } = await supabaseAdmin.from('questions').delete().eq('id', data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const saveChapter = createServerFn({ method: 'POST' })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: ChapterInput) => input)
  .handler(async ({ data, context }) => {
    await assertAdmin(context);
    if (!SUBJECTS.includes(data.subject)) throw new Error('Subject must be Physics, Chemistry or Biology.');
    if (!data.name.trim()) throw new Error('Chapter name is required.');
    const row = { subject: data.subject, name: data.name.trim(), overview: data.overview.trim() };
    const { supabaseAdmin } = await import('@/integrations/supabase/client.server');
    const query = data.id
      ? supabaseAdmin.from('chapters').update(row).eq('id', data.id)
      : supabaseAdmin.from('chapters').insert(row);
    const { error } = await query;
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const deleteChapter = createServerFn({ method: 'POST' })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: { id: string }) => input)
  .handler(async ({ data, context }) => {
    await assertAdmin(context);
    const { supabaseAdmin } = await import('@/integrations/supabase/client.server');
    const { error } = await supabaseAdmin.from('chapters').delete().eq('id', data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });
