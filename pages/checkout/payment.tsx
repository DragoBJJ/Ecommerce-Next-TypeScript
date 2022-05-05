import { Elements } from "@stripe/react-stripe-js";
import { CheckoutPaymentForm } from "../../components/Form/checkoutPayment";
import { CheckoutTemplate } from "../../templates/CheckoutTemplate";

import { loadStripe } from "@stripe/stripe-js";

const promise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY!);

const PaymentForm = () => {
  return (
    <>
      <CheckoutTemplate imageName="card">
        <Elements stripe={promise}>
          <CheckoutPaymentForm />
        </Elements>
      </CheckoutTemplate>
    </>
  );
};

export default PaymentForm;
