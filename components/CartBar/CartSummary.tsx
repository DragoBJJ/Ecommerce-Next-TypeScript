import React, { memo } from "react";
import { UseClientContext } from "../context/ClientContext";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { UseCartContext } from "../context/CartContext";

type CartSummaryType = {
  itemsAmount: number;
  pay: () => Promise<void>;
};

export const CartSummary = memo<CartSummaryType>(({ itemsAmount, pay }) => {
  const { orderID } = UseClientContext();
  const { cartItems } = UseCartContext();
  const { status } = useSession();

  console.log("orderID", orderID);
  return (
    <div className="flex flex-col py-4 px-2 col-span-1 w-full items-center">
      <h1 className="text-2xl ">Basket Summary</h1>
      <h2 className="text-xl my-4">Items amount: {itemsAmount}</h2>

      {status === "unauthenticated" ? (
        <>
          <p className="mt-4 text-xl">Sign in to place an order</p> <br />
          <Link href="/register">
            <p className="mt-4 text-sm border-b-[1px] ease-in-out duration-300 hover:scale-125 cursor-pointer border-[#1d1d1d]">
              Don't have an account yet ? Sign up !
            </p>
          </Link>
        </>
      ) : (
        <>
          {cartItems.length ? (
            <button
              disabled={!itemsAmount}
              onClick={pay}
              className="h-[48px] w-full  max-w-[350px] mt-4 border-2 hover:bg-[#E1B989] border-[#E1B989] rounded-xl ease-in-out duration-300"
            >
              {orderID ? "Continue order" : "Confirm Order"}
            </button>
          ) : (
            <Link href="/products/1">
              <p className="mt-4 text-sm border-b-[1px] ease-in-out duration-300 hover:scale-125 cursor-pointer border-[#1d1d1d]">
                Add items to your Cart !
              </p>
            </Link>
          )}
        </>
      )}
    </div>
  );
});
