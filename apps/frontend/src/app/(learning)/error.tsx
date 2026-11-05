"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { reportLovableError } from '@/lib/lovable-error-reporting';
import { useEffect } from 'react';

export default function LearningError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    reportLovableError(error, { boundary: 'next_learning_error_boundary' });
  }, [error]);

  return (
    <div className="flex min-h-[60vh] items-center justify-center px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight">This page didn&apos;t load</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          The learning service may be unavailable. Start the backend with
          <code className="mx-1 rounded bg-muted px-1.5 py-0.5">yarn dev</code>
          or check <code>NEXT_PUBLIC_GRAPHQL_URL</code>, then try again.
        </p>
        <div className="mt-6 flex justify-center gap-2">
          <Button onClick={reset}>Try again</Button>
          <Button asChild variant="outline">
            <Link href="/home">Home</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
