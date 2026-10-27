import { useFormContext } from 'react-hook-form';
import { FieldError } from '@/components/FieldError';
import type { QuizFormValues } from '@/lib/quiz-form';

export function TextAnswer({ index }: { index: number }) {
  const {
    register,
    formState: { errors },
  } = useFormContext<QuizFormValues>();

  return (
    <div>
      <input
        type="text"
        placeholder="Correct answer"
        className="input"
        {...register(`questions.${index}.textAnswer`)}
      />
      <FieldError message={errors.questions?.[index]?.textAnswer?.message} />
    </div>
  );
}
