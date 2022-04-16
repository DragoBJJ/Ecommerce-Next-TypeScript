import { GraphQLClient } from "graphql-request";
import { NextApiRequest, NextApiResponse } from "next";

export default async ({ body }: NextApiRequest, res: NextApiResponse) => {
  const graphCMS = new GraphQLClient(process.env.NEXT_ENDPOINT!, {
    headers: {
      authorization: `Bearer ${process.env.NEXT_MUTATION_TOKEN}`
    }
  });

  const { createProduct } = await graphCMS.request(
    `mutation{
  createProduct(data: { name: "Matylda", slug: "face-mask",description: "the best random product in Europe", price: 650 }) {
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
