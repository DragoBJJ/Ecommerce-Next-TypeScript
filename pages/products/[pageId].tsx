import { InferGetStaticPropsType } from "next";
import React, { useState, useMemo } from "react";
import { ProductDetails } from "../../components/Product";
import { Pagination } from "../../components/Pagination";
import { getProducts, getPaths } from "../../utils/getData";
import { InferGetStaticPaths } from "../../utils/type";

const pageId = ({
  paginationData
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  if (!paginationData) return <div>you dont have paginationData</div>;

  const { pageProducts, pageSize, totalCount, currentPage } = paginationData;

  return (
    <>
      <Pagination
        currentPage={currentPage}
        totalCount={totalCount}
        pageSize={pageSize}
      />
      <div className="grid grid-cols-1 h-auto w-100 gap-y-8 mt-8 md:grid-cols-2 lg:grid-cols-3  place-items-center px-8">
        {pageProducts &&
          pageProducts.map(({ id, title, image }) => {
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

  const paginationData = await getProducts(params.pageId);

  if (!paginationData)
    return {
      props: {
        data: undefined
      }
    };

  return {
    props: {
      paginationData
    },
    revalidate: 100
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
