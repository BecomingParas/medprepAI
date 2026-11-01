"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useSuspenseQuery } from "@tanstack/react-query";
import { learningOptions, saveAttempt } from "@/lib/learning";
import { PageHeading } from "@/components/StudyUI";
import { Clock, ArrowRight, ListChecks, Shuffle, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

type Q = { id: string; subject: string; stem: string; options: string[]; correct_index: number; explanation: string };

export default function MockPage() {
  const { data } = useSuspenseQuery(learningOptions());
  const [qs, setQs] = useState<Q[] | null>(null);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [left, setLeft] = useState(0);
  const [done, setDone] = useState(false);



  useEffect(() => {
    if (!qs || done) return;
    if (left <= 0) {
      submit();
      return;
    }
    const t = setTimeout(() => setLeft((l) => l - 1), 1000);
    return () => clearTimeout(t);
  }, [left, qs, done]);

  async function start(n: number) {
    const picked = [...data.questions].sort(() => Math.random() - 0.5).slice(0, n);
    setQs(picked);
    setAnswers({});
    setDone(false);
    setLeft(picked.length * 60);
  }

  async function submit() {
    if (!qs || done) return;
    setDone(true);
    try {
      await Promise.all(
        qs.flatMap((q) => {
          const selectedIndex = answers[q.id];
          return selectedIndex === undefined ? [] : [saveAttempt(q.id, selectedIndex)];
        }),
      );
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Could not save your mock exam.");
    }
  }

  const score = qs?.filter((q) => answers[q.id] === q.correct_index).length ?? 0;
  const mm = String(Math.floor(left / 60)).padStart(2, "0");
  const ss = String(left % 60).padStart(2, "0");

  return (
    <div className="min-h-screen">

      <main className="mx-auto max-w-3xl px-5 py-10">
        {!qs ? (
          <div>
            <PageHeading eyebrow="Put your preparation to the test" title="Mock exams" description="Timed, mixed PCB practice with sample questions — one minute per question."/>
            <div className="mt-8 flex flex-wrap gap-x-8 gap-y-4 border-b pb-7 text-xs text-muted-foreground"><span className="flex items-center gap-2"><Clock className="size-4 text-accent"/>1 minute per question</span><span className="flex items-center gap-2"><Shuffle className="size-4 text-accent"/>Mixed PCB</span><span className="flex items-center gap-2"><CheckCircle2 className="size-4 text-accent"/>Review every answer</span></div>
            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {[5, 10, 15].map((n) => (
                <article key={n} className="flex flex-col rounded-lg border bg-card p-6 shadow-card"><ListChecks className="size-6 text-accent" strokeWidth={1.5}/><h2 className="mt-5 text-lg font-semibold">{n} questions</h2><p className="mt-2 text-xs text-muted-foreground">{n} minutes · Sample questions</p><Button className="mt-6 w-full justify-between" variant={n===10?'default':'outline'} onClick={()=>start(n)}>Start exam <ArrowRight/></Button></article>
              ))}
            </div>
          </div>
        ) : (
          <div>
            <div className="sticky top-[84px] z-10 flex items-center justify-between rounded-lg border bg-card p-4">
              {done ? (
                <p className="font-display text-2xl font-bold">
                  Score: {score} / {qs.length}
                </p>
              ) : (
                <p className={`font-display text-2xl font-bold ${left < 60 ? "text-destructive" : ""}`}>
                  {mm}:{ss}
                </p>
              )}
              {done ? (
                <Button onClick={() => setQs(null)}>New exam</Button>
              ) : (
                <Button onClick={submit}>Submit ({Object.keys(answers).length}/{qs.length})</Button>
              )}
            </div>
            <ol className="mt-6 space-y-6">
              {qs.map((q, n) => (
                <li key={q.id} className="rounded-lg border bg-card p-6">
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Q{n + 1} · {q.subject}
                  </p>
                  <p className="mt-2 text-lg font-semibold">{q.stem}</p>
                  <div className="mt-4 grid gap-2 sm:grid-cols-2">
                    {q.options.map((o, i) => {
                      const sel = answers[q.id] === i;
                      const cls = done
                        ? i === q.correct_index
                          ? "border-success bg-success/10"
                          : sel
                            ? "border-destructive bg-destructive/10"
                            : "opacity-60"
                        : sel
                          ? "border-primary bg-primary/10"
                          : "hover:border-primary";
                      return (
                        <Button
                          variant="outline"
                          aria-pressed={sel}
                          key={i}
                          disabled={done}
                          onClick={() => setAnswers((a) => ({ ...a, [q.id]: i }))}
                          className={`study-option h-auto min-h-12 justify-start whitespace-normal border px-4 py-3 text-left text-sm ${cls}`}
                        >
                          <b className="grid size-6 shrink-0 place-items-center rounded border bg-muted text-xs">{"ABCD"[i]}.</b>
                          {o}
                        </Button>
                      );
                    })}
                  </div>
                  {done && <p className="mt-3 text-sm text-muted-foreground">{q.explanation}</p>}
                </li>
              ))}
            </ol>
          </div>
        )}
      </main>
    </div>
  );
}
