import { useFormContext } from 'react-hook-form';
import { FieldError } from '@/components/FieldError';
import type { QuizFormValues } from '@/lib/quiz-form';

export function BooleanAnswer({ index }: { index: number }) {
  const {
    register,
    formState: { errors },
  } = useFormContext<QuizFormValues>();

  return (
    <div>
      <p className="mb-1 text-sm text-muted">Correct answer</p>
      <div className="flex gap-6">
        {(['true', 'false'] as const).map((value) => (
          <label key={value} className="flex items-center gap-2 text-sm">
            <input type="radio" value={value} {...register(`questions.${index}.booleanAnswer`)} />
            {value === 'true' ? 'True' : 'False'}
          </label>
        ))}
      </div>
      <FieldError message={errors.questions?.[index]?.booleanAnswer?.message} />
    </div>
  );
}
