'use client'; // Error boundaries must be Client Components

import Link from 'next/link';
import { useEffect } from 'react';

export default function Error({ error, retry }: { error: unknown; retry: () => void }) {
  useEffect(() => {
    // console.error(error);
  }, [error]);

  return (
    <div className="py-16 text-center">
      <h1 className="text-2xl font-bold">Something went wrong</h1>
      <p className="mt-2 text-muted">We couldn’t load this page.</p>
      <div className="mt-8 flex justify-center gap-3">
        <button type="button" className="btn-primary" onClick={() => retry()}>
          Try again
        </button>
        <Link href="/quizzes" className="btn px-4 py-2">
          Back to quizzes
        </Link>
      </div>
    </div>
  );
}
