import { loadStripe } from "@stripe/stripe-js";
import Stripe from "stripe";
import { CartContent } from "../components/CartBar/CartContent";
import { CartSummary } from "../components/CartBar/CartSummary";
import { UseCartContext } from "../components/context/CartContext";
import { CartType } from "../utils/type";

const CartPage = () => {
  const { cartItems, removeItemFromCart } = UseCartContext();

  if (!process.env.NEXT_PUBLIC_STRIPE_KEY) {
    return <div>You don't have publish Strip Key</div>;
  }
  const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY);

  const sendProductToStripe = (cartItems: CartType[]) => {
    return cartItems.map(({ id, count }) => {
      return {
        id,
        count
      };
    });
  };

  const pay = async () => {
    const stripe = await stripePromise;
    console.log("STRIPE", stripe);
    if (!stripe) throw Error("Something went wrong with your Stripe");

    const response = await fetch("/api/checkout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(sendProductToStripe(cartItems))
    });
    const {
      session
    }: {
      session: Stripe.Response<Stripe.Checkout.Session>;
    } = await response.json();

    stripe.redirectToCheckout({ sessionId: session.id });
  };
  return (
    <div className="flex justify-center  items-center  h-screen w-screen">
      <div className="grid grid-cols-3 h-full w-full gap-8">
        <CartContent removeItem={removeItemFromCart} cartItems={cartItems} />
        <CartSummary pay={pay} itemsAmount={cartItems.length} />
      </div>
    </div>
  );
};

export default CartPage;
