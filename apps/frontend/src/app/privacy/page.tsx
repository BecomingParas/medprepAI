import type { Metadata } from 'next';
import Link from 'next/link';
import {
  ArrowLeft,
  ArrowUpRight,
  Database,
  Eye,
  LockKeyhole,
  ShieldCheck,
} from 'lucide-react';

import type { LegalSection } from '@/features/legal/legal-page';

export const metadata: Metadata = {
  title: 'Privacy policy',
  description:
    'Learn what information MedPrep AI Nepal handles and how it is used to provide learning and account features.',
};

const lastUpdated = '2026-11-04';

const sections: LegalSection[] = [
  {
    heading: 'Information we handle',
    paragraphs: [
      'When you use MedPrep AI Nepal, we may handle information you provide, such as account details, messages sent to support, and information or questions you enter into learning features.',
      'If you use an account, we also store learning activity associated with it, such as question attempts and saved questions, so the platform can provide progress and revision features.',
      'The platform and its service providers may process basic technical and session information needed to keep the site working, protect accounts, and diagnose errors.',
    ],
  },
  {
    heading: 'How we use information',
    items: [
      'Provide and maintain the website, account, learning, and study-progress features.',
      'Respond to support requests and communicate important service information.',
      'Protect the platform, investigate misuse, and troubleshoot technical issues.',
      'Understand and improve the reliability and usefulness of the learning experience.',
    ],
  },
  {
    heading: 'When information is shared',
    paragraphs: [
      'We do not sell personal information. Information may be processed by service providers that help us operate the platform, such as authentication, hosting, database, or AI feature providers. They receive information as needed to provide their services.',
      'We do not make study activity public. We may also disclose information when required by law or when reasonably necessary to protect users, the platform, or others.',
    ],
  },
  {
    heading: 'Storage and security',
    paragraphs: [
      'We use reasonable measures intended to protect information, but no online service can guarantee that information is completely secure. We retain information for as long as needed to provide the service, meet applicable obligations, and address legitimate operational needs.',
    ],
  },
  {
    heading: 'Your choices',
    paragraphs: [
      'You can choose what information you submit to optional features. You may contact us to ask about accessing, correcting, or deleting information associated with your account. We may need to retain some information where required or permitted by law.',
    ],
  },
  {
    heading: 'Children and changes to this policy',
    paragraphs: [
      'If you believe a child has provided personal information in a way that should not have happened, please contact us so we can review the request.',
      'We may update this policy as the platform changes. We will revise the date shown above when we update this page. Please review this policy periodically to understand our current practices.',
    ],
  },
];

const sectionIds = sections.map((_, index) => `privacy-section-${index + 1}`);

const trustPoints = [
  {
    icon: Eye,
    title: 'Transparency',
    description: 'Clear information about data handling.',
  },
  {
    icon: LockKeyhole,
    title: 'Account protection',
    description: 'Reasonable measures to protect your account.',
  },
  {
    icon: Database,
    title: 'Responsible use',
    description: 'Information used to operate and improve learning.',
  },
];

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-background">
      {/* Hero */}
      <section className="relative isolate overflow-hidden border-b bg-muted/25">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10"
        >
          <div className="absolute -top-40 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />
          <div className="absolute inset-0 bg-[radial-gradient(hsl(var(--foreground)/0.07)_1px,transparent_1px)] [background-size:24px_24px]" />
        </div>

        <div className="landing-container py-16 sm:py-20 lg:py-24">
          <Link
            href="/"
            className="mb-10 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="size-4" />
            Back to home
          </Link>

          <div className="mx-auto max-w-3xl text-center">
            <div className="mx-auto mb-6 flex size-14 items-center justify-center rounded-2xl border border-primary/20 bg-primary/10 text-primary shadow-sm">
              <ShieldCheck className="size-7" />
            </div>

            <p className="landing-eyebrow">Your privacy matters</p>

            <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              Privacy policy
            </h1>

            <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-muted-foreground sm:text-lg">
              A clear explanation of the information MedPrep AI Nepal handles
              when you use our learning platform, and how we use it responsibly.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-3 text-xs font-medium text-muted-foreground sm:text-sm">
              <span className="inline-flex items-center gap-2 rounded-full border bg-background/80 px-4 py-2">
                <LockKeyhole className="size-3.5 text-primary" />
                Privacy & security
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border bg-background/80 px-4 py-2">
                <Database className="size-3.5 text-primary" />
                Data transparency
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Trust points */}
      <section className="border-b">
        <div className="landing-container grid gap-6 py-8 sm:grid-cols-3 sm:gap-8">
          {trustPoints.map(({ icon: Icon, title, description }) => (
            <div key={title} className="flex items-start gap-3">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Icon className="size-5" />
              </div>
              <div>
                <h2 className="text-sm font-semibold">{title}</h2>
                <p className="mt-1 text-sm leading-6 text-muted-foreground">
                  {description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Policy content */}
      <section className="landing-container py-14 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-20">
          {/* Table of contents */}
          <aside className="lg:sticky lg:top-28 lg:h-fit">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
              On this page
            </p>

            <nav
              aria-label="Privacy policy sections"
              className="mt-5 flex flex-wrap gap-2 lg:flex-col lg:gap-1"
            >
              {sections.map((section, index) => (
                <a
                  key={section.heading}
                  href={`#${sectionIds[index]}`}
                  className="rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                >
                  <span className="mr-2 font-mono text-xs text-primary/70">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  {section.heading}
                </a>
              ))}
            </nav>

            <div className="mt-8 hidden rounded-xl border bg-muted/30 p-4 lg:block">
              <ShieldCheck className="size-5 text-primary" />
              <p className="mt-3 text-sm font-semibold">
                Questions about privacy?
              </p>
              <p className="mt-1 text-xs leading-5 text-muted-foreground">
                Contact our team if you need help understanding how your
                information is handled.
              </p>
              <Link
                href="/contact"
                className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
              >
                Contact us <ArrowUpRight className="size-3.5" />
              </Link>
            </div>
          </aside>

          {/* Article */}
          <article className="min-w-0">
            <div className="mb-10 border-b pb-8">
              <p className="text-sm font-medium text-primary">
                MedPrep AI Nepal
              </p>
              <h2 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
                Understanding your privacy
              </h2>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-muted-foreground">
                This policy describes the information we handle, why we handle
                it, and the choices available to you when using our platform.
              </p>
              <p className="mt-3 text-xs text-muted-foreground">
                Last updated{' '}
                <time dateTime={lastUpdated}>November 4, 2026</time>
              </p>
            </div>

            <div className="space-y-12">
              {sections.map((section, index) => (
                <section
                  key={section.heading}
                  id={sectionIds[index]}
                  aria-labelledby={`${sectionIds[index]}-heading`}
                  className="scroll-mt-28"
                >
                  <div className="flex items-start gap-4">
                    <span className="flex size-9 shrink-0 items-center justify-center rounded-xl border bg-muted/50 font-mono text-xs font-semibold text-primary">
                      {String(index + 1).padStart(2, '0')}
                    </span>

                    <div className="min-w-0 flex-1">
                      <h3
                        id={`${sectionIds[index]}-heading`}
                        className="text-lg font-semibold tracking-tight sm:text-xl"
                      >
                        {section.heading}
                      </h3>

                      <div className="mt-4 space-y-4 text-sm leading-8 text-muted-foreground sm:text-[15px]">
                        {section.paragraphs?.map((paragraph) => (
                          <p key={paragraph}>{paragraph}</p>
                        ))}

                        {section.items && (
                          <ul className="space-y-3">
                            {section.items.map((item) => (
                              <li key={item} className="flex gap-3">
                                <span className="mt-3 size-1.5 shrink-0 rounded-full bg-primary" />
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </div>
                  </div>
                </section>
              ))}
            </div>

            {/* Contact callout */}
            <div className="mt-16 overflow-hidden rounded-2xl border bg-muted/30 p-6 sm:p-8">
              <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                <div className="max-w-lg">
                  <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <ShieldCheck className="size-5" />
                  </div>
                  <h3 className="mt-4 text-lg font-semibold">
                    Still have questions?
                  </h3>
                  <p className="mt-2 text-sm leading-7 text-muted-foreground">
                    If you have questions about your information or this policy,
                    our team is here to help.
                  </p>
                </div>

                <Link
                  href="/contact"
                  className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-all hover:opacity-90"
                >
                  Contact our team
                  <ArrowUpRight className="size-4" />
                </Link>
              </div>
            </div>
          </article>
        </div>
      </section>
    </main>
  );
}
