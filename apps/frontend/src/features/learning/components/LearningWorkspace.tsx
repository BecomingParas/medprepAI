'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useSuspenseQuery } from '@tanstack/react-query';
import { ArrowRight, Atom, Box, BookOpen, FileCheck2, FlaskConical, Layers3 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LessonVisual } from '@/components/LessonVisual';
import { QuestionReview } from '@/components/QuestionReview';
import { learningOptions } from '@/lib/learning';
import { TopicTutor } from './TopicTutor';
import { defaultTopic, learningSyllabus, type LearningSubject, type LearningTopic } from '../data/syllabus';
import { SyllabusSidebar } from './SyllabusSidebar';

function topicMatches(chapter: string, topic: LearningTopic): boolean {
  const normalize = (value: string) => value.toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
  const normalizedChapter = normalize(chapter);
  return [topic.chapter, topic.name, ...(topic.questionChapterAliases ?? [])].some((alias) => {
    const normalizedAlias = normalize(alias);
    return normalizedChapter === normalizedAlias || normalizedChapter.includes(normalizedAlias);
  });
}

export default function LearningWorkspace() {
  const { data } = useSuspenseQuery(learningOptions());
  const [subject, setSubject] = useState<LearningSubject>('Physics');
  const [topic, setTopic] = useState<LearningTopic>(defaultTopic);
  const currentTopicQuestions = data.questions.filter(
    (question) => question.subject === subject && topicMatches(question.chapter, topic),
  );
  const verifiedQuestions = currentTopicQuestions.filter(
    (question) => question.provenance === 'verified',
  );
  const practiceUrl = `/practice?chapter=${encodeURIComponent(topic.chapter)}`;
  const isNewtonTopic = topic.id === 'PHYSICS_MECHANICS_NEWTONS_LAWS';
  const hasReviewedVisual = [
    'PHYSICS_MECHANICS_NEWTONS_LAWS',
    'CHEMISTRY_BONDING',
    'BIOLOGY_HEART_CIRCULATION',
  ].includes(topic.id);

  function changeSubject(nextSubject: LearningSubject) {
    const next = learningSyllabus.find((item) => item.id === nextSubject)?.sections[0].topics[0];
    if (!next) return;
    setSubject(nextSubject);
    setTopic(next);
  }

  return (
    <main className="mx-auto w-full max-w-7xl px-5 py-8 md:px-8">
      <div className="mb-6 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
        <Link href="/dashboard" className="hover:text-foreground">Learning workspace</Link>
        <span aria-hidden="true">/</span>
        <span>{subject}</span>
        <span aria-hidden="true">/</span>
        <span>{topic.name}</span>
      </div>

      <div className="grid gap-6 lg:grid-cols-[230px_minmax(0,1fr)]">
        <SyllabusSidebar
          subject={subject}
          topic={topic}
          onSubjectChange={changeSubject}
          onTopicChange={setTopic}
        />

        <section className="min-w-0">
          <header className="border-b pb-6">
            <p className="text-xs font-semibold uppercase tracking-wide text-accent">
              {subject} · {topic.name} · Study topic
            </p>
            <h1 className="mt-3 text-3xl font-extrabold tracking-tight">{topic.name}</h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground">
              {isNewtonTopic
                ? 'Learn how forces influence the motion of objects and how Newton’s three laws describe their behavior.'
                : topic.description}
            </p>
          </header>

          <Tabs defaultValue="learn" className="mt-5">
            <TabsList aria-label="Topic learning sections" className="h-auto max-w-full flex-wrap justify-start gap-1">
              <TabsTrigger value="learn" className="gap-2"><BookOpen />Learn</TabsTrigger>
              <TabsTrigger value="visualize" className="gap-2"><Atom />Visualize</TabsTrigger>
              <TabsTrigger value="past-questions" className="gap-2"><FileCheck2 />Past questions</TabsTrigger>
              <TabsTrigger value="practice" className="gap-2"><FlaskConical />Practice</TabsTrigger>
            </TabsList>

            <TabsContent value="learn" className="mt-6 space-y-6">
              {isNewtonTopic && (
                <article className="rounded-lg border bg-card p-5 shadow-card">
                  <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    Understanding motion
                  </p>
                  <h2 className="mt-2 text-xl font-bold">Forces change motion</h2>
                  <p className="mt-2 max-w-3xl text-sm leading-6 text-muted-foreground">
                    Newton’s laws describe inertia, the relationship between net force and
                    acceleration, and the equal-and-opposite forces in an interaction.
                  </p>
                  <div className="mt-5 flex flex-wrap items-center gap-4 rounded-md bg-phy/5 p-4">
                    <span className="font-display text-3xl font-bold text-phy">F = ma</span>
                    <div className="border-l pl-4">
                      <p className="text-sm font-semibold">Newton’s second law</p>
                      <p className="mt-1 text-xs text-muted-foreground">
                        Net force = mass × acceleration
                      </p>
                    </div>
                  </div>
                  <div className="mt-4 grid gap-3 md:grid-cols-3">
                    {[
                      {
                        title: 'First law · inertia',
                        detail:
                          'With zero net force, an object stays at rest or continues at constant velocity.',
                      },
                      {
                        title: 'Second law · acceleration',
                        detail:
                          'A net force causes acceleration in its direction; for constant mass, F = ma.',
                      },
                      {
                        title: 'Third law · interaction',
                        detail:
                          'Forces come in equal and opposite pairs acting on two different objects.',
                      },
                    ].map((law) => (
                      <article key={law.title} className="rounded-md border bg-background/50 p-3">
                        <h3 className="text-xs font-semibold">{law.title}</h3>
                        <p className="mt-2 text-xs leading-5 text-muted-foreground">{law.detail}</p>
                      </article>
                    ))}
                  </div>
                </article>
              )}

              <section aria-labelledby="topic-notes-heading">
                <div className="flex flex-wrap items-end justify-between gap-3">
                  <div>
                    <h2 id="topic-notes-heading" className="text-lg font-bold">
                      {topic.name} · questions & explanations
                    </h2>
                    <p className="mt-1 text-xs text-muted-foreground">
                      Question-bank examples are labelled by their verification status.
                    </p>
                  </div>
                  {currentTopicQuestions.length > 0 && (
                    <Button asChild variant="outline" size="sm">
                      <Link href={practiceUrl}>Practice this topic <ArrowRight /></Link>
                    </Button>
                  )}
                </div>
                {currentTopicQuestions.length > 0 ? (
                  <div className="mt-4 space-y-4">
                    {currentTopicQuestions.slice(0, 5).map((question) => (
                      <article key={question.id} className="rounded-lg border bg-card p-5">
                        <p className="text-xs font-medium text-accent">
                          {question.provenance === 'verified'
                            ? `Verified · ${question.source_title ?? 'source checked'}${question.source_year ? ` · ${question.source_year}` : ''}`
                            : 'Sample question'}
                        </p>
                        <h3 className="text-sm font-semibold leading-6">{question.stem}</h3>
                        <p className="mt-2 text-sm leading-6 text-muted-foreground">
                          {question.explanation}
                        </p>
                        {question.provenance === 'verified' && question.source_url && (
                          <a
                            href={question.source_url}
                            target="_blank"
                            rel="noreferrer"
                            className="mt-3 inline-block text-xs text-accent underline"
                          >
                            View question source
                          </a>
                        )}
                      </article>
                    ))}
                  </div>
                ) : (
                  <div className="mt-4 rounded-lg border border-dashed p-5">
                    <p className="text-sm font-medium">Topic notes are being reviewed.</p>
                    <p className="mt-1 text-sm leading-6 text-muted-foreground">
                      {topic.description} We’ll add lesson material when it has been checked.
                    </p>
                  </div>
                )}
              </section>
              <TopicTutor key={topic.id} subject={subject} topic={topic} />
            </TabsContent>

            <TabsContent value="visualize" className="mt-6">
              <section className="rounded-lg border bg-card p-5 shadow-card">
                <div className="flex items-center gap-3">
                  <span className="grid size-10 place-items-center rounded-md bg-accent/10 text-accent">
                    <Layers3 className="size-5" />
                  </span>
                  <div>
                    <h2 className="font-semibold">Visual playground</h2>
                    <p className="text-xs text-muted-foreground">
                      Interactive model · {topic.name}
                    </p>
                  </div>
                </div>
                {hasReviewedVisual ? (
                  <div className="mt-5">
                    <LessonVisual subject={subject} />
                  </div>
                ) : (
                  <div className="mt-5 grid min-h-48 place-items-center rounded-md border border-dashed bg-muted/20 p-6 text-center">
                    <div>
                      <Box className="mx-auto size-8 text-muted-foreground" />
                      <p className="mt-3 text-sm font-medium">No reviewed visual for this topic yet</p>
                      <p className="mt-1 text-xs text-muted-foreground">
                        Visuals are added after they have been reviewed.
                      </p>
                    </div>
                  </div>
                )}
                <p className="mt-4 text-xs leading-5 text-muted-foreground">
                  Reusable diagrams and models will be added to topics after scientific review.
                </p>
              </section>
            </TabsContent>

            <TabsContent value="past-questions" className="mt-6">
              <div className="mb-4">
                <h2 className="text-lg font-bold">Verified past questions</h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  Only questions with a checked source and year appear here.
                </p>
              </div>
              {verifiedQuestions.length > 0 ? (
                <div className="space-y-4">
                  {verifiedQuestions.map((question) => (
                    <QuestionReview key={question.id} q={question} />
                  ))}
                </div>
              ) : (
                <div className="rounded-lg border border-dashed p-6">
                  <p className="font-semibold">No verified past questions yet</p>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">
                    We won’t present generated or unverified questions as official past-paper
                    questions. Try topic practice for available sample questions.
                  </p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="practice" className="mt-6">
              <section className="rounded-lg border bg-card p-5 shadow-card">
                <p className="text-xs font-semibold uppercase tracking-wide text-accent">
                  Topic practice
                </p>
                <h2 className="mt-2 text-xl font-bold">Check your understanding</h2>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  {currentTopicQuestions.length
                    ? `${currentTopicQuestions.length} ${currentTopicQuestions.length === 1 ? 'question is' : 'questions are'} available for ${topic.name}. Questions are labelled as samples unless their source is verified.`
                    : `There are no practice questions for ${topic.name} yet.`}
                </p>
                {currentTopicQuestions.length ? (
                  <Button asChild className="mt-5">
                    <Link href={practiceUrl}>
                      Start practice <ArrowRight />
                    </Link>
                  </Button>
                ) : (
                  <Button className="mt-5" disabled>
                    No questions available
                  </Button>
                )}
              </section>
            </TabsContent>
          </Tabs>
        </section>
      </div>
    </main>
  );
}
