import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/router";
import React from "react";
import { useForm } from "react-hook-form";
import {
  useCreateShippingAddressMutation,
  usePublishShippingAddressMutation
} from "../../generated/graphql";
import { createStripePayment } from "../../utils/apiCheckout";
import { UseClientContext } from "../context/ClientContext";
import { InfoPopup } from "../InfoPopup";
import { Spinner } from "../Spinner";
import { AreaInputs } from "./AreaInputs";
import { personalData, shippingAddress, billingData } from "./FormAreaData";
import { FormData, schema } from "./FormAreaType";

export const CheckoutAddress = () => {
  const { setClientStripeID, orderID } = UseClientContext();

  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>({
    resolver: yupResolver(schema)
  });

  const [
    createShipping,
    { loading, error: ShippingError }
  ] = useCreateShippingAddressMutation();
  const [
    publishShippingAddress,
    { error: publishError, loading: publishLoading }
  ] = usePublishShippingAddressMutation();

  if (ShippingError) {
    return (
      <InfoPopup
        status="cancell"
        description="Error with your Shipping create"
      />
    );
  }
  if (publishError) {
    return (
      <InfoPopup
        status="cancell"
        description="Error with your Shipping publish"
      />
    );
  }

  if (loading || publishLoading) return <Spinner />;

  const onSubmit = async (data: FormData) => {
    const { data: shippingData } = await createShipping({
      variables: {
        data: {
          ...data,
          order: {
            connect: {
              id: orderID
            }
          }
        }
      }
    });
    if (!shippingData || !orderID) return;
    await publishShippingAddress();
    const { clientSecret } = await createStripePayment(orderID);
    if (!clientSecret || !setClientStripeID) return;
    setClientStripeID(clientSecret);
    router.push({
      pathname: "/checkout/payment"
    });
  };

  return (
    <form className="w-full p-4" onSubmit={handleSubmit(onSubmit)}>
      <AreaInputs<FormData>
        title="Contact Information"
        inputs={personalData}
        register={register}
        errors={errors}
      />
      <AreaInputs<FormData>
        title="Shipping Address"
        inputs={shippingAddress}
        register={register}
        errors={errors}
        selectOptions={["Arizona", "Kujawsko/Pomorski", "Massachusetts"]}
      />
      <AreaInputs<FormData>
        title="Billing Information"
        register={register}
        errors={errors}
        inputs={billingData}
      />
      <div className="w-full h-auto lg:w-5/6">
        <button
          type="submit"
          className=" ease-in-out duration-500 bg-white border-2 border-[#E1B989] hover:bg-[#E1B989] rounded-2xl  w-full  max-w-[180px]  h-[48px]"
        >
          <p className="text-xl">Submit</p>
        </button>
      </div>
    </form>
  );
};

export default CheckoutAddress;
