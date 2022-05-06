import React, { FC } from "react";
import { UseClientContext } from "../context/ClientContext";
import { useRouter } from "next/router";
import {
  useGetOrderItemsQuery,
  useRemoveOrderItemFromOrderMutation,
  GetOrderItemsQuery,
  GetOrderItemsDocument,
  useRemoveOrderByIdMutation
} from "../../generated/graphql";

type OrderContentProps = {};

export const OrderContent: FC<OrderContentProps> = ({}) => {
  const { orderID, setOrderID, setClientID } = UseClientContext();
  const route = useRouter();

  const { data } = useGetOrderItemsQuery({
    variables: {
      id: orderID
    }
  });
  const [
    removeOrder,
    { data: dataRemovedOrder, error }
  ] = useRemoveOrderByIdMutation();

  const [
    removeOrderItem,
    { data: removedOrderData }
  ] = useRemoveOrderItemFromOrderMutation({
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

  const removeOrderByID = async (orderID: string) => {
    const removeOrderData = await removeOrder({
      variables: {
        orderID: orderID
      }
    });

    if (removeOrderData && setOrderID) {
      setOrderID(undefined);
    }
  };

  if (!data || !data.order || !data.order.orderItems || error) {
    return <div>Error...</div>;
  }
  if (data!.order!.orderItems.length === 0 && orderID) {
    removeOrderByID(orderID);
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
    </div>
  );
};
