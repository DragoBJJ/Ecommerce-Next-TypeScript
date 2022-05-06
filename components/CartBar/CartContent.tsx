import React, { FC, useEffect } from "react";
import { CartType } from "../../utils/type";
import { UseCartContext } from "../context/CartContext";
import { UseClientContext } from "../context/ClientContext";
import { usePublishOrdersMutation } from "../../generated/graphql";
import { AiOutlineDelete } from "react-icons/ai";
import Image from "next/image";

type CartContentProps = {};

export const CartContent: FC<CartContentProps> = ({}) => {
  const { orderID } = UseClientContext();
  const { cartItems, removeItemFromCart } = UseCartContext();

  return (
    <div className="flex flex-col h-screen col-span-1 md:col-span-2  w-full  border-2 border-[#E1B989]">
      {cartItems.length ? (
        <ul className="w-full">
          {cartItems.map((item, index) => {
            console.log("item_CARD", item);
            return (
              <li
                key={`${item.title}_${index}`}
                className="flex justify-between items-center w-full p-4 border-b-2 border-[#E1B989]"
              >
                <div className="text-xl">{item.title}</div>
                <div className="relative  w-1/3 h-[100px]">
                  {item.image?.url && (
                    <Image
                      src={item.image.url}
                      alt={item.image.alt}
                      height={16 / 9}
                      width={16 / 9}
                      layout="fill"
                      objectFit="contain"
                    />
                  )}
                </div>
                <div className="flex w-[200px] justify-between items-center">
                  <p>
                    price: {item.price}$ <br />
                    amount: {item.count}
                  </p>
                  <AiOutlineDelete
                    className="hover:text-[#E1B989]"
                    size="30px"
                    cursor="pointer"
                    onClick={() => removeItemFromCart(item.id)}
                  />
                </div>
              </li>
            );
          })}
        </ul>
      ) : (
        <h2 className="text-[#1d1d1d]  mt-10 text-center text-2xl">
          You don't have any products in your shopping cart
        </h2>
      )}
    </div>
  );
};
