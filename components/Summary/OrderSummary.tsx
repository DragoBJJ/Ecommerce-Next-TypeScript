import { useGetOrderAndShippingAddressQuery } from "../../generated/graphql";
import { UseClientContext } from "../context/ClientContext";
import { SummaryContent } from "./SummaryContent";

export const OrderSummary = () => {
  const { orderID } = UseClientContext();

  const { data, error } = useGetOrderAndShippingAddressQuery({
    variables: {
      orderID: orderID
    }
  });

  if (error) return <div>you have some error with your OrderSummary</div>;

  return <SummaryContent data={data} />;
};
