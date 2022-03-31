import Link from "next/link";
import { UseCartContext } from "../context/CartContext";
import Image from "next/image";

export const CartBar = () => {
  const { cartItems } = UseCartContext();
  return (
    <Link href="/Cart">
      <a className="justify-center items-center ml-8 hidden md:flex">
        <span className="text-white text-[#E1B989] mr-2">
          {cartItems.length ? cartItems.length : 0}
        </span>

        <svg
          className="w-10 h-10 text-[#E1B989] cursor-pointer hover:scale-125 ease-in-out duration-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
          ></path>
        </svg>
      </a>
    </Link>
  );
};
