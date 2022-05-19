import { CartContent } from "../components/CartBar/CartContent";
import { CartSummary } from "../components/CartBar/CartSummary";
import { UseCartContext } from "../components/context/CartContext";
import { Spinner } from "../components/Spinner";

import { useRouter } from "next/router";
import { UseClientContext } from "../components/context/ClientContext";
import {
  useCreateOrderMutation,
  usePublishOrdersMutation as UsePublishOrders
} from "../generated/graphql";
import { InfoPopup } from "../components/InfoPopup";
import { useSession } from "next-auth/react";

const CartPage = () => {
  const { orderID, setOrderID } = UseClientContext();
  const { cartItems } = UseCartContext();
  const { data: session } = useSession();
  const route = useRouter();

  const [
    createOrderMutation,
    { loading: createOrderLoading, error: createOrderError }
  ] = useCreateOrderMutation();
  // const [
  //   publishOrders,
  //   { loading: publishLoading, error: publishError }
  // ] = UsePublishOrders();

  if (createOrderError) {
    return (
      <InfoPopup status="cancell" description={createOrderError.message} />
    );
  }

  if (createOrderLoading) return <Spinner />;

  const createOrder = async () => {
    if (!setOrderID || !session?.user.id || !session?.user.email) return;
    if (orderID) {
      route.push("/checkout/address");
      return;
    }
    const { data: orderData } = await createOrderMutation({
      variables: {
        email: session.user.email,
        total: 1,
        stripeCheckoutId: (-Math.random()).toString(25),
        account: {
          connect: {
            id: session.user.id
          }
        },
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
    if (!orderData?.createOrder) return;
    setOrderID(orderData.createOrder?.id);
    route.push({
      pathname: "/checkout/address"
    });
  };

  return (
    <div className="flex justify-center items-center   h-screen w-screen">
      <div className="grid  place-items-stretch grid-cols-1  md:grid-cols-3 h-full w-full">
        <CartContent />
        <CartSummary pay={createOrder} itemsAmount={cartItems.length} />
      </div>
    </div>
  );
};

export default CartPage;
