import { CheckoutForm } from "../../components/Form/CheckoutForm";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { UseClientContext } from "../../components/context/ClientContext";
import { InfoPopup } from "../../components/InfoPopup";

const Checkout = () => {
  const { clientID } = UseClientContext();

  return (
    <div className=" w-full h-full min-w-screen min-h-screen">
      {clientID ? <CheckoutForm /> : <InfoPopup status="cancell" />}
    </div>
  );
};

export default Checkout;
