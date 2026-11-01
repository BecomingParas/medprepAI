"use client";

import Link from 'next/link';
import { useState } from 'react';
import { useSuspenseQuery } from '@tanstack/react-query';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { ChartNoAxesCombined } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PageHeading, StudyEmpty, StudySegments } from '@/components/StudyUI';
import { learningOptions } from '@/lib/learning';

export default function Performance() {
  const { data } = useSuspenseQuery(learningOptions());
  const [range, setRange] = useState('All time');
  const cutoff = Date.now() - (range === '7 days' ? 7 : 30) * 86_400_000;
  const rows = data.attempts.filter(
    (attempt) => range === 'All time' || new Date(attempt.created_at).getTime() >= cutoff,
  );
  const questionById = new Map(data.questions.map((question) => [question.id, question]));
  const daily = new Map<string, { correct: number; total: number }>();
  const chapters = new Map<string, { correct: number; total: number }>();

  rows.forEach((attempt) => {
    const date = attempt.created_at.slice(0, 10);
    const day = daily.get(date) ?? { correct: 0, total: 0 };
    day.total += 1;
    day.correct += Number(attempt.is_correct);
    daily.set(date, day);

    const question = attempt.question_id
      ? questionById.get(attempt.question_id)
      : undefined;
    if (!question) return;

    const key = `${question.subject} · ${question.chapter}`;
    const chapter = chapters.get(key) ?? { correct: 0, total: 0 };
    chapter.total += 1;
    chapter.correct += Number(attempt.is_correct);
    chapters.set(key, chapter);
  });

  const trend = [...daily]
    .sort(([left], [right]) => left.localeCompare(right))
    .map(([date, value]) => ({
      date,
      accuracy: Math.round((value.correct / value.total) * 100),
      attempts: value.total,
    }));

  const subjects = ['Biology', 'Physics', 'Chemistry'].map((subject) => {
    const subjectAttempts = rows.filter(
      (attempt) =>
        attempt.question_id && questionById.get(attempt.question_id)?.subject === subject,
    );
    const correct = subjectAttempts.filter((attempt) => attempt.is_correct).length;
    return {
      subject,
      accuracy: subjectAttempts.length ? Math.round((correct / subjectAttempts.length) * 100) : 0,
      attempts: subjectAttempts.length,
    };
  });

  const correctAttempts = rows.filter((attempt) => attempt.is_correct).length;
  const accuracy = rows.length ? `${Math.round((correctAttempts / rows.length) * 100)}% accuracy` : 'No activity yet';

  return (
    <>
      <PageHeading
        eyebrow="Your effort, in perspective"
        title="Performance"
        description={`${rows.length} attempts · ${accuracy}`}
        action={
          <StudySegments
            values={['7 days', '30 days', 'All time']}
            value={range}
            onChange={setRange}
            label="Performance period"
          />
        }
      />
      {!rows.length ? (
        <div className="my-10">
          <StudyEmpty
            icon={ChartNoAxesCombined}
            title="No practice in this period"
            action={
              <Button asChild>
                <Link href="/practice">Start practice</Link>
              </Button>
            }
          >
            Your results will appear here after you answer questions.
          </StudyEmpty>
        </div>
      ) : (
        <>
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {subjects.map((subject) => (
              <article key={subject.subject} className="rounded-lg border bg-card p-5">
                <p className="text-sm font-semibold">{subject.subject}</p>
                <p className="mt-3 font-display text-3xl font-bold">
                  {subject.attempts ? `${subject.accuracy}%` : '—'}
                </p>
                <p className="mt-2 text-xs text-muted-foreground">{subject.attempts} attempts</p>
              </article>
            ))}
          </div>
          <div className="mt-8 grid gap-8 lg:grid-cols-2">
            <section className="min-w-0 border-t pt-6">
              <h2 className="font-semibold">Daily accuracy</h2>
              <div
                className="mt-5 h-64 w-full"
                role="img"
                aria-label="Daily accuracy trend from your actual attempts"
              >
                <ResponsiveContainer>
                  <LineChart data={trend}>
                    <CartesianGrid vertical={false} stroke="var(--border)" />
                    <XAxis dataKey="date" tick={{ fill: 'var(--muted-foreground)', fontSize: 10 }} />
                    <YAxis domain={[0, 100]} tick={{ fill: 'var(--muted-foreground)', fontSize: 10 }} />
                    <Tooltip
                      contentStyle={{
                        background: 'var(--card)',
                        borderColor: 'var(--border)',
                        color: 'var(--foreground)',
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="accuracy"
                      name="Accuracy (%)"
                      stroke="var(--accent)"
                      strokeWidth={3}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </section>
            <section className="min-w-0 border-t pt-6">
              <h2 className="font-semibold">Subject comparison</h2>
              <div className="mt-5 h-64 w-full" role="img" aria-label="Accuracy by subject">
                <ResponsiveContainer>
                  <BarChart data={subjects}>
                    <XAxis dataKey="subject" tick={{ fill: 'var(--muted-foreground)', fontSize: 11 }} />
                    <YAxis domain={[0, 100]} tick={{ fill: 'var(--muted-foreground)', fontSize: 10 }} />
                    <Tooltip
                      contentStyle={{
                        background: 'var(--card)',
                        borderColor: 'var(--border)',
                        color: 'var(--foreground)',
                      }}
                    />
                    <Bar dataKey="accuracy" name="Accuracy (%)" fill="var(--primary)" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </section>
          </div>
          <section className="mt-10">
            <h2 className="text-xl font-bold">Chapter breakdown</h2>
            <div className="mt-4 overflow-x-auto rounded-lg border">
              <table className="study-table w-full text-left text-sm">
                <thead className="border-b text-xs text-muted-foreground">
                  <tr>
                    <th className="py-3">Chapter</th>
                    <th>Attempts</th>
                    <th>Accuracy</th>
                    <th>
                      <span className="sr-only">Revision</span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {[...chapters]
                    .sort((left, right) => left[1].correct / left[1].total - right[1].correct / right[1].total)
                    .map(([key, value]) => (
                      <tr key={key} className="border-b">
                        <td className="py-4 pr-3">{key}</td>
                        <td>{value.total}</td>
                        <td className={value.correct / value.total < 0.6 ? 'text-destructive' : 'text-success'}>
                          {Math.round((value.correct / value.total) * 100)}%
                        </td>
                        <td>
                          <Button asChild size="sm" variant="ghost">
                            <Link href={`/practice?chapter=${encodeURIComponent(key.split(' · ')[1] ?? '')}`}>
                              Revise
                            </Link>
                          </Button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </section>
        </>
      )}
    </>
  );
}
