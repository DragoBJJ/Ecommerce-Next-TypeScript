import * as yup from "yup";
import { FormInputProps } from "./FormInput";

export const schema = yup
  .object({
    email: yup
      .string()
      .email()
      .required(),
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    nameCard: yup.string().required(),
    cardNumber: yup.string().required(),
    expirationDate: yup.string().required(),
    cvc: yup.string().required(),
    company: yup.string().required(),
    address: yup.string().required(),
    apartament: yup.string().required(),
    city: yup.string().required(),
    state: yup.string().required(),
    postalCode: yup.string().required(),
    billing: yup.boolean().required()
  })
  .required();

export type FormData = yup.InferType<typeof schema>;

export const cardData: FormInputProps<
  Pick<FormData, "cardNumber" | "nameCard" | "cvc" | "expirationDate">
>[] = [
  {
    id: "cardNumber",
    label: "Card Number",
    placeholder: "123-123-123",
    type: "text"
  },
  {
    id: "nameCard",
    label: "Name Cards",
    placeholder: "Visa",
    type: "text"
  },
  {
    id: "cvc",
    label: "CVC",
    placeholder: "123",
    type: "text"
  },
  {
    id: "expirationDate",
    label: " expirationDate",
    placeholder: "22/03/2024",
    type: "date"
  }
];

export const personalData: FormInputProps<
  Pick<FormData, "firstName" | "lastName" | "email">
>[] = [
  {
    id: "email",
    label: "E-mail",
    placeholder: "Aleksander@gmail.com",
    type: "text"
  },
  {
    id: "firstName",
    label: "First Name",
    placeholder: "Aleksander",
    type: "text"
  },
  {
    id: "lastName",
    label: "Last Name",
    placeholder: "Macedonian",
    type: "text"
  }
];

export const shippingAddress: FormInputProps<
  Pick<FormData, "address" | "company" | "apartament">
>[] = [
  {
    id: "company",
    type: "text",
    label: "Company",
    placeholder: "Apple"
  },

  {
    id: "address",
    label: "Address",
    type: "text",
    placeholder: "Słoneczna"
  },
  {
    id: "apartament",
    label: "Apartament",
    type: "text",
    placeholder: "Hilton"
  }
];

export const homeAddress: FormInputProps<
  Pick<FormData, "city" | "postalCode">
>[] = [
  {
    id: "city",
    type: "text",
    label: "City",
    placeholder: "Poznan"
  },
  {
    id: "postalCode",
    type: "text",
    placeholder: "63-430",
    label: "Postal Code"
  }
];

export const billingData: FormInputProps<Pick<FormData, "billing">>[] = [
  {
    id: "billing",
    type: "checkbox",
    label: "Same information as a Shipping Address"
  }
];
