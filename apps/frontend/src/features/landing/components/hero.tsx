'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import {
  ArrowRight,
  Atom,
  BrainCircuit,
  Check,
  Dna,
  Eye,
  FlaskConical,
  Sparkles,
  Stethoscope,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import landingHeart from '@/assets/landing-heart.jpg';

const ease = [0.22, 1, 0.36, 1] as const;

const heroContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.13,
      delayChildren: 0.15,
    },
  },
};

const heroItem = {
  hidden: {
    opacity: 0,
    y: 28,
    filter: 'blur(8px)',
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.8,
      ease,
    },
  },
};

export function HomeHeroSection() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      aria-labelledby="hero-title"
      className="relative isolate overflow-hidden bg-[#080F20] text-white"
    >
      {/* Background atmosphere */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_75%_45%,rgba(79,70,229,0.19),transparent_48%)]" />

        <div className="absolute -left-40 top-20 h-[500px] w-[500px] rounded-full bg-indigo-600/10 blur-[130px]" />

        <motion.div
          className="absolute -right-40 top-0 h-[600px] w-[600px] rounded-full bg-teal-500/10 blur-[150px]"
          animate={
            shouldReduceMotion
              ? undefined
              : {
                  x: [0, -35, 0],
                  y: [0, 30, 0],
                }
          }
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />

        {/* Subtle grid */}
        <div className="absolute inset-0 opacity-[0.045] [background-image:linear-gradient(rgba(255,255,255,0.5)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.5)_1px,transparent_1px)] [background-size:64px_64px]" />

        {/* Bottom gradient */}
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#080F20] to-transparent" />
      </div>

      <div className="landing-container relative grid min-h-[680px] items-center gap-12 py-16 sm:py-20 lg:min-h-[760px] lg:grid-cols-[1fr_1.05fr] lg:gap-8 lg:py-24">
        {/* LEFT: Hero content */}
        <motion.div
          variants={heroContainer}
          initial={shouldReduceMotion ? false : 'hidden'}
          animate="visible"
          className="relative z-20 max-w-2xl"
        >
          {/* Announcement */}
          <motion.div variants={heroItem}>
            <div className="inline-flex items-center gap-2 rounded-full border border-teal-400/20 bg-teal-400/[0.07] px-4 py-2 text-[11px] font-semibold tracking-wide text-teal-300 shadow-lg shadow-teal-500/5">
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-teal-400 opacity-60" />
                <span className="relative inline-flex size-2 rounded-full bg-teal-400" />
              </span>
              BUILT FOR NEPAL'S FUTURE DOCTORS
              <Sparkles className="ml-1 size-3.5" />
            </div>
          </motion.div>

          {/* Headline */}
          <motion.div variants={heroItem}>
            <h1
              id="hero-title"
              className="mt-8 text-5xl font-extrabold leading-[1.08] tracking-[-0.045em] sm:text-6xl lg:text-[4.5rem]"
            >
              Your journey
              <br />
              to medicine
              <br />
              starts with{' '}
              <span className="relative inline-block">
                <span className="animate-gradient-flow bg-gradient-to-r from-teal-300 via-indigo-300 to-teal-300 bg-clip-text text-transparent">
                  understanding.
                </span>
                <motion.span
                  aria-hidden="true"
                  className="absolute -bottom-2 left-0 h-[3px] rounded-full bg-gradient-to-r from-teal-400 to-indigo-400"
                  initial={{ width: 0 }}
                  animate={{ width: '100%' }}
                  transition={{
                    delay: shouldReduceMotion ? 0 : 1.4,
                    duration: 0.8,
                    ease,
                  }}
                />
              </span>
            </h1>
          </motion.div>

          {/* Description */}
          <motion.p
            variants={heroItem}
            className="mt-8 max-w-lg text-base leading-8 text-slate-300 sm:text-lg"
          >
            Master Physics, Chemistry and Biology with visual lessons,
            intelligent practice and an AI-powered study companion. Make every
            concept count.
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={heroItem}
            className="mt-9 flex flex-col gap-3 sm:flex-row"
          >
            <Button
              asChild
              size="lg"
              className="group h-14 rounded-xl bg-gradient-to-r from-teal-400 to-teal-300 px-7 text-sm font-bold text-slate-950 shadow-xl shadow-teal-500/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-teal-500/30 hover:brightness-110"
            >
              <Link href="/login?mode=register">
                Start learning free
                <ArrowRight className="ml-2 size-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </Button>

            <Button
              asChild
              size="lg"
              variant="outline"
              className="h-14 rounded-xl border-white/15 bg-white/[0.04] px-7 text-sm font-semibold text-white backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-white/30 hover:bg-white/10 hover:text-white"
            >
              <a href="#try-it">
                <Eye className="mr-2 size-4" />
                Explore a sample question
              </a>
            </Button>
          </motion.div>

          {/* Trust points */}
          <motion.div
            variants={heroItem}
            className="mt-9 flex flex-wrap gap-x-6 gap-y-3"
          >
            {[
              'Physics · Chemistry · Biology',
              'Visual-first learning',
              'Learn at your own pace',
            ].map((item) => (
              <span
                key={item}
                className="flex items-center gap-2 text-xs font-medium text-slate-400"
              >
                <Check className="size-3.5 text-teal-400" />
                {item}
              </span>
            ))}
          </motion.div>

          {/* Small academic identity */}
          <motion.div
            variants={heroItem}
            className="mt-12 flex items-center gap-3 border-t border-white/10 pt-6"
          >
            <div className="grid size-10 place-items-center rounded-xl border border-white/10 bg-white/[0.05]">
              <Stethoscope className="size-5 text-teal-300" />
            </div>

            <div>
              <p className="text-xs font-semibold text-white">
                MedPrep AI Nepal
              </p>
              <p className="mt-1 text-[10px] text-slate-500">
                Independent medical entrance learning platform
              </p>
            </div>
          </motion.div>
        </motion.div>

        {/* RIGHT: Cinematic medical visual */}
        <motion.div
          initial={
            shouldReduceMotion ? false : { opacity: 0, scale: 0.88, x: 35 }
          }
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{
            duration: 1.2,
            delay: shouldReduceMotion ? 0 : 0.25,
            ease,
          }}
          className="relative mx-auto flex w-full max-w-[580px] items-center justify-center lg:ml-auto"
        >
          {/* Orbital rings */}
          <motion.div
            aria-hidden="true"
            className="absolute aspect-square w-[112%] rounded-full border border-white/[0.07]"
            animate={shouldReduceMotion ? undefined : { rotate: 360 }}
            transition={{
              duration: 65,
              repeat: Infinity,
              ease: 'linear',
            }}
          >
            <span className="absolute left-[18%] top-[10%] size-2 rounded-full bg-teal-300 shadow-[0_0_18px_5px_rgba(45,212,191,0.45)]" />
          </motion.div>

          <motion.div
            aria-hidden="true"
            className="absolute aspect-square w-[94%] rounded-full border border-dashed border-indigo-300/15"
            animate={shouldReduceMotion ? undefined : { rotate: -360 }}
            transition={{
              duration: 90,
              repeat: Infinity,
              ease: 'linear',
            }}
          >
            <span className="absolute bottom-[15%] right-[8%] size-2 rounded-full bg-indigo-300 shadow-[0_0_16px_5px_rgba(129,140,248,0.5)]" />
          </motion.div>

          {/* Main glow */}
          <div
            aria-hidden="true"
            className="absolute size-[75%] rounded-full bg-indigo-500/20 blur-[100px]"
          />

          {/* Main image container */}
          <motion.div
            className="relative aspect-[4/4.5] w-[88%] overflow-hidden rounded-[2rem] border border-white/15 bg-[#111B31] shadow-[0_30px_100px_-25px_rgba(0,0,0,0.8)] sm:w-[78%]"
            animate={
              shouldReduceMotion
                ? undefined
                : {
                    y: [0, -10, 0],
                  }
            }
            transition={{
              duration: 7,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            <Image
              src={landingHeart}
              alt="Detailed anatomical illustration of the human heart for biology learning"
              fill
              priority
              sizes="(max-width: 768px) 85vw, 45vw"
              className="object-cover object-center"
            />

            {/* Image treatment */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#080F20] via-transparent to-[#080F20]/10" />
            <div className="absolute inset-0 bg-indigo-900/10 mix-blend-color" />

            {/* Image label */}
            <div className="absolute bottom-6 left-6 right-6">
              <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-teal-300">
                <span className="size-1.5 rounded-full bg-teal-300" />
                Explore human biology
              </div>

              <p className="mt-2 text-2xl font-bold tracking-tight text-white">
                The human heart.
              </p>

              <p className="mt-1 text-xs text-white/60">
                Biology · Human physiology
              </p>
            </div>

            {/* Image corner decoration */}
            <div className="absolute right-5 top-5 rounded-full border border-white/20 bg-black/20 px-3 py-1.5 text-[9px] font-semibold tracking-wider text-white/80 backdrop-blur-xl">
              VISUAL LEARNING
            </div>
          </motion.div>

          {/* Floating card: AI */}
          <motion.div
            className="absolute -left-2 top-[18%] z-20 hidden rounded-2xl border border-white/15 bg-[#17243B]/90 p-4 shadow-2xl backdrop-blur-xl sm:block"
            animate={shouldReduceMotion ? undefined : { y: [0, -9, 0] }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            <div className="flex items-center gap-3">
              <div className="grid size-10 place-items-center rounded-xl bg-indigo-500/20 text-indigo-300">
                <BrainCircuit className="size-5" />
              </div>
              <div>
                <p className="text-xs font-bold text-white">AI Study Buddy</p>
                <p className="mt-1 text-[10px] text-slate-400">
                  Understand concepts
                </p>
              </div>
              <Sparkles className="ml-2 size-4 text-teal-300" />
            </div>
          </motion.div>

          {/* Floating card: subject */}
          <motion.div
            className="absolute -right-2 top-[34%] z-20 hidden rounded-2xl border border-white/15 bg-[#17243B]/90 p-3 shadow-2xl backdrop-blur-xl sm:block"
            animate={shouldReduceMotion ? undefined : { y: [0, 10, 0] }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 0.5,
            }}
          >
            <div className="flex items-center gap-3">
              <div className="grid size-9 place-items-center rounded-xl bg-teal-500/15 text-teal-300">
                <Dna className="size-5" />
              </div>
              <div>
                <p className="text-xs font-bold text-white">Biology</p>
                <p className="mt-1 text-[10px] text-slate-400">
                  Visual concepts
                </p>
              </div>
            </div>
          </motion.div>

          {/* Floating card: PCB */}
          <motion.div
            className="absolute -bottom-5 right-[8%] z-20 hidden rounded-2xl border border-white/15 bg-[#17243B]/95 p-4 shadow-2xl backdrop-blur-xl sm:block"
            animate={shouldReduceMotion ? undefined : { y: [0, -8, 0] }}
            transition={{
              duration: 5.5,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 1,
            }}
          >
            <div className="flex items-center gap-3">
              <div className="flex -space-x-2">
                <span className="grid size-8 place-items-center rounded-full border-2 border-[#17243B] bg-indigo-500 text-white">
                  <Atom className="size-4" />
                </span>
                <span className="grid size-8 place-items-center rounded-full border-2 border-[#17243B] bg-teal-500 text-white">
                  <Dna className="size-4" />
                </span>
                <span className="grid size-8 place-items-center rounded-full border-2 border-[#17243B] bg-orange-500 text-white">
                  <FlaskConical className="size-4" />
                </span>
              </div>
              <div>
                <p className="text-xs font-bold text-white">One platform</p>
                <p className="mt-1 text-[10px] text-slate-400">
                  Physics · Chemistry · Biology
                </p>
              </div>
            </div>
          </motion.div>

          {/* Decorative particles */}
          <motion.span
            aria-hidden="true"
            className="absolute right-[10%] top-[12%] size-2 rounded-full bg-teal-300 shadow-[0_0_20px_5px_rgba(45,212,191,0.4)]"
            animate={
              shouldReduceMotion
                ? undefined
                : { opacity: [0.3, 1, 0.3], scale: [1, 1.5, 1] }
            }
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />

          <motion.span
            aria-hidden="true"
            className="absolute bottom-[18%] left-[4%] size-1.5 rounded-full bg-indigo-300 shadow-[0_0_16px_4px_rgba(129,140,248,0.5)]"
            animate={
              shouldReduceMotion
                ? undefined
                : { opacity: [0.2, 1, 0.2], scale: [1, 1.8, 1] }
            }
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 1,
            }}
          />
        </motion.div>
      </div>

      {/* Bottom scroll indicator */}
      <motion.a
        href="#subjects"
        aria-label="Scroll to subjects"
        className="absolute bottom-5 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-slate-500 transition-colors hover:text-teal-300 lg:flex"
        animate={shouldReduceMotion ? undefined : { y: [0, 6, 0] }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        <span className="text-[9px] font-semibold uppercase tracking-[0.25em]">
          Discover
        </span>
        <span className="h-8 w-px bg-gradient-to-b from-teal-400 to-transparent" />
      </motion.a>
    </section>
  );
}
