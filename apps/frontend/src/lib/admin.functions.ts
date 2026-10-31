import { postAuthenticated } from '@/lib/api-client';

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

type AdminAction =
  | { action: 'saveQuestion'; data: QuestionInput }
  | { action: 'deleteQuestion'; data: { id: string } }
  | { action: 'saveChapter'; data: ChapterInput }
  | { action: 'deleteChapter'; data: { id: string } };

function runAdminAction<T>(payload: AdminAction): Promise<T> {
  return postAuthenticated<T>('/api/admin', payload);
}

export const saveQuestion = ({ data }: { data: QuestionInput }) =>
  runAdminAction<{ ok: true }>({ action: 'saveQuestion', data });

export const deleteQuestion = ({ data }: { data: { id: string } }) =>
  runAdminAction<{ ok: true }>({ action: 'deleteQuestion', data });

export const saveChapter = ({ data }: { data: ChapterInput }) =>
  runAdminAction<{ ok: true }>({ action: 'saveChapter', data });

export const deleteChapter = ({ data }: { data: { id: string } }) =>
  runAdminAction<{ ok: true }>({ action: 'deleteChapter', data });
