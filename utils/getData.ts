import { StoreApiResponse } from "../utils/type";

const API_URL = `https://naszsklep-api.vercel.app/api/products`;

const currentTableData = (
  products: StoreApiResponse[],
  pageId: number,
  PageSize: number
) => {
  const firstPageIndex = (pageId - 1) * PageSize;
  const lastPageIndex = firstPageIndex + PageSize;
  return products.slice(firstPageIndex, lastPageIndex);
};

export const getProducts = async (pageId: string) => {
  if (!pageId) return null;

  const pageSize = 25;

  try {
    const response = await fetch(`${API_URL}?take=250&offset=0`);
    const products: StoreApiResponse[] = await response.json();

    const pageProducts = currentTableData(products, Number(pageId), pageSize);

    return {
      pageProducts,
      currentPage: Number(pageId),
      totalCount: products.length,
      pageSize
    };
  } catch (error) {
    console.log("Error", error);
    return null;
  }
};

export const getCurrentProduct = async (productId: string) => {
  try {
    const response = await fetch(
      `https://naszsklep-api.vercel.app/api/products/${productId}`
    );
    const product: StoreApiResponse = await response.json();
    return product;
  } catch (error) {
    console.log("Error", error);
    return null;
  }
};

export const getPaths = async () => {
  try {
    const response = await fetch(`${API_URL}/`);
    const products: StoreApiResponse[] = await response.json();
    const paths = products
      .map(item => {
        return { params: { pageId: item.id.toString() } };
      })
      .slice(0, 10);
    return paths;
  } catch (error) {
    console.log("Error", error);
    return null;
  }
};
