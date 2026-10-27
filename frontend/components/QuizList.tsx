'use client';

import Link from 'next/link';
import { useState } from 'react';
import { deleteQuiz, type QuizSummary } from '@/services/api';

export function QuizList({ initialQuizzes }: { initialQuizzes: QuizSummary[] }) {
  const [quizzes, setQuizzes] = useState(initialQuizzes);
  const [error, setError] = useState<string>();

  const handleDelete = async (id: number) => {
    setError(undefined);
    try {
      await deleteQuiz(id);
      setQuizzes((current) => current.filter((quiz) => quiz.id !== id));
    } catch {
      setError('Failed to delete quiz');
    }
  };

  if (quizzes.length === 0) {
    return (
      <div className="flex flex-col items-center gap-3 rounded-lg border border-dashed border-border bg-background px-6 py-12 text-center">
        <p className="text-lg font-semibold">No quizzes yet</p>
        <p className="text-sm text-muted">Create your first quiz to see it here.</p>
        <Link href="/create" className="btn-primary">
          Create quiz
        </Link>
      </div>
    );
  }

  return (
    <>
      {error && <p className="mb-3 text-sm text-red-600">{error}</p>}
      <ul className="divide-y divide-border rounded-lg border border-border bg-background">
        {quizzes.map((quiz) => (
          <li key={quiz.id} className="flex items-center justify-between gap-3 p-4">
            <Link href={`/quizzes/${quiz.id}`} className="min-w-0 flex-1">
              <span className="block truncate font-medium">{quiz.title}</span>
              <span className="text-sm text-muted">
                {quiz.questionCount} {quiz.questionCount === 1 ? 'question' : 'questions'}
              </span>
            </Link>
            <button
              type="button"
              aria-label={`Delete ${quiz.title}`}
              className="rounded-md p-2 text-muted duration-300 hover:bg-card hover:text-red-600"
              onClick={() => handleDelete(quiz.id)}
            >
              <TrashIcon />
            </button>
          </li>
        ))}
      </ul>
    </>
  );
}

function TrashIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="size-5"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6M10 11v6M14 11v6" />
    </svg>
  );
}
