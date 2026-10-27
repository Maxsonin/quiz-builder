'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { FormProvider, useFieldArray, useForm } from 'react-hook-form';
import { FieldError } from '@/components/FieldError';
import {
  emptyQuestion,
  quizFormSchema,
  toCreateQuizInput,
  type QuizFormValues,
} from '@/lib/quiz-form';
import { createQuiz } from '@/services/api';
import { QuestionEditor } from './QuestionEditor';

export function QuizForm() {
  const router = useRouter();
  const [submitError, setSubmitError] = useState<string>();
  const form = useForm<QuizFormValues>({
    resolver: zodResolver(quizFormSchema),
    defaultValues: { title: '', questions: [emptyQuestion()] },
  });
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = form;
  const questions = useFieldArray({ control, name: 'questions' });

  const onSubmit = async (values: QuizFormValues) => {
    setSubmitError(undefined);
    try {
      const quiz = await createQuiz(toCreateQuizInput(values));
      router.push(`/quizzes/${quiz.id}`);
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : 'Failed to create quiz');
    }
  };

  return (
    <FormProvider {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
        <div>
          <label htmlFor="title" className="mb-1 block text-sm font-medium">
            Quiz title
          </label>
          <input id="title" type="text" className="input" {...register('title')} />
          <FieldError message={errors.title?.message} />
        </div>

        {questions.fields.map((field, index) => (
          <QuestionEditor
            key={field.id}
            index={index}
            onRemove={questions.fields.length > 1 ? () => questions.remove(index) : undefined}
          />
        ))}

        <div className="flex flex-wrap items-center justify-between gap-3">
          <button type="button" className="btn" onClick={() => questions.append(emptyQuestion())}>
            + Add question
          </button>
          <button type="submit" className="btn-primary" disabled={isSubmitting}>
            {isSubmitting ? 'Creating…' : 'Create quiz'}
          </button>
        </div>
        <FieldError message={submitError} />
      </form>
    </FormProvider>
  );
}
