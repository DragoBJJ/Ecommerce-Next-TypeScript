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
