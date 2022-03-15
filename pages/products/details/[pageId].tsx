import React from "react";
import { InferGetStaticPaths } from "../../../utils/type";
import { getPaths, getCurrentProduct } from "../../../utils/getData";
import { InferGetStaticPropsType } from "next";
import { GridTemplate } from "../../../templates/GridTemplate";
import Image from "next/image";

const ProductID = ({
  product
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  if (!product) return <h2>You dont have this product</h2>;

  return (
    <div className="flex h-screen w-screen">
      <div className="grid md:grid-cols-1 lg:grid-cols-2  h-auto  lg:h-3/5  md:9/12 lg:w-10/12 mt-4 mx-auto bg-neutral-800  shadow-2xl rounded-xl overflow-hidden">
        <img
          className="object-contain  h-full w-full mx-auto"
          src={product.image}
          alt={product.title}
        />

        <div className="opacity-80 hover:opacity-100 flex flex-col ease-in-out duration-300 hover:bg-sky-700 text-white items-center">
          <h1 className="text-xl mt-3">{product.title}</h1>

          <div className="border-2 mt-5 border-red-500">
            <p className="max-w-md lg:max-w-lg text-center mt-3">
              {product.description}
            </p>
            <p className="max-w-md lg:max-w-lg text-center mt-3">
              {product.longDescription}
            </p>
            <p className="text-center mt-5">Price: {product.price} $</p>
            <p className="text-center mt-1 mb-2">
              Rating: {product.rating.rate}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductID;

export const getStaticPaths = async () => {
  const paths = await getPaths();

  if (!paths) {
    return {
      paths: [],
      fallback: false
    };
  }

  return {
    paths,
    fallback: "blocking"
  };
};

export const getStaticProps = async ({
  params
}: InferGetStaticPaths<typeof getStaticPaths>) => {
  if (!params?.pageId)
    return {
      props: {
        data: undefined
      }
    };

  const product = await getCurrentProduct(params.pageId);

  if (!product) {
    return {
      props: {
        product: undefined
      }
    };
  }

  return {
    props: {
      product
    },
    revalidate: 60
  };
};
