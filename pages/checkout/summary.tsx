import { OrderSummary } from "../../components/Summary/OrderSummary";
import { CheckoutTemplate } from "../../templates/CheckoutTemplate";

const PaymentForm = () => {
  return (
    <>
      <CheckoutTemplate imageName="celebrating">
        <OrderSummary />
      </CheckoutTemplate>
    </>
  );
};

export default PaymentForm;
