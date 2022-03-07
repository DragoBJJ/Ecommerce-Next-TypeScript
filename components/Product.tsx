import React from "react";
import Link from "next/link";

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
  return (
    <div className="flex-col min-w-full min-h-full p-4 ease-in-out duration-300  hover:scale-105 hover:shadow-2xl bg-neutral-800 rounded-xl justify-center items-center">
      <div className="flex max-h-40 w-40 mx-auto border-4 border-blue-400">
        <img
          className="min-h-full min-w-full"
          src={thumbnailUrl}
          alt={thumbnailAlt}
        />
      </div>
      <Link href={`products/${id}`}>
        <h3 className="text-center my-2 text-white">{title}</h3>
      </Link>
    </div>
  );
};
