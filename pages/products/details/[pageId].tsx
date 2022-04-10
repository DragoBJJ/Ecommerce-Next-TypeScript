import React from "react";
import { InferGetStaticPaths } from "../../../utils/type";
import { getPaths, getCurrentProduct } from "../../../utils/getData";
import { InferGetStaticPropsType } from "next";
import { GridTemplate } from "../../../templates/GridTemplate";
import Image from "next/image";

import { MarkDownNext } from "../../../components/MarkDown";
// import ReactMarkdown from "react-markdown";

import { serialize } from "next-mdx-remote/serialize";
import { MDXRemote } from "next-mdx-remote";

import { Fade } from "react-awesome-reveal";

const ProductID = ({
  product
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  if (!product) return <h2>You dont have this product</h2>;

  return (
    <GridTemplate>
      <Fade triggerOnce direction="down">
        <div className=" grid grid-cols-1 lg:grid-cols-2 h-[550px] lg:h-[480px] w-11/12 mx-auto bg-white  rounded-xl overflow-hidden py-8  shadow-xl shadow-sky-700/50">
          <div className=" h-[180px] mb-4 lg:h-full w-full relative">
            <Image
              layout="fill"
              width={16}
              height={9}
              objectFit="contain"
              src={product.images[0].url}
              alt={product.name}
            />
          </div>

          <div className="overflow-y-auto lg:h-full w-full mx-auto p-6 border-t-2   lg:border-l-2 lg:border-t-0  border-sky-700 opacity-80 hover:opacity-100 flex flex-col ease-in-out duration-300 text-white items-center">
            <article className="prose prose-stone  -lg:prose-sm text-sky-700 text-center">
              <h1>{product.name}</h1>
              <MDXRemote {...product.description} />
              {/* <MarkDownNext children={product.images[0].url} /> */}

              <p className="text-black text-2xl">{product.price}$</p>
              <div className="flex my-4 justify-center items-center w-full max-w-[180px]  ease-in-out duration-300 hover:bg-sky-700 hover:border-none h-[48px] border-2 border-sky-700 text-black rounded-lg cursor-pointer mx-auto">
                BUY
              </div>
            </article>
          </div>
        </div>
      </Fade>
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

  const description = await serialize(product.description);

  return {
    props: {
      product: {
        ...product,
        description
      }
    },
    revalidate: 60
  };
};
