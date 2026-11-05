'use client';

import { ContactForm } from '@/features/contact/contact-form';
import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  GraduationCap,
  Mail,
  MessageCircle,
  Send,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';

const contactFeatures = [
  {
    icon: MessageCircle,
    title: 'Questions & support',
    description:
      'Need help navigating the platform or understanding a learning feature?',
  },
  {
    icon: BookOpen,
    title: 'Suggestions & feedback',
    description:
      'Share your ideas to help us make medical entrance preparation better.',
  },
  {
    icon: GraduationCap,
    title: 'Learning resources',
    description:
      'Have ideas about subjects, practice questions or educational content?',
  },
];

export default function ContactPage() {
  const reduceMotion = useReducedMotion();

  const reveal = {
    initial: reduceMotion ? false : { opacity: 0, y: 25 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.15 },
    transition: { duration: 0.65, ease: 'easeOut' as const },
  };

  return (
    <div className="landing-page min-h-screen overflow-hidden">
      <main id="main-content">
        {/* HERO / CONTACT */}
        <section className="relative isolate">
          {/* Background decorations */}
          <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
            <div className="absolute -left-40 -top-32 size-[450px] rounded-full bg-indigo-500/[0.09] blur-[110px]" />
            <div className="absolute -right-40 top-60 size-[450px] rounded-full bg-teal-500/[0.08] blur-[110px]" />
            <div className="absolute inset-0 bg-[radial-gradient(hsl(var(--foreground)/0.07)_1px,transparent_1px)] [background-size:24px_24px]" />
          </div>

          <div className="landing-container py-16 sm:py-24">
            {/* Heading */}
            <motion.header
              {...reveal}
              className="mx-auto mb-14 max-w-2xl text-center"
            >
              <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/20 bg-indigo-500/[0.06] px-4 py-2 text-sm font-medium text-indigo-600 dark:text-indigo-400">
                <Sparkles className="size-4" />
                We'd love to hear from you
              </div>

              <h1 className="mt-7 text-4xl font-bold tracking-tight sm:text-6xl">
                Let's start a
                <span className="block bg-gradient-to-r from-indigo-600 via-violet-500 to-teal-500 bg-clip-text text-transparent">
                  conversation.
                </span>
              </h1>

              <p className="mx-auto mt-6 max-w-xl text-base leading-8 text-muted-foreground sm:text-lg">
                Have a question, suggestion or feedback about MedPrep AI Nepal?
                We're here to listen. Tell us what's on your mind.
              </p>
            </motion.header>

            {/* Main grid */}
            <div className="mx-auto grid max-w-6xl items-stretch gap-7 lg:grid-cols-[0.85fr_1.15fr]">
              {/* LEFT PANEL */}
              <motion.aside
                {...reveal}
                className="relative flex flex-col overflow-hidden rounded-[2rem] bg-gradient-to-br from-[#111C38] via-[#202B59] to-[#4338A8] p-7 text-white shadow-2xl shadow-indigo-950/15 sm:p-10"
              >
                {/* Decorative circles */}
                <div className="pointer-events-none absolute -right-24 -top-20 size-80 rounded-full border border-white/10" />
                <div className="pointer-events-none absolute -bottom-36 -left-20 size-96 rounded-full border border-white/10" />
                <div className="pointer-events-none absolute right-10 top-1/3 size-40 rounded-full bg-violet-400/20 blur-3xl" />

                <div className="relative">
                  <div className="flex size-14 items-center justify-center rounded-2xl border border-white/10 bg-white/10 backdrop-blur">
                    <Mail className="size-7" />
                  </div>

                  <h2 className="mt-8 text-2xl font-bold sm:text-3xl">
                    Every great idea starts with a conversation.
                  </h2>

                  <p className="mt-4 text-sm leading-7 text-white/70">
                    Whether you're a student, educator or someone who believes
                    in better learning experiences, your feedback matters.
                  </p>

                  <div className="mt-10 space-y-7">
                    {contactFeatures.map((feature, index) => {
                      const Icon = feature.icon;

                      return (
                        <motion.div
                          key={feature.title}
                          initial={
                            reduceMotion ? false : { opacity: 0, x: -15 }
                          }
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{
                            delay: reduceMotion ? 0 : index * 0.12,
                          }}
                          className="flex gap-4"
                        >
                          <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-white/10">
                            <Icon className="size-5" />
                          </div>

                          <div>
                            <h3 className="text-sm font-semibold">
                              {feature.title}
                            </h3>
                            <p className="mt-1 text-xs leading-6 text-white/60">
                              {feature.description}
                            </p>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>

                <div className="relative mt-auto pt-12">
                  <div className="rounded-2xl border border-white/10 bg-white/[0.07] p-5 backdrop-blur-sm">
                    <div className="flex items-center gap-3">
                      <div className="rounded-xl bg-teal-400/15 p-2.5 text-teal-300">
                        <ShieldCheck className="size-5" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold">
                          Your voice matters
                        </p>
                        <p className="mt-1 text-xs text-white/60">
                          We value thoughtful feedback and suggestions.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.aside>

              {/* RIGHT PANEL - EXISTING FORM */}
              <motion.section
                {...reveal}
                transition={{
                  duration: 0.7,
                  delay: reduceMotion ? 0 : 0.15,
                  ease: 'easeOut',
                }}
                className="rounded-[2rem] border bg-card p-6 shadow-xl shadow-indigo-950/[0.04] sm:p-9"
              >
                <div className="mb-8 flex items-start justify-between gap-4">
                  <div>
                    <div className="inline-flex items-center gap-2 text-sm font-semibold text-indigo-600 dark:text-indigo-400">
                      <Send className="size-4" />
                      Send us a message
                    </div>

                    <h2 className="mt-3 text-2xl font-bold tracking-tight">
                      Get in touch
                    </h2>

                    <p className="mt-2 text-sm leading-6 text-muted-foreground">
                      Fill in the details below and share your message.
                    </p>
                  </div>

                  <div className="hidden rounded-2xl bg-indigo-500/10 p-3 text-indigo-600 dark:text-indigo-400 sm:block">
                    <MessageCircle className="size-6" />
                  </div>
                </div>

                <div className="border-t pt-7">
                  <ContactForm />
                </div>

                <div className="mt-7 flex items-start gap-3 rounded-xl bg-muted/50 p-4">
                  <ShieldCheck className="mt-0.5 size-4 shrink-0 text-teal-600" />
                  <p className="text-xs leading-6 text-muted-foreground">
                    Please avoid sharing passwords, payment details or other
                    sensitive personal information in your message.
                  </p>
                </div>
              </motion.section>
            </div>
          </div>
        </section>

        {/* BOTTOM TRUST STRIP */}
        <section className="border-y bg-muted/30">
          <div className="landing-container grid gap-6 py-10 sm:grid-cols-3">
            {[
              {
                icon: CheckCircle2,
                title: 'Student focused',
                description: 'Built around learning needs.',
              },
              {
                icon: ShieldCheck,
                title: 'Transparent',
                description: 'Clear and honest communication.',
              },
              {
                icon: GraduationCap,
                title: 'Education first',
                description: 'Making preparation more accessible.',
              },
            ].map((item, index) => {
              const Icon = item.icon;

              return (
                <motion.div
                  key={item.title}
                  {...reveal}
                  transition={{
                    duration: 0.5,
                    delay: reduceMotion ? 0 : index * 0.1,
                  }}
                  className="flex items-center justify-center gap-3"
                >
                  <div className="rounded-xl bg-teal-500/10 p-3 text-teal-600 dark:text-teal-400">
                    <Icon className="size-5" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold">{item.title}</p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* CTA */}
        <section className="landing-container py-16 sm:py-20">
          <motion.div
            {...reveal}
            className="rounded-[2rem] border bg-card px-7 py-12 text-center shadow-sm sm:px-12"
          >
            <div className="mx-auto flex size-12 items-center justify-center rounded-2xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
              <GraduationCap className="size-6" />
            </div>

            <h2 className="mt-6 text-2xl font-bold sm:text-3xl">
              Ready to continue learning?
            </h2>

            <p className="mx-auto mt-3 max-w-lg text-sm leading-7 text-muted-foreground">
              Explore your subjects and discover a more visual approach to
              MECEE-BL preparation.
            </p>

            <a
              href="/subjects"
              className="group mt-7 inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-6 py-3.5 text-sm font-semibold text-white transition-all hover:-translate-y-1 hover:bg-indigo-700"
            >
              Explore subjects
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </a>
          </motion.div>
        </section>
      </main>
    </div>
  );
}
