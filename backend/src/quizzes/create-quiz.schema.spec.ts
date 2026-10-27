import { createQuizSchema } from './create-quiz.schema.js';

const validQuiz = {
  title: 'Sample',
  questions: [
    { type: 'BOOLEAN', text: 'Sky is blue?', answer: true },
    { type: 'INPUT', text: 'Capital of France?', answer: 'Paris' },
    {
      type: 'CHECKBOX',
      text: 'Even numbers',
      options: [
        { text: '2', isCorrect: true },
        { text: '3', isCorrect: false },
      ],
    },
  ],
};

describe('createQuizSchema', () => {
  it('accepts all three question types', () => {
    expect(createQuizSchema.safeParse(validQuiz).success).toBe(true);
  });

  it('rejects a quiz without questions', () => {
    expect(createQuizSchema.safeParse({ title: 'Empty', questions: [] }).success).toBe(false);
  });

  it('rejects a checkbox question with no correct option', () => {
    const quiz = {
      title: 'Bad',
      questions: [
        {
          type: 'CHECKBOX',
          text: 'Pick',
          options: [
            { text: 'a', isCorrect: false },
            { text: 'b', isCorrect: false },
          ],
        },
      ],
    };
    expect(createQuizSchema.safeParse(quiz).success).toBe(false);
  });

  it('rejects a boolean question with a string answer', () => {
    const quiz = { title: 'Bad', questions: [{ type: 'BOOLEAN', text: 'Q', answer: 'true' }] };
    expect(createQuizSchema.safeParse(quiz).success).toBe(false);
  });
});
