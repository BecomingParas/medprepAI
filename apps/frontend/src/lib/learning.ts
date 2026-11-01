import { queryOptions } from '@tanstack/react-query';
import { LEARNING_DATA_QUERY, SAVE_ATTEMPT_MUTATION, SET_BOOKMARK_MUTATION } from '@sass-project/contracts';
import { graphqlRequest } from '@/lib/graphql-client';

type LearningQuestion = {
  id: string;
  subject: string;
  chapter: string;
  difficulty: string;
  stem: string;
  options: string[];
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
  attempts: {
    question_id: string | null;
    is_correct: boolean;
    created_at: string;
    question: { subject: string; chapter: string; stem: string } | null;
  }[];
  bookmarks: { question_id: string }[];
  chapters: { id: string; subject: string; name: string; overview: string }[];
  isAdmin: boolean;
};

async function readLearning(): Promise<LearningData> {
  const result = await graphqlRequest<{ learningData: LearningData }>(LEARNING_DATA_QUERY);
  return result.learningData;
}

export const learningOptions = () =>
  queryOptions({
    queryKey: ['learning'],
    queryFn: readLearning,
    staleTime: 30_000,
  });

export type Question = LearningData['questions'][number];

export function optionsOf(question: Question): string[] {
  return question.options;
}

export async function saveAttempt(questionId: string, selectedIndex: number): Promise<void> {
  await graphqlRequest<{ saveAttempt: boolean }>(SAVE_ATTEMPT_MUTATION, { questionId, selectedIndex });
}

export async function setBookmark(questionId: string, saved: boolean): Promise<void> {
  await graphqlRequest<{ setBookmark: boolean }>(SET_BOOKMARK_MUTATION, { questionId, saved });
}
