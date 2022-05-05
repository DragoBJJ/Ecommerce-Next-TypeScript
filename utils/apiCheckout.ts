import Stripe from "stripe";
import {
  CreateOrderDocument,
  GetOrder,
  CreateOrderMutationVariables,
  UpdateOrderDocument,
  UpdateOrderMutation,
  UpdateOrderMutationVariables,
  GetOrderItemsQuery,
  GetOrderItemsQueryVariables,
  GetOrderItemsDocument
} from "../generated/graphql";
import { apolloClient } from "../graphql/apolloClient";
import { CartType, OrderItemsType, ProductCalculate } from "./type";

const SUCCESS_STRIPE_URL =
  "http://localhost:3000/checkout/success?session_id={CHECKOUT_SESSION_ID}";

const CANCEL_URL = "http://localhost:3000/checkout/cancel";

export const getOrderItems = async (orderID: string) => {
  const { data } = await apolloClient.query<
    GetOrderItemsQuery,
    GetOrderItemsQueryVariables
  >({
    query: GetOrderItemsDocument,
    variables: {
      id: orderID
    }
  });
  return data;
};

export const updateOrderStripeIDMutation = async (
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

export const sendProductToStripe = (cartItems: CartType[]) => {
  return cartItems.map(({ id, count }) => {
    return {
      id,
      count
    };
  });
};

export const createStripePayment = async (orderID: string) => {
  return await fetch("/api/create-payment-intent", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(orderID)
  })
    .then(res => {
      return res.json();
    })
    .then((data: { clientSecret: string }) => {
      return {
        clientSecret: data.clientSecret
      };
    });
};

export const getProductsPrice = (orderItems: any) => {
  const productsPrice = orderItems.map(({ quantity, product }) => {
    if (product) {
      return {
        price: quantity * product.price
      };
    }
    return {
      price: 0
    };
  });
  return productsPrice;
};

export const calculateOrderAmount = (productsPrice: ProductCalculate) => {
  return productsPrice.reduce((prev, current) => {
    return prev + current.price;
  }, 0);
};
