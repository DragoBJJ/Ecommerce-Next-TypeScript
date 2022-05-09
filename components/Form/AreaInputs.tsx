import {
  DeepMap,
  FieldError,
  FieldValues,
  Path,
  UseFormRegister
} from "react-hook-form";
import { FormInput, FormInputProps } from "./FormInput";
import { FormSelect } from "./FormSelect";

type StringKeys<T> = {
  [P in keyof T]: T[P] extends string ? T[P] : never;
}[keyof T];

type AreaType<FormData extends FieldValues> = {
  inputs:
    | FormInputProps<Pick<FormData, StringKeys<FormData>>>[]
    | FormInputProps<FormData>[];
  register: UseFormRegister<FormData>;
  errors: Partial<DeepMap<FormData, FieldError>>;
  title: string;
  selectOptions?: string[];
};

export const AreaInputs = <FormData extends Record<string, unknown>>({
  inputs,
  title,
  register,
  errors,
  selectOptions
}: AreaType<FormData>) => {
  return (
    <div className="flex flex-col w-full h-auto lg:w-5/6 my-4">
      <h1 className="text-xl mx-left my-2 tracking-widest">{title}</h1>
      <div
        className={`w-full grid grid-cols-1    ${
          title === "Register Form" ? "md:grid-cols-1" : "md:grid-cols-2"
        } place-items-center`}
      >
        {inputs.map(({ id, type, label, placeholder }) => {
          return (
            <div
              key={`${id}-${type}`}
              className="w-full flex flex-col h-[110px]"
            >
              {(id === "state" || id === "specialization") && selectOptions ? (
                <FormSelect<FormData>
                  id={id as Path<FormData>}
                  label={label}
                  register={register}
                  errors={errors}
                  options={selectOptions}
                />
              ) : (
                <FormInput<FormData>
                  id={id as Path<FormData>}
                  type={type}
                  label={label}
                  placeholder={placeholder}
                  register={register}
                  errors={errors}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
