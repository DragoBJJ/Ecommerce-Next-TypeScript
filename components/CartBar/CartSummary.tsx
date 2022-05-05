import React, { memo } from "react";
import { UseClientContext } from "../context/ClientContext";

type CartSummaryType = {
  itemsAmount: number;
  pay: () => Promise<void>;
};

export const CartSummary = memo<CartSummaryType>(({ itemsAmount, pay }) => {
  const { orderID } = UseClientContext();
  return (
    <div className="col-span-1 border-blue">
      <h1 className="text-2xl">basket summary</h1>
      <h2>Items amount: {itemsAmount}</h2>
      <button
        disabled={!itemsAmount}
        onClick={pay}
        className="h-[48px] w-[420px] mt-4 bg-[#E1B989] rounded-xl"
      >
        {orderID ? "Continue order" : "Confirm Order"}
      </button>
    </div>
  );
});
