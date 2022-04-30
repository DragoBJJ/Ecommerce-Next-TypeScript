import React, { memo } from "react";

type CartSummaryType = {
  itemsAmount: number;
  pay: () => Promise<void>;
  clientID?: string;
};

export const CartSummary = memo<CartSummaryType>(
  ({ itemsAmount, pay, clientID }) => {
    return (
      <div className="col-span-1 border-blue">
        <h1 className="text-2xl">basket summary</h1>
        <h2>Items amount: {itemsAmount}</h2>
        <button
          onClick={pay}
          className="h-[48px] w-[420px] mt-4 bg-[#E1B989] rounded-xl"
        >
          {clientID ? "Continue order" : "Confirm Order"}
        </button>
      </div>
    );
  }
);
