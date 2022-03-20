import { MDXRemoteSerializeResult } from "next-mdx-remote";

export type InferGetStaticPaths<T> = T extends () => Promise<{
  paths: Array<{ params: infer R }>;
}>
  ? { params?: R }
  : never;

export interface StoreApiResponse {
  id: number;
  title: string;
  price: number;
  description: string;
  longDescription: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

export interface ProductDetailsType {
  id: number;
  title: string;
  description: string;
  longDescription: MarkDownResult;
  thumbnailUrl: string;
  thumbnailAlt: string;
  rating: number;
}

export type MarkDownResult = MDXRemoteSerializeResult<Record<string, unknown>>;
