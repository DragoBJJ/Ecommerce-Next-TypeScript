import React, { memo } from "react";
import { UseClientContext } from "../context/ClientContext";

type CartSummaryType = {
  itemsAmount: number;
  pay: () => Promise<void>;
};

export const CartSummary = memo<CartSummaryType>(({ itemsAmount, pay }) => {
  const { orderID } = UseClientContext();
  return (
    <div className="flex flex-col py-4 px-2 col-span-1 w-full items-center">
      <h1 className="text-2xl ">Basket Summary</h1>
      <h2 className="text-xl my-4">Items amount: {itemsAmount}</h2>
      <button
        disabled={!itemsAmount}
        onClick={pay}
        className="h-[48px] w-full  max-w-[350px] mt-4 border-2 hover:bg-[#E1B989] border-[#E1B989] rounded-xl ease-in-out duration-300"
      >
        {orderID ? "Continue order" : "Confirm Order"}
      </button>
    </div>
  );
});
