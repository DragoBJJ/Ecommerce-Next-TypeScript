import { NextApiHandler } from "next";
import { Stripe } from "stripe";

// import {
//   createOrderMutation,
//   updateOrderMutation,
//   stripeSessionCreate
// } from "../../utils/apiCheckout";

// const SECRET_KEY = process.env.STRIPE_SECRET_KEY;

// const checkoutChandler: NextApiHandler = async (req, res) => {
//   if (!SECRET_KEY) {
//     return res.status(500).json({ Error: "Missing Stripe Secret Key" });
//   }
//   const orderData = await createOrderMutation(req.body);

//   if (
//     !orderData ||
//     !orderData.createOrder ||
//     !orderData.createOrder.orderItems
//   ) {
//     return res
//       .status(500)
//       .json({ Error: "Something went wrong with your Order" });
//   }

//   const { orderItems } = orderData.createOrder;

//   const stripe = new Stripe(SECRET_KEY, { apiVersion: "2020-08-27" });
//   const stripeSession = await stripeSessionCreate(stripe, orderItems);

//   if (!stripeSession.id) {
//     res
//       .status(500)
//       .json({ Error: "Something went wrong with your StripeSession" });
//   }

//   const data = await updateOrderMutation(
//     orderData.createOrder.id,
//     stripeSession.id
//   );

//   if (!data?.updateOrder?.id) {
//     res
//       .status(500)
//       .json({ Error: "Something went wrong with your order update" });
//   }
//   return res.status(200).json({ session: stripeSession });
// };

// export default checkoutChandler;
