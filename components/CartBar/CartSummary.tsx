import React, { FC } from "react";
import { CartType } from "../../utils/type";

type CartSummaryType = {
  itemsAmount: number;
};

export const CartSummary: FC<CartSummaryType> = ({ itemsAmount }) => {
  return (
    <div className="col-span-1 border-blue">
      <h1 className="">basket summary</h1>
      <h2>Items amount: {itemsAmount}</h2>
    </div>
  );
};
