import { ErrorMessage } from "@hookform/error-message";
import { Fade } from "react-awesome-reveal";
import { FormInputProps } from "../../utils/type";

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
        className="block uppercase w-100 tracking-wide text-[#E1B989] text-xs font-bold my-2 tracking-wider"
        htmlFor={id}
      >
        {label}
      </label>
      <input
        className={`appearance-none block  
        ${
          type === "checkbox" || id === "rating"
            ? "max-w-[60px] p-3"
            : "max-w-full py-4 px-6"
        }  text-gray-700 border-2 border-[#E1B989] 
        ${errors[id]?.ref &&
          "bg-red-500"}  rounded-lg leading-tight focus:outline-none focus:bg-white focus:border-gray-500 ease-in-out duration-500 `}
        id={id}
        defaultValue={id === "rating" ? 5 : ""}
        type={type && type}
        placeholder={placeholder}
        {...register(id)}
      />
      <div className="w-full mt-2 h-[25px]">
        {errors[id]?.ref && (
          <Fade triggerOnce>
            <ErrorMessage
              errors={errors}
              name={id as any}
              render={({ message }) => (
                <span className={`text-red-500`}>{message}</span>
              )}
            />
          </Fade>
        )}
      </div>
    </>
  );
};
