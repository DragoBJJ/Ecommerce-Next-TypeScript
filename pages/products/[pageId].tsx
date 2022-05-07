import { InferGetStaticPropsType } from "next";
import React from "react";
import { ProductDetails } from "../../components/Product";
import { Pagination } from "../../components/Pagination";
import { getPaths, getPaginationData } from "../../utils/getData";
import { InferGetStaticPaths } from "../../utils/type";

import { Fade } from "react-awesome-reveal";

const pageId = ({
  pageProducts,
  paginationRange,
  currentPage
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  if (!paginationRange) return <div>you dont have paginationData</div>;
  if (!pageProducts) return <div>you dont have pageProducts</div>;
  if (!currentPage) return <div>Error with your CurrentPage</div>;

  return (
    <>
      <Pagination paginationRange={paginationRange} currentPage={currentPage} />
      <div className="grid grid-cols-1  min-h-screen w-screen mt-8  place-items-center gap-8 md:grid-cols-2 lg:grid-cols-3  p-8">
        {pageProducts.map(({ id, name, images, price }) => {
          return (
            <Fade triggerOnce key={id}>
              <ProductDetails
                id={id}
                price={price}
                thumbnailAlt={name}
                thumbnailUrl={images[0]?.url ? images[0].url : ""}
                title={name}
              />
            </Fade>
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
        data: null
      }
    };

  const data = await getPaginationData(params.pageId);

  if (!data.paginationRange || !data.pageProducts) {
    return {
      props: {
        data: []
      }
    };
  }

  return {
    props: {
      pageProducts: data.pageProducts,
      paginationRange: data.paginationRange,
      currentPage: data.currentPage
    },
    revalidate: 86400
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
