import { useForm } from "react-hook-form";
import { AreaInputs } from "../../components/Form/AreaInputs";
import { yupResolver } from "@hookform/resolvers/yup";
import { LoginData, loginSchema } from "../../components/Form/FormAreaType";
import { loginDataInputs } from "../../components/Form/FormAreaData";
import { signIn, useSession } from "next-auth/react";
import { InfoPopup } from "../../components/InfoPopup";
import { Spinner } from "../../components/Spinner";
import { useRouter } from "next/router";
import { ResSignInType } from "../../utils/type";
import { Fade } from "react-awesome-reveal";

const SignInForm = () => {
  const { status } = useSession();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<LoginData>({
    resolver: yupResolver(loginSchema)
  });

  if (isSubmitting || status === "loading") {
    return (
      <div className="w-screen h-full pb-5 md:pb-0 min-h-screen min-h-screen">
        <Spinner />;
      </div>
    );
  }

  if (status === "authenticated") {
    return (
      <div className="w-screen h-screen">
        <InfoPopup
          image="nasa"
          status="success"
          description="Welcome on board !"
        />
      </div>
    );
  }
  const onSubmit = async ({ email, password }: LoginData) => {
    await signIn("credentials", {
      redirect: false,
      email,
      password
    })
      .then((res: ResSignInType) => {
        if (res?.ok) {
          router.push({
            pathname: "/products/1"
          });
        } else {
          router.push({
            pathname: "/auth/error"
          });
        }
      })
      .catch(error => {
        throw new Error(error);
      });
  };

  return (
    <div className="w-screen h-full pb-5 md:pb-0 min-h-screen min-h-screen">
      <form
        onSubmit={handleSubmit(onSubmit)}
        action="/api/auth/callback/credentials"
        className="flex flex-col w-5/6 mt-4 p-2 sm:w-4/5 md:w-3/5 lg:w-2/5 mx-auto justify-center items-center border-2 bg-neutral-800 rounded-xl text-[#E1B989] p-4"
      >
        <AreaInputs
          title="Login Form"
          register={register}
          errors={errors}
          inputs={loginDataInputs}
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

export default SignInForm;
