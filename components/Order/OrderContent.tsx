import React, { FC } from "react";
import Image from "next/image";
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
import { deleteOrderAndStripeFromLocalStorage } from "../../utils/storage";
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

  const [
    removeOrder,
    { loading: removeOrderLoading, error: removeOrderError }
  ] = useRemoveOrderByIdMutation();

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
    const orderItemData = await removeOrderItem({
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

  if (loadingOrderItems || removeOrderLoading) return <Spinner isSmaller />;

  if (
    !dataGetOrderItems ||
    !dataGetOrderItems.order ||
    !dataGetOrderItems.order.orderItems ||
    getOrderItemsError
  ) {
    return <InfoPopup status="cancell" description="Error with your Order" />;
  }

  if (removeOrderError) {
    return (
      <InfoPopup
        status="cancell"
        description="Problem with deleting your order"
      />
    );
  }
  if (!dataGetOrderItems!.order!.orderItems.length && orderID) {
    removeOrderByID(orderID);
    return <Spinner isSmaller />;
  }
  return (
    <div className="flex flex-col h-auto  w-full mt-2 border-[1px] border-[#E1B989]">
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
              <div className="relative  w-1/3 h-[60px] mb-2">
                {orderItem.product?.images[0].url && (
                  <Image
                    src={orderItem.product?.images[0].url}
                    layout="fill"
                    alt="orderImage"
                    objectFit="contain"
                  />
                )}
              </div>
              <div className="flex w-[180px] justify-end   items-center">
                <p className="mx-4"> {orderItem.product!.price}$</p>
                <p className="mx-4">Qty: {orderItem.quantity}</p>
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
