'use client';

import {
  ArrowDown,
  ArrowRight,
  Atom,
  BookOpen,
  BrainCircuit,
  Eye,
  GraduationCap,
  Microscope,
  Quote,
  ShieldCheck,
  Sparkles,
  Target,
} from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';

const principles = [
  {
    icon: BookOpen,
    title: 'Built around PCB',
    description:
      'Study Physics, Chemistry and Biology with structured lessons, sample questions and revision tools.',
    color: 'bg-indigo-500/10 text-indigo-500',
  },
  {
    icon: Eye,
    title: 'Understand concepts',
    description:
      'Learn through visual explanations and guided practice to build understanding beyond memorization.',
    color: 'bg-teal-500/10 text-teal-500',
  },
  {
    icon: ShieldCheck,
    title: 'Learn with transparency',
    description:
      'Clearly distinguish sample questions, AI-generated material and verified past-paper questions.',
    color: 'bg-violet-500/10 text-violet-500',
  },
];

const subjects = [
  {
    name: 'Physics',
    subtitle: 'Understand the laws',
    icon: Atom,
    color: 'text-blue-500',
    bg: 'bg-blue-500/10',
  },
  {
    name: 'Chemistry',
    subtitle: 'Explore reactions',
    icon: Microscope,
    color: 'text-teal-500',
    bg: 'bg-teal-500/10',
  },
  {
    name: 'Biology',
    subtitle: 'Discover life',
    icon: BrainCircuit,
    color: 'text-violet-500',
    bg: 'bg-violet-500/10',
  },
];

const demoTestimonials = [
  {
    quote:
      'The visual explanations make difficult Biology concepts easier to review.',
    name: 'Demo student',
    subject: 'Biology',
  },
  {
    quote:
      'I like being able to practice one question at a time and read the explanation right away.',
    name: 'Demo student',
    subject: 'Practice',
  },
  {
    quote:
      'Having Physics, Chemistry and Biology study tools together makes it easier to plan a session.',
    name: 'Demo student',
    subject: 'MECEE-BL preparation',
  },
];

export default function AboutPage() {
  const reduceMotion = useReducedMotion();

  const reveal = {
    initial: reduceMotion ? false : { opacity: 0, y: 25 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.2 },
    transition: { duration: 0.65, ease: 'easeOut' as const },
  };

  return (
    <div className="landing-page min-h-screen overflow-hidden">
      <main id="main-content">
        {/* HERO */}
        <section className="relative isolate">
          <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
            <div className="absolute -right-40 -top-40 size-[500px] rounded-full bg-indigo-500/[0.09] blur-[110px]" />
            <div className="absolute -left-40 top-60 size-[400px] rounded-full bg-teal-500/[0.08] blur-[100px]" />
            <div className="absolute inset-0 bg-[radial-gradient(hsl(var(--foreground)/0.07)_1px,transparent_1px)] [background-size:24px_24px]" />
          </div>

          <div className="landing-container grid min-h-[620px] items-center gap-14 py-20 sm:py-28 lg:grid-cols-[1.1fr_0.9fr]">
            <motion.div {...reveal} className="max-w-2xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/20 bg-indigo-500/[0.06] px-4 py-2 text-sm font-medium text-indigo-600 dark:text-indigo-400">
                <Sparkles className="size-4" />
                About MedPrep AI Nepal
              </div>

              <h1 className="mt-7 text-5xl font-bold leading-[1.12] tracking-tight sm:text-6xl lg:text-7xl">
                Learn smarter.
                <span className="block bg-gradient-to-r from-indigo-600 via-violet-500 to-teal-500 bg-clip-text text-transparent">
                  Prepare better.
                </span>
              </h1>

              <p className="mt-7 max-w-xl text-base leading-8 text-muted-foreground sm:text-lg">
                Your journey towards medical education deserves more than
                memorization. MedPrep AI Nepal brings visual learning,
                structured practice, revision and AI-powered study assistance
                together in one learning experience.
              </p>

              <div className="mt-9 flex flex-wrap gap-4">
                <a
                  href="/lessons"
                  className="group inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-indigo-600/20 transition-all hover:-translate-y-1 hover:bg-indigo-700"
                >
                  Explore subjects
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                </a>

                <a
                  href="#approach"
                  className="inline-flex items-center gap-2 rounded-xl border bg-background/70 px-6 py-3.5 text-sm font-semibold transition-colors hover:bg-muted"
                >
                  Our approach
                  <ArrowDown className="size-4" />
                </a>
              </div>

              <div className="mt-10 flex flex-wrap gap-6 text-sm text-muted-foreground">
                <span className="flex items-center gap-2">
                  <ShieldCheck className="size-4 text-teal-500" />
                  PCB-focused learning
                </span>
                <span className="flex items-center gap-2">
                  <GraduationCap className="size-4 text-teal-500" />
                  MECEE-BL preparation
                </span>
              </div>
            </motion.div>

            {/* HERO VISUAL */}
            <motion.div
              initial={reduceMotion ? false : { opacity: 0, scale: 0.92 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative mx-auto w-full max-w-[460px]"
            >
              <div className="absolute inset-8 rounded-full bg-indigo-500/20 blur-3xl" />

              <div className="relative rounded-[2rem] border border-white/50 bg-white/75 p-6 shadow-2xl shadow-indigo-950/10 backdrop-blur-xl dark:border-white/10 dark:bg-card/80">
                <div className="flex items-center justify-between border-b pb-5">
                  <div>
                    <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
                      Your learning space
                    </p>
                    <h2 className="mt-2 text-xl font-bold">
                      Medical Preparation
                    </h2>
                  </div>
                  <div className="rounded-xl bg-indigo-500/10 p-3 text-indigo-500">
                    <GraduationCap className="size-6" />
                  </div>
                </div>

                <div className="mt-6 space-y-3">
                  {subjects.map((subject, index) => {
                    const Icon = subject.icon;

                    return (
                      <motion.div
                        key={subject.name}
                        initial={reduceMotion ? false : { opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{
                          delay: reduceMotion ? 0 : index * 0.12,
                        }}
                        whileHover={reduceMotion ? undefined : { x: 5 }}
                        className="flex items-center gap-4 rounded-2xl border bg-background/80 p-4"
                      >
                        <div
                          className={`rounded-xl p-3 ${subject.bg} ${subject.color}`}
                        >
                          <Icon className="size-6" />
                        </div>
                        <div className="flex-1">
                          <p className="font-semibold">{subject.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {subject.subtitle}
                          </p>
                        </div>
                        <ArrowRight className="size-4 text-muted-foreground" />
                      </motion.div>
                    );
                  })}
                </div>

                <div className="mt-6 rounded-2xl bg-gradient-to-r from-indigo-600 to-violet-600 p-5 text-white">
                  <div className="flex items-center gap-2 text-sm text-white/80">
                    <Sparkles className="size-4" />
                    AI Study Assistant
                  </div>
                  <p className="mt-2 text-lg font-semibold">
                    Understand concepts, not just answers.
                  </p>
                  <p className="mt-2 text-xs leading-6 text-white/70">
                    Explore concepts with guided AI-powered study support.
                  </p>
                </div>
              </div>

              <motion.div
                animate={reduceMotion ? undefined : { y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute -left-6 top-24 hidden items-center gap-3 rounded-2xl border bg-card p-4 shadow-xl sm:flex"
              >
                <Target className="size-6 text-teal-500" />
                <span className="text-xs font-semibold">Focused learning</span>
              </motion.div>

              <motion.div
                animate={reduceMotion ? undefined : { y: [0, 10, 0] }}
                transition={{ duration: 4.5, repeat: Infinity }}
                className="absolute -right-5 bottom-28 hidden items-center gap-3 rounded-2xl border bg-card p-4 shadow-xl sm:flex"
              >
                <BookOpen className="size-6 text-indigo-500" />
                <span className="text-xs font-semibold">Practice & revise</span>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* SUBJECT STRIP */}
        <section className="border-y bg-muted/30">
          <div className="landing-container py-9">
            <p className="text-center text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              One platform. Three core subjects.
            </p>

            <div className="mt-7 grid grid-cols-3 gap-4">
              {subjects.map((subject) => {
                const Icon = subject.icon;

                return (
                  <div
                    key={subject.name}
                    className="flex flex-col items-center gap-2 sm:flex-row sm:justify-center sm:gap-3"
                  >
                    <Icon className={`size-6 ${subject.color}`} />
                    <span className="text-sm font-bold sm:text-base">
                      {subject.name}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* OUR APPROACH */}
        <section
          id="approach"
          className="landing-container scroll-mt-24 py-20 sm:py-28"
        >
          <motion.div {...reveal} className="mx-auto max-w-2xl text-center">
            <p className="landing-eyebrow">Our approach</p>
            <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
              Learning designed around{' '}
              <span className="text-indigo-600 dark:text-indigo-400">
                understanding.
              </span>
            </h2>
            <p className="mt-5 leading-8 text-muted-foreground">
              Effective preparation is not about consuming more content. It is
              about building a strong foundation, practicing consistently and
              knowing what you are learning.
            </p>
          </motion.div>

          <div className="mt-14 grid gap-5 md:grid-cols-3">
            {principles.map((principle, index) => {
              const Icon = principle.icon;

              return (
                <motion.article
                  key={principle.title}
                  initial={reduceMotion ? false : { opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{
                    duration: 0.55,
                    delay: reduceMotion ? 0 : index * 0.12,
                  }}
                  whileHover={reduceMotion ? undefined : { y: -8 }}
                  className="group rounded-3xl border bg-card p-7 shadow-sm transition-shadow duration-300 hover:shadow-xl"
                >
                  <div className="flex items-center justify-between">
                    <div className={`rounded-2xl p-4 ${principle.color}`}>
                      <Icon className="size-7" />
                    </div>
                    <span className="text-sm font-semibold text-muted-foreground/50">
                      0{index + 1}
                    </span>
                  </div>

                  <h3 className="mt-7 text-xl font-bold">{principle.title}</h3>
                  <p className="mt-4 text-sm leading-7 text-muted-foreground">
                    {principle.description}
                  </p>

                  <div className="mt-7 flex items-center gap-2 text-xs font-semibold text-indigo-600 transition-all group-hover:gap-3 dark:text-indigo-400">
                    Our learning philosophy
                    <ArrowRight className="size-4" />
                  </div>
                </motion.article>
              );
            })}
          </div>
        </section>

        {/* DEMO TESTIMONIALS */}
        <section className="border-y bg-muted/30 py-20 sm:py-24">
          <div className="landing-container">
            <motion.div {...reveal} className="mx-auto max-w-2xl text-center">
              <p className="landing-eyebrow">Student stories</p>
              <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
                Learning, one concept at a time.
              </h2>
              <p className="mt-4 text-sm leading-7 text-muted-foreground">
                These illustrative demo quotes show the kind of feedback this
                section is designed to feature. They are not real student
                testimonials.
              </p>
            </motion.div>

            <div className="mt-12 grid gap-5 md:grid-cols-3">
              {demoTestimonials.map((testimonial, index) => (
                <motion.figure
                  key={testimonial.subject}
                  initial={reduceMotion ? false : { opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{
                    duration: 0.55,
                    delay: reduceMotion ? 0 : index * 0.1,
                  }}
                  className="flex h-full flex-col rounded-3xl border bg-card p-7 shadow-sm"
                >
                  <Quote
                    aria-hidden="true"
                    className="size-7 text-indigo-500"
                  />
                  <blockquote className="mt-5 flex-1 text-sm leading-7 text-foreground">
                    “{testimonial.quote}”
                  </blockquote>
                  <figcaption className="mt-7 border-t pt-5">
                    <p className="text-sm font-semibold">
                      {testimonial.name}
                    </p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {testimonial.subject} · Demo content
                    </p>
                  </figcaption>
                </motion.figure>
              ))}
            </div>
          </div>
        </section>

        {/* TRUST & TRANSPARENCY */}
        <section className="relative overflow-hidden border-y bg-muted/30">
          <div className="absolute -right-20 top-0 size-72 rounded-full bg-teal-500/[0.07] blur-3xl" />

          <div className="landing-container relative grid gap-12 py-20 sm:py-24 lg:grid-cols-2 lg:items-center">
            <motion.div {...reveal}>
              <div className="inline-flex items-center gap-2 rounded-full border bg-card px-4 py-2 text-xs font-semibold">
                <ShieldCheck className="size-4 text-teal-500" />
                Trust & transparency
              </div>

              <h2 className="mt-6 text-3xl font-bold tracking-tight sm:text-4xl">
                Your preparation deserves
                <span className="block text-teal-600 dark:text-teal-400">
                  honest learning.
                </span>
              </h2>

              <p className="mt-6 leading-8 text-muted-foreground">
                We believe students should understand the origin and reliability
                of the material they study. Sample questions, AI-generated
                content and verified past-paper questions should be clearly
                distinguished.
              </p>
            </motion.div>

            <motion.div
              {...reveal}
              className="rounded-3xl border bg-card p-7 shadow-lg sm:p-9"
            >
              <div className="flex items-start gap-4">
                <div className="rounded-xl bg-teal-500/10 p-3 text-teal-500">
                  <ShieldCheck className="size-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold">
                    Independent educational platform
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-muted-foreground">
                    MedPrep AI Nepal is not affiliated with or endorsed by
                    Nepal's Medical Education Commission.
                  </p>
                </div>
              </div>

              <div className="my-7 border-t" />

              <div className="flex items-start gap-4">
                <div className="rounded-xl bg-indigo-500/10 p-3 text-indigo-500">
                  <BookOpen className="size-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold">Responsible AI learning</h3>
                  <p className="mt-3 text-sm leading-7 text-muted-foreground">
                    AI-generated explanations may contain errors. Cross-check
                    important information with textbooks, the official syllabus
                    and trusted educational resources.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* FINAL CTA */}
        <section className="landing-container py-20 sm:py-28">
          <motion.div
            {...reveal}
            className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-[#101B35] via-[#202B59] to-[#4338A8] px-7 py-14 text-center text-white shadow-2xl sm:px-14 sm:py-20"
          >
            <div className="absolute -right-24 -top-24 size-80 rounded-full border border-white/10" />
            <div className="absolute -bottom-40 -left-20 size-96 rounded-full border border-white/10" />

            <div className="relative mx-auto max-w-2xl">
              <div className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-white/10">
                <GraduationCap className="size-7" />
              </div>

              <h2 className="mt-7 text-3xl font-bold tracking-tight sm:text-5xl">
                Your medical journey starts with understanding.
              </h2>

              <p className="mt-5 leading-8 text-white/70">
                Build your foundation, explore your subjects and prepare for
                your next step with MedPrep AI Nepal.
              </p>

              <a
                href="/lessons"
                className="group mt-9 inline-flex items-center gap-2 rounded-xl bg-white px-7 py-4 text-sm font-bold text-[#172345] transition-all hover:-translate-y-1 hover:bg-indigo-50"
              >
                Start exploring
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </a>
            </div>
          </motion.div>
        </section>
      </main>
    </div>
  );
}
