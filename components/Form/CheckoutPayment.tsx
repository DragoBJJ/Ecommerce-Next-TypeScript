import { FormEvent, useLayoutEffect, useState } from "react";
import { CardElement } from "@stripe/react-stripe-js";
import { useRouter } from "next/router";

import { UseClientContext } from "../context/ClientContext";
import {
  Stripe,
  StripeCardElementChangeEvent,
  StripeCardElementOptions,
  StripeElements
} from "@stripe/stripe-js";
import { useUpdateOrderMutation } from "../../generated/graphql";
import { getClientStripeID } from "../../utils/storage";

type PaymentType = {
  stripe: Stripe;
  elements: StripeElements;
};

export const CheckoutPaymentForm = ({ stripe, elements }: PaymentType) => {
  const [succeeded, setSucceeded] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [processing, setProcessing] = useState<boolean>(false);
  const [disabled, setDisabled] = useState(true);
  const [UseUpdateStripeID] = useUpdateOrderMutation();

  const { orderID, clientID, setClientID } = UseClientContext();
  const router = useRouter();

  useLayoutEffect(() => {
    if (clientID || !setClientID) return;
    setClientID(getClientStripeID());
  }, [clientID, setClientID]);

  if (!clientID) throw Error("You dont have access to clientID");

  const cardStyle: StripeCardElementOptions = {
    style: {
      base: {
        color: "#1d1d1d",
        fontFamily: "Arial, sans-serif",
        fontSmoothing: "antialiased",
        fontSize: "16px",
        "::placeholder": {
          color: "#1d1d1d"
        },
        letterSpacing: "2px",
        iconColor: "#E1B989",
        backgroundColor: "transparent",
        ":hover": {
          backgroundColor: "#1d1d1d"
        }
      },
      invalid: {
        fontFamily: "Arial, sans-serif",
        color: "#fa755a",
        iconColor: "#fa755a"
      }
    }
  };

  if (!stripe || !elements) {
    throw Error("You dont have access to stripe or stripeElement");
  }
  const handleChange = async (event: StripeCardElementChangeEvent) => {
    setDisabled(event.empty);
    setError(event.error ? event.error.message : "");
  };
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const card = elements.getElement(CardElement);
    if (!card) {
      throw Error("You dont have access to  paypalCard");
    }
    const payload = await stripe.confirmCardPayment(clientID, {
      payment_method: {
        card
      }
    });

    if (payload.error) {
      setError(`Payment failed ${payload.error.message}`);
      setProcessing(false);
    } else {
      setError(null);
      setProcessing(false);
      setSucceeded(true);
      await UseUpdateStripeID({
        variables: {
          orderID,
          stripID: payload.paymentIntent.id
        }
      });
      router.push({
        pathname: "/checkout/summary"
      });
    }
  };

  return (
    <div className="w-full h-full">
      <form id="payment-form" onSubmit={handleSubmit}>
        <div className=" mx-auto  w-3/4 mt-10">
          <div className="border-2  b-b-0 border-[#E1B989] rounded-t-lg p-3 mx-auto w-full h-[48px]">
            <CardElement
              id="card-element"
              options={cardStyle}
              onChange={handleChange}
            />
          </div>
          <button
            className="mx-auto flex bg-[#E1B989] w-full cursor-pointer h-[38px] items-center justify-center rounded-b-lg"
            disabled={processing || disabled || succeeded}
            id="submit"
          >
            <span id="button-text text-center mx-auto flex">
              {processing ? (
                <div className="spinner" id="spinner"></div>
              ) : (
                "Pay now"
              )}
            </span>
          </button>

          {error && (
            <div className="card-error mt-4 text-[#fa755a]" role="alert">
              {error}
            </div>
          )}

          <p
            className={
              succeeded
                ? "result-message mt-4  text-[#E1B989]"
                : "result-message hidden"
            }
          >
            Payment succeeded, see the result in your
            <a href={`https://dashboard.stripe.com/test/payments`}>
              Stripe dashboard.
            </a>
          </p>
        </div>
      </form>
    </div>
  );
};
