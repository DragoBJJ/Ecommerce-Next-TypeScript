import { InferGetStaticPropsType } from "next";
import React, { useState, useMemo } from "react";
import { ProductDetails } from "../../components/Product";
import { Pagination } from "../../components/Pagination";
import { getProducts, getPaths } from "../../utils/getData";
import { InferGetStaticPaths } from "../../utils/type";

const pageId = ({ data }: InferGetStaticPropsType<typeof getStaticProps>) => {
  if (!data) return <div>you dont have Data</div>;

  const [currentPage, setCurrentPage] = useState(1);
  const PageSize = 25;

  // ustawiam odpowiedni zakres  produktów i wycinam nową tablicę
  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return data.slice(firstPageIndex, lastPageIndex);
  }, [currentPage]);

  console.log("dataGetStaticProp", data);
  return (
    <>
      <Pagination
        currentPage={currentPage}
        totalCount={data.length}
        pageSize={PageSize}
        onPageChange={page => setCurrentPage(page)}
      />
      <div className="grid grid-cols-1 h-auto w-100 gap-y-8 mt-8 md:grid-cols-2 lg:grid-cols-3  place-items-center px-8">
        {currentTableData &&
          currentTableData.map(({ id, title, image }) => {
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
