import { GraphQLError } from 'graphql';
import type { Prisma, PrismaClient } from '@sass-project/database';

type LearningUser = {
  id: string;
  role: string;
};

type LearningContext = {
  prisma: PrismaClient;
  user: LearningUser | null;
};

type QuestionInput = {
  id?: string | null;
  subject: string;
  chapter: string;
  difficulty: string;
  stem: string;
  options: string[];
  correct_index: number;
  explanation: string;
  visual_prompt?: string | null;
  provenance: string;
  source_title?: string | null;
  source_url?: string | null;
  source_year?: number | null;
  source_notes?: string | null;
};

type ChapterInput = {
  id?: string | null;
  subject: string;
  name: string;
  overview: string;
};

function requireUser(user: LearningUser | null): LearningUser {
  if (!user) {
    throw new GraphQLError('Sign in to continue.', {
      extensions: { code: 'UNAUTHENTICATED' },
    });
  }
  return user;
}

function requireAdmin(user: LearningUser | null): LearningUser {
  const authenticatedUser = requireUser(user);
  if (authenticatedUser.role !== 'admin') {
    throw new GraphQLError('Admin access required.', {
      extensions: { code: 'FORBIDDEN' },
    });
  }
  return authenticatedUser;
}

function validateQuestion(input: QuestionInput): void {
  if (!['Physics', 'Chemistry', 'Biology'].includes(input.subject)) {
    throw new GraphQLError('Subject must be Physics, Chemistry or Biology.', {
      extensions: { code: 'BAD_USER_INPUT' },
    });
  }
  if (!['easy', 'medium', 'hard'].includes(input.difficulty)) {
    throw new GraphQLError('Difficulty must be easy, medium or hard.', {
      extensions: { code: 'BAD_USER_INPUT' },
    });
  }
  if (!input.chapter.trim() || !input.stem.trim()) {
    throw new GraphQLError('Question text and chapter are required.', {
      extensions: { code: 'BAD_USER_INPUT' },
    });
  }
  if (input.options.length !== 4 || input.options.some((option) => !option.trim())) {
    throw new GraphQLError('Four answer options are required.', {
      extensions: { code: 'BAD_USER_INPUT' },
    });
  }
  if (!Number.isInteger(input.correct_index) || input.correct_index < 0 || input.correct_index > 3) {
    throw new GraphQLError('Choose which option is correct.', {
      extensions: { code: 'BAD_USER_INPUT' },
    });
  }
  if (!input.explanation.trim()) {
    throw new GraphQLError('An explanation is required.', {
      extensions: { code: 'BAD_USER_INPUT' },
    });
  }
  if (!['sample', 'verified'].includes(input.provenance)) {
    throw new GraphQLError('Question provenance is invalid.', {
      extensions: { code: 'BAD_USER_INPUT' },
    });
  }
  if (input.provenance === 'verified' && !input.source_title?.trim()) {
    throw new GraphQLError('A verified question needs its source title.', {
      extensions: { code: 'BAD_USER_INPUT' },
    });
  }
}

function questionData(input: QuestionInput): Prisma.QuestionUncheckedUpdateInput {
  return {
    subject: input.subject,
    chapter: input.chapter.trim(),
    difficulty: input.difficulty,
    stem: input.stem.trim(),
    options: input.options,
    correctIndex: input.correct_index,
    explanation: input.explanation.trim(),
    visualPrompt: input.visual_prompt?.trim() || input.stem.trim(),
    provenance: input.provenance,
    sourceTitle: input.source_title?.trim() || null,
    sourceUrl: input.source_url?.trim() || null,
    sourceYear: input.source_year ?? null,
    sourceNotes: input.source_notes?.trim() || null,
  };
}

function validateChapter(input: ChapterInput): void {
  if (!['Physics', 'Chemistry', 'Biology'].includes(input.subject) || !input.name.trim()) {
    throw new GraphQLError('A valid subject and chapter name are required.', {
      extensions: { code: 'BAD_USER_INPUT' },
    });
  }
}

export const learningResolvers = {
  Query: {
    learningData: async (
      _parent: unknown,
      _args: Record<string, never>,
      { prisma, user }: LearningContext,
    ) => {
      const currentUser = requireUser(user);
      const [questions, attempts, bookmarks, chapters] = await Promise.all([
        prisma.question.findMany({ orderBy: { createdAt: 'asc' }, take: 1000 }),
        prisma.attempt.findMany({
          where: { userId: currentUser.id },
          orderBy: { createdAt: 'desc' },
          take: 5000,
          include: { question: true },
        }),
        prisma.bookmark.findMany({
          where: { userId: currentUser.id },
          select: { questionId: true },
        }),
        prisma.chapter.findMany({ orderBy: [{ subject: 'asc' }, { name: 'asc' }] }),
      ]);

      return {
        questions,
        attempts,
        bookmarks: bookmarks.map(({ questionId }) => ({ question_id: questionId })),
        chapters,
        isAdmin: currentUser.role === 'admin',
      };
    },
  },
  Mutation: {
    saveAttempt: async (
      _parent: unknown,
      { questionId, selectedIndex }: { questionId: string; selectedIndex: number },
      { prisma, user }: LearningContext,
    ) => {
      const currentUser = requireUser(user);
      if (!Number.isInteger(selectedIndex) || selectedIndex < 0 || selectedIndex > 3) {
        throw new GraphQLError('Choose one of the four answer options.', {
          extensions: { code: 'BAD_USER_INPUT' },
        });
      }
      const question = await prisma.question.findUnique({ where: { id: questionId } });
      if (!question) {
        throw new GraphQLError('Question not found.', {
          extensions: { code: 'NOT_FOUND' },
        });
      }
      await prisma.attempt.create({
        data: {
          userId: currentUser.id,
          questionId,
          selectedIndex,
          isCorrect: selectedIndex === question.correctIndex,
        },
      });
      return true;
    },
    setBookmark: async (
      _parent: unknown,
      { questionId, saved }: { questionId: string; saved: boolean },
      { prisma, user }: LearningContext,
    ) => {
      const currentUser = requireUser(user);
      if (saved) {
        await prisma.bookmark.upsert({
          where: { userId_questionId: { userId: currentUser.id, questionId } },
          create: { userId: currentUser.id, questionId },
          update: {},
        });
      } else {
        await prisma.bookmark.deleteMany({
          where: { userId: currentUser.id, questionId },
        });
      }
      return true;
    },
    saveQuestion: async (
      _parent: unknown,
      { input }: { input: QuestionInput },
      { prisma, user }: LearningContext,
    ) => {
      requireAdmin(user);
      validateQuestion(input);
      const data = questionData(input);
      if (input.id) {
        await prisma.question.update({ where: { id: input.id }, data });
      } else {
        await prisma.question.create({ data });
      }
      return true;
    },
    deleteQuestion: async (
      _parent: unknown,
      { id }: { id: string },
      { prisma, user }: LearningContext,
    ) => {
      requireAdmin(user);
      await prisma.question.delete({ where: { id } });
      return true;
    },
    saveChapter: async (
      _parent: unknown,
      { input }: { input: ChapterInput },
      { prisma, user }: LearningContext,
    ) => {
      requireAdmin(user);
      validateChapter(input);
      const data = {
        subject: input.subject,
        name: input.name.trim(),
        overview: input.overview.trim(),
      };
      if (input.id) {
        await prisma.chapter.update({ where: { id: input.id }, data });
      } else {
        await prisma.chapter.create({ data });
      }
      return true;
    },
    deleteChapter: async (
      _parent: unknown,
      { id }: { id: string },
      { prisma, user }: LearningContext,
    ) => {
      requireAdmin(user);
      await prisma.chapter.delete({ where: { id } });
      return true;
    },
  },
  LearningQuestion: {
    options: (question: { options: Prisma.JsonValue }) => {
      if (!Array.isArray(question.options) || !question.options.every((option) => typeof option === 'string')) {
        throw new GraphQLError('Question answer options are invalid.');
      }
      return question.options;
    },
    correct_index: (question: { correctIndex: number }) => question.correctIndex,
    image_url: (question: { imageUrl: string | null }) => question.imageUrl,
    source_title: (question: { sourceTitle: string | null }) => question.sourceTitle,
    source_url: (question: { sourceUrl: string | null }) => question.sourceUrl,
    source_year: (question: { sourceYear: number | null }) => question.sourceYear,
    source_notes: (question: { sourceNotes: string | null }) => question.sourceNotes,
    visual_prompt: (question: { visualPrompt: string }) => question.visualPrompt,
  },
  LearningAttempt: {
    question_id: (attempt: { questionId: string | null }) => attempt.questionId,
    is_correct: (attempt: { isCorrect: boolean }) => attempt.isCorrect,
    created_at: (attempt: { createdAt: Date }) => attempt.createdAt.toISOString(),
  },
};
