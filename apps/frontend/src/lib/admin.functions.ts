import {
  DELETE_CHAPTER_MUTATION,
  DELETE_QUESTION_MUTATION,
  SAVE_CHAPTER_MUTATION,
  SAVE_QUESTION_MUTATION,
} from '@sass-project/contracts';
import { graphqlRequest } from '@/lib/graphql-client';

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

export const saveQuestion = ({ data }: { data: QuestionInput }) =>
  graphqlRequest<{ saveQuestion: boolean }>(SAVE_QUESTION_MUTATION, { input: data });

export const deleteQuestion = ({ data }: { data: { id: string } }) =>
  graphqlRequest<{ deleteQuestion: boolean }>(DELETE_QUESTION_MUTATION, data);

export const saveChapter = ({ data }: { data: ChapterInput }) =>
  graphqlRequest<{ saveChapter: boolean }>(SAVE_CHAPTER_MUTATION, { input: data });

export const deleteChapter = ({ data }: { data: { id: string } }) =>
  graphqlRequest<{ deleteChapter: boolean }>(DELETE_CHAPTER_MUTATION, data);
