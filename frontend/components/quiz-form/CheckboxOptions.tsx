import { useFieldArray, useFormContext } from 'react-hook-form';
import { FieldError } from '@/components/FieldError';
import { emptyOption, type QuizFormValues } from '@/lib/quiz-form';

export function CheckboxOptions({ index }: { index: number }) {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext<QuizFormValues>();
  const options = useFieldArray({ control, name: `questions.${index}.options` });
  const optionErrors = errors.questions?.[index]?.options;

  return (
    <div className="space-y-2">
      <p className="text-sm text-muted">Options (check the correct ones)</p>
      {options.fields.map((field, i) => (
        <div key={field.id}>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"

              aria-label={`Option ${i + 1} is correct`}
              {...register(`questions.${index}.options.${i}.isCorrect`)}
            />
            <input
              type="text"
              placeholder={`Option ${i + 1}`}
              className="input"
              {...register(`questions.${index}.options.${i}.text`)}
            />
            <button
              type="button"
              aria-label={`Remove option ${i + 1}`}
              className="btn self-stretch border-red-200 text-red-600 duration-300 hover:bg-red-50"
              onClick={() => options.remove(i)}
            >
              ✕
            </button>
          </div>
          <FieldError message={optionErrors?.[i]?.text?.message} />
        </div>
      ))}
      <FieldError message={optionErrors?.root?.message ?? optionErrors?.message} />
      <button type="button" className="btn" onClick={() => options.append(emptyOption())}>
        + Add option
      </button>
    </div>
  );
}
