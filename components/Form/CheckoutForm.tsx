import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";

import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import Image from "next/image";

import { yupResolver } from "@hookform/resolvers/yup";
import { FormData, schema } from "./FormAreaType";
import {
  personalData,
  shippingAddress,
  billingData,
  homeAddress,
  cardData
} from "./FormAreaData";

import { AreaInputs } from "./AreaInputs";
import { CartContent } from "../CartBar/CartContent";
import { UseCartContext } from "../context/CartContext";

import { sendOrder } from "../../utils/apiCheckout";
import { loadStripe, StripeCardElementChangeEvent } from "@stripe/stripe-js";
import { OrderContent } from "../Order/OrderContent";
import { UseClientContext } from "../context/ClientContext";

const cardStyle = {
  style: {
    base: {
      color: "#32325d",
      fontFamily: "Arial, sans-serif",
      fontSmoothing: "antialiased",
      fontSize: "16px",
      "::placeholder": {
        color: "#32325d"
      }
    },
    invalid: {
      fontFamily: "Arial, sans-serif",
      color: "#fa755a",
      iconColor: "#fa755a"
    }
  }
};

// const promise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY!);

export const CheckoutForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm<FormData>({
    resolver: yupResolver(schema)
  });

  const [succeeded, setSucceeded] = useState(false);
  const [errorPayment, setError] = useState<string | null>(null);
  const [processing, setProcessing] = useState<boolean>(false);
  const [disabled, setDisabled] = useState(true);

  const { clientID, setClientID, setOrderID } = UseClientContext();

  if (!useStripe || !useElements || !clientID)
    throw Error("You dont have access to stripeElements");

  const stripe = useStripe();
  const elements = useElements();

  console.log("elements", elements);
  console.log("stripe", stripe);
  console.log("Stripe", clientID);

  if (!stripe || !elements) {
    throw Error("You dont have access to stripe or stripeElement");
  }

  const handleCardSubmit = async () => {
    const paypalCard = elements.getElement(CardElement);
    if (!paypalCard) {
      throw Error("You dont have access to  paypalCard");
    }
    const payload = await stripe.confirmCardPayment(clientID, {
      payment_method: {
        card: paypalCard
      }
    });
    if (payload.error) {
      setError(`Payment failed ${payload.error.message}`);
      setProcessing(false);
    } else {
      setError(null);
      setProcessing(false);
      setSucceeded(true);
    }
  };

  const handleChange = async (event: StripeCardElementChangeEvent) => {
    setDisabled(event.empty);
    setError(event.error ? event.error.message : null);
  };

  const onSubmit = (data: FormData) => {
    handleCardSubmit();
  };

  console.log("processing", processing);
  return (
    <>
      <form id="payment-form" onSubmit={handleSubmit(onSubmit)}>
        <div className="grid  grid-cols-2 md:grid-cols-4">
          <div className="flex w-full flex-wrap col-span-2  justify-center">
            <AreaInputs<FormData>
              title="Contact Information"
              inputs={personalData}
              register={register}
              errors={errors}
            />
            {/* <AreaInputs<FormData>
              title="Payment Default"
              inputs={cardData}
              register={register}
              errors={errors}
            /> */}
            <div className=" w-full h-auto lg:w-5/6 m-2 justify-center border-2 border-red-500">
              <CardElement
                options={cardStyle}
                id="card-element"
                onChange={handleChange}
              />
            </div>

            <AreaInputs<FormData>
              title="Shipping Address"
              inputs={shippingAddress}
              register={register}
              errors={errors}
            />
            <AreaInputs<FormData>
              title="Home Address"
              inputs={homeAddress}
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
            <div className="w-full  px-3 mx-3 mb-6">
              <button
                id="submit"
                type="submit"
                className=" ease-in-out duration-500 bg-white border-2 border-[#E1B989] hover:bg-[#E1B989] rounded-2xl  w-full  max-w-[180px]  h-[48px]"
              >
                <p className="text-xl">Submit</p>
              </button>
            </div>
          </div>
          <div className="flex flex-col col-span-2">
            <div className="w-full h-full top-0 hidden md:block">
              <Image
                priority={true}
                src="/family.jpeg"
                height={16 / 7}
                width={16 / 9}
                layout="responsive"
                objectFit="cover"
              />
              <OrderContent />
            </div>
          </div>
        </div>
      </form>
    </>
  );
};
