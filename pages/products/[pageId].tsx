import { InferGetStaticPropsType } from "next";
import React from "react";
import { ProductDetails } from "../../components/Product";
import { Pagination } from "../../components/Pagination";
import { getProducts, getPaths } from "../../utils/getData";
import { InferGetStaticPaths } from "../../utils/type";

const pageId = ({ data }: InferGetStaticPropsType<typeof getStaticProps>) => {
  if (!data) return <div>you dont have Data</div>;

  return (
    <>
      <Pagination />
      <div className="grid grid-cols-1 h-auto w-100 gap-y-8 mt-8 md:grid-cols-2 lg:grid-cols-3  place-items-center px-8">
        {data &&
          data.map(({ id, title, image }) => {
            return (
              <ProductDetails
                key={id}
                id={id}
                thumbnailAlt={title}
                thumbnailUrl={image}
                title={title}
              />
            );
          })}
      </div>
    </>
  );
};

export default pageId;

export const getStaticProps = async ({
  params
}: InferGetStaticPaths<typeof getStaticPaths>) => {
  if (!params?.pageId)
    return {
      props: {
        data: undefined
      }
    };

  const products = await getProducts(params.pageId);

  if (!products) {
    return {
      props: {
        data: []
      }
    };
  }
  return {
    props: {
      data: products
    },
    revalidate: 10
  };
};

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
