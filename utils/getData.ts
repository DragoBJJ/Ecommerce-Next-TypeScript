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

const currentPageData = (
  product: GetProductListQuery["products"],
  pageId: number,
  PageSize: number
) => {
  const firstPageIndex = (pageId - 1) * PageSize;
  const lastPageIndex = firstPageIndex + PageSize;
  return product.slice(firstPageIndex, lastPageIndex);
};

export const getProducts = async () => {
  const { data } = await apolloClient.query<GetProductListQuery>({
    query: GetProductListDocument
  });

  const { products } = data;
  return {
    products
  };
};

export const getCurrentProduct = async (productId: string) => {
  const { data } = await apolloClient.query<GetProductDetailsQuery>({
    variables: {
      id: productId
    },
    query: GetProductDetailsDocument
  });
  const { product } = data;
  return product;
};

export const getPaths = async () => {
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
  const data = await getProducts();
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
