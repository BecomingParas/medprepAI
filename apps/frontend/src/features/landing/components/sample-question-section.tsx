import { Sparkles, Brain } from 'lucide-react';
import { LandingPractice } from './landing-practice';

export function SampleQuestionSection() {
  return (
    <section
      id="try-it"
      className="relative isolate overflow-hidden border-y bg-secondary/30 py-20 sm:py-28"
    >
      {/* Subtle background decoration */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <div className="absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 rounded-full bg-muted/60 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(hsl(var(--foreground)/0.07)_1px,transparent_1px)] [background-size:24px_24px] opacity-40" />
      </div>

      <div className="landing-container">
        {/* Section introduction */}
        <div className="mx-auto mb-12 max-w-2xl text-center sm:mb-16">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border bg-background/80 px-3.5 py-1.5 text-xs font-semibold tracking-wide text-muted-foreground shadow-sm">
            <Sparkles className="size-3.5" />
            EXPERIENCE ACTIVE LEARNING
          </div>

          <h2 className="text-balance text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            Don't just study.
            <span className="block text-muted-foreground">Understand it.</span>
          </h2>

          <p className="mx-auto mt-5 max-w-lg text-pretty text-sm leading-7 text-muted-foreground sm:text-base">
            Experience how MedPrep AI transforms questions into meaningful
            understanding. Try a sample question and discover a smarter way to
            prepare.
          </p>

          <div className="mt-6 flex items-center justify-center gap-2 text-xs font-medium text-muted-foreground">
            <Brain className="size-4" />
            Interactive practice
            <span className="size-1 rounded-full bg-border" />
            No sign-in required
          </div>
        </div>

        {/* Interactive learning experience */}
        <div className="relative mx-auto max-w-4xl">
          <LandingPractice />
        </div>
      </div>
    </section>
  );
}
