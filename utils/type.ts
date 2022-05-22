import { MDXRemoteSerializeResult } from "next-mdx-remote";

import {
  DeepMap,
  FieldError,
  FieldValues,
  Path,
  UseFormRegister
} from "react-hook-form";

export type InferGetStaticPaths<T> = T extends () => Promise<{
  paths: Array<{ params: infer R }>;
}>
  ? { params?: R }
  : never;

export interface ProductDetailsType {
  id: string;
  title: string;
  price: number;
  description: string;
  longDescription: MarkDownResult;
  thumbnailUrl: string;
  thumbnailAlt: string;
  rating: number;
}

export type MarkDownResult = MDXRemoteSerializeResult<Record<string, unknown>>;

export interface CartType {
  readonly id: ProductDetailsType["id"];
  readonly title: ProductDetailsType["title"];
  readonly price: ProductDetailsType["price"];
  readonly image?: {
    url: ProductDetailsType["thumbnailUrl"];
    alt: ProductDetailsType["thumbnailAlt"];
  };
  readonly count: number;
}

export type CheckoutReqest = {
  id: CartType["id"];
  count: CartType["count"];
}[];

export type OrderItemsType = {
  __typename?: "OrderItem" | undefined;
  quantity: number;
  product?:
    | {
        __typename?: "Product" | undefined;
        id: string;
        name: string;
        price: number;
      }
    | null
    | undefined;
}[];

export type ProductCalculate = {
  price: number;
}[];

export type ShippingAddressType = {
  __typename?: "ShippingAddress" | undefined;
  id?: string | undefined;
  email?: string | undefined;
  firstName?: string | undefined;
  lastName?: string | undefined;
  state?: string | undefined;
  city?: string | undefined;
  streetAddress?: string | undefined;
  postalCode?: string | undefined;
};

export type StringKeys<T> = {
  [P in keyof T]: T[P] extends string ? T[P] : never;
}[keyof T];

export type AreaType<FormData extends FieldValues> = {
  inputs:
    | FormInputProps<Pick<FormData, StringKeys<FormData>>>[]
    | FormInputProps<FormData>[];
  register: UseFormRegister<FormData>;
  errors: Partial<DeepMap<FormData, FieldError>>;
  title: string;
  selectOptions?: string[];
};

export type InputType = {
  text: number;
  email: string;
  password: string;
  date: string;
  checkbox: string;
};

export type FormInputProps<TFormData extends FieldValues> = {
  register?: UseFormRegister<TFormData>;
  id: Path<TFormData>;
  type?: Path<InputType>;
  placeholder?: string;
  label: string;
  errors?: Partial<DeepMap<TFormData, FieldError>>;
};

export type FormSelectProps<TFormData extends FieldValues> = {
  register: UseFormRegister<TFormData>;
  id: Path<TFormData>;
  label: string;
  errors: Partial<DeepMap<TFormData, FieldError>>;
  options: string[];
};

export type ResSignInType =
  | {
      error: string | undefined;
      status: number;
      ok: boolean;
      url: string | null;
    }
  | undefined;
