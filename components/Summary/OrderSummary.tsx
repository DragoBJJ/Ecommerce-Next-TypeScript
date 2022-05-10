import { useGetOrderAndShippingAddressQuery } from "../../generated/graphql";
import { UseClientContext } from "../context/ClientContext";
import { Spinner } from "../Spinner";
import { SummaryContent } from "./SummaryContent";

export const OrderSummary = () => {
  const { orderID } = UseClientContext();

  const { data, loading, error } = useGetOrderAndShippingAddressQuery({
    variables: {
      orderID: orderID
    }
  });

  if (loading) return <Spinner />;
  if (error) return <div>you have some error with your OrderSummary</div>;

  return <SummaryContent data={data} />;
};
