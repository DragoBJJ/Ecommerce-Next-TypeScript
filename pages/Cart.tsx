import { loadStripe } from "@stripe/stripe-js";
import { redirect } from "next/dist/server/api-utils";
import Stripe from "stripe";
import { CartContent } from "../components/CartBar/CartContent";
import { CartSummary } from "../components/CartBar/CartSummary";
import { UseCartContext } from "../components/context/CartContext";
import { sendOrder } from "../utils/apiCheckout";
import { useRouter } from "next/router";
import { UseClientContext } from "../components/context/ClientContext";
import {
  usePublishOrdersMutation as UsePublishOrders,
  useGetOrderItemsQuery
} from "../generated/graphql";

const CartPage = () => {
  const { clientID, orderID, setClientID, setOrderID } = UseClientContext();

  const route = useRouter();
  const { cartItems, setCartItems } = UseCartContext();
  const [publishOrders] = UsePublishOrders();
  // if (!process.env.NEXT_PUBLIC_STRIPE_KEY) {
  //   return <div>You don't have publish Strip Key</div>;
  // }

  // const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY);

  const createOrder = async () => {
    if (!setClientID || !setOrderID) return;
    if (!clientID && !orderID) {
      await sendOrder(cartItems, setClientID, setOrderID);
      await publishOrders();
    }
    setCartItems([]);
    route.push({
      pathname: "/checkout"
    });

    // await publishOrders();
    // const stripe = await stripePromise;
    // if (!stripe) throw Error("Something went wrong with your Stripe");
    // const response = await fetch("/api/checkout", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json"
    //   },
    //   body: JSON.stringify(sendProductToStripe(cartItems))
    // });
    // const {
    //   session
    // }: {
    //   session: Stripe.Response<Stripe.Checkout.Session>;
    // } = await response.json();
    // console.log("SESSION", session);
    // stripe.redirectToCheckout({
    //   sessionId: session.id
    // });
  };

  return (
    <div className="flex justify-center  items-center  h-screen w-screen">
      <div className="grid grid-cols-3 h-full w-full gap-8">
        <CartContent />
        <CartSummary
          pay={createOrder}
          clientID={clientID}
          itemsAmount={cartItems.length}
        />
      </div>
    </div>
  );
};

export default CartPage;
