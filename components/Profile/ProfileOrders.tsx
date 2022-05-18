import Image from "next/image";
import { memo } from "react";
import { GetAccountDataQuery } from "../../generated/graphql";
import { getClearFormatData, getShippingAddress } from "../../utils/common";
import { ProfileAddress } from "./ProfileAddress";

type ProfileOrdersType = {
  accountData: GetAccountDataQuery["account"];
};

export const ProfileOrders = ({ accountData }: ProfileOrdersType) => {
  return (
    <ul
      className="flex flex-col w-full overflow-y-auto
          shadow-md shadow-stone-700 rounded-xl p-4 bg-[#E1B989]"
    >
      {accountData!.orders.map((order, index) => {
        console.log("order", order);
        return (
          <li key={order.createdAt} className="flex flex-col my-8">
            <div className="flex w-full items-center py-1 justify-start  border-y-[1px] border-neutral-800">
              <p className="text-3xl text-neutral-800 mx-4">#{index + 1}</p>
              <p className="text-xl text-neutral-800 mr-4">
                {getClearFormatData(order.createdAt)}
              </p>
              <p
                className={`text-xl text-neutral-800 ${
                  order.stripeCheckoutId.startsWith("-")
                    ? "bg-red-500"
                    : "bg-green-500"
                } rounded-xl px-6`}
              >
                {order.stripeCheckoutId.startsWith("-")
                  ? "Unpaid"
                  : "Delivered"}
              </p>
            </div>
            <div className="flex flex-col lg:flex-row w-full h-full">
              <ul className="flex flex-col overflow-y-auto  w-full md:w-3/5">
                {order.orderItems.map((item, index) => {
                  return (
                    <li
                      key={`${item.product?.name}_${index}`}
                      className="flex justify-between items-center w-full p-4 border-b-[1px] border-neutral-800"
                    >
                      <p className="text-xl">{item.product?.name}</p>
                      <div className="relative  w-1/3 h-[60px]">
                        {item.product?.images[0].url && (
                          <Image
                            src={item.product?.images[0].url}
                            alt={item.product.name}
                            height={16 / 9}
                            width={16 / 9}
                            layout="fill"
                            objectFit="contain"
                          />
                        )}
                      </div>
                      <div className="flex w-[200px] justify-between items-center">
                        <p>
                          price: {item.product?.price}$ <br />
                          amount: {item.quantity}
                        </p>
                      </div>
                    </li>
                  );
                })}
              </ul>
              {order.shippingAddress && (
                <ProfileAddress shippingAddress={order.shippingAddress} />
              )}
            </div>
          </li>
        );
      })}
    </ul>
  );
};
