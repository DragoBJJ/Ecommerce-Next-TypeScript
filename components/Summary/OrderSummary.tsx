import { useGetOrderAndShippingAddressQuery } from "../../generated/graphql";
import { UseClientContext } from "../context/ClientContext";
import { InfoPopup } from "../InfoPopup";
import { Spinner } from "../Spinner";
import { SummaryContent } from "./SummaryContent";

export const OrderSummary = () => {
  const { orderID } = UseClientContext();

  const { data, loading, error } = useGetOrderAndShippingAddressQuery({
    variables: {
      orderID
    }
  });

  if (loading || !orderID) {
    return <Spinner isSmaller />;
  }
  if (error || !data) {
    return (
      <InfoPopup
        status="cancell"
        description="you have error with your OrderSummary"
      />
    );
  }

  return <SummaryContent data={data} />;
};
