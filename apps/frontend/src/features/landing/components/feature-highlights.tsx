import {
  BookOpen,
  Eye,
  ShieldCheck,
  Sparkles,
  ArrowUpRight,
} from 'lucide-react';

import { Stagger, StaggerItem } from './motion';

const highlights = [
  {
    icon: BookOpen,
    number: '01',
    title: 'PCB-focused learning',
    subtitle: 'Physics, Chemistry and Biology — all in one place.',
    accent: 'from-blue-500/15 to-cyan-500/5',
    iconColor: 'text-blue-600',
  },
  {
    icon: Eye,
    number: '02',
    title: 'Understand visually',
    subtitle: 'Explore complex concepts through clear visuals.',
    accent: 'from-violet-500/15 to-purple-500/5',
    iconColor: 'text-violet-600',
  },
  {
    icon: Sparkles,
    number: '03',
    title: 'AI-powered assistance',
    subtitle: 'Ask questions and explore concepts with AI.',
    accent: 'from-amber-500/15 to-orange-500/5',
    iconColor: 'text-amber-600',
  },
  {
    icon: ShieldCheck,
    number: '04',
    title: 'Transparent learning',
    subtitle: 'Know what is a sample and what is verified.',
    accent: 'from-emerald-500/15 to-teal-500/5',
    iconColor: 'text-emerald-600',
  },
];

export function FeatureHighlights() {
  return (
    <section
      aria-label="Why learn with MedPrep AI"
      className="relative overflow-hidden border-b bg-background"
    >
      <div className="landing-container py-10 sm:py-12">
        <Stagger className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {highlights.map((item) => {
            const Icon = item.icon;

            return (
              <StaggerItem key={item.number}>
                <article className="group relative h-full overflow-hidden rounded-2xl border border-border/70 bg-card p-5 transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 hover:shadow-xl hover:shadow-primary/5 sm:p-6">
                  {/* Soft gradient background */}
                  <div
                    className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${item.accent} opacity-60 transition-opacity duration-300 group-hover:opacity-100`}
                  />

                  <div className="relative">
                    <div className="flex items-center justify-between">
                      <div className="grid size-12 place-items-center rounded-xl border border-white/70 bg-background/80 shadow-sm backdrop-blur-sm transition-transform duration-300 group-hover:scale-110">
                        <Icon
                          aria-hidden="true"
                          className={`size-5 ${item.iconColor}`}
                          strokeWidth={1.8}
                        />
                      </div>

                      <span className="font-mono text-xs font-medium tracking-widest text-muted-foreground/50">
                        {item.number}
                      </span>
                    </div>

                    <div className="mt-6">
                      <h3 className="text-sm font-bold tracking-tight text-foreground">
                        {item.title}
                      </h3>

                      <p className="mt-2 text-xs leading-6 text-muted-foreground">
                        {item.subtitle}
                      </p>
                    </div>

                    <div className="mt-5 flex items-center justify-end">
                      <ArrowUpRight className="size-4 text-muted-foreground/40 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent" />
                    </div>
                  </div>
                </article>
              </StaggerItem>
            );
          })}
        </Stagger>
      </div>
    </section>
  );
}
