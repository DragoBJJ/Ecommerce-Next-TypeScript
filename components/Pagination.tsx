import React from "react";
import Link from "next/link";
import { usePagination } from "./usePagination";

import { useRouter } from "next/router";

type usePaginationType = {
  totalCount: number;
  pageSize: number;
  siblingCount?: number;
  currentPage: number;
};

export const Pagination = ({
  totalCount,
  siblingCount = 1,
  currentPage,
  pageSize
}: usePaginationType) => {
  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize
  });

  const { query } = useRouter();

  if (!paginationRange) return null;

  if (currentPage === 0 || paginationRange.length < 2) {
    return null;
  }

  let lastPage = paginationRange[paginationRange.length - 1];

  return (
    <div className="flex h-20 mt-2 w-full justify-center align-center border-2 border-sky-700">
      <nav className="border-t border-gray-200 px-4 flex items-center justify-between sm:px-0">
        <div className="hidden md:-mt-px md:flex">
          {paginationRange.map(pageNumber => {
            if (pageNumber === "...") {
              return (
                <li className="border-transparent text-gray-500  border-t-2 pt-4 px-4 inline-flex items-center text-md font-medium">
                  &#8230;
                </li>
              );
            }
            return (
              <div key={pageNumber}>
                <Link href={`/products/${pageNumber}`}>
                  <a
                    href="#"
                    className={`${
                      pageNumber === query.productId
                        ? "border-sky-700 border-t-2 text-sky-700 "
                        : null
                    }  border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 border-t-2 pt-4 px-4 inline-flex items-center text-md font-medium`}
                  >
                    {pageNumber}
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
