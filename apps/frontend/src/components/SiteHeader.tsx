'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import {
  ArrowRight,
  BookOpen,
  BrainCircuit,
  Menu,
  X,
  Stethoscope,
  GraduationCap,
  ChevronRight,
} from 'lucide-react';
import { toast } from 'sonner';

import { authClient } from '@/lib/auth-client';
import { useAuth } from '@/hooks/useAuth';
import { ThemeToggle } from '@/components/LearningShell';
import { Button } from '@/components/ui/button';

const siteLinks = [
  { href: '/courses', label: 'Courses' },
  { href: '/syllabus', label: 'Syllabus' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
] as const;

const footerLinks = {
  study: [
    { href: '/courses', label: 'Explore courses' },
    { href: '/practice', label: 'Practice questions' },
    { href: '/past-papers', label: 'Past papers' },
    { href: '/mock', label: 'Mock examinations' },
    { href: '/revision', label: 'Smart revision' },
  ],
  platform: [
    { href: '/syllabus', label: 'Entrance syllabus' },
    { href: '/about', label: 'About MedPrep AI' },
    { href: '/contact', label: 'Contact us' },
    { href: '/privacy', label: 'Privacy policy' },
    { href: '/terms', label: 'Terms of service' },
  ],
};

export function Logo() {
  return (
    <Link
      href="/home"
      aria-label="MedPrep AI Nepal home"
      className="group flex shrink-0 items-center gap-3"
    >
      <span className="relative grid size-11 place-items-center overflow-hidden rounded-[15px] bg-gradient-to-br from-primary via-primary to-indigo-600 text-white shadow-lg shadow-primary/20 transition-all duration-300 group-hover:-rotate-3 group-hover:scale-105">
        <Stethoscope className="size-[23px]" strokeWidth={2.1} />
        <span className="absolute -bottom-1 -right-1 size-4 rounded-full border-[2.5px] border-background bg-teal-400" />
      </span>

      <span className="flex flex-col">
        <span className="font-display text-[19px] font-extrabold leading-tight tracking-tight text-foreground">
          MedPrep <span className="text-primary">AI</span>
        </span>

        <span className="mt-1 text-[9px] font-bold uppercase tracking-[0.16em] text-muted-foreground">
          Nepal · Medical entrance prep
        </span>
      </span>
    </Link>
  );
}

export function SiteHeader() {
  const { user } = useAuth();
  const pathname = usePathname();
  const router = useRouter();
  const queryClient = useQueryClient();

  const [open, setOpen] = useState(false);
  const [signingOut, setSigningOut] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;

    function handleEscape(event: KeyboardEvent) {
      if (event.key === 'Escape') setOpen(false);
    }

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [open]);

  async function signOut() {
    if (signingOut) return;

    setSigningOut(true);

    try {
      await queryClient.cancelQueries();

      const { error } = await authClient.signOut();

      if (error) {
        toast.error(error.message);
        return;
      }

      queryClient.clear();
      setOpen(false);
      router.replace('/login');
      router.refresh();
    } catch {
      toast.error('Unable to sign out. Please try again.');
    } finally {
      setSigningOut(false);
    }
  }

  const authActions = user ? (
    <>
      <Button asChild variant="ghost" size="sm" className="rounded-xl">
        <Link href="/dashboard">Dashboard</Link>
      </Button>

      <Button
        variant="outline"
        size="sm"
        disabled={signingOut}
        onClick={() => void signOut()}
        className="rounded-xl"
      >
        {signingOut ? 'Signing out...' : 'Sign out'}
      </Button>
    </>
  ) : (
    <>
      <Button asChild variant="ghost" size="sm" className="rounded-xl">
        <Link href="/login">Sign in</Link>
      </Button>

      <Button
        asChild
        size="sm"
        className="group h-10 rounded-xl px-5 shadow-md shadow-primary/15 transition-all hover:-translate-y-0.5 hover:shadow-lg"
      >
        <Link href="/login?mode=register">
          Start learning
          <ArrowRight className="ml-2 size-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </Button>
    </>
  );

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/85 backdrop-blur-2xl">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-[60] focus:rounded-lg focus:bg-background focus:p-3"
      >
        Skip to content
      </a>

      <div className="landing-container flex h-[72px] items-center justify-between gap-5">
        <Logo />

        {/* Desktop navigation */}
        <nav
          aria-label="Main navigation"
          className="hidden items-center gap-1 lg:flex"
        >
          {siteLinks.map((link) => {
            const active =
              pathname === link.href || pathname.startsWith(`${link.href}/`);

            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? 'page' : undefined}
                className={`relative rounded-xl px-4 py-2.5 text-[13px] font-semibold transition-colors ${
                  active
                    ? 'bg-primary/[0.08] text-primary'
                    : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                }`}
              >
                {link.label}

                {active && (
                  <span className="absolute inset-x-4 -bottom-[1px] h-0.5 rounded-full bg-primary" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Desktop actions */}
        <div className="hidden items-center gap-3 lg:flex">
          <ThemeToggle />
          <div className="h-7 w-px bg-border/70" />
          {authActions}
        </div>

        {/* Mobile actions */}
        <div className="flex items-center gap-2 lg:hidden">
          <ThemeToggle />

          <Button
            variant="outline"
            size="icon"
            className="size-10 rounded-xl"
            aria-label={open ? 'Close navigation' : 'Open navigation'}
            aria-expanded={open}
            aria-controls="mobile-navigation"
            onClick={() => setOpen((current) => !current)}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile navigation */}
      {open && (
        <div
          id="mobile-navigation"
          className="border-t border-border/60 bg-background shadow-xl shadow-black/5 lg:hidden"
        >
          <div className="landing-container py-5">
            <p className="mb-3 px-3 text-[10px] font-bold uppercase tracking-[0.18em] text-muted-foreground">
              Explore MedPrep AI
            </p>

            <nav aria-label="Mobile navigation" className="flex flex-col gap-1">
              {siteLinks.map((link) => {
                const active =
                  pathname === link.href ||
                  pathname.startsWith(`${link.href}/`);

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    aria-current={active ? 'page' : undefined}
                    onClick={() => setOpen(false)}
                    className={`flex items-center justify-between rounded-xl px-4 py-3.5 text-sm font-semibold transition-colors ${
                      active
                        ? 'bg-primary/[0.08] text-primary'
                        : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                    }`}
                  >
                    {link.label}
                    <ChevronRight className="size-4 opacity-50" />
                  </Link>
                );
              })}
            </nav>

            <div className="mt-5 flex flex-col gap-2 border-t border-border/60 pt-5">
              {user ? (
                <>
                  <Button asChild className="w-full rounded-xl">
                    <Link href="/dashboard" onClick={() => setOpen(false)}>
                      Go to dashboard
                      <ArrowRight className="ml-2 size-4" />
                    </Link>
                  </Button>

                  <Button
                    variant="outline"
                    disabled={signingOut}
                    onClick={() => void signOut()}
                    className="w-full rounded-xl"
                  >
                    {signingOut ? 'Signing out...' : 'Sign out'}
                  </Button>
                </>
              ) : (
                <div className="flex gap-2">
                  <Button
                    asChild
                    variant="outline"
                    className="flex-1 rounded-xl"
                  >
                    <Link href="/login" onClick={() => setOpen(false)}>
                      Sign in
                    </Link>
                  </Button>

                  <Button asChild className="flex-1 rounded-xl">
                    <Link href="/login" onClick={() => setOpen(false)}>
                      Start learning
                      <ArrowRight className="ml-2 size-4" />
                    </Link>
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="relative overflow-hidden border-t border-border/60 bg-card">
      {/* Subtle background accent */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 -top-40 size-[400px] rounded-full bg-primary/[0.035] blur-[100px]"
      />

      <div className="landing-container relative">
        {/* Main footer */}
        <div className="grid gap-12 py-14 sm:py-16 lg:grid-cols-[1.5fr_0.8fr_0.8fr] lg:gap-16">
          {/* Brand */}
          <div>
            <Logo />

            <p className="mt-6 max-w-sm text-sm leading-7 text-muted-foreground">
              Learn visually. Practice smarter. Achieve your medical dream. Your
              learning companion for medical entrance preparation in Nepal.
            </p>

            <div className="mt-7 flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-background px-3 py-2 text-xs font-semibold text-muted-foreground">
                <BookOpen className="size-3.5 text-primary" />
                PCB Learning
              </span>

              <span className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-background px-3 py-2 text-xs font-semibold text-muted-foreground">
                <BrainCircuit className="size-3.5 text-teal-500" />
                AI Powered
              </span>

              <span className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-background px-3 py-2 text-xs font-semibold text-muted-foreground">
                <GraduationCap className="size-3.5 text-indigo-500" />
                Entrance Preparation
              </span>
            </div>
          </div>

          {/* Study links */}
          <div>
            <h3 className="text-sm font-bold text-foreground">
              Study resources
            </h3>

            <ul className="mt-6 space-y-4">
              {footerLinks.study.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="group inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-primary"
                  >
                    {link.label}
                    <ArrowRight className="size-3 -translate-x-1 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Platform links */}
          <div>
            <h3 className="text-sm font-bold text-foreground">Platform</h3>

            <ul className="mt-6 space-y-4">
              {footerLinks.platform.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="group inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-primary"
                  >
                    {link.label}
                    <ArrowRight className="size-3 -translate-x-1 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Academic disclaimer */}
        <div className="rounded-2xl border border-border/70 bg-background/70 p-5 sm:p-6">
          <div className="flex items-start gap-3">
            <div className="grid size-9 shrink-0 place-items-center rounded-xl bg-primary/[0.08] text-primary">
              <BookOpen className="size-4" />
            </div>

            <div>
              <h3 className="text-xs font-bold text-foreground">
                Academic transparency
              </h3>

              <p className="mt-2 max-w-4xl text-xs leading-6 text-muted-foreground">
                Practice questions are sample or AI-generated unless explicitly
                marked as verified past-paper questions. MedPrep AI Nepal is an
                independent educational platform and is not affiliated with the
                Medical Education Commission.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-8 flex flex-col gap-4 border-t border-border/60 py-7 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} MedPrep AI Nepal. All rights reserved.
          </p>

          <p className="text-xs text-muted-foreground">
            Built to make learning more meaningful.
          </p>
        </div>
      </div>
    </footer>
  );
}
