import { NextApiHandler } from "next";
import { Stripe } from "stripe";
import { calculateOrderAmount, getOrderItems } from "../../utils/apiCheckout";
import { CartType, OrderItemsType } from "../../utils/type";
const SECRET_KEY = process.env.STRIPE_SECRET_KEY;

const createPaymentIntent: NextApiHandler = async (req, res) => {
  if (!SECRET_KEY) {
    return res.status(500).json({ Error: "Missing Stripe Secret Key" });
  }

  console.log("req.body", req.body);

  const orderData = await getOrderItems(req.body);

  if (!orderData || !orderData.order || !orderData.order.orderItems) {
    return res
      .status(500)
      .json({ Error: "Something went wrong with your Order" });
  }

  const { orderItems } = orderData.order;
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

  const stripe = new Stripe(SECRET_KEY, { apiVersion: "2020-08-27" });
  const paymentIntent = await stripe.paymentIntents.create({
    amount: calculateOrderAmount(productsPrice),
    currency: "usd"
  });

  res.send({
    clientSecret: paymentIntent.client_secret
  });
};

export default createPaymentIntent;
