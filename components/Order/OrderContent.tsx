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
import { AiOutlineDelete } from "react-icons/ai";
import { InfoPopup } from "../InfoPopup";
import {
  deleteOrderAndStripeFromLocalStorage,
  getClientOrderID
} from "../../utils/storage";
import { Spinner } from "../Spinner";
import { UseCartContext } from "../context/CartContext";

type OrderContentProps = {};

export const OrderContent: FC<OrderContentProps> = ({}) => {
  const { orderID, setOrderID } = UseClientContext();
  const { setCartItems } = UseCartContext();
  const route = useRouter();

  const {
    data: dataGetOrderItems,
    loading: loadingOrderItems,
    error: getOrderItemsError
  } = useGetOrderItemsQuery({
    variables: {
      id: orderID
    }
  });

  const [removeOrder] = useRemoveOrderByIdMutation();

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
  const deleteOrderItem = async (orderItemID: string) => {
    await removeOrderItem({
      variables: {
        orderItemID: orderItemID
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

  const removeOrderByID = async (orderID: string) => {
    const { data } = await removeOrder({
      variables: {
        orderID: orderID
      }
    });

    if (data?.deleteOrder?.id && setOrderID) {
      setOrderID(undefined);
      deleteOrderAndStripeFromLocalStorage();
      setCartItems([]);
      route.push({
        pathname: "/Cart"
      });
    }
  };

  if (loadingOrderItems) return <Spinner />;

  if (
    !dataGetOrderItems ||
    !dataGetOrderItems.order ||
    !dataGetOrderItems.order.orderItems ||
    getOrderItemsError
  ) {
    return <InfoPopup status="cancell" description="Error with your Order" />;
  }
  console.log("length", dataGetOrderItems!.order!.orderItems.length);
  if (!dataGetOrderItems!.order!.orderItems.length && orderID) {
    removeOrderByID(orderID);
  }

  return (
    <div className="flex flex-col h-auto  w-full mt-2  border-[1px] border-[#E1B989]">
      <ul className="bg-scroll">
        {dataGetOrderItems.order.orderItems.map((orderItem, index) => {
          return (
            <li
              key={`${orderItem.product!.name}_${index}`}
              className={`flex justify-between p-4 ${index !==
                dataGetOrderItems.order!.orderItems.length - 1 &&
                "border-b-[1px]"} border-[#E1B989]`}
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
                  onClick={() => deleteOrderItem(orderItem.id)}
                />
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
