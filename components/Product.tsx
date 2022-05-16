import React from "react";
import Link from "next/link";
import { ProductDetailsType } from "../utils/type";
import Image from "next/image";
import { UseCartContext } from "./context/CartContext";

type PickProductDetails = Pick<
  ProductDetailsType,
  "title" | "thumbnailUrl" | "thumbnailAlt" | "id" | "price"
>;

export const ProductDetails = ({
  id,
  thumbnailAlt,
  thumbnailUrl,
  price,
  title
}: PickProductDetails) => {
  const { addItemToCart } = UseCartContext();
  return (
    <div className="relative cursor-pointer grid border-[1px] border-[#E1B989]  max-w-[350px]  md:max-w-xs  xl:max-w-lg  h-96 hover:scale-105 shadow-xl hover:shadow-2xl hover:shadow-sky-700/50  ease-in-out duration-300  bg-white justify-center items-center overflow-hidden rounded-xl">
      <Link href={`/products/details/${id}/`} passHref={true}>
        <div className="absolute top-0 left-0 flex w-full h-2/3 opacity-90 hover:opacity-100">
          <Image
            layout="fill"
            objectFit="contain"
            src={
              thumbnailUrl
                ? thumbnailUrl
                : "https://source.unsplash.com/random/900×700/?fruit"
            }
            alt={thumbnailAlt}
          />
        </div>
      </Link>

      <div className="flex-col items-center justify-center  mt-auto  w-96 h-[140px] hover:bg-[#E1B989]  ease-in-out duration-500">
        <Link href={`/products/details/${id}/`} passHref={true}>
          <h3 className="text-center h-full w-full  my-2 text-neutral-800  ease-in-out duration-500 hover:scale-125 h-max text-lg">
            {title} <br />
            {price} $
          </h3>
        </Link>
        <div
          onClick={() =>
            addItemToCart({
              price,
              title,
              count: 1,
              id,
              image: {
                url: thumbnailUrl,
                alt: thumbnailAlt
              }
            })
          }
          className="flex my-4 justify-center items-center w-full max-w-[160px]  ease-in-out duration-300 hover:bg-neutral-800  hover:text-white  hover:border-none h-[48px] border-[1px] border-neutral-800  text-black rounded-lg cursor-pointer mx-auto"
        >
          BUY
        </div>
      </div>
    </div>
  );
};
