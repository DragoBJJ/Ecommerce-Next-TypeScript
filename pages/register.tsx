import { useForm } from "react-hook-form";
import { AreaInputs } from "../components/Form/AreaInputs";
import { yupResolver } from "@hookform/resolvers/yup";
import { RegisterData } from "../components/Form/FormAreaType";
import { registerSchema } from "../components/Form/FormAreaType";
import { registerData } from "../components/Form/FormAreaData";

const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<RegisterData>({
    resolver: yupResolver(registerSchema)
  });

  const onSubmit = async (data: RegisterData) => {
    const response = await fetch("/api/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });

    const result = await response.json();
  };

  return (
    <div className="w-screen h-full pb-5 md:pb-0 min-h-screen min-h-screen">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col w-5/6 mt-4 p-2 sm:4/5 md:w-3/5 lg:w-2/5 mx-auto justify-center items-center border-2 border-[#1d1d1d] rounded-xl"
      >
        <AreaInputs
          title="Register Form"
          register={register}
          errors={errors}
          inputs={registerData}
          selectOptions={[
            "Frontend Developer",
            "Backend Developer",
            "DevOps",
            "BlockChain Developer",
            "Cloud Architect",
            "AI Developer"
          ]}
        />
        <button
          type="submit"
          className=" ease-in-out duration-500 bg-white border-2 border-[#E1B989] hover:bg-[#E1B989] rounded-2xl  w-full  max-w-[180px]  h-[48px] mb-4"
        >
          <p className="text-xl">Submit</p>
        </button>
      </form>
    </div>
  );
};

export default RegisterForm;
