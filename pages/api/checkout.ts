import { NextApiHandler } from "next";
import { Stripe } from "stripe";
import {
  CreateOrderMutation,
  CreateOrderMutationVariables,
  CreateOrderDocument,
  UpdateOrderMutation,
  UpdateOrderMutationVariables,
  UpdateOrderDocument
} from "../../generated/graphql";
import { apolloClient } from "../../graphql/apolloClient";
import { CartType } from "../../utils/type";

const SECRET_KEY = process.env.STRIPE_SECRET_KEY;
const PUBLIC_KEY = process.env.NEXT_PUBLIC_STRIPE_KEY;

type ReqBody = {
  id: CartType["id"];
  count: CartType["count"];
}[];

const checkoutChandler: NextApiHandler = async (req, res) => {
  console.log("req.body", req.body);

  if (!SECRET_KEY) {
    return res.status(500).json({ Error: "Missing Stripe Secret Key" });
  }

  const bodyReq: ReqBody = req.body;

  const orderData = await apolloClient.mutate<
    CreateOrderMutation,
    CreateOrderMutationVariables
  >({
    mutation: CreateOrderDocument,
    variables: {
      email: "j.pawelski.it@gmail.com",
      total: 1,
      stripeCheckoutId: (-Math.random()).toString(25),
      orderItems: {
        create: bodyReq.map(product => {
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

  if (
    !orderData.data ||
    !orderData.data.createOrder ||
    !orderData.data.createOrder.orderItems
  ) {
    return res
      .status(500)
      .json({ Error: "Something went wrong with your Order" });
  }

  const { orderItems } = orderData.data.createOrder;

  const stripe = new Stripe(SECRET_KEY, { apiVersion: "2020-08-27" });
  const stripeSession = await stripe.checkout.sessions.create({
    mode: "payment",
    locale: "pl",
    payment_method_types: ["p24", "card"],
    success_url:
      "http://localhost:3000/checkout/success?session_id={CHECKOUT_SESSION_ID}",
    cancel_url: "http://localhost:3000/checkout/cancel",
    line_items: orderItems.map(orderItem => {
      return {
        price_data: {
          currency: "PLN",
          unit_amount: orderItem.product!.price * 100,
          product_data: {
            name: orderItem.product!.name,
            metadata: {
              id: orderItem.product!.id
            }
          }
        },
        quantity: orderItem.quantity
      };
    })
  });

  if (!stripeSession.id) {
    res
      .status(500)
      .json({ Error: "Something went wrong with your StripeSession" });
  }

  const updatedOrder = await apolloClient.mutate<
    UpdateOrderMutation,
    UpdateOrderMutationVariables
  >({
    mutation: UpdateOrderDocument,
    variables: {
      orderID: orderData.data.createOrder.id,
      stripID: stripeSession.id
    }
  });

  return res.status(200).json({ session: stripeSession });
};

export default checkoutChandler;
