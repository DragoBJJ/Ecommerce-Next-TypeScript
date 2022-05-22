import { ErrorMessage } from "@hookform/error-message";
import { Fade } from "react-awesome-reveal";

import { FieldValues } from "react-hook-form";
import { FormSelectProps } from "../../utils/type";

export const FormSelect = <TFormData extends FieldValues>({
  register,
  id,
  label,
  errors,
  options
}: FormSelectProps<TFormData>) => {
  return (
    <>
      <label
        className="block uppercase tracking-wide text-[#E1B989] text-xs font-bold my-2"
        htmlFor={id}
      >
        {label}
      </label>
      <select
        className={`appearance-none block  
        "max-w-full py-4 px-6"}  text-gray-700 border-2 border-[#E1B989] 
        ${errors[id]?.ref &&
          "bg-red-500 border-black"}  rounded-lg leading-tight focus:outline-none focus:bg-white focus:border-gray-500 ease-in-out duration-500 `}
        id={id}
        {...register(id)}
      >
        {options.map(item => {
          return <option key={item}>{item}</option>;
        })}
      </select>
      <div className="w-full mt-2 h-[25px]">
        <Fade triggerOnce>
          {errors[id]?.ref && (
            <ErrorMessage
              errors={errors}
              name={id as any}
              render={({ message }) => (
                <span className={`text-red-500`}>{message}</span>
              )}
            />
          )}
        </Fade>
      </div>
    </>
  );
};
