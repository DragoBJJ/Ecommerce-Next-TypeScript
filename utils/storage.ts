import { Client } from "../components/context/ClientContext";
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

export const setClientStripeID = (stripeID: Client["clientID"]) => {
  localStorage.setItem("StripeID", JSON.stringify(stripeID));
};

export const setClientOrderID = (orderID: Client["orderID"]) => {
  localStorage.setItem("OrderID", JSON.stringify(orderID));
};

export const getClientStripeID = () => {
  const localStripeID = localStorage.getItem("StripeID");
  if (!localStripeID) return undefined;
  try {
    const clientStripeID: Client["clientID"] = JSON.parse(localStripeID);
    if (!clientStripeID) return;
    return clientStripeID;
  } catch (error) {
    console.log("Error", error);
    return undefined;
  }
};

export const getClientOrderID = () => {
  const localOrderID = localStorage.getItem("OrderID");
  if (!localOrderID) return undefined;
  try {
    const clientOrderID: Client["orderID"] = JSON.parse(localOrderID);
    return clientOrderID;
  } catch (error) {
    console.log("Error", error);
    return undefined;
  }
};

export const deleteOrderAndStripeFromLocalStorage = () => {
  localStorage.removeItem("OrderID");
  localStorage.removeItem("StripeID");
};
