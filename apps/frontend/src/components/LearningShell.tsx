"use client";

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useQueryClient, useSuspenseQuery } from '@tanstack/react-query';
import {
  LayoutDashboard,
  BookOpen,
  ListChecks,
  Bookmark,
  ChartNoAxesCombined,
  Clock,
  Sparkles,
  FileText,
  LogOut,
  Moon,
  Sun,
  Menu,
  Stethoscope,
  ChevronRight,
  ShieldCheck,
  ChevronDown,
  Home,
} from 'lucide-react';
import { useEffect, useState, type ReactNode } from 'react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { authClient } from '@/lib/auth-client';
import { learningOptions } from '@/lib/learning';

const links = [
  { href: '/dashboard', label: 'Overview', icon: LayoutDashboard },
  { href: '/lessons', label: 'Visual lessons', icon: BookOpen },
  { href: '/practice', label: 'Question practice', icon: ListChecks },
  { href: '/revision', label: 'Revision centre', icon: Bookmark },
  { href: '/mock', label: 'Mock exams', icon: Clock },
  { href: '/past-papers', label: 'Past papers', icon: FileText },
  { href: '/tutor', label: 'AI study tutor', icon: Sparkles },
  { href: '/progress', label: 'Performance', icon: ChartNoAxesCombined },
] as const;

export function ThemeToggle() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const sync = () => setDark(document.documentElement.classList.contains('dark'));
    sync();
    const observer = new MutationObserver(sync);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  function toggleTheme() {
    const next = !document.documentElement.classList.contains('dark');
    document.documentElement.classList.toggle('dark', next);
    localStorage.setItem('medprep-theme', next ? 'dark' : 'light');
    setDark(next);
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      title={dark ? 'Switch to light mode' : 'Switch to dark mode'}
      aria-label="Toggle dark mode"
      aria-pressed={dark}
      onClick={toggleTheme}
    >
      {dark ? <Sun /> : <Moon />}
    </Button>
  );
}

export function LearningShell({ children }: { children: ReactNode }) {
  const { data } = useSuspenseQuery(learningOptions());
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();
  const router = useRouter();
  const visibleLinks = [
    ...links,
    ...(data.isAdmin ? [{ href: '/admin', label: 'Administration', icon: ShieldCheck }] : []),
  ];

  async function signOut() {
    await queryClient.cancelQueries();
    queryClient.clear();
    const { error } = await authClient.signOut();
    if (error) {
      toast.error(error.message);
      return;
    }
    router.replace('/login');
  }

  const navigation = (
    <>
      <Link
        href="/dashboard"
        className="flex items-center gap-3 border-b px-2 pb-6 pt-5 font-display text-lg font-extrabold"
      >
        <span className="grid size-10 place-items-center rounded-lg bg-primary text-primary-foreground">
          <Stethoscope className="size-5" />
        </span>
        <span>
          MedPrep <span className="text-accent">AI</span>
          <small className="mt-1 block text-[10px] font-medium text-muted-foreground">
            NEPAL · MECEE-BL
          </small>
        </span>
      </Link>
      <p className="px-3 pb-3 pt-7 text-[10px] font-semibold uppercase text-muted-foreground">
        Study workspace
      </p>
      <nav aria-label="Learning" className="space-y-1">
        {visibleLinks.map((link, index) => (
          <Link
            key={link.href}
            href={link.href}
            aria-current={pathname === link.href ? 'page' : undefined}
            onClick={() => setOpen(false)}
            className={`flex min-h-11 items-center gap-3 rounded-md border px-3 py-2.5 text-[13px] font-medium transition-colors ${
              index === 6 ? 'mt-5' : ''
            } ${
              pathname === link.href
                ? 'border-primary/15 bg-primary/8 text-primary shadow-sm'
                : 'border-transparent text-muted-foreground hover:bg-muted hover:text-foreground'
            }`}
          >
            <link.icon
              className={`size-[18px] ${pathname === link.href ? 'text-primary' : ''}`}
              strokeWidth={1.7}
            />
            {link.label}
            {pathname === link.href && <ChevronRight className="ml-auto size-3" />}
          </Link>
        ))}
      </nav>
      <div className="mt-auto pt-8">
        <div className="border-t px-2 pt-5">
          <p className="flex items-center gap-2 text-xs font-semibold">
            <span className="size-1.5 rounded-full bg-accent" />
            One concept at a time.
          </p>
          <p className="mt-2 text-[11px] leading-5 text-muted-foreground">
            Your medical journey, a little clearer.
          </p>
        </div>
        <Button
          variant="ghost"
          className="mt-4 w-full justify-start text-muted-foreground"
          onClick={() => void signOut()}
        >
          <LogOut />
          Sign out
        </Button>
      </div>
    </>
  );

  return (
    <div className="min-h-screen md:pl-64">
      <aside className="fixed bottom-0 left-0 top-[76px] z-30 hidden w-64 flex-col overflow-y-auto border-r bg-card px-5 pb-5 md:flex">
        {navigation}
      </aside>
      <header className="sticky top-[76px] z-20 flex h-[72px] items-center justify-between gap-3 border-b bg-background/95 px-5 backdrop-blur md:px-10">
        <div className="flex min-w-0 items-center gap-3">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Open learning menu" className="md:hidden">
                <Menu />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="flex w-72 flex-col overflow-y-auto px-5">
              <SheetTitle className="sr-only">Learning navigation</SheetTitle>
              {navigation}
            </SheetContent>
          </Sheet>
          <div className="flex min-w-0 items-center gap-2 text-xs">
            <Link href="/dashboard" className="hidden text-muted-foreground hover:text-foreground sm:inline">
              Workspace
            </Link>
            <ChevronRight className="hidden size-3 text-muted-foreground sm:block" />
            <span className="truncate font-medium">
              {visibleLinks.find((link) => link.href === pathname)?.label ?? 'Administration'}
            </span>
          </div>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <ThemeToggle />
          <span className="mx-1 h-5 border-l" />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" aria-label="Open account menu" className="gap-2 px-2">
                <span className="grid size-8 place-items-center rounded-full border border-accent/20 bg-accent/10 text-accent">
                  <Stethoscope className="size-4" />
                </span>
                <span className="hidden text-xs sm:inline">My workspace</span>
                <ChevronDown className="size-3" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-52">
              <DropdownMenuLabel>MedPrep AI Nepal</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/home">
                  <Home />
                  Visit home
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/progress">
                  <ChartNoAxesCombined />
                  My performance
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onSelect={() => void signOut()}>
                <LogOut />
                Sign out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>
      <div id="main-content" className="learning-content study-enter">
        {children}
      </div>
    </div>
  );
}
