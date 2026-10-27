import { Suspense } from 'react';
import { QuizList } from '@/components/QuizList';
import { getQuizzes } from '@/services/api';

export default function QuizzesPage() {
  return (
    <>
      <h1 className="mb-6 text-2xl font-bold">Your Quizzes</h1>
      <Suspense fallback={<p className="text-muted">Loading…</p>}>
        <Quizzes />
      </Suspense>
    </>
  );
}

async function Quizzes() {
  const quizzes = await getQuizzes();
  return <QuizList initialQuizzes={quizzes} />;
}
