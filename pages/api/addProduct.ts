import { GraphQLClient } from "graphql-request";
import { NextApiRequest, NextApiResponse } from "next";

import { randomProducts } from "../../utils/randomProducts";

const addProduct = async ({ body }: NextApiRequest, res: NextApiResponse) => {
  const graphCMS = new GraphQLClient(process.env.NEXT_PUBLIC_ENDPOINT!, {
    headers: {
      authorization: `Bearer ${process.env.NEXT_MUTATION_TOKEN}`
    }
  });

  const finish = await Promise.all(
    randomProducts.map(async item => {
      const { name, slug, description, price } = {
        name: item.title,
        slug: item.title,
        description: item.description,
        price: Math.round(item.price)
      };
      const { createProduct } = await graphCMS.request(
        `mutation{
  createProduct(data: {name:"${name}", slug:"${slug}", description:"${description}", price: ${price}}) {
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
      console.log("createProduct", createProduct);
      return createProduct;
    })
  );

  const publishedProduct = await graphCMS.request(
    `mutation PublishManyProducts {
  publishManyProductsConnection {
    pageInfo {
      pageSize
    }
  }
}`
  );
  res.status(201).json({
    result: finish
  });
};

export default addProduct;
