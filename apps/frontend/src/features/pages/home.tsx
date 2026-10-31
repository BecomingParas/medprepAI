import Link from "next/link";
import { ArrowDown, ArrowRight, Atom, BookOpen, Check, ChevronDown, Dna, Eye, FileCheck2, FlaskConical, RefreshCw, ShieldCheck, Sparkles, Target } from "lucide-react";
import { SiteHeader, SiteFooter } from "@/components/SiteHeader";
import { LandingPractice } from "@/components/LandingPractice";
import { Button } from "@/components/ui/button";
import landingHeart from "@/assets/landing-heart.jpg";

const subjects = [
  { name: "Physics", icon: Atom, tone: "text-phy", surface: "bg-phy/8", number: "01", description: "Make sense of the forces that shape our world.", topics: ["Mechanics", "Optics", "Electricity & magnetism", "Waves & thermodynamics"] },
  { name: "Chemistry", icon: FlaskConical, tone: "text-chem", surface: "bg-chem/8", number: "02", description: "Connect the reactions. Understand the why.", topics: ["Organic chemistry", "Chemical bonding", "Physical chemistry", "Inorganic chemistry"] },
  { name: "Biology", icon: Dna, tone: "text-bio", surface: "bg-bio/8", number: "03", description: "Discover the extraordinary science of life.", topics: ["Human physiology", "Cell biology", "Genetics", "Botany & zoology"] },
];
const steps = [
  { icon: BookOpen, title: "Find your focus", description: "Choose a PCB subject and the chapter you want to work on." },
  { icon: Eye, title: "See it. Understand it.", description: "Explore concepts with visuals and clear, step-by-step explanations." },
  { icon: Target, title: "Put it into practice", description: "Build confidence with sample MCQs and timed mock exams." },
  { icon: RefreshCw, title: "Make progress stick", description: "Return to saved questions and the chapters that need more attention." },
];
const faqs = [
  { question: "Who is MedPrep AI Nepal for?", answer: "MedPrep AI Nepal is designed for students preparing for Nepal’s MBBS and MECEE-BL entrance examination, with a focus on Physics, Chemistry and Biology." },
  { question: "Are these official past-paper questions?", answer: "Not currently. The question bank contains sample practice questions, not official Nepal entrance papers. No verified past papers are available yet. Questions will only be marked verified after their source material has been checked." },
  { question: "Do I need an account to start?", answer: "You can try the sample question on this page without an account. Sign in to use the full question bank, save questions, take mock exams and keep your learning progress together." },
  { question: "How does the AI tutor help?", answer: "Ask the tutor about a Physics, Chemistry or Biology concept and get a conversational explanation. AI can make mistakes, so check important details against your textbooks and syllabus." },
  { question: "Is MedPrep affiliated with the Medical Education Commission?", answer: "No. MedPrep AI Nepal is an independent learning platform and is not affiliated with or endorsed by Nepal’s Medical Education Commission." },
];

export default function HomePage() {
  return <div className="landing-page min-h-screen">
    <SiteHeader />
    <main id="main-content">
      <section className="landing-hero relative isolate overflow-hidden bg-cover text-navy-foreground" aria-labelledby="hero-title">
        <img src={landingHeart.src} alt="Detailed anatomical model of a human heart" width={1536} height={1024} fetchPriority="high" className="landing-hero-image absolute inset-0 -z-20 size-full object-cover" />
        <div className="landing-hero-shade absolute inset-0 -z-10" />
        <div className="landing-container relative py-14 sm:py-16 lg:py-20">
          <div className="landing-hero-copy max-w-xl">
            <p className="flex items-center gap-2.5 text-[11px] font-semibold uppercase tracking-widest text-hero-accent"><span className="size-1.5 rounded-full bg-hero-accent" />Made for Nepal’s future doctors</p>
            <h1 id="hero-title" className="mt-6 text-4xl font-extrabold leading-[1.16] sm:text-5xl lg:text-6xl">MedPrep AI <span className="text-hero-accent">Nepal.</span></h1>
            <p className="mt-5 text-2xl font-semibold leading-snug sm:text-3xl">Understand more.<br />Prepare better.</p>
            <p className="mt-5 max-w-md text-sm leading-7 text-navy-foreground/70 sm:text-base">Your medical journey starts with a clearer understanding. Bring Physics, Chemistry and Biology to life — one concept at a time.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg" className="h-12 gap-3 bg-hero-accent text-hero-ink hover:bg-hero-accent/90"><Link href="/auth">Start learning free<ArrowRight className="size-4" /></Link></Button>
              <Button asChild size="lg" variant="outline" className="h-12 border-navy-foreground/25 bg-transparent text-navy-foreground hover:bg-navy-foreground/10 hover:text-navy-foreground"><a href="#try-it"><Eye className="size-4" />Try a question</a></Button>
            </div>
            <div className="mt-7 flex flex-wrap gap-x-5 gap-y-2 text-[11px] text-navy-foreground/65"><span className="flex items-center gap-1.5"><Check className="size-3.5 text-hero-accent" />PCB focused</span><span className="flex items-center gap-1.5"><Check className="size-3.5 text-hero-accent" />Visual learning</span><span className="flex items-center gap-1.5"><Check className="size-3.5 text-hero-accent" />Your pace, your progress</span></div>
          </div>
          <div className="landing-hero-caption absolute bottom-8 right-7 hidden items-center gap-3 text-[10px] text-navy-foreground/65 lg:flex"><span className="h-px w-9 bg-hero-accent/60" /><span>THE HUMAN HEART<br /><span className="mt-1 block text-navy-foreground/40">Biology · Human physiology</span></span></div>
        </div>
      </section>

      <div className="border-b bg-card"><div className="landing-container grid grid-cols-2 gap-x-4 gap-y-5 py-6 md:grid-cols-4">{[{ icon: BookOpen, title: "Built around PCB", subtitle: "Physics · Chemistry · Biology" }, { icon: Eye, title: "Learn beyond memorizing", subtitle: "Concepts that make sense" }, { icon: Sparkles, title: "A little help from AI", subtitle: "Ask. Explore. Understand." }, { icon: ShieldCheck, title: "Honest about sources", subtitle: "Samples clearly identified" }].map(item => <div key={item.title} className="flex items-center gap-3"><item.icon className="size-5 shrink-0 text-accent" /><div><p className="text-xs font-semibold">{item.title}</p><p className="mt-1 text-[10px] text-muted-foreground">{item.subtitle}</p></div></div>)}</div></div>

      <section id="subjects" className="landing-container scroll-mt-24 py-16 sm:py-20">
        <div className="flex flex-wrap items-end justify-between gap-5"><div><p className="landing-eyebrow">Three subjects. One ambition.</p><h2 className="mt-3 text-3xl font-bold">Build a stronger foundation.</h2><p className="mt-3 text-sm leading-6 text-muted-foreground">Big dreams start with the basics. Find your next chapter.</p></div><Button asChild variant="link" className="h-auto gap-2 p-0 text-sm"><Link href="/lessons">Explore visual lessons<ArrowRight className="size-4" /></Link></Button></div>
        <div className="mt-9 grid gap-5 md:grid-cols-3">{subjects.map(subject => <article key={subject.name} className="group overflow-hidden rounded-lg border bg-card shadow-card transition-all duration-200 hover:-translate-y-1 hover:border-accent/40"><div className={`relative flex h-28 items-center justify-center overflow-hidden ${subject.surface}`}><subject.icon strokeWidth={1.2} className={`size-16 transition-transform duration-300 group-hover:scale-110 ${subject.tone}`} /><span className={`absolute right-5 top-4 text-[10px] font-semibold ${subject.tone}`}>{subject.number} / PCB</span></div><div className="p-6"><h3 className="text-xl font-bold">{subject.name}</h3><p className="mt-2 min-h-10 text-xs leading-5 text-muted-foreground">{subject.description}</p><ul className="my-5 space-y-2 text-xs text-muted-foreground">{subject.topics.map(topic => <li key={topic} className="flex items-center gap-2"><span className={`size-1 rounded-full bg-current ${subject.tone}`} />{topic}</li>)}</ul><Button asChild variant="ghost" className={`h-auto w-full justify-between border-t px-0 pb-0 pt-4 hover:bg-transparent ${subject.tone}`}><Link href="/lessons">Explore {subject.name}<ArrowRight className="size-4" /></Link></Button></div></article>)}</div>
      </section>

      <section id="try-it" className="scroll-mt-24 border-y bg-secondary/55 py-16 sm:py-20"><div className="landing-container"><div className="mb-9 text-center"><p className="landing-eyebrow">A small question. A bigger understanding.</p><h2 className="mt-3 text-3xl font-bold">Less guessing. More “got it.”</h2><p className="mt-3 text-sm text-muted-foreground">Give your curiosity a go. No sign-in needed.</p></div><LandingPractice /></div></section>

      <section id="your-path" className="landing-container scroll-mt-24 py-16 sm:py-20"><div className="max-w-xl"><p className="landing-eyebrow">Your path to better preparation</p><h2 className="mt-3 text-3xl font-bold">A little clearer. Every day.</h2><p className="mt-3 text-sm leading-6 text-muted-foreground">Turn a study session into a cycle of understanding, practice and progress.</p></div><div className="mt-11 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">{steps.map((step, i) => <div key={step.title} className="relative border-t pt-6"><div className="mb-5 flex items-center justify-between"><span className="grid size-10 place-items-center rounded-lg bg-accent/10 text-accent"><step.icon className="size-5" /></span><span className="font-display text-xs text-muted-foreground">0{i + 1}</span></div><h3 className="text-sm font-bold">{step.title}</h3><p className="mt-2 text-xs leading-6 text-muted-foreground">{step.description}</p></div>)}</div></section>

      <section className="border-y bg-card"><div className="landing-container grid gap-8 py-12 md:grid-cols-[auto_1fr_auto] md:items-center"><span className="grid size-14 place-items-center rounded-lg bg-accent/10 text-accent"><FileCheck2 className="size-7" strokeWidth={1.5} /></span><div className="max-w-xl"><p className="landing-eyebrow">Real learning starts with trust</p><h2 className="mt-2 text-xl font-bold">Practice questions. Clearly sourced.</h2><p className="mt-3 text-sm leading-6 text-muted-foreground">Our current questions are samples, not official exam papers. No verified papers are available yet — and we’ll never label one verified without checking its source.</p></div><Button asChild variant="outline" className="justify-self-start"><Link href="/past-papers">Past-paper library<ArrowRight className="size-4" /></Link></Button></div></section>

      <section id="questions" className="landing-container grid scroll-mt-24 gap-8 py-16 sm:py-20 md:grid-cols-[0.8fr_1.2fr]"><div><p className="landing-eyebrow">A few things to know</p><h2 className="mt-3 text-3xl font-bold">Curious? Good.</h2><p className="mt-3 max-w-xs text-sm leading-6 text-muted-foreground">A little clarity before you begin.</p><ArrowDown className="mt-7 size-6 text-accent" strokeWidth={1.3} /></div><div className="border-t">{faqs.map(faq => <details key={faq.question} className="group border-b py-5"><summary className="flex cursor-pointer list-none items-center justify-between gap-5 text-sm font-semibold [&::-webkit-details-marker]:hidden">{faq.question}<ChevronDown className="size-4 shrink-0 text-muted-foreground transition-transform group-open:rotate-180" /></summary><p className="mt-4 max-w-xl pr-7 text-sm leading-7 text-muted-foreground">{faq.answer}</p></details>)}</div></section>

      <section className="bg-navy text-navy-foreground"><div className="landing-container flex flex-wrap items-center justify-between gap-8 py-14 sm:py-16"><div><p className="text-[10px] font-semibold uppercase tracking-widest text-hero-accent">Your next chapter starts here</p><h2 className="mt-4 text-3xl font-bold leading-snug">Big ambition.<br />One concept at a time.</h2><p className="mt-4 max-w-md text-sm leading-6 text-navy-foreground/65">Make today a little more understood than yesterday.</p></div><Button asChild size="lg" className="h-12 gap-5 bg-hero-accent text-hero-ink hover:bg-hero-accent/90"><Link href="/auth">Let’s start learning<ArrowRight className="size-4" /></Link></Button></div></section>
    </main>
    <SiteFooter />
  </div>;
}
