const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:4000';

export type QuestionType = 'BOOLEAN' | 'INPUT' | 'CHECKBOX';

export type Option = { text: string; isCorrect: boolean };

export type Question = {
  id: number;
  order: number;
  type: QuestionType;
  text: string;
  options: Option[] | null;
  answer: boolean | string | null;
};

export type Quiz = { id: number; title: string; createdAt: string; questions: Question[] };

export type QuizSummary = { id: number; title: string; questionCount: number };

export type NewQuestion =
  | { type: 'BOOLEAN'; text: string; answer: boolean }
  | { type: 'INPUT'; text: string; answer: string }
  | { type: 'CHECKBOX'; text: string; options: Option[] };

export type CreateQuizInput = { title: string; questions: NewQuestion[] };

export class ApiError extends Error {
  constructor(
    readonly status: number,
    message: string,
  ) {
    super(message);
  }
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, {
    ...init,
    headers: { 'Content-Type': 'application/json', ...init?.headers },
  });
  if (!res.ok) {
    const body = (await res.json().catch(() => null)) as { message?: string } | null;
    throw new ApiError(res.status, body?.message ?? res.statusText);
  }
  return (res.status === 204 ? undefined : await res.json()) as T;
}

export const getQuizzes = () => request<QuizSummary[]>('/quizzes');

export const getQuiz = (id: number) => request<Quiz>(`/quizzes/${id}`);

export const createQuiz = (data: CreateQuizInput) =>
  request<Quiz>('/quizzes', { method: 'POST', body: JSON.stringify(data) });

export const deleteQuiz = (id: number) => request<void>(`/quizzes/${id}`, { method: 'DELETE' });
