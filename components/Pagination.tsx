import React from "react";
import Link from "next/link";

import { useRouter } from "next/router";
export const Pagination = () => {
  const { query } = useRouter();

  const array = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];

  return (
    <div className="flex h-20 mt-2 w-full justify-center align-center border-2 border-sky-700">
      <nav className="border-t border-gray-200 px-4 flex items-center justify-between sm:px-0">
        <div className="hidden md:-mt-px md:flex">
          {array.map(item => {
            return (
              <div key={item}>
                <Link href={`/products/${item}`}>
                  <a
                    href="#"
                    className={`${
                      item === query.productId
                        ? "border-sky-700 border-t-2 text-sky-700 "
                        : null
                    }  border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 border-t-2 pt-4 px-4 inline-flex items-center text-sm font-medium`}
                  >
                    {item}
                  </a>
                </Link>
              </div>
            );
          })}
        </div>
      </nav>
    </div>
  );
};
