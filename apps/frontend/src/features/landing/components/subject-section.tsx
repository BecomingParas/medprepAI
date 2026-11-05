import Link from 'next/link';
import { ArrowRight, MoveUpRight } from 'lucide-react';

import { Reveal, Stagger, StaggerItem } from './motion';
import { Button } from '@/components/ui/button';
import { subjects } from '../data/subjects';

export function SubjectSection() {
  return (
    <section
      id="subjects"
      aria-labelledby="subjects-heading"
      className="relative overflow-hidden py-20 sm:py-24"
    >
      <div className="landing-container">
        {/* Section heading */}
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <Reveal direction="up" delay={0.1}>
            <div className="max-w-xl">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/5 px-3 py-1.5">
                <span className="size-1.5 animate-pulse rounded-full bg-accent" />
                <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-accent">
                  Your learning starts here
                </span>
              </div>

              <h2
                id="subjects-heading"
                className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl"
              >
                Master the science.
                <br />
                <span className="text-muted-foreground">Chase your dream.</span>
              </h2>

              <p className="mt-4 max-w-lg text-sm leading-7 text-muted-foreground sm:text-base">
                Build a powerful foundation in Physics, Chemistry and Biology
                with visual explanations and focused practice.
              </p>
            </div>
          </Reveal>

          <Reveal direction="up" delay={0.2}>
            <Button
              asChild
              variant="outline"
              className="group h-11 gap-3 rounded-full px-5"
            >
              <Link href="/lessons">
                Explore all lessons
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </Reveal>
        </div>

        {/* Subject cards */}
        <Stagger className="mt-12 grid gap-5 md:grid-cols-3">
          {subjects.map((subject) => {
            const Icon = subject.icon;

            return (
              <StaggerItem key={subject.name}>
                <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border/70 bg-card transition-all duration-500 hover:-translate-y-2 hover:border-accent/40 hover:shadow-2xl hover:shadow-primary/10">
                  {/* Visual header */}
                  <div
                    className={`relative flex h-52 items-center justify-center overflow-hidden ${subject.surface}`}
                  >
                    {/* Decorative background */}
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,white_0%,transparent_70%)] opacity-30" />

                    <span
                      className={`absolute left-5 top-5 text-[10px] font-bold uppercase tracking-[0.2em] ${subject.tone}`}
                    >
                      {subject.number} / PCB
                    </span>

                    {/* Large subject icon */}
                    <div className="relative grid size-32 place-items-center rounded-full border border-white/40 bg-white/30 shadow-xl shadow-black/5 backdrop-blur-sm transition-all duration-500 group-hover:scale-110 group-hover:rotate-6">
                      <div className="absolute inset-2 rounded-full border border-white/40" />
                      <Icon
                        aria-hidden="true"
                        strokeWidth={1.15}
                        className={`size-16 ${subject.tone}`}
                      />
                    </div>

                    <MoveUpRight className="absolute right-5 top-5 size-5 text-foreground/40 transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-foreground" />

                    <span className="absolute bottom-4 right-5 text-[10px] font-medium tracking-widest text-foreground/50">
                      MEDPREP AI
                    </span>
                  </div>

                  {/* Card content */}
                  <div className="flex flex-1 flex-col p-6 sm:p-7">
                    <h3 className="text-2xl font-bold tracking-tight">
                      {subject.name}
                    </h3>

                    <p className="mt-2 min-h-10 text-sm leading-6 text-muted-foreground">
                      {subject.description}
                    </p>

                    {/* Topics */}
                    <div className="my-6 flex-1">
                      <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.15em] text-muted-foreground">
                        Explore key topics
                      </p>

                      <ul className="space-y-3">
                        {subject.topics.map((topic) => (
                          <li
                            key={topic}
                            className="flex items-center gap-3 text-xs text-muted-foreground transition-colors group-hover:text-foreground/80"
                          >
                            <span
                              className={`size-1.5 shrink-0 rounded-full ${subject.tone.replace('text-', 'bg-')}`}
                            />
                            {topic}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Action */}
                    <Button
                      asChild
                      variant="ghost"
                      className={`group/link h-12 w-full justify-between rounded-xl border border-border/70 px-4 hover:border-transparent hover:bg-accent/10 ${subject.tone}`}
                    >
                      <Link href="/lessons">
                        <span className="font-semibold">
                          Explore {subject.name}
                        </span>
                        <ArrowRight className="size-4 transition-transform duration-300 group-hover/link:translate-x-1" />
                      </Link>
                    </Button>
                  </div>
                </article>
              </StaggerItem>
            );
          })}
        </Stagger>

        {/* Bottom note */}
        <Reveal direction="up" delay={0.2}>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-center text-xs text-muted-foreground">
            <span className="font-semibold text-foreground">One platform.</span>
            <span>Three core sciences.</span>
            <span className="hidden text-border sm:inline">·</span>
            <span>One medical entrance goal.</span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
