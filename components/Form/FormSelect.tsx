import { ErrorMessage } from "@hookform/error-message";
import { ReactNode } from "react";

import {
  UseFormRegister,
  RegisterOptions,
  Path,
  FieldValues,
  DeepMap,
  FieldError
} from "react-hook-form";

type FormSelectProps<TFormData extends FieldValues> = {
  register: UseFormRegister<TFormData>;
  id: Path<TFormData>;
  label: string;
  errors?: Partial<DeepMap<TFormData, FieldError>>;
  options: string[];
  rules?: RegisterOptions;
};

const FormSelect = <TFormData extends Record<string, unknown>>({
  register,
  id,
  label,
  errors,
  options,
  rules
}: FormSelectProps<TFormData>) => {
  return (
    <>
      <label
        className="block uppercase tracking-wide text-gray-700 text-xs font-bold my-2"
        htmlFor={id}
      >
        {label}
      </label>
      <select
        className="appearance-none block w-full
       bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 ease-in-out duration-500"
        id={id}
        {...register(id, rules)}
      >
        {options.map(item => {
          return <option>{item}</option>;
        })}
      </select>
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

export default FormSelect;
