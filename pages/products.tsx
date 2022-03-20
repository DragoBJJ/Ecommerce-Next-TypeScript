import { InferGetStaticPropsType } from "next";
import Skeleton from "react-loading-skeleton";
import { useQuery } from "react-query";
import { ProductDetails } from "../components/Product";
import { Pagination } from "../components/Pagination";
import { useState } from "react";

export type InferGetStaticPaths<T> = T extends () => Promise<{
  paths: Array<{ params: infer R }>;
}>
  ? { params?: R }
  : never;

const ProductPages = () => {
  const [offset, setOffset] = useState(0);

  return (
    <div>
      {/* <Pagination />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4"></div> */}
    </div>
  );
};

export default ProductPages;
