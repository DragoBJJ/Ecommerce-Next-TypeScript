import { InferGetStaticPropsType } from "next";
import Skeleton from "react-loading-skeleton";
import { useQuery } from "react-query";
import { ProductDetails } from "../components/Product";
import { Pagination } from "../components/Pagination";
import { useState } from "react";

export interface StoreApiResponse {
  id: number;
  title: string;
  price: number;
  description: string;
  longDescription: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

const ProductPages = () => {
  const [offset, setOffset] = useState(25);

  const getProducts = async (offset: number) => {
    const response = await fetch(
      `https://naszsklep-api.vercel.app/api/products?take=25&offset=${offset}`
    );
    if (!response) {
      return console.warn("Error");
    }
    const products = await response.json();

    return products;
  };

  const products = useQuery(["products", offset], async () => {
    const products = await getProducts(offset);
    return products;
  });

  console.log("products", products);

  return (
    <div>
      <Pagination />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">
        {/* {data &&
          data.map(({ description, id, image, title, rating, category }) => {
            return (
              <div key={id} className="grid">
                <ProductDetails
                  thumbnailAlt={category}
                  thumbnailUrl={image}
                  title={title}
                  id={id}
                />
              </div>
            );
          })} */}
      </div>
    </div>
  );
};

export default ProductPages;

// export const getStaticProps = async () => {
//   const data: StoreApiResponse[] = await fetch(
//     "https://naszsklep-api.vercel.app/api/products"
//   ).then(res => res.json());

//   return {
//     props: {
//       data
//     }
//   };
// };
