import React from "react";
import { InferGetStaticPaths } from "../../../utils/type";
import { getPaths, getCurrentProduct } from "../../../utils/getData";
import { InferGetStaticPropsType } from "next";
import { GridTemplate } from "../../../templates/GridTemplate";
import Image from "next/image";
import Link from "next/link";

import { MarkDownNext } from "../../../components/MarkDown";
import { serialize } from "next-mdx-remote/serialize";
import { MDXRemote } from "next-mdx-remote";
import ReactMarkdown from "react-markdown";

const ProductID = ({
  product
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  if (!product) return <h2>You dont have this product</h2>;

  return (
    <GridTemplate>
      <div className=" grid grid-cols-1 lg:grid-cols-2 h-[550px] lg:h-[480px] w-11/12 mx-auto bg-white  rounded-xl overflow-hidden py-8  shadow-xl shadow-sky-700/50">
        <div className=" h-[180px] mb-4 lg:h-full w-full relative">
          <Image
            layout="fill"
            width={16}
            height={9}
            objectFit="contain"
            src={product.image}
            alt={product.title}
          />
        </div>

        <div className="overflow-y-auto lg:h-full w-full mx-auto p-6 border-t-2   lg:border-l-2 lg:border-t-0  border-sky-700 opacity-80 hover:opacity-100 flex flex-col ease-in-out duration-300 text-white items-center">
          <article className="prose prose-stone  -lg:prose-sm text-sky-700 text-center">
            <h1>{product.title}</h1>
            <MDXRemote {...product.longDescription} />
            <p className="text-black text-2xl">{product.price}$</p>
          </article>

          {/* <h1 className="max-w-md lg:max-w-lg text-center mt-3 text-black">
            {product.title}
          </h1>
          <p className="max-w-md lg:max-w-lg text-center mt-3 text-black">
            {product.longDescription}
          </p>
          <p className="text-center mt-5 text-black">
            Price: {product.price} $
          </p>
          <p className="text-center mt-1 mb-2 text-black">
            Rating: {product.rating.rate}
          </p> */}
        </div>
      </div>
    </GridTemplate>
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
      props: {},
      notFound: true
    };
  }

  const longDescription = await serialize(product.longDescription);

  return {
    props: {
      product: {
        ...product,
        longDescription
      }
    },
    revalidate: 60
  };
};
