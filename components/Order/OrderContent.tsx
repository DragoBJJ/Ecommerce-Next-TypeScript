import React, { FC, useEffect } from "react";
import { CartType } from "../../utils/type";
import { UseCartContext } from "../context/CartContext";
import { UseClientContext } from "../context/ClientContext";
import { useRouter } from "next/router";
import {
  useGetOrderItemsQuery,
  useRemoveOrderItemFromOrderMutation,
  GetOrderItemsQuery,
  GetOrderItemsDocument
} from "../../generated/graphql";

type OrderContentProps = {};

export const OrderContent: FC<OrderContentProps> = ({}) => {
  const { orderID, setOrderItems } = UseClientContext();
  const route = useRouter();

  const { data, loading, error } = useGetOrderItemsQuery({
    variables: {
      id: orderID
    }
  });

  const [removeOrderItem] = useRemoveOrderItemFromOrderMutation({
    update(cache, { data, errors }) {
      const orginalQuery = cache.readQuery<GetOrderItemsQuery>({
        query: GetOrderItemsDocument,
        variables: { id: orderID }
      });

      if (errors) {
        return;
      }

      if (
        !orginalQuery ||
        !orginalQuery.order ||
        !orginalQuery.order.orderItems ||
        !data ||
        !data.deleteOrderItem ||
        !data.deleteOrderItem.id
      ) {
        return;
      }

      const newQuery = {
        ...orginalQuery,
        order: {
          ...orginalQuery.order,
          orderItems: orginalQuery.order.orderItems.filter(
            orderItem => orderItem.id !== data.deleteOrderItem?.id
          )
        }
      };

      cache.writeQuery({
        query: GetOrderItemsDocument,
        variables: {
          id: orderID
        },
        data: newQuery
      });
    }
  });

  if (
    !data ||
    !data.order ||
    !data.order.orderItems ||
    !setOrderItems ||
    error
  ) {
    return <div>Error...</div>;
  }

  if (data.order.orderItems.length === 0) {
    route.push({
      pathname: "/Cart"
    });
  }

  const deleteOrderItem = async (orderItemID: string) => {
    await removeOrderItem({
      variables: {
        orderItemID
      },
      optimisticResponse: {
        __typename: "Mutation",
        deleteOrderItem: {
          __typename: "OrderItem",
          publishedAt: new Date().toISOString().split("T")[0],
          id: orderItemID
        }
      }
    });
  };

  return (
    <div className="flex flex-col h-screen flex-grow w-full  border-2 border-[#E1B989]">
      <ul className="bg-scroll">
        {data.order.orderItems.map((orderItem, index) => {
          return (
            <li
              key={`${orderItem.product!.name}_${index}`}
              className="flex justify-between p-4 border-b-2 border-[#E1B989]"
            >
              <div>{orderItem.product!.name}</div>
              <div className="flex w-[180px] justify-end   items-center">
                <p>
                  {orderItem.product!.price}$ {orderItem.quantity}
                </p>
                <div
                  onClick={() => deleteOrderItem(orderItem.id)}
                  className="flex justify-center items-center  w-[100px]  ease-in-out duration-300 hover:bg-neutral-800  hover:text-white  hover:border-none h-[38px] border-2 border-neutral-800  text-black rounded-lg cursor-pointer ml-4"
                >
                  DELETE
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
