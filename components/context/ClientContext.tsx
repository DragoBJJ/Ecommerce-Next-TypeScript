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
  setClientStripeID
} from "../../utils/storage";

export type Client = {
  clientID: string | undefined;
  orderID: string | undefined;
  setClientID: Dispatch<SetStateAction<string | undefined>>;
  setOrderID: Dispatch<SetStateAction<string | undefined>> | undefined;
};

export const ClientContext = createContext<Client>({
  clientID: "",
  orderID: "",
  setClientID: undefined,
  setOrderID: undefined
});

export const ClientContextProvider = ({
  children
}: {
  children: JSX.Element;
}) => {
  const [clientID, setClientID] = useState<Client["clientID"]>(undefined);
  const [orderID, setOrderID] = useState<Client["orderID"]>(undefined);

  useEffect(() => {
    setClientID(getClientStripeID());
    setOrderID(getClientOrderID());
  }, [orderID, setOrderID]);

  useEffect(() => {
    if (orderID) setClientOrderID(orderID);
    if (clientID) setClientStripeID(clientID);
  }, [clientID, orderID]);

  // console.log("clientID", clientID);
  console.log("orderID_Context", orderID);
  return (
    <ClientContext.Provider
      value={{
        clientID,
        orderID,
        setClientID,
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
