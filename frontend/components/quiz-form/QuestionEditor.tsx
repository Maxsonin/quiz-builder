import { useFormContext, useWatch } from 'react-hook-form';
import { FieldError } from '@/components/FieldError';
import { questionTypes, type QuizFormValues } from '@/lib/quiz-form';
import { BooleanAnswer } from './BooleanAnswer';
import { CheckboxOptions } from './CheckboxOptions';
import { TextAnswer } from './TextAnswer';

type Props = { index: number; onRemove?: () => void };

export function QuestionEditor({ index, onRemove }: Props) {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext<QuizFormValues>();
  const type = useWatch({ control, name: `questions.${index}.type` });

  return (
    <section className="space-y-3 rounded-lg border border-border p-4">
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-sm font-semibold">Question {index + 1}</h2>
        {onRemove && (
          <button type="button" className="text-sm text-red-600 hover:underline" onClick={onRemove}>
            Remove
          </button>
        )}
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-start">
        <select className="input sm:w-44" {...register(`questions.${index}.type`)}>
          {questionTypes.map(({ value, label }) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
        <div className="flex-1">
          <input
            type="text"
            placeholder="Question text"
            className="input"
            {...register(`questions.${index}.text`)}
          />
          <FieldError message={errors.questions?.[index]?.text?.message} />
        </div>
      </div>

      {type === 'BOOLEAN' && <BooleanAnswer index={index} />}
      {type === 'INPUT' && <TextAnswer index={index} />}
      {type === 'CHECKBOX' && <CheckboxOptions index={index} />}
    </section>
  );
}
