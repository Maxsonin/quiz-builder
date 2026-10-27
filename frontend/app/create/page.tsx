import { Suspense } from 'react';
import { QuizForm } from '@/components/quiz-form/QuizForm';

export default function CreatePage() {
  return (
    <>
      <h1 className="mb-6 text-2xl font-bold">Create Quiz</h1>
      {/* useFieldArray generates random row ids, which can't be prerendered */}
      <Suspense fallback={<p className="text-muted">Loading form…</p>}>
        <QuizForm />
      </Suspense>
    </>
  );
}
