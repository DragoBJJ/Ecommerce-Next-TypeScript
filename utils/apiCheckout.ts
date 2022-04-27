import Stripe from "stripe";
import {
  CreateOrderDocument,
  CreateOrderMutation,
  CreateOrderMutationVariables,
  UpdateOrderDocument,
  UpdateOrderMutation,
  UpdateOrderMutationVariables
} from "../generated/graphql";
import { apolloClient } from "../graphql/apolloClient";
import { CheckoutReqest, OrderItemsType } from "./type";

const SUCCESS_STRIPE_URL =
  "http://localhost:3000/checkout/success?session_id={CHECKOUT_SESSION_ID}";

const CANCEL_URL = "http://localhost:3000/checkout/cancel";

export const createOrderMutation = async (orders: CheckoutReqest) => {
  const { data } = await apolloClient.mutate<
    CreateOrderMutation,
    CreateOrderMutationVariables
  >({
    mutation: CreateOrderDocument,
    variables: {
      email: "j.pawelski.it@gmail.com",
      total: 1,
      stripeCheckoutId: (-Math.random()).toString(25),
      orderItems: {
        create: orders.map(product => {
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
  return data;
};

export const updateOrderMutation = async (
  orderID: string,
  stripeSessionID: Stripe.Checkout.Session["id"]
) => {
  const { data } = await apolloClient.mutate<
    UpdateOrderMutation,
    UpdateOrderMutationVariables
  >({
    mutation: UpdateOrderDocument,
    variables: {
      orderID,
      stripID: stripeSessionID
    }
  });
  return data;
};

export const stripeSessionCreate = async (
  stripe: Stripe,
  orderItems: OrderItemsType
) => {
  const stripeSession = await stripe.checkout.sessions.create({
    mode: "payment",
    locale: "pl",
    payment_method_types: ["p24", "card"],
    success_url: SUCCESS_STRIPE_URL,
    cancel_url: CANCEL_URL,
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
  return stripeSession;
};