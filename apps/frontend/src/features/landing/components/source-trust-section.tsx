'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  ArrowUpRight,
  FileCheck2,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

export function SourceTrustSection() {
  return (
    <section className="relative isolate overflow-hidden border-y bg-card">
      {/* Ambient background */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -left-24 top-0 size-72 rounded-full bg-accent/[0.07] blur-[100px]" />
        <div className="absolute -right-20 bottom-0 size-72 rounded-full bg-primary/[0.05] blur-[100px]" />
      </div>

      <div className="landing-container py-14 sm:py-16">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.65, ease: 'easeOut' }}
          className="relative grid gap-8 rounded-2xl border bg-background/70 p-6 shadow-sm backdrop-blur-sm sm:p-8 md:grid-cols-[auto_1fr_auto] md:items-center md:gap-8 lg:p-10"
        >
          {/* Decorative corner */}
          <div className="pointer-events-none absolute right-0 top-0 overflow-hidden rounded-tr-2xl">
            <Sparkles className="mr-5 mt-5 size-6 text-accent/20" />
          </div>

          {/* Icon */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.5,
              delay: 0.15,
              ease: 'easeOut',
            }}
            className="relative flex size-16 items-center justify-center rounded-2xl border border-accent/20 bg-accent/10 text-accent"
          >
            <div className="absolute inset-0 animate-pulse rounded-2xl bg-accent/5" />
            <FileCheck2 className="relative size-8" strokeWidth={1.5} />

            <span className="absolute -bottom-1.5 -right-1.5 flex size-6 items-center justify-center rounded-full border-2 border-background bg-background">
              <ShieldCheck className="size-4 text-accent" />
            </span>
          </motion.div>

          {/* Content */}
          <div className="max-w-2xl">
            <div className="mb-3 flex flex-wrap items-center gap-2">
              <span className="landing-eyebrow">Transparency matters</span>

              <span className="rounded-full border border-accent/20 bg-accent/5 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-accent">
                Source transparency
              </span>
            </div>

            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
              Practice questions.
              <span className="text-muted-foreground"> Clearly sourced.</span>
            </h2>

            <p className="mt-4 max-w-xl text-sm leading-7 text-muted-foreground">
              Our current questions are samples, not official exam papers. No
              verified papers are available yet — and we’ll never label one
              verified without checking its source.
            </p>

            <div className="mt-5 flex items-center gap-2 text-xs font-medium text-muted-foreground">
              <ShieldCheck className="size-4 text-accent" />
              <span>Honest sourcing. Transparent learning.</span>
            </div>
          </div>

          {/* CTA */}
          <div className="flex flex-col items-start gap-3 md:items-end">
            <Button
              asChild
              variant="outline"
              className="group h-11 rounded-xl px-5"
            >
              <Link href="/past-papers">
                Explore past papers
                <ArrowRight className="ml-2 size-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </Button>

            <Link
              href="/past-papers"
              className="group inline-flex items-center gap-1 text-xs text-muted-foreground transition-colors hover:text-foreground"
            >
              Browse the library
              <ArrowUpRight className="size-3 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
