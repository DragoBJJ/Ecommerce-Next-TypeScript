import { CartContent } from "../components/CartBar/CartContent";
import { CartSummary } from "../components/CartBar/CartSummary";
import { UseCartContext } from "../components/context/CartContext";

const CartPage = () => {
  const { cartItems } = UseCartContext();
  return (
    <div className="flex justify-center  items-center  h-screen w-screen">
      <div className="grid grid-cols-3 h-full w-full gap-8">
        <CartContent cartItems={cartItems} />
        <CartSummary itemsAmount={cartItems.length} />
      </div>
    </div>
  );
};

export default CartPage;
