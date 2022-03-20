import React from "react";
import Link from "next/link";
import { ProductDetailsType } from "../utils/type";
import Image from "next/image";

type ProductListItem = Pick<
  ProductDetailsType,
  "title" | "thumbnailUrl" | "thumbnailAlt" | "id"
>;

export const ProductDetails = ({
  id,
  thumbnailAlt,
  thumbnailUrl,

  title
}: ProductListItem) => {
  return (
    <div className="relative grid gap-4  w-100  max-w-80 h-80 lg:max-w-96 lg:h-96 hover:scale-105 shadow-xl hover:shadow-2xl hover:shadow-sky-700/50  ease-in-out duration-300  bg-white justify-center items-center overflow-hidden rounded-xl">
      <div className="absolute top-5 left-0 flex w-full h-2/3 opacity-90 hover:opacity-100">
        <Image
          layout="fill"
          width={16}
          height={9}
          objectFit="contain"
          src={thumbnailUrl}
          alt={thumbnailAlt}
        />
      </div>
      <div className="flex items-center justify-center mt-auto z-999 w-96 h-20 hover:bg-[#E1B989]">
        <Link href={`/products/details/${id}/`}>
          <h3 className="text-center h-full w-full  my-2 text-black cursor-pointer ease-in-out duration-300 hover:scale-125 h-max text-lg">
            {title}
          </h3>
        </Link>
      </div>
    </div>
  );
};
