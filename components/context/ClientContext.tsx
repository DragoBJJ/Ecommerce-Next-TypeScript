import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState
} from "react";

type Client = {
  clientID: string | undefined;
  orderID: string | undefined;
  setClientID: Dispatch<SetStateAction<string | undefined>> | undefined;
  setOrderID: Dispatch<SetStateAction<string | undefined>> | undefined;
  setOrderItems: Dispatch<SetStateAction<[] | undefined>> | undefined;
  orderItems: [] | undefined;
};

export const ClientContext = createContext<Client>({
  clientID: undefined,
  orderID: undefined,
  orderItems: [],
  setClientID: undefined,
  setOrderID: undefined,
  setOrderItems: undefined
});

export const ClientContextProvider = ({
  children
}: {
  children: JSX.Element;
}) => {
  const [clientID, setClientID] = useState<Client["clientID"]>(undefined);
  const [orderID, setOrderID] = useState<Client["orderID"]>(undefined);
  const [orderItems, setOrderItems] = useState<Client["orderItems"]>([]);

  return (
    <ClientContext.Provider
      value={{
        clientID,
        orderID,
        setClientID,
        setOrderID,
        orderItems,
        setOrderItems
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
