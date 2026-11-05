import { ArrowDownRight, ArrowRight } from 'lucide-react';
import { Stagger, StaggerItem } from './motion';
import { learningSteps } from '../data/learning-steps';

export function LearningPathSection() {
  return (
    <section id="your-path" className="relative isolate overflow-hidden">
      {/* Background decoration */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute right-0 top-10 size-72 rounded-full bg-accent/[0.04] blur-[100px]" />
        <div className="absolute bottom-0 left-0 size-64 rounded-full bg-primary/[0.04] blur-[100px]" />
      </div>

      <div className="landing-container scroll-mt-24 py-20 sm:py-24">
        {/* Section heading */}
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-xl">
            <div className="mb-4 flex items-center gap-2">
              <span className="size-2 rounded-full bg-accent" />
              <p className="landing-eyebrow">Your path to better preparation</p>
            </div>

            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
              A little clearer.
              <br />
              <span className="text-muted-foreground">Every day.</span>
            </h2>

            <p className="mt-5 max-w-md text-sm leading-7 text-muted-foreground sm:text-base">
              Turn a study session into a cycle of understanding, practice and
              progress. One focused step at a time.
            </p>
          </div>

          <div className="hidden items-center gap-2 pb-2 text-xs font-medium text-muted-foreground md:flex">
            <span>Four simple steps</span>
            <ArrowDownRight className="size-4 text-accent" />
          </div>
        </div>

        {/* Learning steps */}
        <Stagger className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {learningSteps.map((step, index) => (
            <StaggerItem key={step.title}>
              <div className="group relative h-full">
                <div className="relative flex h-full min-h-[250px] flex-col overflow-hidden rounded-2xl border bg-card/70 p-6 transition-all duration-500 hover:-translate-y-1 hover:border-accent/40 hover:bg-card hover:shadow-xl hover:shadow-accent/[0.04]">
                  {/* Decorative number */}
                  <span className="pointer-events-none absolute -right-3 -top-7 select-none font-display text-8xl font-bold tracking-tighter text-muted/40 transition-all duration-500 group-hover:-translate-y-2 group-hover:text-accent/[0.08]">
                    {String(index + 1).padStart(2, '0')}
                  </span>

                  {/* Icon */}
                  <div className="relative z-10 mb-8 flex items-center justify-between">
                    <div className="grid size-12 place-items-center rounded-xl border border-accent/15 bg-accent/10 text-accent transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 group-hover:bg-primary group-hover:text-primary-foreground">
                      <step.icon className="size-5" strokeWidth={1.7} />
                    </div>

                    <span className="font-mono text-xs text-muted-foreground">
                      STEP {String(index + 1).padStart(2, '0')}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="relative z-10 mt-auto">
                    <h3 className="text-base font-bold tracking-tight">
                      {step.title}
                    </h3>

                    <p className="mt-3 text-sm leading-7 text-muted-foreground">
                      {step.description}
                    </p>

                    {/* Bottom accent */}
                    <div className="mt-6 flex items-center justify-between">
                      <div className="h-1 w-10 overflow-hidden rounded-full bg-muted">
                        <div className="h-full w-full origin-left scale-x-0 rounded-full bg-accent transition-transform duration-500 group-hover:scale-x-100" />
                      </div>

                      <ArrowRight className="size-4 text-muted-foreground/50 transition-all duration-300 group-hover:translate-x-1 group-hover:text-accent" />
                    </div>
                  </div>

                  {/* Hover glow */}
                  <div className="pointer-events-none absolute -bottom-20 -right-20 size-40 rounded-full bg-accent/0 blur-3xl transition-colors duration-500 group-hover:bg-accent/10" />
                </div>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
