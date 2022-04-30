import { MDXRemoteSerializeResult } from "next-mdx-remote";

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
