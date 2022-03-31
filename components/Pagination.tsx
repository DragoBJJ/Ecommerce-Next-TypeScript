import React from "react";
import Link from "next/link";

type usePaginationType = {
  paginationRange: (string | number)[];
  currentPage: number;
};

export const Pagination = ({
  paginationRange,
  currentPage
}: usePaginationType) => {
  if (currentPage === 0 || paginationRange.length < 2) return null;

  return (
    <div className="flex h-20 mt-2 w-full justify-center align-center border-2 border-[#E1B989]">
      <nav className="border-t border-gray-200 px-4 flex items-center justify-between sm:px-0">
        <div className="flex md:-mt-px ">
          {paginationRange &&
            paginationRange.map(pageNumber => {
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
                        Number(pageNumber) == currentPage
                          ? "border-sky-700 border-t-2 text-[#E1B989] "
                          : null
                      }  border-transparent text-gray-500 hover:text-[#E1B989] hover:border-[#E1B989] border-t-2 pt-4 px-4 inline-flex items-center text-md font-medium`}
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
