import { queryOptions } from '@tanstack/react-query';
import type { Json } from '@/integrations/supabase/types';
import { supabase } from '@/integrations/supabase/client';

type LearningQuestion = {
  id: string;
  subject: string;
  chapter: string;
  difficulty: string;
  stem: string;
  options: Json;
  correct_index: number;
  explanation: string;
  image_url: string | null;
  provenance: string;
  source_title: string | null;
  source_url: string | null;
  source_year: number | null;
  source_notes: string | null;
};

type LearningData = {
  questions: LearningQuestion[];
  attempts: { question_id: string; is_correct: boolean; created_at: string }[];
  bookmarks: { question_id: string }[];
  chapters: { id: string; subject: string; name: string; overview: string }[];
  isAdmin: boolean;
};

async function readLearning(): Promise<LearningData> {
  const [questions, attempts, bookmarks, chapters, roles] = await Promise.all([
    supabase
      .from('questions')
      .select(
        'id,subject,chapter,difficulty,stem,options,correct_index,explanation,image_url,provenance,source_title,source_url,source_year,source_notes',
      )
      .order('created_at')
      .limit(1000),
    supabase
      .from('attempts')
      .select('question_id,is_correct,created_at')
      .order('created_at', { ascending: false })
      .limit(5000),
    supabase.from('bookmarks').select('question_id'),
    supabase.from('chapters').select('id,subject,name,overview').order('subject').order('name'),
    supabase.from('user_roles').select('role'),
  ]);

  for (const result of [questions, attempts, bookmarks, chapters, roles]) {
    if (result.error) throw new Error(result.error.message);
  }
  if (
    questions.data === null ||
    attempts.data === null ||
    bookmarks.data === null ||
    chapters.data === null ||
    roles.data === null
  ) {
    throw new Error('Supabase returned incomplete learning data.');
  }

  return {
    questions: questions.data,
    attempts: attempts.data,
    bookmarks: bookmarks.data,
    chapters: chapters.data,
    isAdmin: roles.data.some((role) => role.role === 'admin'),
  };
}

export const learningOptions = () =>
  queryOptions({
    queryKey: ['learning'],
    queryFn: readLearning,
    staleTime: 30_000,
  });

export type Question = LearningData['questions'][number];

export function optionsOf(question: Question): string[] {
  return Array.isArray(question.options) ? question.options.map(String) : [];
}
