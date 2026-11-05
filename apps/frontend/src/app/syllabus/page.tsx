import type { Metadata } from 'next';
import Link from 'next/link';
import {
  ArrowDown,
  ArrowRight,
  BookOpen,
  ExternalLink,
  FileText,
  GraduationCap,
  Microscope,
  Stethoscope,
} from 'lucide-react';

import { EntranceSyllabus } from '@/features/courses/entrance-syllabus';
import type { SyllabusGroup } from '@/features/courses/entrance-syllabus-data';

export const metadata: Metadata = {
  title: 'Entrance Exam Syllabus | MedPrep AI Nepal',
  description:
    'Explore the revised 2026 MEC Bachelor Level Common Entrance Examination syllabus, program groups, subject weightage and topic coverage.',
  openGraph: {
    title: 'MEC Entrance Exam Syllabus | MedPrep AI Nepal',
    description:
      'Explore examination groups, subject weightage and syllabus topics for Nepal medical entrance preparation.',
    type: 'website',
  },
};

const syllabusPdf =
  'https://shisiradhikari.com.np/storage/uploads/library/files/syllabus_bachelor_program_revised__2026.pdf';

const mecPortal = 'https://entrance.mec.gov.np/';

const groups: {
  id: SyllabusGroup;
  roman: string;
  title: string;
  programs: string;
  description: string;
  image: string;
  icon: typeof Stethoscope;
  accent: string;
}[] = [
  {
    id: 1,
    roman: 'I',
    title: 'Medical & Dental Sciences',
    programs: 'MBBS · BDS · Nursing · BASLP',
    description:
      'Explore the entrance syllabus for medicine, dentistry, nursing and allied health programs.',
    image:
      'https://images.unsplash.com/photo-1559757175-0eb30cd8c063?auto=format&fit=crop&w=1000&q=85',
    icon: Stethoscope,
    accent: 'bg-[#DF301C]',
  },
  {
    id: 2,
    roman: 'II',
    title: 'Allied Health Sciences',
    programs: 'BAMS · MLT · MIT · BPT · Pharmacy',
    description:
      'Review the subject requirements for allied health and other related academic pathways.',
    image:
      'https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&w=1000&q=85',
    icon: Microscope,
    accent: 'bg-[#00B7CD]',
  },
  {
    id: 3,
    roman: 'III',
    title: 'Public Health',
    programs: 'Bachelor in Public Health',
    description:
      'Understand the examination coverage for public health education and community healthcare.',
    image:
      'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=1000&q=85',
    icon: GraduationCap,
    accent: 'bg-[#FF9100]',
  },
  {
    id: 4,
    roman: 'IV',
    title: 'Nursing & Midwifery',
    programs: 'Nursing Science · Midwifery Science',
    description:
      'Explore the relevant entrance examination syllabus for nursing and midwifery pathways.',
    image:
      'https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&w=1000&q=85',
    icon: BookOpen,
    accent: 'bg-[#00B7CD]',
  },
];

export default function SyllabusPage() {
  return (
    <main id="main-content" className="landing-page min-h-screen">
      {/* Hero */}
      <section className="relative isolate overflow-hidden bg-[#202421] text-white">
        <div className="absolute inset-0 -z-20">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=2000&q=90"
            alt=""
            className="size-full object-cover opacity-25"
          />
        </div>

        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#202421] via-[#202421]/95 to-[#202421]/60" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-[#202421]/70 to-transparent" />

        <div className="pointer-events-none absolute -right-32 -top-40 -z-10 size-[520px] rounded-full border border-white/10" />
        <div className="pointer-events-none absolute -right-16 -top-24 -z-10 size-[340px] rounded-full border border-white/10" />

        <div className="landing-container relative grid items-center gap-12 py-16 sm:py-20 lg:grid-cols-[1.1fr_0.9fr] lg:py-24">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#00B7CD]/30 bg-[#00B7CD]/10 px-4 py-2 text-xs font-bold uppercase tracking-wider text-[#00B7CD] backdrop-blur-md">
              <FileText className="size-4" />
              Medical Education Commission
            </div>

            <p className="mt-7 text-xs font-bold uppercase tracking-[0.2em] text-[#FF9100]">
              Revised 28 April 2026
            </p>

            <h1 className="mt-3 text-4xl font-extrabold leading-[1.12] tracking-tight sm:text-5xl lg:text-6xl">
              Understand the syllabus.
              <span className="mt-2 block text-[#00B7CD]">
                Prepare with direction.
              </span>
            </h1>

            <p className="mt-6 max-w-2xl text-sm leading-8 text-white/70 sm:text-base">
              Explore the Bachelor Level Common Entrance Examination syllabus
              for medical and allied health programs in Nepal. Understand
              examination groups, subject weightage and topic coverage in one
              organized place.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={syllabusPdf}
                target="_blank"
                rel="noreferrer"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#DF301C] px-6 py-3 text-sm font-bold text-white shadow-lg shadow-black/20 transition-all hover:-translate-y-0.5 hover:bg-[#B72718]"
              >
                Download official syllabus
                <ExternalLink className="size-4" />
              </a>

              <Link
                href="#syllabus-groups"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/5 px-6 py-3 text-sm font-semibold text-white backdrop-blur-md transition-colors hover:bg-white/10"
              >
                Explore syllabus groups
                <ArrowDown className="size-4" />
              </Link>
            </div>

            <div className="mt-9 flex flex-wrap gap-x-7 gap-y-3 text-xs font-medium text-white/60">
              <span className="flex items-center gap-2">
                <BookOpen className="size-4 text-[#00B7CD]" />
                Subject-wise coverage
              </span>
              <span className="flex items-center gap-2">
                <GraduationCap className="size-4 text-[#FF9100]" />
                Four program groups
              </span>
            </div>
          </div>

          {/* Hero image card */}
          <div className="relative mx-auto hidden w-full max-w-md lg:block">
            <div className="relative aspect-[4/4.3] overflow-hidden rounded-[2rem] border border-white/15 bg-white/5 p-3 shadow-2xl shadow-black/30">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&w=1000&q=90"
                alt="Medical education and clinical learning"
                className="size-full rounded-[1.5rem] object-cover"
              />

              <div className="absolute inset-3 rounded-[1.5rem] bg-gradient-to-t from-black/70 via-transparent to-transparent" />

              <div className="absolute bottom-8 left-8 right-8">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#FF9100]">
                  Your preparation starts here
                </p>
                <h2 className="mt-3 text-2xl font-extrabold text-white">
                  Know what to study. Focus on what matters.
                </h2>
              </div>
            </div>

            <div className="absolute -bottom-5 -left-8 flex items-center gap-3 rounded-2xl border border-border/50 bg-card p-4 text-card-foreground shadow-xl">
              <div className="grid size-11 place-items-center rounded-xl bg-[#DF301C]/10 text-[#A62316] dark:text-[#FF9100]">
                <GraduationCap className="size-5" />
              </div>
              <div>
                <p className="text-sm font-bold">MEC CEE syllabus</p>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  Revised examination reference
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick navigation */}
      <section
        id="syllabus-groups"
        className="landing-container scroll-mt-24 py-14 sm:py-16"
      >
        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div className="max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#A62316] dark:text-[#FF9100]">
              Browse by program
            </p>

            <h2 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
              Explore the four syllabus groups.
            </h2>

            <p className="mt-4 text-sm leading-7 text-muted-foreground sm:text-base">
              Select your examination group to jump directly to its syllabus and
              explore the available subject details.
            </p>
          </div>

          <span className="flex items-center gap-2 text-sm text-muted-foreground">
            <BookOpen className="size-4 text-[#DF301C]" />
            Four examination groups
          </span>
        </div>

        <div className="mt-9 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {groups.map((group) => {
            const Icon = group.icon;

            return (
              <Link
                key={group.id}
                href={`#group-${group.id}`}
                className="group overflow-hidden rounded-2xl border border-border/70 bg-card transition-all duration-300 hover:-translate-y-1 hover:border-[#00B7CD]/60 hover:shadow-xl"
              >
                <div className="relative h-40 overflow-hidden bg-muted">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={group.image}
                    alt={`${group.title} academic field`}
                    loading="lazy"
                    className="size-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

                  <div className="absolute left-4 top-4 flex items-center gap-2 rounded-full border border-white/20 bg-black/30 px-3 py-1.5 text-xs font-bold text-white backdrop-blur-md">
                    <span className={`size-1.5 rounded-full ${group.accent}`} />
                    GROUP {group.roman}
                  </div>

                  <div className="absolute bottom-4 left-4 grid size-10 place-items-center rounded-xl border border-white/20 bg-white/15 text-white backdrop-blur-md">
                    <Icon className="size-5" />
                  </div>
                </div>

                <div className="p-5">
                  <h3 className="text-lg font-bold tracking-tight transition-colors group-hover:text-[#A62316] dark:group-hover:text-[#FF9100]">
                    {group.title}
                  </h3>

                  <p className="mt-2 text-xs font-semibold leading-5 text-[#A62316] dark:text-[#FF9100]">
                    {group.programs}
                  </p>

                  <p className="mt-3 text-sm leading-6 text-muted-foreground">
                    {group.description}
                  </p>

                  <div className="mt-5 flex items-center justify-between border-t border-border/70 pt-4">
                    <span className="text-sm font-bold text-foreground">
                      View syllabus
                    </span>

                    <span className="grid size-8 place-items-center rounded-lg bg-[#DF301C]/10 text-[#A62316] transition-all group-hover:translate-x-1 group-hover:bg-[#DF301C] group-hover:text-white dark:text-[#FF9100]">
                      <ArrowRight className="size-4" />
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Syllabus content */}
      <section className="border-y bg-muted/20">
        <div className="landing-container py-14 sm:py-16">
          <div className="mb-10 max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#A62316] dark:text-[#FF9100]">
              Detailed syllabus
            </p>

            <h2 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
              Explore subjects and topic coverage.
            </h2>

            <p className="mt-4 text-sm leading-7 text-muted-foreground sm:text-base">
              Expand each examination group to review its subjects, question
              distribution and syllabus units.
            </p>
          </div>

          <div className="space-y-8">
            {groups.map((group) => (
              <div
                key={group.id}
                id={`group-${group.id}`}
                className="scroll-mt-24"
              >
                <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="grid size-10 place-items-center rounded-xl bg-[#FF9100] text-sm font-extrabold text-[#2C251E]">
                      {group.roman}
                    </div>

                    <div>
                      <p className="text-xs font-bold uppercase tracking-wider text-[#A62316] dark:text-[#FF9100]">
                        Examination group {group.roman}
                      </p>
                      <h3 className="text-lg font-bold">{group.title}</h3>
                    </div>
                  </div>

                  <Link
                    href="#syllabus-groups"
                    className="inline-flex items-center gap-1 text-xs font-semibold text-muted-foreground transition-colors hover:text-[#A62316] dark:hover:text-[#FF9100]"
                  >
                    Back to groups
                    <ArrowRight className="size-3.5" />
                  </Link>
                </div>

                <div className="rounded-2xl border border-border/70 bg-card p-2 shadow-sm sm:p-4">
                  <EntranceSyllabus group={group.id} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Official resources */}
      <section className="landing-container py-14 sm:py-20">
        <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
          <div className="relative overflow-hidden rounded-3xl bg-[#25302D] p-7 text-white sm:p-9">
            <div className="absolute -right-20 -top-20 size-64 rounded-full border border-white/10" />

            <div className="relative">
              <div className="grid size-12 place-items-center rounded-xl bg-[#00B7CD]/15 text-[#00B7CD]">
                <FileText className="size-6" />
              </div>

              <p className="mt-6 text-xs font-bold uppercase tracking-[0.18em] text-[#FF9100]">
                Official document
              </p>

              <h2 className="mt-3 text-2xl font-extrabold">
                Need the complete syllabus?
              </h2>

              <p className="mt-3 max-w-md text-sm leading-7 text-white/65">
                Access the original revised Bachelor Level Common Entrance
                Examination syllabus PDF for complete official information.
              </p>

              <a
                href={syllabusPdf}
                target="_blank"
                rel="noreferrer"
                className="mt-7 inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-[#FF9100] px-5 py-3 text-sm font-bold text-[#2C251E] transition-colors hover:bg-[#E17F00]"
              >
                Open official PDF
                <ExternalLink className="size-4" />
              </a>
            </div>
          </div>

          <div className="rounded-3xl border border-border/70 bg-card p-7 sm:p-9">
            <div className="grid size-12 place-items-center rounded-xl bg-[#00B7CD]/10 text-[#087381] dark:text-[#00B7CD]">
              <GraduationCap className="size-6" />
            </div>

            <p className="mt-6 text-xs font-bold uppercase tracking-[0.18em] text-[#A62316] dark:text-[#FF9100]">
              Admission information
            </p>

            <h2 className="mt-3 text-2xl font-extrabold">
              Always verify the latest MEC notices.
            </h2>

            <p className="mt-3 text-sm leading-7 text-muted-foreground">
              Eligibility, examination dates, seat allocations, application
              procedures and admission rules may change. Refer to the official
              Medical Education Commission portal for current information.
            </p>

            <a
              href={mecPortal}
              target="_blank"
              rel="noreferrer"
              className="mt-7 inline-flex min-h-11 items-center gap-2 rounded-xl border border-[#DF301C]/40 px-5 py-3 text-sm font-bold text-[#A62316] transition-colors hover:bg-[#DF301C]/10 dark:text-[#FF9100] dark:hover:bg-[#FF9100]/10"
            >
              Visit MEC admission portal
              <ExternalLink className="size-4" />
            </a>
          </div>
        </div>
      </section>

      {/* Footer note */}
      <section className="border-t bg-muted/20">
        <div className="landing-container flex flex-col gap-3 py-8 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-3xl leading-6">
            MedPrep AI provides an organized learning reference. This page
            summarizes the MEC entrance-exam syllabus and is not a university
            degree curriculum or a substitute for official examination
            documents.
          </p>

          <a
            href={mecPortal}
            target="_blank"
            rel="noreferrer"
            className="inline-flex shrink-0 items-center gap-2 font-semibold text-[#A62316] hover:underline dark:text-[#FF9100]"
          >
            Official MEC portal
            <ExternalLink className="size-4" />
          </a>
        </div>
      </section>
    </main>
  );
}
