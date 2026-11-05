'use client';

import Link from 'next/link';
import {
  ArrowRight,
  ArrowUpRight,
  Atom,
  AudioLines,
  BookOpen,
  Brain,
  BriefcaseMedical,
  CheckCircle2,
  Dna,
  FlaskConical,
  GraduationCap,
  HeartPulse,
  Leaf,
  Microscope,
  ScanLine,
  Search,
  Stethoscope,
} from 'lucide-react';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { getProgramSlug } from '@/features/courses/course-details';

const categories = [
  'All Courses',
  'Medical',
  'Paramedical',
  'Applied Science & Technology',
] as const;

type Category = (typeof categories)[number];
type ProgramCategory = Exclude<Category, 'All Courses'>;

const programs: {
  name: string;
  description: string;
  category: ProgramCategory;
  icon: typeof Stethoscope;
  image: string;
  imagePosition?: string;
}[] = [
  {
    name: 'MBBS',
    description: 'Bachelor of Medicine, Bachelor of Surgery',
    category: 'Medical',
    icon: Stethoscope,
    image:
      'https://images.unsplash.com/photo-1559757175-0eb30cd8c063?auto=format&fit=crop&w=900&q=85',
  },
  {
    name: 'BDS',
    description: 'Bachelor of Dental Surgery',
    category: 'Medical',
    icon: BriefcaseMedical,
    image:
      'https://images.unsplash.com/photo-1606811971618-4486d14f3f99?auto=format&fit=crop&w=900&q=85',
  },
  {
    name: 'BSc Nursing',
    description: 'Bachelor of Science in Nursing',
    category: 'Medical',
    icon: HeartPulse,
    image:
      'https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&w=900&q=85',
  },
  {
    name: 'B Pharmacy',
    description: 'Bachelor of Pharmacy',
    category: 'Paramedical',
    icon: FlaskConical,
    image:
      'https://images.unsplash.com/photo-1585435557343-3b092031a831?auto=format&fit=crop&w=900&q=85',
  },
  {
    name: 'B Optometry',
    description: 'Bachelor of Optometry',
    category: 'Paramedical',
    icon: Brain,
    image:
      'https://images.unsplash.com/photo-1574258495973-f010dfbb5371?auto=format&fit=crop&w=900&q=85',
  },
  {
    name: 'BMLT',
    description: 'Bachelor of Medical Laboratory Technology',
    category: 'Paramedical',
    icon: Microscope,
    image:
      'https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&w=900&q=85',
  },
  {
    name: 'BMIT',
    description: 'Bachelor of Medical Imaging Technology',
    category: 'Paramedical',
    icon: ScanLine,
    image:
      'https://images.unsplash.com/photo-1511174511562-5f7f18b874f8?auto=format&fit=crop&w=900&q=85',
  },
  {
    name: 'BPH',
    description: 'Bachelor of Public Health',
    category: 'Paramedical',
    icon: HeartPulse,
    image:
      'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=900&q=85',
  },
  {
    name: 'BPT',
    description: 'Bachelor of Physiotherapy',
    category: 'Paramedical',
    icon: ArrowUpRight,
    image:
      'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=900&q=85',
  },
  {
    name: 'BASLP',
    description: 'Bachelor of Audiology and Speech-Language Pathology',
    category: 'Paramedical',
    icon: AudioLines,
    image:
      'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=900&q=85',
  },
  {
    name: 'BSc Agriculture',
    description: 'Bachelor of Science in Agriculture',
    category: 'Applied Science & Technology',
    icon: Leaf,
    image:
      'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=900&q=85',
  },
  {
    name: 'Veterinary Science',
    description: 'Bachelor of Veterinary Science & Animal Husbandry',
    category: 'Applied Science & Technology',
    icon: Dna,
    image:
      'https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?auto=format&fit=crop&w=900&q=85',
  },
  {
    name: 'BSc Forestry',
    description: 'Bachelor of Science in Forestry',
    category: 'Applied Science & Technology',
    icon: Leaf,
    image:
      'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=900&q=85',
  },
  {
    name: 'B Technology',
    description: 'Bachelor of Technology',
    category: 'Applied Science & Technology',
    icon: Atom,
    image:
      'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=900&q=85',
  },
  {
    name: 'Food Technology',
    description: 'Bachelor of Science in Food Technology',
    category: 'Applied Science & Technology',
    icon: FlaskConical,
    image:
      'https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=900&q=85',
  },
];

const studySubjects = [
  {
    name: 'Physics',
    description:
      'Master mechanics, waves, optics, electricity and thermodynamics through conceptual learning.',
    icon: Atom,
    image:
      'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=900&q=85',
    color: 'text-blue-700',
    background: 'bg-blue-500/10',
    tag: 'Conceptual learning',
  },
  {
    name: 'Chemistry',
    description:
      'Understand chemical principles through physical, organic and inorganic chemistry.',
    icon: FlaskConical,
    image:
      'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=900&q=85',
    color: 'text-emerald-700',
    background: 'bg-emerald-500/10',
    tag: 'Theory & reactions',
  },
  {
    name: 'Biology',
    description:
      'Explore cells, genetics, human physiology, evolution and the diversity of life.',
    icon: Dna,
    image:
      'https://images.unsplash.com/photo-1530026405186-ed1f139313f8?auto=format&fit=crop&w=900&q=85',
    color: 'text-violet-700',
    background: 'bg-violet-500/10',
    tag: 'Life sciences',
  },
];

const preparationSteps = [
  {
    number: '01',
    title: 'Build your foundation',
    description:
      'Understand the essential concepts across Physics, Chemistry and Biology.',
  },
  {
    number: '02',
    title: 'Learn strategically',
    description:
      'Study topic by topic and strengthen your understanding with structured lessons.',
  },
  {
    number: '03',
    title: 'Practice questions',
    description:
      'Apply what you have learned and identify topics that need more attention.',
  },
  {
    number: '04',
    title: 'Revise and improve',
    description:
      'Revisit difficult concepts and build a consistent exam preparation routine.',
  },
];

function ProgramCard({ program }: { program: (typeof programs)[number] }) {
  const Icon = program.icon;

  return (
    <Link
      href={`/courses/${getProgramSlug(program.name)}`}
      aria-label={`View ${program.name} course details`}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border/70 bg-card transition-all duration-300 hover:-translate-y-1 hover:border-rose-700/30 hover:shadow-xl hover:shadow-rose-950/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-700 focus-visible:ring-offset-2"
    >
      <div className="relative h-52 overflow-hidden bg-muted">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={program.image}
          alt={`${program.name} education`}
          loading="lazy"
          className="size-full object-cover transition-transform duration-700 group-hover:scale-110"
          style={{ objectPosition: program.imagePosition ?? 'center' }}
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-black/10" />

        <div className="absolute left-4 top-4">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-white/30 bg-black/30 px-3 py-1.5 text-[11px] font-semibold text-white shadow-sm backdrop-blur-md">
            <span className="size-1.5 rounded-full bg-rose-400" />
            {program.category}
          </span>
        </div>

        <div className="absolute bottom-4 left-5 flex items-center gap-2 text-white">
          <div className="grid size-9 place-items-center rounded-xl border border-white/30 bg-white/15 backdrop-blur-md">
            <Icon className="size-5" strokeWidth={1.8} />
          </div>
          <span className="text-xs font-medium text-white/90">
            Study pathway
          </span>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-xl font-bold tracking-tight transition-colors group-hover:text-rose-800 dark:group-hover:text-rose-300">
          {program.name}
        </h3>

        <p className="mt-2 min-h-12 text-sm leading-6 text-muted-foreground">
          {program.description}
        </p>

        <div className="mt-5 border-t border-border/70 pt-4">
          <span className="inline-flex min-h-10 w-full items-center justify-between gap-2 rounded-xl px-3 text-sm font-semibold text-rose-800 transition-colors group-hover:bg-rose-50 dark:text-rose-300 dark:group-hover:bg-rose-950/30">
            View course details
            <span className="grid size-8 place-items-center rounded-lg bg-rose-800/10 transition-all group-hover:translate-x-1 group-hover:bg-rose-800 group-hover:text-white">
              <ArrowRight className="size-4" />
            </span>
          </span>
        </div>
      </div>
    </Link>
  );
}

function SubjectCard({ subject }: { subject: (typeof studySubjects)[number] }) {
  const Icon = subject.icon;

  return (
    <article className="group overflow-hidden rounded-2xl border border-border/70 bg-card transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      <div className="relative h-48 overflow-hidden bg-muted">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={subject.image}
          alt={`${subject.name} study`}
          loading="lazy"
          className="size-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent" />

        <span className="absolute bottom-4 left-5 rounded-full border border-white/30 bg-black/25 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-md">
          {subject.tag}
        </span>
      </div>

      <div className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div
              className={`grid size-11 place-items-center rounded-xl ${subject.background} ${subject.color}`}
            >
              <Icon className="size-5" />
            </div>
            <h3 className="text-xl font-bold">{subject.name}</h3>
          </div>
          <CheckCircle2 className="size-5 text-muted-foreground/40" />
        </div>

        <p className="mt-4 text-sm leading-7 text-muted-foreground">
          {subject.description}
        </p>

        <Link
          href="/lessons"
          className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-rose-800 transition-colors hover:text-rose-950 dark:text-rose-300 dark:hover:text-rose-200"
        >
          Explore subject
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </article>
  );
}

export default function CoursesPage() {
  return (
    <main id="main-content" className="landing-page min-h-screen">
      {/* Hero */}
      <section className="relative isolate overflow-hidden border-b bg-[#160d16] text-white">
        <div className="absolute inset-0 -z-20">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=2000&q=90"
            alt=""
            className="size-full object-cover opacity-30"
          />
        </div>

        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#160d16] via-[#25121e]/95 to-[#25121e]/55" />
        <div className="absolute -right-40 -top-40 -z-10 size-[550px] rounded-full border border-white/10" />
        <div className="absolute -right-20 -top-20 -z-10 size-[350px] rounded-full border border-white/10" />

        <div className="landing-container relative grid items-center gap-12 py-16 sm:py-24 lg:grid-cols-[1.1fr_0.9fr] lg:py-28">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-rose-300/20 bg-rose-300/10 px-4 py-2 text-xs font-semibold tracking-wide text-rose-200">
              <GraduationCap className="size-4" />
              MEDPREP AI · YOUR LEARNING JOURNEY
            </div>

            <h1 className="mt-7 text-4xl font-extrabold leading-[1.12] tracking-tight sm:text-5xl lg:text-6xl">
              Your future in
              <span className="block text-rose-300">
                healthcare starts here.
              </span>
            </h1>

            <p className="mt-6 max-w-xl text-base leading-8 text-white/70 sm:text-lg">
              Explore medical and allied health science pathways. Build your
              knowledge, strengthen your concepts and prepare for your next
              academic journey.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="#programs"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-rose-700 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-rose-950/30 transition-all hover:-translate-y-0.5 hover:bg-rose-600"
              >
                Explore programs
                <ArrowRight className="size-4" />
              </Link>

              <Link
                href="/lessons"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/5 px-6 py-3 text-sm font-semibold text-white backdrop-blur-sm transition-colors hover:bg-white/10"
              >
                Start learning
                <BookOpen className="size-4" />
              </Link>
            </div>

            <div className="mt-10 flex flex-wrap gap-x-7 gap-y-3 text-xs font-medium text-white/60">
              <span className="flex items-center gap-2">
                <CheckCircle2 className="size-4 text-rose-300" />
                Structured learning
              </span>
              <span className="flex items-center gap-2">
                <CheckCircle2 className="size-4 text-rose-300" />
                Multiple study pathways
              </span>
              <span className="flex items-center gap-2">
                <CheckCircle2 className="size-4 text-rose-300" />
                Entrance preparation
              </span>
            </div>
          </div>

          <div className="relative mx-auto hidden w-full max-w-lg lg:block">
            <div className="relative aspect-[4/4.2] overflow-hidden rounded-[2rem] border border-white/15 bg-white/5 p-3 shadow-2xl shadow-black/30">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&w=1000&q=90"
                alt="Medical students learning together"
                className="size-full rounded-[1.5rem] object-cover"
              />
              <div className="absolute inset-3 rounded-[1.5rem] bg-gradient-to-t from-black/65 via-transparent to-transparent" />

              <div className="absolute bottom-8 left-8 right-8">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-rose-200">
                  Learn with purpose
                </p>
                <p className="mt-2 text-2xl font-bold text-white">
                  Knowledge today. Healthcare tomorrow.
                </p>
              </div>
            </div>

            <div className="absolute -bottom-5 -left-8 flex items-center gap-3 rounded-2xl border border-border/50 bg-card p-4 text-card-foreground shadow-xl">
              <div className="grid size-11 place-items-center rounded-xl bg-rose-700/10 text-rose-800 dark:text-rose-300">
                <BookOpen className="size-5" />
              </div>
              <div>
                <p className="text-sm font-bold">Learn step by step</p>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  Build a stronger foundation
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Programs */}
      <section
        id="programs"
        aria-label="Course programs"
        className="landing-container scroll-mt-24 py-16 sm:py-20"
      >
        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div className="max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-rose-800 dark:text-rose-300">
              Explore your options
            </p>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
              Find the path that inspires you.
            </h2>
            <p className="mt-4 text-sm leading-7 text-muted-foreground sm:text-base">
              Discover programs across medical, paramedical and applied science
              disciplines.
            </p>
          </div>

          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <BookOpen className="size-4 text-rose-700" />
            <span>{programs.length} academic pathways</span>
          </div>
        </div>

        <Tabs defaultValue="All Courses" className="mt-10 w-full">
          <div className="mb-8 overflow-x-auto pb-2">
            <TabsList
              aria-label="Filter programs by category"
              className="inline-flex h-auto min-w-max gap-1 rounded-xl border border-border/70 bg-muted/60 p-1.5"
            >
              {categories.map((category) => {
                const count =
                  category === 'All Courses'
                    ? programs.length
                    : programs.filter(
                        (program) => program.category === category,
                      ).length;

                return (
                  <TabsTrigger
                    key={category}
                    value={category}
                    className="gap-2 rounded-lg px-4 py-3 text-sm data-[state=active]:bg-card data-[state=active]:font-bold data-[state=active]:text-rose-800 data-[state=active]:shadow-sm dark:data-[state=active]:text-rose-300 sm:px-5"
                  >
                    {category}
                    <span className="rounded-md bg-muted px-1.5 py-0.5 text-[10px] font-bold text-muted-foreground">
                      {count}
                    </span>
                  </TabsTrigger>
                );
              })}
            </TabsList>
          </div>

          {categories.map((category) => {
            const visiblePrograms =
              category === 'All Courses'
                ? programs
                : programs.filter((program) => program.category === category);

            return (
              <TabsContent
                key={category}
                value={category}
                className="mt-0 focus-visible:outline-none"
              >
                <div className="mb-6 flex items-center justify-between">
                  <p className="text-sm text-muted-foreground">
                    Showing{' '}
                    <span className="font-bold text-foreground">
                      {visiblePrograms.length}
                    </span>{' '}
                    programs
                  </p>
                  <span className="hidden items-center gap-1 text-xs text-muted-foreground sm:flex">
                    <Search className="size-3.5" />
                    Explore available pathways
                  </span>
                </div>

                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {visiblePrograms.map((program) => (
                    <ProgramCard key={program.name} program={program} />
                  ))}
                </div>
              </TabsContent>
            );
          })}
        </Tabs>
      </section>

      {/* Entrance preparation */}
      <section className="relative overflow-hidden border-y bg-muted/20">
        <div className="pointer-events-none absolute -right-40 top-0 size-96 rounded-full bg-rose-700/5 blur-3xl" />

        <div className="landing-container relative py-16 sm:py-20">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-rose-700/15 bg-rose-700/5 px-4 py-2 text-xs font-bold uppercase tracking-wider text-rose-800 dark:text-rose-300">
              <Brain className="size-4" />
              MedPrep AI learning paths
            </span>

            <h2 className="mt-5 text-3xl font-extrabold tracking-tight sm:text-4xl">
              Prepare smarter for your entrance exam.
            </h2>

            <p className="mt-4 text-sm leading-7 text-muted-foreground sm:text-base">
              Build your understanding of core science subjects and follow a
              focused learning routine for medical entrance preparation.
            </p>
          </div>

          <Tabs defaultValue="subjects" className="mt-10 w-full">
            <div className="mb-8 flex justify-center overflow-x-auto pb-2">
              <TabsList
                aria-label="Medical entrance preparation paths"
                className="inline-flex h-auto min-w-max gap-1 rounded-xl border bg-card p-1.5"
              >
                <TabsTrigger
                  value="subjects"
                  className="rounded-lg px-5 py-3 text-sm data-[state=active]:bg-rose-800 data-[state=active]:text-white"
                >
                  <BookOpen className="mr-2 size-4" />
                  Subject courses
                </TabsTrigger>

                <TabsTrigger
                  value="entrance"
                  className="rounded-lg px-5 py-3 text-sm data-[state=active]:bg-rose-800 data-[state=active]:text-white"
                >
                  <GraduationCap className="mr-2 size-4" />
                  Common entrance preparation
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="subjects" className="mt-0">
              <div className="grid gap-5 md:grid-cols-3">
                {studySubjects.map((subject) => (
                  <SubjectCard key={subject.name} subject={subject} />
                ))}
              </div>

              <div className="mt-8 text-center">
                <Link
                  href="/lessons"
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-rose-800 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-rose-900/10 transition-all hover:-translate-y-0.5 hover:bg-rose-900"
                >
                  Browse all subject lessons
                  <ArrowRight className="size-4" />
                </Link>
              </div>
            </TabsContent>

            <TabsContent value="entrance" className="mt-0">
              <div className="grid overflow-hidden rounded-3xl border bg-card lg:grid-cols-[0.85fr_1.15fr]">
                <div className="relative min-h-72 overflow-hidden bg-[#21131e]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=1000&q=85"
                    alt="Student preparing for an examination"
                    loading="lazy"
                    className="absolute inset-0 size-full object-cover opacity-60"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#21131e] via-[#21131e]/20 to-transparent" />

                  <div className="absolute bottom-7 left-7 right-7">
                    <span className="text-xs font-bold uppercase tracking-[0.2em] text-rose-200">
                      Your preparation journey
                    </span>
                    <h3 className="mt-3 text-3xl font-extrabold text-white">
                      Every concept takes you one step closer.
                    </h3>
                    <p className="mt-3 text-sm leading-6 text-white/70">
                      Learn consistently. Practice regularly. Improve
                      continuously.
                    </p>
                  </div>
                </div>

                <div className="p-6 sm:p-9">
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-rose-800 dark:text-rose-300">
                    MECEE-BL preparation
                  </p>

                  <h3 className="mt-3 text-2xl font-bold tracking-tight">
                    A structured approach to entrance preparation
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-muted-foreground">
                    Strengthen your Physics, Chemistry and Biology fundamentals,
                    practise what you learn and revisit challenging topics with
                    a consistent study plan.
                  </p>

                  <div className="mt-7 space-y-5">
                    {preparationSteps.map((step) => (
                      <div key={step.number} className="flex gap-4">
                        <div className="grid size-10 shrink-0 place-items-center rounded-xl bg-rose-800/10 text-xs font-extrabold text-rose-800 dark:text-rose-300">
                          {step.number}
                        </div>

                        <div>
                          <h4 className="text-sm font-bold">{step.title}</h4>
                          <p className="mt-1 text-sm leading-6 text-muted-foreground">
                            {step.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <Link
                    href="/lessons"
                    className="mt-8 inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-rose-800 px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-rose-900"
                  >
                    Start preparing
                    <ArrowRight className="size-4" />
                  </Link>

                  <p className="mt-4 text-xs leading-5 text-muted-foreground">
                    Always refer to the latest official MECEE-BL syllabus and
                    examination notices for authoritative requirements.
                  </p>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="landing-container py-16 sm:py-20">
        <div className="relative overflow-hidden rounded-3xl bg-[#25121e] px-6 py-12 text-center text-white sm:px-12 sm:py-16">
          <div className="absolute -right-20 -top-32 size-80 rounded-full border border-white/10" />
          <div className="absolute -bottom-48 -left-20 size-96 rounded-full border border-white/10" />

          <div className="relative mx-auto max-w-2xl">
            <div className="mx-auto grid size-14 place-items-center rounded-2xl bg-rose-300/10 text-rose-200">
              <GraduationCap className="size-7" />
            </div>

            <h2 className="mt-6 text-3xl font-extrabold tracking-tight sm:text-4xl">
              Your learning journey starts with one step.
            </h2>

            <p className="mt-4 text-sm leading-7 text-white/65 sm:text-base">
              Explore lessons, strengthen your science fundamentals and move
              forward with confidence.
            </p>

            <Link
              href="/lessons"
              className="mt-8 inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-rose-700 px-7 py-3 text-sm font-bold text-white transition-all hover:-translate-y-0.5 hover:bg-rose-600"
            >
              Explore learning materials
              <ArrowUpRight className="size-4" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
