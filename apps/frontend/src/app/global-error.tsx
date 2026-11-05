"use client";

import './global.css';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function GlobalError({ reset }: { reset: () => void }) {
  return (
    <html lang="en">
      <body>
        <main className="flex min-h-screen items-center justify-center bg-background px-4">
          <div className="max-w-md text-center">
            <h1 className="text-xl font-semibold">This page didn&apos;t load</h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Something went wrong. You can try again or return home.
            </p>
            <div className="mt-6 flex justify-center gap-2">
              <Button onClick={reset}>Try again</Button>
              <Button asChild variant="outline">
                <Link href="/home">Go home</Link>
              </Button>
            </div>
          </div>
        </main>
      </body>
    </html>
  );
}
