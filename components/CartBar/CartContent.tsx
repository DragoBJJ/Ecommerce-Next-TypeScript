import React, { FC } from "react";
import { CartType } from "../../utils/type";
import { UseCartContext } from "../context/CartContext";

type CartContentProps = {
  cartItems: CartType[];
};

export const CartContent: FC<CartContentProps> = ({ cartItems }) => {
  const { removeItemFromCart } = UseCartContext();
  return (
    <div className="flex flex-col h-screen flex-grow w-full  border-[1px] border-blue">
      {cartItems.length ? (
        <ul className="bg-scroll">
          {cartItems.map((item, index) => {
            return (
              <li
                key={`${item.title}_${index}`}
                className="flex justify-between p-4 border-b-[1px] border-black"
              >
                <div>{item.title}</div>
                <div className="flex w-[180px] justify-end   items-center">
                  <p>
                    {item.price}$ {item.count}
                  </p>
                  <div
                    onClick={() => removeItemFromCart(item.id)}
                    className="flex justify-center items-center  w-[100px]  ease-in-out duration-300 hover:bg-neutral-800  hover:text-white  hover:border-none h-[38px] border-2 border-neutral-800  text-black rounded-lg cursor-pointer ml-4"
                  >
                    DELETE
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      ) : (
        <h2 className="text-black text-2xl">
          You dont have any item in your bag
        </h2>
      )}
    </div>
  );
};