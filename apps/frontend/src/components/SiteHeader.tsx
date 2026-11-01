"use client";

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { Menu, X, Stethoscope } from 'lucide-react';
import { toast } from 'sonner';
import { authClient } from '@/lib/auth-client';
import { useAuth } from '@/hooks/useAuth';
import { ThemeToggle } from '@/components/LearningShell';
import { Button } from '@/components/ui/button';

const appLinks = [
  { href: '/#subjects', label: 'Subjects' },
  { href: '/#try-it', label: 'Visual learning' },
  { href: '/#your-path', label: 'Your study path' },
  { href: '/#questions', label: 'FAQs' },
] as const;

export function Logo() {
  return (
    <Link
      href="/"
      aria-label="MedPrep AI Nepal home"
      className="flex shrink-0 items-center gap-2.5 font-display text-lg font-extrabold text-foreground"
    >
      <span className="grid h-9 w-9 place-items-center rounded-lg bg-primary text-primary-foreground">
        <Stethoscope className="h-5 w-5" />
      </span>
      <span>
        MedPrep<span className="text-accent"> AI</span>
        <span className="mt-0.5 block text-[8px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
          Nepal · Medical entrance prep
        </span>
      </span>
    </Link>
  );
}

export function SiteHeader() {
  const { user } = useAuth();
  const router = useRouter();
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const linkClass =
    'px-3 py-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors';

  async function signOut() {
    await queryClient.cancelQueries();
    queryClient.clear();
    const { error } = await authClient.signOut();
    if (error) {
      toast.error(error.message);
      return;
    }
    router.replace('/auth');
  }

  const auth = user ? (
    <Button variant="outline" size="sm" onClick={() => void signOut()}>
      Sign out
    </Button>
  ) : (
    <div className="flex items-center gap-2">
      <Button asChild variant="ghost" size="sm">
        <Link href="/auth">Sign in</Link>
      </Button>
      <Button asChild size="sm">
        <Link href="/auth">Start Learning Free</Link>
      </Button>
    </div>
  );

  return (
    <header className="sticky top-0 z-30 border-b bg-card/90 backdrop-blur">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-50 focus:rounded-md focus:bg-card focus:p-3"
      >
        Skip to content
      </a>
      <div className="landing-container flex h-20 items-center justify-between gap-5">
        <Logo />
        <nav aria-label="Main" className="hidden items-center gap-1 text-sm font-medium lg:flex">
          {appLinks.map((link) => (
            <a key={link.href} href={link.href} className={linkClass}>
              {link.label}
            </a>
          ))}
        </nav>
        <div className="hidden items-center gap-2 lg:flex">
          <ThemeToggle />
          {auth}
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          onClick={() => setOpen((current) => !current)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>
      {open && (
        <nav aria-label="Mobile" className="border-t px-5 py-3 lg:hidden">
          <div className="flex flex-col text-sm font-medium">
            {appLinks.map((link) => (
              <a key={link.href} href={link.href} className={linkClass} onClick={() => setOpen(false)}>
                {link.label}
              </a>
            ))}
          </div>
          <div className="mt-3 flex items-center justify-between gap-3">
            {auth}
            <ThemeToggle />
          </div>
        </nav>
      )}
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t bg-card">
      <div className="landing-container grid gap-9 py-12 md:grid-cols-4">
        <div className="md:col-span-2">
          <Logo />
          <p className="mt-3 max-w-sm text-sm text-muted-foreground">
            Learn Visually. Practice Smarter. Achieve Your Medical Dream.
          </p>
        </div>
        <div className="text-sm">
          <p className="font-semibold">Study</p>
          <ul className="mt-3 space-y-2 text-muted-foreground">
            <li>
              <Link href="/practice" className="hover:text-foreground">
                Practice questions
              </Link>
            </li>
            <li>
              <Link href="/past-papers" className="hover:text-foreground">
                Past papers
              </Link>
            </li>
            <li>
              <Link href="/mock" className="hover:text-foreground">
                Mock exams
              </Link>
            </li>
          </ul>
        </div>
        <div className="text-sm">
          <p className="font-semibold">Academic disclaimer</p>
          <p className="mt-3 text-muted-foreground">
            Practice questions are sample or AI-generated unless marked as verified past papers. MedPrep AI is not
            affiliated with the Medical Education Commission.
          </p>
        </div>
      </div>
      <p className="border-t py-5 text-center text-xs text-muted-foreground">© 2026 MedPrep AI Nepal</p>
    </footer>
  );
}
