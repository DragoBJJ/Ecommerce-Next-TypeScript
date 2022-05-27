import { InferGetStaticPropsType } from "next";
import React from "react";
import { ProductDetails } from "../../components/Product";
import { Pagination } from "../../components/Pagination";
import { getPaths, getPaginationData } from "../../utils/getData";
import { InferGetStaticPaths } from "../../utils/type";

import { Fade } from "react-awesome-reveal";
import { InfoPopup } from "../../components/InfoPopup";

const pageId = ({
  pageProducts,
  paginationRange,
  currentPage
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  if (!paginationRange || !pageProducts || !currentPage) {
    return (
      <div className="flex w-screen h-screen justify-center items-center">
        <InfoPopup status="cancell" description="Error with your pagination" />
      </div>
    );
  }

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
  if (!params?.pageId) {
    return {
      props: {
        data: null
      }
    };
  }

  const data = await getPaginationData(params.pageId);

  if (!data.paginationRange || !data.pageProducts) {
    return {
      props: {
        data: []
      }
    };
  }
  const { pageProducts, paginationRange, currentPage } = data;

  return {
    props: {
      pageProducts,
      paginationRange,
      currentPage
    },
    revalidate: 86400
  };
};

export const getStaticPaths = async () => {
  const paths = await getPaths();

  if (!paths) {
    return {
      paths: []
    };
  }

  return {
    paths,
    fallback: "blocking"
  };
};
