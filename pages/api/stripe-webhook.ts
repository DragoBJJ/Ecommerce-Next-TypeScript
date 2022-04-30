import { NextApiHandler } from "next";
import { StripeWebhookEvents } from "../../utils/stripeType";

const StripeWebHook: NextApiHandler = (req, res) => {
  const event = req.body as StripeWebhookEvents;
  res.status(204).end();
};

export default StripeWebHook;
