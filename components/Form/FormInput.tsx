import { ErrorMessage } from "@hookform/error-message";

import {
  UseFormRegister,
  RegisterOptions,
  Path,
  FieldValues,
  DeepMap,
  FieldError
} from "react-hook-form";
import { StringKeys } from "./AreaInputs";

type InputType = {
  text: number;
  email: string;
  date: string;
  checkbox: string;
};

export type FormInputProps<TFormData extends FieldValues> = {
  register?: UseFormRegister<TFormData>;
  id: Path<TFormData>;
  type?: Path<InputType>;
  placeholder?: string;
  label: string;
  errors?: Partial<DeepMap<TFormData, FieldError>>;
};

export const FormInput = <TFormData extends Record<string, unknown>>({
  register,
  id,
  type,
  placeholder,
  label,
  errors
}: FormInputProps<TFormData>) => {
  if (!register) return null;
  if (!errors) return null;

  return (
    <>
      <label
        className="block uppercase w-100 tracking-wide text-gray-700 text-xs font-bold my-2 tracking-wider"
        htmlFor={id}
      >
        {label}
      </label>
      <input
        className={`appearance-none block  
        ${
          type === "checkbox" ? "max-w-[50px] p-3" : "max-w-full py-4 px-6"
        }  text-gray-700 border-2 border-[#E1B989] 
        ${errors[id]?.ref &&
          "bg-red-500 border-black"}  rounded-lg leading-tight focus:outline-none focus:bg-white focus:border-gray-500 ease-in-out duration-500 `}
        id={id}
        type={type && type}
        placeholder={placeholder}
        {...register(id)}
      />
      <div className="w-full mt-2 h-[25px]">
        {errors[id]?.ref && (
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
