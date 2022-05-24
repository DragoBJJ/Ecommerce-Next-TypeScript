import CheckoutAddress from "../../components/Form/CheckoutAddress";
import { CheckoutTemplate } from "../../templates/CheckoutTemplate";

const AddressForm = () => {
  return (
    <CheckoutTemplate imageName="spaceX">
      <CheckoutAddress />
    </CheckoutTemplate>
  );
};

export default AddressForm;
