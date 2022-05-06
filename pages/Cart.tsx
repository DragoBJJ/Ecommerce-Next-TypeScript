import { CartContent } from "../components/CartBar/CartContent";
import { CartSummary } from "../components/CartBar/CartSummary";
import { UseCartContext } from "../components/context/CartContext";
import Image from "next/image";
import { Spinner } from "../components/Spinner";

import { useRouter } from "next/router";
import { UseClientContext } from "../components/context/ClientContext";
import {
  useCreateOrderMutation,
  usePublishOrdersMutation as UsePublishOrders
} from "../generated/graphql";
import { InfoPopup } from "../components/InfoPopup";

const CartPage = () => {
  const { orderID, setOrderID } = UseClientContext();

  const route = useRouter();
  const { cartItems, setCartItems } = UseCartContext();
  const [sendOrder, { loading, error }] = useCreateOrderMutation();
  const [
    publishOrders,
    { loading: publishLoading, error: publishError }
  ] = UsePublishOrders();

  if (error) return <InfoPopup status="cancell" />;
  if (publishError) return <InfoPopup status="cancell" />;

  if ((loading || publishLoading) && cartItems) return <Spinner />;

  const createOrder = async () => {
    if (!setOrderID) return;
    if (orderID || !cartItems.length) return;
    const { data } = await sendOrder({
      variables: {
        email: "j.pawelski.it@gmail.com",
        total: 1,
        stripeCheckoutId: (-Math.random()).toString(25),
        orderItems: {
          create: cartItems.map(product => {
            return {
              quantity: product.count,
              total: product.count,
              product: {
                connect: {
                  id: product.id
                }
              }
            };
          })
        }
      }
    });
    if (!data?.createOrder) return;
    await publishOrders();
    route.push({
      pathname: "/checkout/address"
    });
    setOrderID(data.createOrder?.id);
    setCartItems([]);
  };

  return (
    <div className="flex justify-center items-center  h-full min-h-screen w-screen">
      <div className="grid  grid-cols-1  md:grid-cols-3 h-full w-full">
        <CartContent />
        <CartSummary pay={createOrder} itemsAmount={cartItems.length} />
      </div>
    </div>
  );
};

export default CartPage;
