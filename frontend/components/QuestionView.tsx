import type { Question } from '@/services/api';

// Read-only rendering
export function QuestionView({ question, number }: { question: Question; number: number }) {
  const name = `question-${question.id}`;

  return (
    <li className="space-y-3 rounded-lg border border-border bg-background p-4">
      <p className="font-medium">
        {number}. {question.text}
      </p>

      {question.type === 'BOOLEAN' && (
        <div className="flex gap-6" inert>
          {[true, false].map((value) => (
            <label key={String(value)} className="flex items-center gap-2 text-sm">
              <input
                type="radio"
                name={name}
                className="accent-primary"
                defaultChecked={question.answer === value}
              />
              {value ? 'True' : 'False'}
            </label>
          ))}
        </div>
      )}

      {question.type === 'INPUT' && (
        <input
          type="text"
          className="input"
          defaultValue={String(question.answer ?? '')}
          aria-label="Correct answer"
          readOnly
        />
      )}

      {question.type === 'CHECKBOX' && (
        <ul className="space-y-2" inert>
          {question.options?.map((option, i) => (
            <li key={i}>
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  className="accent-primary"
                  defaultChecked={option.isCorrect}
                />
                {option.text}
              </label>
            </li>
          ))}
        </ul>
      )}
    </li>
  );
}
