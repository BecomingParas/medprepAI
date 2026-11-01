"use client";

import Link from "next/link";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Target, Percent, Trophy, Flame, ArrowRight } from "lucide-react";
import { learningOptions } from "@/lib/learning";
import { PageHeading, StudyEmpty } from "@/components/StudyUI";
import { Button } from "@/components/ui/button";

type Row = { is_correct: boolean; created_at: string; question: { subject: string; chapter: string; stem: string } | null };
const tone: Record<string, string> = { Biology: "bg-bio", Physics: "bg-phy", Chemistry: "bg-chem" };

function streak(rows: Row[]) {
  const days = new Set(rows.map((r) => r.created_at.slice(0, 10)));
  let n = 0;
  const d = new Date();
  if (!days.has(d.toISOString().slice(0, 10))) d.setDate(d.getDate() - 1);
  while (days.has(d.toISOString().slice(0, 10))) { n++; d.setDate(d.getDate() - 1); }
  return n;
}

export default function Dashboard() {
  const { data } = useSuspenseQuery(learningOptions());
  const rows: Row[] = data.attempts;

  const by = (k: "subject" | "chapter") => {
    const m = new Map<string, { c: number; t: number; s: string }>();
    rows.forEach((r) => { if (!r.question) return; const v = m.get(r.question[k]) ?? { c: 0, t: 0, s: r.question.subject }; v.t++; if (r.is_correct) v.c++; m.set(r.question[k], v); });
    return m;
  };
  const total = rows?.length ?? 0;
  const correct = rows?.filter((r) => r.is_correct).length ?? 0;
  const chapters = [...by("chapter").entries()];
  const mastered = chapters.filter(([, v]) => v.t >= 3 && v.c / v.t >= 0.8).length;
  const weak = chapters.filter(([, v]) => v.c / v.t < 0.6).sort((a, b) => a[1].c / a[1].t - b[1].c / b[1].t).slice(0, 4);
  const subj = by("subject");

  const cards = [
    { icon: Target, label: "Questions attempted", v: total },
    { icon: Percent, label: "Overall accuracy", v: total ? `${Math.round((correct / total) * 100)}%` : "—" },
    { icon: Trophy, label: "Chapters mastered", v: mastered },
    { icon: Flame, label: "Study streak", v: rows ? `${streak(rows)} days` : "—" },
  ];

  return (
    <div className="min-h-screen">

      <main className="mx-auto max-w-7xl px-5 py-10">
        <PageHeading eyebrow="Your study overview" title="Welcome back." description="A clearer picture of your practice, and where to focus next." action={<Button asChild><Link href="/practice">Continue learning <ArrowRight className="h-4 w-4" /></Link></Button>} />

        <div className="mt-8 grid gap-4 grid-cols-2 lg:grid-cols-4">
          {cards.map((c) => (
            <div key={c.label} className="rounded-lg border bg-card p-5 shadow-card">
              <c.icon className="h-5 w-5 text-accent" />
              <p className="mt-3 font-display text-3xl font-bold">{c.v}</p>
              <p className="text-xs text-muted-foreground">{c.label}</p>
            </div>
          ))}
        </div>

        {total === 0 ? (
          <div className="mt-8"><StudyEmpty icon={Target} title="Start your first session" action={<Button asChild><Link href="/practice">Practice now <ArrowRight/></Link></Button>}>Your progress and revision priorities will appear after your first answers.</StudyEmpty></div>
        ) : (
          <div className="mt-8 grid gap-6 lg:grid-cols-3">
            <section className="border-t pt-6 lg:col-span-2">
              <h2 className="font-semibold">Subject progress</h2>
              <div className="mt-4 space-y-4">
                {["Physics", "Chemistry", "Biology"].map((s) => {
                  const v = subj.get(s);
                  const pct = v ? Math.round((v.c / v.t) * 100) : 0;
                  return (
                    <div key={s}>
                      <div className="flex justify-between text-sm"><span className="font-medium">{s}</span><span className="text-muted-foreground">{v ? `${pct}% · ${v.t} attempts` : "Not started"}</span></div>
                      <div className="mt-1.5 h-2 rounded-full bg-muted"><div className={`h-2 rounded-full ${tone[s]}`} style={{ width: `${pct}%` }} /></div>
                    </div>
                  );
                })}
              </div>
              <h2 className="mt-8 font-semibold">Recent activity</h2>
              <ul className="mt-3 divide-y text-sm">
                {rows.slice(0, 6).map((r, i) => (
                  <li key={i} className="flex items-center justify-between gap-4 py-2.5">
                    <span className="line-clamp-1">{r.question?.stem}</span>
                    <span className={`shrink-0 text-xs font-semibold ${r.is_correct ? "text-success" : "text-destructive"}`}>{r.is_correct ? "Correct" : "Wrong"}</span>
                  </li>
                ))}
              </ul>
            </section>
            <section className="border-t pt-6">
              <h2 className="font-semibold">Recommended for you</h2>
              <p className="text-xs text-muted-foreground">Chapters under 60% accuracy</p>
              {weak.length === 0 ? (
                <p className="mt-4 text-sm text-muted-foreground">Nothing weak yet — keep practicing.</p>
              ) : (
                <ul className="mt-4 space-y-3">
                  {weak.map(([k, v]) => (
                    <li key={k} className="rounded-xl border p-3">
                      <p className="text-sm font-medium">{k}</p>
                      <p className="text-xs text-muted-foreground">{v.s} · {v.c}/{v.t} correct</p>
                    </li>
                  ))}
                </ul>
              )}
              <Button asChild variant="outline" className="mt-5 w-full"><Link href="/tutor">Ask the AI tutor</Link></Button>
            </section>
          </div>
        )}
      </main>
    </div>
  );
}
