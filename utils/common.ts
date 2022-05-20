import { GetAccountDataQuery } from "../generated/graphql";
import { ShippingAddressType } from "./type";

export const getShippingAddress = (
  AccountData: GetAccountDataQuery["account"]
): ShippingAddressType[] | null => {
  if (!AccountData) return null;
  return AccountData?.orders.map(order => {
    return {
      ...order.shippingAddress
    };
  });
};

export const getClearFormatData = (isoFormat: number) => {
  const date = new Date(isoFormat);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  let newMonth = month.toString();
  let day = date.getDate().toString();

  let time = new Date(isoFormat).toLocaleTimeString("en", {
    timeStyle: "short",
    hour12: false,
    timeZone: "UTC"
  });

  const newTime = `${Number(time.split(":")[0]) + 2}:${time.split(":")[1]}`;

  if (Number(day) < 10) {
    day = "0" + day;
  }
  if (Number(newMonth) < 10) {
    newMonth = "0" + newMonth;
  }
  return `${year}-${newMonth}-${day}: ${newTime}`;
};
