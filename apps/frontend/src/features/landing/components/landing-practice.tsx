'use client';

import { useState } from 'react';
import {
  ArrowRight,
  Check,
  CheckCircle2,
  RotateCcw,
  Sparkles,
} from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import heart from '@/assets/heart.png';

export function LandingPractice() {
  const [answer, setAnswer] = useState<number | null>(null);
  const options = [
    'Right atrium',
    'Left ventricle',
    'Right ventricle',
    'Left atrium',
  ];
  return (
    <div className="grid overflow-hidden rounded-lg border bg-card shadow-card lg:grid-cols-[1.15fr_1fr]">
      <div className="p-6 sm:p-9">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <span className="flex items-center gap-2 text-xs font-semibold text-bio">
            <span className="size-2 rounded-full bg-bio" />
            Biology · Human physiology
          </span>
          <span className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
            Sample question
          </span>
        </div>
        <h3 className="mt-7 max-w-lg text-xl font-bold leading-relaxed">
          Which chamber of the heart pumps oxygenated blood into the aorta?
        </h3>
        <div
          className="mt-6 grid gap-3"
          role="group"
          aria-label="Sample question answers"
        >
          {options.map((option, i) => (
            <Button
              key={option}
              variant="outline"
              disabled={answer !== null}
              onClick={() => setAnswer(i)}
              className={`landing-answer h-auto min-h-12 justify-start gap-3 whitespace-normal px-4 py-3 text-left font-normal ${answer !== null && i === 1 ? 'border-success bg-success/10 text-foreground' : answer === i ? 'border-destructive bg-destructive/10' : ''}`}
            >
              <span className="grid size-6 shrink-0 place-items-center rounded border bg-muted/50 text-xs font-medium text-muted-foreground">
                {String.fromCharCode(65 + i)}
              </span>
              {option}
              {answer !== null && i === 1 && (
                <CheckCircle2 className="ml-auto size-4 shrink-0 text-success" />
              )}
            </Button>
          ))}
        </div>
        <div aria-live="polite" className="mt-5 min-h-16">
          {answer === null ? (
            <p className="flex items-center gap-2 text-xs text-muted-foreground">
              <Check className="size-4 text-accent" />
              Take a moment. Choose your answer.
            </p>
          ) : (
            <>
              <p
                className={`text-sm font-semibold ${answer === 1 ? 'text-success' : 'text-foreground'}`}
              >
                {answer === 1
                  ? 'Exactly right. Well done!'
                  : 'Not quite — the left ventricle is correct.'}
              </p>
              <Button
                variant="ghost"
                size="sm"
                className="mt-1 -ml-3 text-muted-foreground"
                onClick={() => setAnswer(null)}
              >
                <RotateCcw className="size-3" />
                Try again
              </Button>
            </>
          )}
        </div>
      </div>
      <div className="flex flex-col border-t bg-muted/40 p-6 sm:p-9 lg:border-l lg:border-t-0">
        <div className="flex items-center justify-between text-xs">
          <span className="font-semibold">See the science behind it</span>
          <span className="text-muted-foreground">Human heart</span>
        </div>
        <img
          src={heart.src}
          alt="Illustration of the human heart and its chambers"
          loading="lazy"
          width={816}
          height={816}
          className="mx-auto my-5 aspect-square w-full max-w-64 rounded-lg object-contain"
        />
        <div className="mt-auto border-t pt-5">
          <p className="flex items-center gap-2 text-xs font-bold text-accent">
            <Sparkles className="size-4" />A clearer explanation
          </p>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            {answer === null
              ? 'Follow the blood’s journey through the heart, then test what you know.'
              : 'The left ventricle contracts to push oxygen-rich blood through the aortic valve into the aorta. Its thick muscular wall creates the pressure needed to supply the whole body.'}
          </p>
          {answer !== null && (
            <Button
              asChild
              variant="link"
              className="mt-3 h-auto p-0 text-primary"
            >
              <Link href="/practice">
                Keep practicing
                <ArrowRight className="size-4" />
              </Link>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
