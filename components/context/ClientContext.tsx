import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState
} from "react";
import {
  getClientOrderID,
  getClientStripeID,
  setClientOrderID,
  setClientStripeIDInLocal
} from "../../utils/storage";

export type Client = {
  clientStripeID: string | undefined;
  orderID: string | undefined;
  setClientStripeID: Dispatch<SetStateAction<string | undefined>> | undefined;
  setOrderID: Dispatch<SetStateAction<string | undefined>> | undefined;
};

export const ClientContext = createContext<Client>({
  clientStripeID: "",
  orderID: "",
  setClientStripeID: undefined,
  setOrderID: undefined
});

export const ClientContextProvider = ({
  children
}: {
  children: JSX.Element;
}) => {
  const [clientStripeID, setClientStripeID] = useState<
    Client["clientStripeID"]
  >(undefined);
  const [orderID, setOrderID] = useState<Client["orderID"]>(undefined);

  useEffect(() => {
    if (orderID) setClientOrderID(orderID);
    if (clientStripeID) setClientStripeIDInLocal(clientStripeID);
  }, [orderID, clientStripeID]);

  useEffect(() => {
    setClientStripeID(getClientStripeID());
    setOrderID(getClientOrderID());
  }, [orderID, clientStripeID]);

  return (
    <ClientContext.Provider
      value={{
        clientStripeID,
        orderID,
        setClientStripeID,
        setOrderID
      }}
    >
      {children}
    </ClientContext.Provider>
  );
};

export const UseClientContext = () => {
  const context = useContext(ClientContext);
  if (!context) throw Error("you forgot ClientContext.Provider");
  return context;
};
