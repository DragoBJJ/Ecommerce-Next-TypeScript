import { Path } from "react-hook-form";
import { AreaType } from "../../utils/type";
import { FormInput } from "./FormInput";
import { FormSelect } from "./FormSelect";

export const AreaInputs = <FormData extends Record<string, unknown>>({
  inputs,
  title,
  register,
  errors,
  selectOptions
}: AreaType<FormData>) => {
  return (
    <div className="flex flex-col w-full lg:w-5/6 my-4">
      <h1 className="text-xl mx-left my-2 tracking-widest">{title}</h1>
      <div
        className={`w-full grid grid-cols-1 gap-x-4   ${
          title === "Register Form" || title === "Login Form"
            ? "md:grid-cols-1"
            : "md:grid-cols-2"
        } place-items-center`}
      >
        {inputs.map(({ id, type, label, placeholder }) => {
          return (
            <div
              key={`${id}-${type}`}
              className="w-full flex flex-col h-[115px] "
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
