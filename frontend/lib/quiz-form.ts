import { z } from 'zod';
import type { CreateQuizInput, NewQuestion, QuestionType } from '@/services/api';

export const questionTypes: { value: QuestionType; label: string }[] = [
  { value: 'BOOLEAN', label: 'True / False' },
  { value: 'INPUT', label: 'Short answer' },
  { value: 'CHECKBOX', label: 'Multiple choice' },
];

const required = z.string().trim().min(1, 'Required');

const questionSchema = z
  .object({
    type: z.enum(['BOOLEAN', 'INPUT', 'CHECKBOX']),
    text: required,
    booleanAnswer: z.enum(['true', 'false']).nullable(),
    textAnswer: z.string(),
    options: z.array(z.object({ text: z.string(), isCorrect: z.boolean() })),
  })
  .superRefine((question, ctx) => {
    if (question.type === 'BOOLEAN' && !question.booleanAnswer) {
      ctx.addIssue({ code: 'custom', path: ['booleanAnswer'], message: 'Pick True or False' });
    }
    if (question.type === 'INPUT' && !question.textAnswer.trim()) {
      ctx.addIssue({ code: 'custom', path: ['textAnswer'], message: 'Required' });
    }
    if (question.type === 'CHECKBOX') {
      question.options.forEach((option, i) => {
        if (!option.text.trim()) {
          ctx.addIssue({ code: 'custom', path: ['options', i, 'text'], message: 'Required' });
        }
      });
      if (question.options.length < 2) {
        ctx.addIssue({ code: 'custom', path: ['options'], message: 'Add at least 2 options' });
      } else if (!question.options.some((option) => option.isCorrect)) {
        ctx.addIssue({ code: 'custom', path: ['options'], message: 'Mark at least one correct' });
      }
    }
  });

export const quizFormSchema = z.object({
  title: required,
  questions: z.array(questionSchema).min(1, 'Add at least one question'),
});

export type QuizFormValues = z.infer<typeof quizFormSchema>;

export const emptyOption = () => ({ text: '', isCorrect: false });

export const emptyQuestion = (): QuizFormValues['questions'][number] => ({
  type: 'BOOLEAN',
  text: '',
  booleanAnswer: null,
  textAnswer: '',
  options: [emptyOption(), emptyOption()],
});

function toNewQuestion(question: QuizFormValues['questions'][number]): NewQuestion {
  const text = question.text.trim();
  switch (question.type) {
    case 'BOOLEAN':
      return { type: 'BOOLEAN', text, answer: question.booleanAnswer === 'true' };
    case 'INPUT':
      return { type: 'INPUT', text, answer: question.textAnswer.trim() };
    case 'CHECKBOX':
      return {
        type: 'CHECKBOX',
        text,
        options: question.options.map((o) => ({ text: o.text.trim(), isCorrect: o.isCorrect })),
      };
  }
}

export const toCreateQuizInput = (values: QuizFormValues): CreateQuizInput => ({
  title: values.title.trim(),
  questions: values.questions.map(toNewQuestion),
});
