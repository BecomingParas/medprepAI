"use client";

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useEffect, useState, type ReactNode } from 'react';
import { SiteFooter, SiteHeader } from '@/components/SiteHeader';
import { Toaster } from '@/components/ui/sonner';

export function AppProviders({ children }: { children: ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: { refetchOnWindowFocus: false, retry: 1 },
        },
      }),
  );

  useEffect(() => {
    const storedTheme = localStorage.getItem('medprep-theme');
    const dark =
      storedTheme === 'dark' ||
      (storedTheme === null && window.matchMedia('(prefers-color-scheme: dark)').matches);
    document.documentElement.classList.toggle('dark', dark);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <SiteHeader />
      {children}
      <SiteFooter />
      <Toaster richColors />
    </QueryClientProvider>
  );
}
