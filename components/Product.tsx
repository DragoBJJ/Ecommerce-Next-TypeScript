import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";

interface ProductDetails {
  id: number;
  title: string;
  description: string;
  longDescription: string;
  thumbnailUrl: string;
  thumbnailAlt: string;
  rating: number;
}

type ProductListItem = Pick<
  ProductDetails,
  "title" | "thumbnailUrl" | "thumbnailAlt" | "id"
>;

export const ProductDetails = ({
  id,
  thumbnailAlt,
  thumbnailUrl,
  title
}: ProductListItem) => {
  const { query } = useRouter();

  return (
    <div className="relative grid gap-4 border-2 border-sky-700 w-80 h-80 lg:w-96 lg:h-96 ease-in-out duration-300  hover:scale-105 shadow-2xl hover:shadow-4xl bg-white justify-center items-center overflow-hidden rounded-xl">
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
      <div className="flex items-center justify-center mt-auto z-999 w-96 h-20 hover:bg-sky-700">
        <Link href={`/products/details/${id}/`}>
          <h3 className="text-center h-full w-full  my-2 text-black cursor-pointer ease-in-out duration-300 hover:scale-125 hover:text-white h-max text-lg">
            {title}
          </h3>
        </Link>
      </div>
    </div>
  );
};
