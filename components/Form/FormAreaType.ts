import * as yup from "yup";

// const carDataType = yup.object({
//   cardNumber: yup.string().required(),
//   expirationDate: yup
//     .string()
//     .typeError("Not a valid expiration date. Example: MM/YY")
//     .max(5, "Not a valid expiration date. Example: MM/YY")
//     .matches(
//       /([0-9]{2})\/([0-9]{2})/,
//       "Not a valid expiration date. Example: MM/YY"
//     )
//     .required("Expiration date is required"),
//   cvc: yup.string().required()
// });

export const schema = yup
  .object({
    email: yup
      .string()
      .email()
      .required(),
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    // nameCard: yup.string().required(),
    // company: yup.string().required(),
    // apartament: yup.string().required(),
    streetAddress: yup.string().required(),
    city: yup.string().required(),
    state: yup.string().required(),
    postalCode: yup.string().required(),
    billingInformation: yup.boolean().required()
  })
  .required();

export const reviewSchema = yup.object({
  headline: yup.string().required(),
  name: yup.string().required(),
  content: yup.string().required(),
  rating: yup
    .number()
    .min(1)
    .max(5)
    .required()
});

export const registerSchema = yup.object({
  email: yup
    .string()
    .email()
    .required(),
  username: yup.string().required(),
  specialization: yup.string().required(),
  password: yup
    .string()
    .min(8)
    .required(),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")])
    .required()
});

export type RegisterData = yup.InferType<typeof registerSchema>;

export type FormData = yup.InferType<typeof schema>;

export type ReviewData = yup.InferType<typeof reviewSchema>;
