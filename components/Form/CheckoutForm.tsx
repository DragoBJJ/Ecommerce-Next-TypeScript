import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import Image from "next/image";

import { yupResolver } from "@hookform/resolvers/yup";
import { FormData, schema } from "./FormAreaType";
import { personalData, shippingAddress, billingData } from "./FormAreaData";
import { AreaInputs } from "./AreaInputs";
import { OrderContent } from "../Order/OrderContent";
import { useCreateShippingAddressMutation } from "../../generated/graphql";
import { UseClientContext } from "../context/ClientContext";
import { CheckoutPaymentForm } from "./checkoutPayment";
import CheckoutAddress from "./CheckoutAddress";

export const CheckoutForm = ({ children }) => {
  const router = useRouter();

  return <>{children}</>;
};
