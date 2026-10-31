"use client";

import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { askTutor } from "@/lib/tutor.functions";
import { PageHeading } from "@/components/StudyUI";
import { Input } from "@/components/ui/input";
import { Sparkles, ArrowUp, ArrowUpRight, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";

type Msg = { role: "user" | "assistant"; content: string };
const STARTERS = ["Explain the cardiac cycle simply", "Trick to remember SN1 vs SN2", "Why is the sky blue?"];

export default function TutorPage() {
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [text, setText] = useState("");
  const [busy, setBusy] = useState(false);
  const end = useRef<HTMLDivElement>(null);


  useEffect(() => end.current?.scrollIntoView({ behavior: "smooth" }), [msgs, busy]);

  async function send(content: string) {
    const c = content.trim();
    if (!c || busy) return;
    const next = [...msgs, { role: "user" as const, content: c }];
    setMsgs(next);
    setText("");
    setBusy(true);
    try {
      const r = await askTutor({ data: { messages: next } });
      setMsgs([...next, { role: "assistant", content: r.reply }]);
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Tutor is unavailable");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="min-h-screen">

      <main className="mx-auto flex max-w-3xl flex-col px-5 py-10">
        <PageHeading eyebrow="A little clarity from AI" title="AI study tutor" description="Ask a Physics, Chemistry or Biology question. Explore the concept together."/>
        <div className="mt-6 min-h-96 space-y-6 border-b pb-6">
          {msgs.length === 0 && (
            <div className="flex flex-col items-center py-10 text-center"><span className="grid size-14 place-items-center rounded-lg border bg-accent/10 text-accent"><Sparkles className="size-6" strokeWidth={1.5}/></span><h2 className="mt-5 text-xl font-semibold">What are you curious about?</h2><p className="mt-2 text-sm text-muted-foreground">Start with a concept you want to understand.</p><div className="mt-7 grid w-full gap-3 md:grid-cols-3">{STARTERS.map(s=><Button key={s} variant="outline" onClick={()=>send(s)} className="h-auto min-h-24 items-start justify-between gap-3 whitespace-normal p-4 text-left text-xs leading-5"><BookOpen className="mt-0.5 text-accent"/><span>{s}</span><ArrowUpRight className="text-muted-foreground"/></Button>)}</div></div>
          )}
          {msgs.map((m, i) => (
            <div key={i} className={m.role === "user" ? "flex justify-end" : "flex"}>
              <div
                className={`max-w-[85%] whitespace-pre-wrap rounded-lg px-4 py-3 text-sm leading-7 ${
                  m.role === "user" ? "bg-primary text-primary-foreground" : "border bg-card"
                }`}
              >
                {m.content}
              </div>
            </div>
          ))}
          {busy && <p className="animate-pulse text-sm text-muted-foreground">Thinking…</p>}
          <div ref={end} />
        </div>
        <form
          className="mt-5 flex items-center gap-2 rounded-lg border bg-card p-2 shadow-card"
          onSubmit={(e) => {
            e.preventDefault();
            send(text);
          }}
        >
          <Input
            aria-label="Question for AI tutor"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Type your question…"
            className="min-w-0 flex-1 border-0 bg-transparent shadow-none"
          />
          <Button type="submit" size="icon" aria-label="Ask tutor" title="Ask tutor" disabled={busy || !text.trim()}>
            <ArrowUp/>
          </Button>
        </form>
        <p className="mt-3 text-center text-[11px] leading-5 text-muted-foreground">AI can make mistakes. Check important details against your textbook and syllabus.</p>
      </main>
    </div>
  );
}
