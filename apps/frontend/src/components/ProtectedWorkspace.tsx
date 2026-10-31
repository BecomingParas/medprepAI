"use client";

import { Suspense, useEffect, type ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { LearningShell } from '@/components/LearningShell';
import { useAuth } from '@/hooks/useAuth';

function WorkspaceLoading() {
  return (
    <main className="mx-auto w-full max-w-7xl animate-pulse px-5 py-10" aria-label="Loading workspace">
      <div className="h-4 w-36 rounded bg-muted" />
      <div className="mt-4 h-10 w-64 rounded bg-muted" />
      <div className="mt-3 h-5 max-w-lg rounded bg-muted" />
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[0, 1, 2, 3].map((item) => (
          <div key={item} className="h-28 rounded-lg border bg-card" />
        ))}
      </div>
    </main>
  );
}

export function ProtectedWorkspace({ children }: { children: ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) router.replace('/auth');
  }, [loading, router, user]);

  if (loading || !user) return <WorkspaceLoading />;

  return (
    <Suspense fallback={<WorkspaceLoading />}>
      <LearningShell>{children}</LearningShell>
    </Suspense>
  );
}
