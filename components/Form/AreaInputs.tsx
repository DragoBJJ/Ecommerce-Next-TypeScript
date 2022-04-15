import {
  DeepMap,
  FieldError,
  FieldValues,
  Path,
  UseFormRegister
} from "react-hook-form";
import { FormInput, FormInputProps } from "./FormInput";
import { FormSelectProps, FormSelect } from "./FormSelect";

type StringKeys<T> = {
  [P in keyof T]: T[P] extends string ? T[P] : never;
}[keyof T];

type AreaType<FormData extends FieldValues> = {
  inputs: FormInputProps<Pick<FormData, StringKeys<FormData>>>[];
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
    <div className=" w-full lg:w-5/6 m-2 justify-center">
      <h1 className="text-xl mx-auto my-6 tracking-widest">{title}</h1>
      <div className="w-full grid grid-cols-1   md:grid-cols-2 gap-4 md:gap-y-0 md:gap-x-6 place-items-center ">
        {inputs.map(({ id, type, label, placeholder }) => {
          if (id === "state" && selectOptions) {
            return (
              <div className="w-full flex flex-col">
                <FormSelect<FormData>
                  id={id as Path<FormData>}
                  label={label}
                  register={register}
                  errors={errors}
                  options={selectOptions}
                />
              </div>
            );
          }

          return (
            <div className="w-full flex flex-col">
              <FormInput<FormData>
                id={id as Path<FormData>}
                type={type}
                label={label}
                placeholder={placeholder}
                register={register}
                errors={errors}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};
