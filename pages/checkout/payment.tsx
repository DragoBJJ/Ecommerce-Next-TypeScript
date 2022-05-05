import { CheckoutPaymentForm } from "../../components/Form/CheckoutPayment";
import { CheckoutTemplate } from "../../templates/CheckoutTemplate";
import { ElementsConsumer } from "@stripe/react-stripe-js";
import { InfoPopup } from "../../components/InfoPopup";

const PaymentForm = () => {
  return (
    <>
      <CheckoutTemplate imageName="card">
        <ElementsConsumer>
          {({ stripe, elements }) => {
            if (stripe && elements) {
              return (
                <CheckoutPaymentForm stripe={stripe} elements={elements} />
              );
            }
            return <InfoPopup status="cancell" />;
          }}
        </ElementsConsumer>
      </CheckoutTemplate>
    </>
  );
};

export default PaymentForm;
