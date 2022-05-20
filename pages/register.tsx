import { useForm } from "react-hook-form";
import { AreaInputs } from "../components/Form/AreaInputs";
import { yupResolver } from "@hookform/resolvers/yup";
import { RegisterData } from "../components/Form/FormAreaType";
import { registerSchema } from "../components/Form/FormAreaType";
import { registerData } from "../components/Form/FormAreaData";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { InfoPopup } from "../components/InfoPopup";

const RegisterForm = () => {
  const { status } = useSession();
  const router = useRouter();

  const {
    register,
    handleSubmit,

    formState: { errors, isSubmitSuccessful }
  } = useForm<RegisterData>({
    resolver: yupResolver(registerSchema)
  });

  if (status === "authenticated") router.push("/");

  const onSubmit = async (data: RegisterData) => {
    console.log("DATA", data);
    const response = await fetch("/api/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });

    const { userID }: { userID: string } = await response.json();
    return userID;
  };

  return (
    <div className="w-screen h-full pb-5 md:pb-0 min-h-screen min-h-screen">
      {isSubmitSuccessful ? (
        <InfoPopup
          status="success"
          description="Nice to see you !"
          image="nasa"
        />
      ) : (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col w-5/6 mt-4 p-2 sm:4/5 md:w-3/5 lg:w-2/5 mx-auto justify-center items-center border-2 bg-neutral-800 rounded-xl text-[#E1B989] p-4"
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
            <p className="text-xl text-neutral-800">Submit</p>
          </button>
        </form>
      )}
    </div>
  );
};

export default RegisterForm;
