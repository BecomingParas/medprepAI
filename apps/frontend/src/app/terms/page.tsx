import type { Metadata } from 'next';
import Link from 'next/link';
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  CalendarDays,
  CheckCircle2,
  FileText,
  ShieldCheck,
} from 'lucide-react';

import type { LegalSection } from '@/features/legal/legal-page';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description:
    'Read the terms that apply when using the MedPrep AI Nepal learning platform.',
};

const sections: LegalSection[] = [
  {
    heading: 'Using the service',
    paragraphs: [
      'MedPrep AI Nepal provides online learning and preparation resources, including lessons, practice questions, revision features, and AI-powered study assistance. By accessing or using the platform, you agree to these terms. If you do not agree, do not use the service.',
      'You are responsible for using the service lawfully and for keeping your account credentials secure. Do not impersonate others, interfere with the platform, attempt to access accounts or systems without permission, or use the service to distribute harmful or unlawful material.',
    ],
  },
  {
    heading: 'Educational information',
    paragraphs: [
      'The platform is for educational purposes only. It is not medical advice, clinical guidance, or a substitute for advice from a qualified professional. Do not rely on study materials or AI-generated responses to make healthcare decisions.',
      'AI-generated and sample learning material can be incomplete or incorrect. Check important information against reliable educational sources. Questions are sample or AI-generated unless explicitly identified as verified past-paper questions.',
      'MedPrep AI Nepal is an independent educational platform and is not affiliated with the Medical Education Commission.',
    ],
  },
  {
    heading: 'Accounts and your content',
    paragraphs: [
      'Some features require an account. You agree to provide accurate information when creating one and to tell us if you believe your account has been used without authorization.',
      'You retain rights to content you submit. You give us permission to process that content as needed to operate the features you choose, such as responding to a study prompt or support request. Do not submit content you do not have the right to share.',
    ],
  },
  {
    heading: 'Platform materials',
    paragraphs: [
      'The platform, its design, and materials made available through it are protected by applicable intellectual-property laws. You may use the learning resources for personal, non-commercial study. You may not copy, redistribute, sell, or use platform materials to build a competing service without permission, except where applicable law allows.',
    ],
  },
  {
    heading: 'Availability and changes',
    paragraphs: [
      'We work to keep the service useful and available, but features and content may change, be interrupted, or be removed. We may suspend access when reasonably needed to protect the platform, its users, or comply with law.',
    ],
  },
  {
    heading: 'Disclaimers and liability',
    paragraphs: [
      'The service is provided on an “as available” basis. To the extent permitted by applicable law, we do not guarantee that the platform will be uninterrupted, error-free, or suitable for a particular purpose, and we disclaim implied warranties that cannot be excluded by law.',
      'To the extent permitted by applicable law, MedPrep AI Nepal is not liable for indirect or consequential loss arising from use of the service or reliance on its learning materials. Nothing in these terms limits liability where such a limit is not permitted by law.',
    ],
  },
  {
    heading: 'Updates and contact',
    paragraphs: [
      'We may update these terms as the service changes. The date at the top shows when this page was last updated. If you continue using the service after an update, the revised terms apply to your continued use.',
      'If you have questions about these terms, please contact us using the contact page.',
    ],
  },
];

const contents = sections.map((section, index) => ({
  id: `section-${index + 1}`,
  label: section.heading,
  number: String(index + 1).padStart(2, '0'),
}));

export default function TermsPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-background">
      {/* Background atmosphere */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[500px] bg-[radial-gradient(ellipse_at_50%_0%,hsl(var(--primary)/0.09),transparent_70%)]"
      />

      {/* Hero */}
      <section className="border-b border-border/60">
        <div className="landing-container py-14 sm:py-20">
          <Link
            href="/home"
            className="group mb-10 inline-flex items-center gap-2 text-xs font-semibold text-muted-foreground transition-colors hover:text-primary"
          >
            <ArrowLeft className="size-3.5 transition-transform group-hover:-translate-x-1" />
            Back to home
          </Link>

          <div className="max-w-3xl">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/15 bg-primary/[0.06] px-3.5 py-2 text-[10px] font-bold uppercase tracking-[0.16em] text-primary">
              <ShieldCheck className="size-3.5" />
              Legal information
            </div>

            <h1 className="text-balance text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
              Terms of
              <span className="block text-muted-foreground">service.</span>
            </h1>

            <p className="mt-6 max-w-2xl text-sm leading-7 text-muted-foreground sm:text-base sm:leading-8">
              Clear expectations create a better learning experience. Here's
              what you need to know when using MedPrep AI Nepal.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-5 text-xs text-muted-foreground">
              <span className="inline-flex items-center gap-2">
                <CalendarDays className="size-4 text-primary" />
                Last updated: November 4, 2026
              </span>

              <span className="inline-flex items-center gap-2">
                <FileText className="size-4 text-primary" />7 sections
              </span>

              <span className="inline-flex items-center gap-2">
                <BookOpen className="size-4 text-primary" />5 min read
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Document */}
      <section className="landing-container py-12 sm:py-16">
        <div className="grid items-start gap-10 lg:grid-cols-[250px_minmax(0,1fr)] lg:gap-16">
          {/* Table of contents */}
          <aside className="lg:sticky lg:top-28">
            <div className="rounded-2xl border border-border/70 bg-card/70 p-5 shadow-sm">
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-muted-foreground">
                On this page
              </p>

              <nav aria-label="Terms of service contents" className="mt-5">
                <ol className="space-y-1">
                  {contents.map((item) => (
                    <li key={item.id}>
                      <a
                        href={`#${item.id}`}
                        className="group flex items-start gap-3 rounded-lg px-2.5 py-2.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-primary/[0.06] hover:text-primary"
                      >
                        <span className="font-mono text-[10px] text-muted-foreground/50 group-hover:text-primary">
                          {item.number}
                        </span>
                        <span>{item.label}</span>
                      </a>
                    </li>
                  ))}
                </ol>
              </nav>

              <div className="mt-6 border-t border-border/70 pt-5">
                <p className="text-xs leading-6 text-muted-foreground">
                  Have questions about these terms?
                </p>
                <Button
                  asChild
                  variant="outline"
                  size="sm"
                  className="mt-3 w-full justify-between rounded-xl"
                >
                  <Link href="/contact">
                    Contact us
                    <ArrowUpRight className="size-3.5" />
                  </Link>
                </Button>
              </div>
            </div>
          </aside>

          {/* Legal content */}
          <div className="min-w-0">
            <div className="mb-8 flex items-center justify-between gap-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-primary">
                  Terms & conditions
                </p>
                <h2 className="mt-2 text-xl font-bold tracking-tight sm:text-2xl">
                  Understanding our agreement
                </h2>
              </div>

              <div className="hidden size-11 shrink-0 place-items-center rounded-xl border bg-card sm:grid">
                <FileText className="size-5 text-muted-foreground" />
              </div>
            </div>

            <div className="overflow-hidden rounded-2xl border border-border/70 bg-card shadow-sm">
              {sections.map((section, index) => (
                <article
                  key={section.heading}
                  id={`section-${index + 1}`}
                  className="scroll-mt-28 border-b border-border/60 p-6 last:border-b-0 sm:p-8"
                >
                  <div className="flex items-start gap-4">
                    <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-primary/[0.07] font-mono text-xs font-bold text-primary">
                      {String(index + 1).padStart(2, '0')}
                    </span>

                    <div className="min-w-0 flex-1">
                      <h3 className="text-base font-bold tracking-tight text-foreground sm:text-lg">
                        {section.heading}
                      </h3>

                      <div className="mt-4 space-y-4">
                        {section.paragraphs?.map((paragraph) => (
                          <p
                            key={paragraph}
                            className="text-sm leading-7 text-muted-foreground sm:text-[15px] sm:leading-8"
                          >
                            {paragraph}
                          </p>
                        ))}
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {/* Closing note */}
            <div className="mt-8 flex items-start gap-3 rounded-2xl border border-teal-500/15 bg-teal-500/[0.045] p-5">
              <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-teal-600" />

              <div>
                <p className="text-sm font-semibold text-foreground">
                  Transparency matters.
                </p>
                <p className="mt-1 text-xs leading-6 text-muted-foreground">
                  We want you to understand how the platform works and what to
                  expect when using our learning resources.
                </p>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-border/60 pt-6">
              <p className="text-xs text-muted-foreground">
                Need clarification? We're here to help.
              </p>

              <Button asChild size="sm" className="rounded-xl">
                <Link href="/contact">
                  Get in touch
                  <ArrowRight className="ml-2 size-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
