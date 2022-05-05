import { CartContent } from "../components/CartBar/CartContent";
import { CartSummary } from "../components/CartBar/CartSummary";
import { UseCartContext } from "../components/context/CartContext";

import { useRouter } from "next/router";
import { UseClientContext } from "../components/context/ClientContext";
import {
  useCreateOrderMutation,
  usePublishOrdersMutation as UsePublishOrders
} from "../generated/graphql";

const CartPage = () => {
  const { orderID, setOrderID } = UseClientContext();

  const route = useRouter();
  const { cartItems, setCartItems } = UseCartContext();
  const [sendOrder, { data, loading, error }] = useCreateOrderMutation();
  const [publishOrders] = UsePublishOrders();

  const createOrder = async () => {
    if (!setOrderID) return;
    if (!orderID && cartItems.length) {
      // const { clientSecret, orderID } = await sendOrder(cartItems);
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

      // setClientID(clientSecret);
      setOrderID(data.createOrder?.id);
      setCartItems([]);
      await publishOrders();
    }

    route.push({
      pathname: "/checkout/address"
    });
  };

  return (
    <div className="flex justify-center  items-center  h-screen w-screen">
      <div className="grid grid-cols-3 h-full w-full gap-8">
        <CartContent />
        <CartSummary pay={createOrder} itemsAmount={cartItems.length} />
      </div>
    </div>
  );
};

export default CartPage;
