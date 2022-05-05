import { FormEvent, useLayoutEffect, useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useRouter } from "next/router";

import { UseClientContext } from "../context/ClientContext";
import { StripeCardElementOptions } from "@stripe/stripe-js";
import { useUpdateOrderMutation } from "../../generated/graphql";
import { getClientStripeID } from "../../utils/storage";

export const CheckoutPaymentForm = () => {
  const [succeeded, setSucceeded] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [processing, setProcessing] = useState<boolean>(false);
  const [disabled, setDisabled] = useState(true);
  const [useUpdateStripeID, { data }] = useUpdateOrderMutation();

  const { orderID, clientID, setClientID } = UseClientContext();
  const router = useRouter();

  useLayoutEffect(() => {
    if (clientID) return;
    setClientID(getClientStripeID());
  }, []);

  if (!clientID) throw Error("You dont have access to clientID");

  const stripe = useStripe();
  const elements = useElements();

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
        backgroundColor: "transparent"
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
  const handleChange = async event => {
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
      await useUpdateStripeID({
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
    <div className="w-full h-auto">
      <h1>dasdasd</h1>
      <form id="payment-form" onSubmit={handleSubmit}>
        <div className=" mx-auto  w-full mt-10">
          <div className="border-2  b-b-0 border-[#E1B989] rounded-t-lg p-3 mx-auto w-full h-[48px]">
            <CardElement
              id="card-element"
              options={cardStyle}
              onChange={handleChange}
            />
          </div>
          <button
            className="mx-auto flex bg-[#E1B989] w-full  h-[38px]  items-center justify-center rounded-b-lg"
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
            Refresh the page to pay again.
          </p>
        </div>
      </form>
    </div>
  );
};
