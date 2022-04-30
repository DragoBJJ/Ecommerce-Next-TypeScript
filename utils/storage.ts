import { CartType } from "./type";

export const getItemFromLocalStorage = () => {
  const localData = localStorage.getItem("Zaiste");
  if (!localData) return [];
  try {
    const cartItems: CartType[] = JSON.parse(localData);
    return cartItems;
  } catch (error) {
    console.log("Error", error);
    return [];
  }
};

export const SetItemInLocalStorage = (cartItems: CartType[]) => {
  localStorage.setItem("Zaiste", JSON.stringify(cartItems));
};
