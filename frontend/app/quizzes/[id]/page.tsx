import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';
import { QuestionView } from '@/components/QuestionView';
import { ApiError, getQuiz } from '@/services/api';

export default function QuizPage({ params }: PageProps<'/quizzes/[id]'>) {
  return (
    <>
      <Link href="/quizzes" className="mb-4 inline-block text-sm text-muted hover:underline">
        ← All quizzes
      </Link>
      <Suspense fallback={<p className="text-muted">Loading…</p>}>
        <QuizDetail params={params} />
      </Suspense>
    </>
  );
}

async function QuizDetail({ params }: Pick<PageProps<'/quizzes/[id]'>, 'params'>) {
  const { id } = await params;
  const quiz = await getQuiz(Number(id)).catch((error: unknown) => {
    if (error instanceof ApiError && (error.status === 404 || error.status === 400)) notFound();
    throw error;
  });

  return (
    <>
      <h1 className="mb-6 text-2xl font-bold">{quiz.title}</h1>
      <ol className="space-y-4">
        {quiz.questions.map((question, i) => (
          <QuestionView key={question.id} question={question} number={i + 1} />
        ))}
      </ol>
    </>
  );
}
