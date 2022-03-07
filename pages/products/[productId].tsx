import {
  GetStaticPathsResult,
  GetStaticPropsContext,
  InferGetStaticPropsType
} from "next";
import { useRouter } from "next/router";
import React from "react";
import { ProductDetails } from "../../components/Product";
import { StoreApiResponse } from "../products";

export type InferGetStaticPaths<T> = T extends () => Promise<{
  paths: Array<{ params: infer R }>;
}>
  ? { params?: R }
  : never;

const ProductId = ({
  data
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const { query } = useRouter();

  if (!data) return <div>you don't have Data</div>;

  return (
    <div>
      <ProductDetails
        thumbnailAlt={data.title}
        thumbnailUrl={data.image}
        title={data.title}
      />
    </div>
  );
};

export default ProductId;

export const getStaticPaths = async () => {
  const data: StoreApiResponse[] = await fetch(
    "https://fakestoreapi.com/products/"
  ).then(res => res.json());

  return {
    paths: [
      ...data.map(product => {
        return {
          params: {
            productId: product.id.toString()
          }
        };
      })
    ],
    fallback: false
  };
};

export const getStaticProps = async ({
  params
}: InferGetStaticPaths<typeof getStaticPaths>) => {
  if (!params?.productId) {
    return { props: {}, notFound: true };
  }

  const data: StoreApiResponse | null = await fetch(
    `https://fakestoreapi.com/products/${params.productId}`
  ).then(res => res.json());

  return {
    props: {
      data
    }
  };
};
