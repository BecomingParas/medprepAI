import Link from 'next/link';

export type LegalSection = {
  heading: string;
  paragraphs?: string[];
  items?: string[];
};

type LegalPageProps = {
  eyebrow: string;
  title: string;
  description: string;
  sections: LegalSection[];
};

export function LegalPage({
  eyebrow,
  title,
  description,
  sections,
}: LegalPageProps) {
  return (
    <div className="landing-page min-h-screen">
      <main id="main-content">
        <section className="relative isolate overflow-hidden">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
          >
            <div className="absolute -right-40 -top-40 size-[500px] rounded-full bg-indigo-500/[0.09] blur-[110px]" />
            <div className="absolute -left-40 top-60 size-[400px] rounded-full bg-teal-500/[0.08] blur-[100px]" />
            <div className="absolute inset-0 bg-[radial-gradient(hsl(var(--foreground)/0.07)_1px,transparent_1px)] [background-size:24px_24px]" />
          </div>

          <div className="landing-container py-14 sm:py-20">
            <header className="mx-auto max-w-3xl text-center">
              <p className="inline-flex rounded-full border border-indigo-500/20 bg-indigo-500/[0.06] px-4 py-2 text-sm font-medium text-indigo-600 dark:text-indigo-400">
                {eyebrow}
              </p>
              <h1 className="mt-6 text-4xl font-bold tracking-tight sm:text-6xl">
                {title}
              </h1>
              <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-muted-foreground sm:text-lg">
                {description}
              </p>
              <p className="mt-4 text-sm text-muted-foreground">
                Last updated November 4, 2026
              </p>
            </header>

            <div className="mx-auto mt-10 max-w-3xl rounded-3xl border border-border/70 bg-card/90 p-6 shadow-xl shadow-indigo-950/[0.04] sm:mt-14 sm:p-10">
              <div className="space-y-9">
                {sections.map((section, index) => (
                  <section
                    key={section.heading}
                    aria-labelledby={`legal-section-${index}`}
                    className="border-b border-border/70 pb-8 last:border-0 last:pb-0"
                  >
                    <h2
                      id={`legal-section-${index}`}
                      className="text-xl font-bold sm:text-2xl"
                    >
                      {section.heading}
                    </h2>
                    {section.paragraphs?.map((paragraph) => (
                      <p
                        key={paragraph}
                        className="mt-3 text-sm leading-7 text-muted-foreground sm:text-base"
                      >
                        {paragraph}
                      </p>
                    ))}
                    {section.items && (
                      <ul className="mt-3 list-disc space-y-2 pl-6 text-sm leading-7 text-muted-foreground marker:text-indigo-500 sm:text-base">
                        {section.items.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    )}
                  </section>
                ))}
              </div>

              <div className="mt-10 rounded-2xl border border-border/70 bg-background/70 p-5 sm:p-6">
                <h2 className="text-base font-bold">Questions?</h2>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  If you have questions about this page, please{' '}
                  <Link
                    href="/contact"
                    className="font-semibold text-indigo-600 underline-offset-4 hover:underline dark:text-indigo-400"
                  >
                    contact us
                  </Link>
                  .
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
