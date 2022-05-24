import { useForm } from "react-hook-form";
import { AreaInputs } from "../../components/Form/AreaInputs";
import { yupResolver } from "@hookform/resolvers/yup";
import { RegisterData } from "../../components/Form/FormAreaType";
import { registerSchema } from "../../components/Form/FormAreaType";
import { registerData } from "../../components/Form/FormAreaData";
import { useRouter } from "next/router";
import { InfoPopup } from "../../components/InfoPopup";
import { Spinner } from "../../components/Spinner";
import { Fade } from "react-awesome-reveal";
import { useSession } from "next-auth/react";
import { stat } from "fs/promises";

const RegisterForm = () => {
  const { status } = useSession();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful, isSubmitting }
  } = useForm<RegisterData>({
    resolver: yupResolver(registerSchema)
  });

  if (status === "authenticated") {
    router.push({
      pathname: "/products/1"
    });
    return;
  }

  if (isSubmitting) {
    return (
      <div className="w-screen h-full pb-5 md:pb-0 min-h-screen min-h-screen">
        <Spinner />;
      </div>
    );
  }

  if (isSubmitSuccessful) {
    return (
      <div className="w-screen h-full pb-5 md:pb-0 min-h-screen min-h-screen">
        <InfoPopup
          status="success"
          description="Welcome on board !"
          image="nasa"
        />
      </div>
    );
  }

  const onSubmit = async (data: RegisterData) => {
    const response = await fetch("/api/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });

    const { userID }: { userID: string } = await response.json();
    if (!userID) {
      return (
        <InfoPopup
          status="cancell"
          description="Error with your registered user"
        />
      );
    }
    setTimeout(() => {
      router.push("/auth/signin");
    }, 3000);
  };

  return (
    <div className="w-screen h-full pb-5 md:pb-0 min-h-screen min-h-screen">
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
    </div>
  );
};

export default RegisterForm;
