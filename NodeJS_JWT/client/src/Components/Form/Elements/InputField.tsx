import type {
  UseFormRegister,
  FieldValues,
  Path,
  FieldErrors,
} from "react-hook-form";

type Props<T extends FieldValues> = {
  name: Path<T>;
  label: string;
  type?: string;
  register: UseFormRegister<T>;
  errors: FieldErrors<T>;
};

export default function InputField<T extends FieldValues>({
  name,
  label,
  type = "text",
  register,
  errors,
}: Props<T>) {
  return (
    <div className="formField">
      <label htmlFor={name} className="formLabel">
        {label}
      </label>
      <input {...register(name)} className="formInput" id={name} type={type} />
      {errors[name]?.message && (
        <span className="errorMsg">{String(errors[name]?.message)}</span>
      )}
    </div>
  );
}
