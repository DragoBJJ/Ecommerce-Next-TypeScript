import { CartType } from "./type";

export const getItemFromLocalStorage = () => {
  const localData = localStorage.getItem("Zaiste");
  if (!localData) return [];
  try {
    const cartItems: CartType[] = JSON.parse(localData);
    console.log("JSON_PARSE", cartItems);
    return cartItems;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const SetItemInLocalStorage = (cartItems: CartType[]) => {
  localStorage.setItem("Zaiste", JSON.stringify(cartItems));
};
