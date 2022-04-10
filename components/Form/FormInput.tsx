import { ErrorMessage } from "@hookform/error-message";

import {
  UseFormRegister,
  RegisterOptions,
  Path,
  FieldValues,
  DeepMap,
  FieldError
} from "react-hook-form";

type InputType = {
  text: number;
  email: string;
  date: string;
  checkbox: string;
};

type FormInputProps<TFormData extends FieldValues> = {
  register: UseFormRegister<TFormData>;
  id: Path<TFormData>;
  type: Path<InputType>;
  placeholder?: string;
  label: string;
  errors: Partial<DeepMap<TFormData, FieldError>>;
  rules?: RegisterOptions;
};

export const FormInput = <TFormData extends Record<string, unknown>>({
  register,
  id,
  type,
  placeholder,
  label,
  rules,
  errors
}: FormInputProps<TFormData>) => {
  return (
    <>
      <label
        className="block uppercase w-100 tracking-wide text-gray-700 text-xs font-bold my-2"
        htmlFor={id}
      >
        {label}
      </label>
      <input
        className={`appearance-none block  ${
          type === "checkbox" ? "max-w-[50px]" : "max-w-3/4"
        } bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 ease-in-out duration-500 ${errors[
          id
        ]?.ref && "bg-red-500"}`}
        id={id}
        type={type}
        placeholder={placeholder}
        {...register(id, rules)}
      />
      <div className="w-full mt-2 h-[25px]">
        {errors && errors[id]?.ref && (
          <ErrorMessage
            errors={errors}
            name={id as any}
            render={({ message }) => (
              <span className={`text-red-500`}>{message}</span>
            )}
          />
        )}
      </div>
    </>
  );
};
