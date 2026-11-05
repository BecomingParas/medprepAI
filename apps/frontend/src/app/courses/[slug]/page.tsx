import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  CheckCircle2,
  ExternalLink,
  GraduationCap,
  ShieldCheck,
  Stethoscope,
} from 'lucide-react';

import {
  courseDetails,
  type CourseDetails,
} from '@/features/courses/course-details';
import {
  EntranceSyllabus,
  UnmappedEntranceSyllabus,
} from '@/features/courses/entrance-syllabus';

const syllabusUrl =
  'https://shisiradhikari.com.np/storage/uploads/library/files/syllabus_bachelor_program_revised__2026.pdf';

const mecEntranceUrl = 'https://entrance.mec.gov.np/';

type CoursePageProps = {
  params: Promise<{ slug: string }>;
};

const courseImages: Record<string, string> = {
  mbbs: 'https://images.unsplash.com/photo-1559757175-0eb30cd8c063?auto=format&fit=crop&w=1800&q=90',
  bds: 'https://images.unsplash.com/photo-1606811971618-4486d14f3f99?auto=format&fit=crop&w=1800&q=90',
  'bsc-nursing':
    'https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&w=1800&q=90',
  'b-pharmacy':
    'https://images.unsplash.com/photo-1585435557343-3b092031a831?auto=format&fit=crop&w=1800&q=90',
  'b-optometry':
    'https://images.unsplash.com/photo-1574258495973-f010dfbb5371?auto=format&fit=crop&w=1800&q=90',
  bmlt: 'https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&w=1800&q=90',
  bmit: 'https://images.unsplash.com/photo-1511174511562-5f7f18b874f8?auto=format&fit=crop&w=1800&q=90',
  bph: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=1800&q=90',
  bpt: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1800&q=90',
  baslp:
    'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=1800&q=90',
  'bsc-agriculture':
    'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1800&q=90',
  'veterinary-science':
    'https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?auto=format&fit=crop&w=1800&q=90',
  'bsc-forestry':
    'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1800&q=90',
  'b-technology':
    'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1800&q=90',
  'food-technology':
    'https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=1800&q=90',
};

export function generateStaticParams() {
  return Object.keys(courseDetails).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: CoursePageProps): Promise<Metadata> {
  const { slug } = await params;
  const course = courseDetails[slug];

  if (!course) {
    return { title: 'Course not found | MedPrep AI Nepal' };
  }

  return {
    title: `${course.name} | Courses | MedPrep AI Nepal`,
    description: course.overview,
    openGraph: {
      title: `${course.name} | MedPrep AI Nepal`,
      description: course.overview,
      type: 'website',
      images: courseImages[slug]
        ? [{ url: courseImages[slug], alt: course.name }]
        : undefined,
    },
  };
}

function InfoList({
  title,
  subtitle,
  items,
  number,
}: {
  title: string;
  subtitle: string;
  items: CourseDetails['studyAreas'];
  number: string;
}) {
  return (
    <section className="rounded-2xl border border-border/70 bg-card p-6 shadow-sm sm:p-8">
      <div className="flex items-start gap-4">
        <div className="grid size-11 shrink-0 place-items-center rounded-xl bg-rose-700/10 text-sm font-extrabold text-rose-800 dark:text-rose-300">
          {number}
        </div>
        <div>
          <h2 className="text-xl font-bold tracking-tight">{title}</h2>
          <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>
        </div>
      </div>

      <ul className="mt-7 grid gap-4 sm:grid-cols-2">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-3">
            <CheckCircle2
              aria-hidden="true"
              className="mt-0.5 size-5 shrink-0 text-rose-700 dark:text-rose-300"
            />
            <span className="text-sm leading-6 text-muted-foreground">
              {item}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default async function CourseDetailPage({ params }: CoursePageProps) {
  const { slug } = await params;
  const course = courseDetails[slug];

  if (!course) {
    notFound();
  }

  const heroImage =
    courseImages[slug] ??
    'https://images.unsplash.com/photo-1559757175-0eb30cd8c063?auto=format&fit=crop&w=1800&q=90';

  return (
    <main id="main-content" className="landing-page min-h-screen">
      {/* Hero */}
      <section className="relative isolate min-h-[520px] overflow-hidden bg-[#1b101a] text-white">
        <div className="absolute inset-0 -z-20">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={heroImage}
            alt={`${course.name} program`}
            className="size-full object-cover opacity-35"
          />
        </div>

        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#190f19] via-[#21121e]/95 to-[#21121e]/55" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-[#190f19]/80 via-transparent to-transparent" />

        <div className="landing-container relative py-12 sm:py-16 lg:py-20">
          <Link
            href="/courses"
            className="inline-flex items-center gap-2 text-sm font-medium text-white/70 transition-colors hover:text-white"
          >
            <ArrowLeft className="size-4" />
            Explore all programs
          </Link>

          <div className="mt-12 max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-rose-200/20 bg-rose-200/10 px-4 py-2 text-xs font-bold uppercase tracking-wider text-rose-200 backdrop-blur-md">
              <GraduationCap className="size-4" />
              Undergraduate program
            </div>

            <h1 className="mt-6 text-5xl font-extrabold tracking-tight sm:text-6xl lg:text-7xl">
              {course.name}
            </h1>

            <p className="mt-4 max-w-2xl text-lg font-semibold text-white/85 sm:text-xl">
              {course.credential}
            </p>

            <p className="mt-5 max-w-2xl text-sm leading-8 text-white/70 sm:text-base">
              {course.overview}
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/lessons"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-rose-700 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-black/20 transition-all hover:-translate-y-0.5 hover:bg-rose-600"
              >
                Start entrance preparation
                <ArrowRight className="size-4" />
              </Link>

              <a
                href={mecEntranceUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/5 px-6 py-3 text-sm font-semibold text-white backdrop-blur-md transition-colors hover:bg-white/10"
              >
                MEC admission portal
                <ExternalLink className="size-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Trust / information strip */}
      <section className="border-b bg-card">
        <div className="landing-container grid gap-5 py-6 sm:grid-cols-3">
          <div className="flex items-center gap-3">
            <div className="grid size-10 place-items-center rounded-xl bg-rose-700/10 text-rose-800 dark:text-rose-300">
              <BookOpen className="size-5" />
            </div>
            <div>
              <p className="text-sm font-bold">Program overview</p>
              <p className="text-xs text-muted-foreground">
                Understand the academic pathway
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="grid size-10 place-items-center rounded-xl bg-rose-700/10 text-rose-800 dark:text-rose-300">
              <ShieldCheck className="size-5" />
            </div>
            <div>
              <p className="text-sm font-bold">Official resources</p>
              <p className="text-xs text-muted-foreground">
                Refer to MEC examination notices
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="grid size-10 place-items-center rounded-xl bg-rose-700/10 text-rose-800 dark:text-rose-300">
              <Stethoscope className="size-5" />
            </div>
            <div>
              <p className="text-sm font-bold">Career pathways</p>
              <p className="text-xs text-muted-foreground">
                Explore related professional fields
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Main content */}
      <section className="landing-container py-14 sm:py-20">
        <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
          <div className="space-y-8">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-rose-800 dark:text-rose-300">
                Academic overview
              </p>
              <h2 className="mt-3 text-3xl font-extrabold tracking-tight">
                Discover your program.
              </h2>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-muted-foreground">
                Explore the main areas of study and professional opportunities
                associated with this academic pathway.
              </p>
            </div>

            <InfoList
              number="01"
              title="What this program covers"
              subtitle="Key areas of academic study"
              items={course.studyAreas}
            />

            <InfoList
              number="02"
              title="Related career fields"
              subtitle="Explore possible professional directions"
              items={course.careerFields}
            />
          </div>

          {/* Sidebar */}
          <aside className="space-y-5">
            <div className="rounded-2xl border border-border/70 bg-card p-6 shadow-sm sm:p-7">
              <div className="grid size-12 place-items-center rounded-xl bg-rose-700/10 text-rose-800 dark:text-rose-300">
                <BookOpen className="size-6" />
              </div>

              <p className="mt-5 text-xs font-bold uppercase tracking-wider text-rose-800 dark:text-rose-300">
                Official reference
              </p>

              <h2 className="mt-2 text-xl font-bold">
                Entrance examination syllabus
              </h2>

              <p className="mt-3 text-sm leading-7 text-muted-foreground">
                Review the revised Bachelor Level Common Entrance Examination
                syllabus. This document covers entrance-exam content, not the
                complete university curriculum.
              </p>

              <a
                href={syllabusUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-6 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl border border-rose-800/40 px-4 py-3 text-sm font-bold text-rose-800 transition-colors hover:bg-rose-50 dark:text-rose-300 dark:hover:bg-rose-950/30"
              >
                View syllabus PDF
                <ExternalLink className="size-4" />
              </a>
            </div>

            <div className="relative overflow-hidden rounded-2xl bg-[#25121e] p-6 text-white sm:p-7">
              <div className="absolute -right-14 -top-14 size-48 rounded-full border border-white/10" />
              <div className="relative">
                <div className="grid size-11 place-items-center rounded-xl bg-white/10 text-rose-200">
                  <GraduationCap className="size-5" />
                </div>

                <h2 className="mt-5 text-xl font-bold">
                  Ready to start preparing?
                </h2>

                <p className="mt-3 text-sm leading-7 text-white/65">
                  Strengthen your foundation in Physics, Chemistry and Biology
                  with MedPrep AI learning materials.
                </p>

                <Link
                  href="/lessons"
                  className="mt-6 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl bg-rose-700 px-4 py-3 text-sm font-bold text-white transition-colors hover:bg-rose-600"
                >
                  Explore lessons
                  <ArrowRight className="size-4" />
                </Link>
              </div>
            </div>

            <div className="rounded-2xl border border-rose-900/10 bg-rose-50/60 p-6 dark:bg-rose-950/15">
              <h2 className="text-base font-bold">
                Check current admission notices
              </h2>

              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                Eligibility, available programs, seat allocations and
                application dates can change. Always verify current details with
                the Medical Education Commission.
              </p>

              <a
                href={mecEntranceUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-rose-800 underline-offset-4 hover:underline dark:text-rose-300"
              >
                Visit MEC CEE portal
                <ArrowUpRight className="size-4" />
              </a>
            </div>
          </aside>
        </div>
      </section>

      {course.entranceGroup ? (
        <EntranceSyllabus group={course.entranceGroup} />
      ) : (
        <UnmappedEntranceSyllabus />
      )}

      {/* Bottom navigation */}
      <section className="border-t bg-muted/20">
        <div className="landing-container flex flex-col gap-5 py-9 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-lg font-bold">
              Explore more academic pathways
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Compare other programs and discover your next direction.
            </p>
          </div>

          <Link
            href="/courses"
            className="inline-flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-xl border border-border bg-card px-5 py-3 text-sm font-bold transition-colors hover:border-rose-700/40 hover:text-rose-800 dark:hover:text-rose-300"
          >
            <ArrowLeft className="size-4" />
            Browse all courses
          </Link>
        </div>
      </section>
    </main>
  );
}
