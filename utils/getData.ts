import { usePagination } from "../components/usePagination";
import { apolloClient } from "../graphql/apolloClient";
import {
  GetProductDetailsDocument,
  GetProductDetailsQuery,
  GetProductListDocument,
  GetProductListQuery,
  GetProductsPathDocument,
  GetProductsPathQuery
} from "../generated/graphql";

const API_URL = `https://naszsklep-api.vercel.app/api/products`;

const currentPageData = (
  product: GetProductListQuery["products"],
  pageId: number,
  PageSize: number
) => {
  const firstPageIndex = (pageId - 1) * PageSize;
  const lastPageIndex = firstPageIndex + PageSize;
  return product.slice(firstPageIndex, lastPageIndex);
};

export const getProducts = async (pageId: string) => {
  if (!pageId) return null;

  // try {
  //   const response = await fetch(`${API_URL}?take=350&offset=0`);
  //   const products: StoreApiResponse[] = await response.json();
  //   return {
  //     products
  //   };
  // } catch (error) {
  //   console.log("Error", error);
  //   return {
  //     products: []
  //   };
  // }
  const { data } = await apolloClient.query<GetProductListQuery>({
    query: GetProductListDocument
  });
  const { products } = data;
  return {
    products
  };
};

export const getCurrentProduct = async (productId: string) => {
  // try {
  //   const response = await fetch(
  //     `https://naszsklep-api.vercel.app/api/products/${productId}`
  //   );
  //   const product: StoreApiResponse = await response.json();
  //   return product;
  // } catch (error) {
  //   console.log("Error", error);
  //   return null;
  // }
  const { data } = await apolloClient.query<GetProductDetailsQuery>({
    variables: {
      productID: productId
    },
    query: GetProductDetailsDocument
  });
  const { product } = data;
  return product;
};

export const getPaths = async () => {
  // try {
  //   const response = await fetch(`${API_URL}/`);
  //   const products: StoreApiResponse[] = await response.json();
  //   const paths = products
  //     .map(item => {
  //       return { params: { pageId: item.id.toString() } };
  //     })
  //     .slice(0, 10);
  //   return paths;
  // } catch (error) {
  //   console.log("Error", error);
  //   return null;
  // }

  const { data } = await apolloClient.query<GetProductsPathQuery>({
    query: GetProductsPathDocument
  });
  return data.products
    .map(item => {
      return { params: { pageId: item.id } };
    })
    .slice(0, 10);
};

export const getPaginationData = async (pageId: string) => {
  const data = await getProducts(pageId);
  if (!data)
    return {
      pageProducts: []
    };

  const pageSize = 25;
  const currentPage = Number(pageId);
  const totalCount = data.products.length;

  const pageProducts = currentPageData(data.products, currentPage, pageSize);

  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount: 1,
    pageSize
  });

  if (!paginationRange) {
    return {
      paginationRange: []
    };
  }

  return {
    pageProducts,
    paginationRange,
    currentPage
  };
};
