import { GraphQLClient } from "graphql-request";
import { NextApiRequest, NextApiResponse } from "next";

export default async ({ body }: NextApiRequest, res: NextApiResponse) => {
  const graphCMS = new GraphQLClient(process.env.API!, {
    headers: {
      authorization: `Bearer ${process.env.TOKEN}`
    }
  });

  const { createProduct } = await graphCMS.request(
    `mutation{
  createProduct(data: { name: "Jakub", slug: "face-mask",description: "the best random product in World", price: 650 }) {
    id
    name
    slug
  description
    price
  } 
}
`
  );
  if (!createProduct) res.status(404).json({ Error: "Error" });

  // const publishedProduct = await graphCMS.request(
  //   `mutation {
  //   publishProduct( where: {name: ${createProduct.name}}, to: PUBLISHED) {
  //     id
  //   }
  // }`
  // );
  res.status(201).json({
    result: createProduct
  });
};
