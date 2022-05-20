import React, { FC, useEffect } from "react";
import { CartType } from "../../utils/type";
import { UseCartContext } from "../context/CartContext";
import { UseClientContext } from "../context/ClientContext";
import { usePublishOrdersMutation } from "../../generated/graphql";
import { AiOutlineDelete } from "react-icons/ai";
import Image from "next/image";
import { InfoPopup } from "../InfoPopup";

type CartContentProps = {};

export const CartContent: FC<CartContentProps> = ({}) => {
  const { cartItems, removeItemFromCart } = UseCartContext();

  return (
    <div className="flex  h-full flex-col col-span-1 md:col-span-2  w-full  border-[1px] border-[#E1B989]">
      {cartItems.length ? (
        <ul className="w-full">
          {cartItems.map((item, index) => {
            return (
              <li
                key={`${item.title}_${index}`}
                className="flex justify-between items-center w-full p-4 border-b-[1px] border-[#E1B989]"
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
                    className="hover:scale-125 easy-in-out duration-300"
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
        <InfoPopup
          image="empty"
          status="info"
          description="you dont have products"
        />
      )}
    </div>
  );
};
