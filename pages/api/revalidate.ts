import { NextApiHandler } from "next";

type RevalidateType = {
  revalidated: boolean;
};

const handler: NextApiHandler<RevalidateType> = async (req, res) => {
  try {
    await res.unstable_revalidate(`/products/details/${req.body}`);
    return res.json({ revalidated: true });
  } catch (err) {
    return res.status(500).json({ revalidated: false });
  }
};

export default handler;
