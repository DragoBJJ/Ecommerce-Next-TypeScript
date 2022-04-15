import React from "react";
import {
  DeepMap,
  FieldError,
  FieldValues,
  Path,
  UseFormRegister
} from "react-hook-form";
import { FormInput, FormInputProps } from "./FormInput";

type StringKeys<T> = {
  [P in keyof T]: T[P] extends string ? T[P] : never;
}[keyof T];

type AreaType<FormData extends FieldValues> = {
  inputs:
    | FormInputProps<FormData>[]
    | FormInputProps<Pick<FormData, StringKeys<FormData>>>[];
  register: UseFormRegister<FormData>;
  errors: Partial<DeepMap<FormData, FieldError>>;
  title: string;
};

export const AreaInputs = <FormData extends Record<string, unknown>>({
  inputs,
  title,
  register,
  errors
}: AreaType<FormData>) => {
  return (
    <div className="w-full md:w-3/4 mt-2 justify-center">
      <h1 className="text-xl mx-auto ">{title}</h1>
      <div className="w-full grid grid-cols-1  md:grid-cols-2 gap-6 place-items-center  px-3">
        {inputs.map(({ id, type, label, placeholder }) => {
          return (
            <div className="w-full flex flex-col mb-4 md:mr-4">
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
