import {
  BookOpen,
  ChevronDown,
  ExternalLink,
  FileText,
  Info,
} from 'lucide-react';
import {
  commonExamFormat,
  syllabusGroups,
  type SyllabusGroup,
  type SyllabusSubject,
} from './entrance-syllabus-data';

const syllabusUrl =
  'https://shisiradhikari.com.np/storage/uploads/library/files/syllabus_bachelor_program_revised__2026.pdf';

const subjectStyles: Record<
  SyllabusSubject['color'],
  { badge: string; bar: string }
> = {
  blue: {
    badge: 'bg-[#00B7CD]/10 text-[#087381] dark:text-[#00B7CD]',
    bar: 'bg-[#00B7CD]',
  },
  green: {
    badge: 'bg-[#00B7CD]/10 text-[#087381] dark:text-[#00B7CD]',
    bar: 'bg-[#00B7CD]',
  },
  violet: {
    badge: 'bg-[#FF9100]/10 text-[#8F5300] dark:text-[#FFB547]',
    bar: 'bg-[#FF9100]',
  },
  amber: {
    badge: 'bg-[#FF9100]/10 text-[#8F5300] dark:text-[#FFB547]',
    bar: 'bg-[#FF9100]',
  },
  rose: {
    badge: 'bg-[#DF301C]/10 text-[#A62316] dark:text-[#FF9100]',
    bar: 'bg-[#DF301C]',
  },
  slate: {
    badge: 'bg-slate-500/10 text-slate-700 dark:text-slate-300',
    bar: 'bg-slate-500',
  },
};

function SubjectBreakdown({ subject }: { subject: SyllabusSubject }) {
  const styles = subjectStyles[subject.color];

  return (
    <details className="group rounded-2xl border border-border/70 bg-card shadow-sm">
      <summary className="flex cursor-pointer list-none items-center gap-4 p-5 [&::-webkit-details-marker]:hidden sm:p-6">
        <div
          className={`grid size-11 shrink-0 place-items-center rounded-xl ${styles.badge}`}
        >
          <BookOpen aria-hidden="true" className="size-5" />
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h3 className="font-bold">{subject.name}</h3>
            <span className="rounded-full border px-2.5 py-1 text-xs font-bold tabular-nums">
              {subject.questions} questions
            </span>
          </div>
          <div
            className="mt-3 h-1.5 overflow-hidden rounded-full bg-muted"
            aria-hidden="true"
          >
            <div
              className={`h-full rounded-full ${styles.bar}`}
              style={{ width: `${(subject.questions / 200) * 100}%` }}
            />
          </div>
          <p className="mt-2 text-xs text-muted-foreground">
            {subject.topics.length} syllabus units ·{' '}
            {Math.round((subject.questions / 200) * 100)}% of the paper
          </p>
        </div>

        <ChevronDown
          aria-hidden="true"
          className="size-5 shrink-0 text-muted-foreground transition-transform group-open:rotate-180"
        />
      </summary>

      <div className="border-t px-5 pb-5 pt-2 sm:px-6 sm:pb-6">
        <ol className="divide-y divide-border/70">
          {subject.topics.map((topic, index) => (
            <li
              key={topic.name}
              className="grid gap-2 py-4 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-start"
            >
              <div className="flex gap-3">
                <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-md bg-muted text-[11px] font-bold text-muted-foreground">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <div>
                  <h4 className="text-sm font-semibold">{topic.name}</h4>
                  <p className="mt-1 text-sm leading-6 text-muted-foreground">
                    {topic.coverage}
                  </p>
                </div>
              </div>
              {topic.questions !== undefined && (
                <span className="ml-9 w-fit rounded-md bg-muted px-2 py-1 text-xs font-semibold text-muted-foreground sm:ml-0">
                  {topic.questions} Q
                </span>
              )}
            </li>
          ))}
        </ol>
      </div>
    </details>
  );
}

export function EntranceSyllabus({
  group,
  headingId = `entrance-syllabus-heading-${group}`,
}: {
  group: SyllabusGroup;
  headingId?: string;
}) {
  const syllabus = syllabusGroups[group];

  return (
    <section
      aria-labelledby={headingId}
      className="border-y bg-muted/20"
    >
      <div className="landing-container py-14 sm:py-20">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#A62316] dark:text-[#FF9100]">
              MEC bachelor-level common entrance examination
            </p>
            <h2
              id={headingId}
              className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl"
            >
              Syllabus &amp; question pattern
            </h2>
            <p className="mt-3 text-sm leading-7 text-muted-foreground sm:text-base">
              {syllabus.title} · {syllabus.programs}
            </p>
          </div>

          <a
            href={syllabusUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-xl border border-[#DF301C]/35 bg-card px-4 py-2.5 text-sm font-bold text-[#A62316] transition-colors hover:bg-[#DF301C]/10 dark:text-[#FF9100] dark:hover:bg-[#FF9100]/10"
          >
            <FileText aria-hidden="true" className="size-4" />
            Full syllabus PDF
            <ExternalLink aria-hidden="true" className="size-4" />
          </a>
        </div>

        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {commonExamFormat.map((item) => (
            <div
              key={item.label}
              className="rounded-xl border bg-card px-4 py-4 shadow-sm"
            >
              <p className="text-xs font-medium text-muted-foreground">
                {item.label}
              </p>
              <p className="mt-1 text-lg font-extrabold tracking-tight">
                {item.value}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-4 flex items-start gap-3 rounded-xl border border-[#FF9100]/30 bg-[#FF9100]/[0.08] p-4">
          <Info
            aria-hidden="true"
            className="mt-0.5 size-4 shrink-0 text-[#8F5300] dark:text-[#FFB547]"
          />
          <p className="text-xs leading-6 text-muted-foreground">
            Question difficulty in the revised syllabus is set at a 50:30:20
            ratio for recall, understanding and application. The qualifying
            threshold is the 50th percentile; check the current MEC notice for
            the admission cycle you are applying to.
          </p>
        </div>

        <div className="mt-10">
          <div className="mb-5">
            <h3 className="text-xl font-bold">Question distribution by subject</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Expand a subject to view its topic-wise weightage and syllabus
              coverage.
            </p>
          </div>
          <div className="grid gap-4 lg:grid-cols-2">
            {syllabus.subjects.map((subject) => (
              <SubjectBreakdown key={subject.name} subject={subject} />
            ))}
          </div>
        </div>

        <p className="mt-6 text-xs leading-6 text-muted-foreground">
          Program-group mapping and topic weights are transcribed from the MEC
          Bachelor Level Common Entrance Examination syllabus (third revision,
          28 April 2026). This is an entrance-exam syllabus, not a complete
          university degree curriculum.
        </p>
      </div>
    </section>
  );
}

export function UnmappedEntranceSyllabus() {
  return (
    <section className="border-y bg-muted/20">
      <div className="landing-container py-12 sm:py-14">
        <div className="rounded-2xl border bg-card p-6 sm:p-8">
          <div className="flex items-start gap-4">
            <div className="grid size-11 shrink-0 place-items-center rounded-xl bg-[#FF9100]/10 text-[#8F5300] dark:text-[#FFB547]">
              <Info aria-hidden="true" className="size-5" />
            </div>
            <div className="max-w-3xl">
              <h2 className="text-xl font-bold">
                No entrance group listed for this program
              </h2>
              <p className="mt-2 text-sm leading-7 text-muted-foreground">
                The linked MEC Bachelor Level Common Entrance Examination
                syllabus does not specify an entrance-exam group for this
                program. Requirements and syllabi may differ by institution;
                check the current admission notice before applying.
              </p>
              <a
                href={syllabusUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-[#A62316] underline-offset-4 hover:underline dark:text-[#FF9100]"
              >
                Review the MEC reference syllabus
                <ExternalLink aria-hidden="true" className="size-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
