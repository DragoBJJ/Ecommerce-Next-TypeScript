import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState
} from "react";
import { addItem, deleteItem } from "./actions";
import {
  getItemFromLocalStorage,
  SetItemInLocalStorage
} from "../../utils/storage";
import { CartType } from "../../utils/type";

interface CartState {
  cartItems: CartType[];
  addItemToCart: (item: CartType) => void;
  removeItemFromCart: (id: CartType["id"]) => void;
  setCartItems: Dispatch<SetStateAction<[] | CartType[]>>;
}

export const CartContext = createContext<CartState | null>(null);

export const CartContextProvider = ({
  children
}: {
  children: JSX.Element;
}) => {
  const [cartItems, setCartItems] = useState<CartType[] | []>([]);

  useEffect(() => {
    setCartItems(getItemFromLocalStorage());
  }, []);

  useEffect(() => {
    SetItemInLocalStorage(cartItems);
  }, []);

  const addItemToCart = (item: CartType) =>
    setCartItems(prevState => addItem(prevState, item));

  const removeItemFromCart = (id: CartType["id"]) =>
    setCartItems(prevState => deleteItem(prevState, id));

  return (
    <CartContext.Provider
      value={{ cartItems, addItemToCart, removeItemFromCart, setCartItems }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const UseCartContext = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw Error("you forgot CartContext.Provider");
  }
  return context;
};
