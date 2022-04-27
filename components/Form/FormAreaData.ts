import { ReviewData, FormData } from "./FormAreaType";
import { FormInputProps } from "./FormInput";

export const reviewInputData: FormInputProps<ReviewData>[] = [
  {
    id: "headline",
    type: "text",
    placeholder: " review Title",
    label: "title"
  },
  {
    id: "name",
    type: "text",
    placeholder: " review Name",
    label: "Name"
  },
  {
    id: "email",
    type: "email",
    placeholder: " Aleksander@gmai.com",
    label: "E-mail"
  },
  {
    id: "content",
    type: "text",
    placeholder: " review Content",
    label: "Content"
  },
  {
    id: "rating",
    type: "text",
    placeholder: "1-5",
    label: "Rating"
  }
];

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
  Pick<FormData, "city" | "postalCode" | "state">
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
  },
  {
    id: "state",
    label: "State"
  }
];

export const billingData: FormInputProps<Pick<FormData, "billing">>[] = [
  {
    id: "billing",
    type: "checkbox",
    label: "Same information as a Shipping Address"
  }
];