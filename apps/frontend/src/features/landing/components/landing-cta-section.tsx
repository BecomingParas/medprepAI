import Link from 'next/link';
import { ArrowRight, Sparkles, GraduationCap } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function LandingCtaSection() {
  return (
    <section className="relative isolate overflow-hidden border-y bg-navy text-navy-foreground">
      {/* Background decoration */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        <div className="absolute -right-32 -top-40 size-[420px] rounded-full border border-white/[0.08]" />
        <div className="absolute -right-16 -top-24 size-[300px] rounded-full border border-white/[0.08]" />
        <div className="absolute right-0 top-0 h-full w-1/2 bg-[radial-gradient(ellipse_at_center,hsl(var(--hero-accent)/0.12),transparent_70%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:48px_48px]" />
      </div>

      <div className="landing-container py-16 sm:py-20 lg:py-24">
        <div className="relative flex flex-col items-start justify-between gap-10 rounded-3xl border border-white/10 bg-white/[0.035] p-7 shadow-2xl shadow-black/10 backdrop-blur-sm sm:p-10 lg:flex-row lg:items-center lg:p-14">
          {/* Content */}
          <div className="max-w-2xl">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-3.5 py-1.5 text-xs font-medium text-navy-foreground/80">
              <Sparkles className="size-3.5 text-hero-accent" />
              YOUR JOURNEY, YOUR PACE
            </div>

            <h2 className="text-balance text-3xl font-bold leading-[1.15] tracking-tight sm:text-4xl lg:text-5xl">
              Your future is built
              <br className="hidden sm:block" />
              <span className="text-hero-accent">one concept at a time.</span>
            </h2>

            <p className="mt-5 max-w-lg text-sm leading-7 text-navy-foreground/65 sm:text-base">
              Turn your ambition into progress. Understand difficult concepts,
              practice smarter, and move one step closer to your medical career.
            </p>

            <div className="mt-7 flex flex-wrap items-center gap-3 text-xs text-navy-foreground/60">
              <GraduationCap className="size-4 text-hero-accent" />
              Learn with purpose. Prepare with confidence.
            </div>
          </div>

          {/* CTA */}
          <div className="flex w-full shrink-0 flex-col gap-3 sm:w-auto">
            <Button
              asChild
              size="lg"
              className="group h-13 gap-4 rounded-xl bg-hero-accent px-7 text-hero-ink shadow-lg shadow-black/10 transition-all duration-300 hover:-translate-y-1 hover:bg-hero-accent/90 hover:shadow-xl"
            >
              <Link href="/login?mode=register">
                Start your journey
                <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </Button>

            <p className="text-center text-[11px] text-navy-foreground/45">
              Your next step starts today.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
