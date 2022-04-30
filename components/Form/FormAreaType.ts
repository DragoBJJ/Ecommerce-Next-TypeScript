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
    expirationDate: yup
      .string()
      .typeError("Not a valid expiration date. Example: MM/YY")
      .max(5, "Not a valid expiration date. Example: MM/YY")
      .matches(
        /([0-9]{2})\/([0-9]{2})/,
        "Not a valid expiration date. Example: MM/YY"
      )
      .required("Expiration date is required"),
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

export const reviewSchema = yup.object({
  email: yup
    .string()
    .email()
    .required(),
  headline: yup.string().required(),
  name: yup.string().required(),
  content: yup.string().required(),
  rating: yup
    .number()
    .min(1)
    .max(5)
    .required()
});

export type FormData = yup.InferType<typeof schema>;

export type ReviewData = yup.InferType<typeof reviewSchema>;
