import { GraphQLClient } from "graphql-request";
import { NextApiRequest, NextApiResponse } from "next";
import { GRAPHQL_API, TOKEN_KEY } from "./data";

export default async ({ body }: NextApiRequest, res: NextApiResponse) => {
  const graphCMS = new GraphQLClient(GRAPHQL_API, {
    headers: {
      authorization: `Bearer ${TOKEN_KEY}`
    }
  });

  const { createProduct } = await graphCMS.request(
    `mutation{
  createProduct(data: { name: "Aleksander", slug: "face-mask",description: "the best random product in World", price: 450 }) {
    id
    name
    slug
  description
    price
  } 
}
  `,
    {
      name: "Aleksander",
      slug: "face-mask",
      description: "the best random product in World",
      price: "450"
    }
  );
  if (!createProduct) res.status(404).json({ Error: "Error" });

  const publishedProduct = await graphCMS.request(
    `mutation {
    publishProduct( where: {name: ${createProduct.name}}, to: PUBLISHED) {
      id
    }
  }`
  );
  res.status(201).json({
    result: createProduct
  });
};
