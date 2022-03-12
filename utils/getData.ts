import { StoreApiResponse } from "../pages/products";

const API_URL = `https://naszsklep-api.vercel.app/api/products`;

export const getProducts = async (pageId: string) => {
  if (!pageId) return null;

  const nextPage = Number(pageId) * 25 - 25;

  try {
    const response = await fetch(`${API_URL}?take=25&offset=${nextPage}`);
    const products: StoreApiResponse[] = await response.json();
    return products;
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
