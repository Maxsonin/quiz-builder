import { z } from 'zod';

const text = z.string().trim().min(1);

const booleanQuestion = z.object({
  type: z.literal('BOOLEAN'),
  text,
  answer: z.boolean(),
});

const inputQuestion = z.object({
  type: z.literal('INPUT'),
  text,
  answer: text,
});

const checkboxQuestion = z.object({
  type: z.literal('CHECKBOX'),
  text,
  options: z
    .array(z.object({ text, isCorrect: z.boolean() }))
    .min(2)
    .refine((options) => options.some((o) => o.isCorrect), 'At least one option must be correct'),
});

export const createQuizSchema = z.object({
  title: text,
  questions: z
    .array(z.discriminatedUnion('type', [booleanQuestion, inputQuestion, checkboxQuestion]))
    .min(1),
});

export type CreateQuizDto = z.infer<typeof createQuizSchema>;
