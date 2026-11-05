'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowDown, ChevronDown, MessageCircle } from 'lucide-react';
import { faqs } from '../data/faqs';

export function FaqSection() {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);

  return (
    <section id="questions" className="relative isolate overflow-hidden">
      {/* Background effects */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-0 top-1/4 size-72 rounded-full bg-accent/5 blur-[100px]" />
        <div className="absolute bottom-0 right-0 size-80 rounded-full bg-primary/5 blur-[120px]" />
      </div>

      <div className="landing-container grid gap-12 py-20 sm:py-24 md:grid-cols-[0.8fr_1.2fr] md:gap-16 lg:gap-24">
        {/* Left content */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="flex flex-col md:sticky md:top-32 md:h-fit"
        >
          <div className="mb-5 flex items-center gap-2">
            <span className="size-2 rounded-full bg-accent animate-pulse" />
            <p className="landing-eyebrow">A few things to know</p>
          </div>

          <h2 className="max-w-md text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            Curious?
            <br />
            <span className="text-muted-foreground">Good.</span>
          </h2>

          <p className="mt-5 max-w-sm text-sm leading-7 text-muted-foreground sm:text-base">
            A little clarity before you begin. Find answers to the questions you
            might have and get started with confidence.
          </p>

          <div className="mt-9 flex items-center gap-3 text-sm text-muted-foreground">
            <div className="flex size-10 items-center justify-center rounded-full border bg-background">
              <MessageCircle className="size-4 text-accent" />
            </div>
            <span>Everything you need to know.</span>
          </div>

          <ArrowDown
            className="mt-12 hidden size-7 text-accent/70 md:block"
            strokeWidth={1.2}
          />
        </motion.div>

        {/* FAQ accordion */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.1,
              },
            },
          }}
          className="flex flex-col gap-3"
        >
          {faqs.map((faq, index) => {
            const isOpen = activeIndex === index;
            const answerId = `faq-answer-${index}`;

            return (
              <motion.div
                key={faq.question}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: {
                      duration: 0.45,
                      ease: 'easeOut',
                    },
                  },
                }}
                className={`group overflow-hidden rounded-2xl border transition-colors duration-300 ${
                  isOpen
                    ? 'border-accent/30 bg-muted/60'
                    : 'border-border/70 bg-background/60 hover:border-accent/30 hover:bg-muted/30'
                }`}
              >
                <button
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={answerId}
                  onClick={() => setActiveIndex(isOpen ? null : index)}
                  className="flex w-full items-center justify-between gap-5 px-5 py-5 text-left sm:px-6 sm:py-6"
                >
                  <div className="flex items-start gap-4">
                    <span
                      className={`mt-0.5 font-mono text-xs transition-colors ${
                        isOpen ? 'text-accent' : 'text-muted-foreground/50'
                      }`}
                    >
                      {String(index + 1).padStart(2, '0')}
                    </span>

                    <span
                      className={`text-sm font-semibold leading-6 transition-colors sm:text-base ${
                        isOpen
                          ? 'text-foreground'
                          : 'text-foreground/80 group-hover:text-foreground'
                      }`}
                    >
                      {faq.question}
                    </span>
                  </div>

                  <span
                    className={`flex size-9 shrink-0 items-center justify-center rounded-full border transition-all duration-300 ${
                      isOpen
                        ? 'rotate-180 border-accent/30 bg-accent text-accent-foreground'
                        : 'border-border bg-background text-muted-foreground group-hover:border-accent/40'
                    }`}
                  >
                    <ChevronDown className="size-4" />
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="answer"
                      id={answerId}
                      initial={{
                        height: 0,
                        opacity: 0,
                      }}
                      animate={{
                        height: 'auto',
                        opacity: 1,
                      }}
                      exit={{
                        height: 0,
                        opacity: 0,
                      }}
                      transition={{
                        height: {
                          duration: 0.35,
                          ease: [0.22, 1, 0.36, 1],
                        },
                        opacity: {
                          duration: 0.25,
                        },
                      }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-6 pl-12 sm:px-6 sm:pb-7 sm:pl-14">
                        <motion.p
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 5 }}
                          transition={{
                            duration: 0.3,
                            delay: 0.08,
                          }}
                          className="max-w-xl text-sm leading-7 text-muted-foreground"
                        >
                          {faq.answer}
                        </motion.p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
