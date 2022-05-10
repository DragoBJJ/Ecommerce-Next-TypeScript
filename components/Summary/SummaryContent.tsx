import Image from "next/image";
import { useRouter } from "next/router";
import { GetOrderAndShippingAddressQuery } from "../../generated/graphql";
import { Fade } from "react-awesome-reveal";
import { InfoPopup } from "../InfoPopup";
import { deleteOrderAndStripeFromLocalStorage } from "../../utils/storage";
import { UseCartContext } from "../context/CartContext";

export const SummaryContent = ({
  data
}: {
  data: GetOrderAndShippingAddressQuery | undefined;
}) => {
  const router = useRouter();
  const { setCartItems } = UseCartContext();

  if (
    !data ||
    !data.order ||
    !data.order.shippingAddress ||
    !data.order.orderItems
  ) {
    return <InfoPopup status="cancell" description="Error with your Order" />;
  }
  const { orderItems } = data.order;

  const clearLocalData = () => {
    deleteOrderAndStripeFromLocalStorage();
    setCartItems([]);
    router.push({
      pathname: "/products/1"
    });
  };

  return (
    <div className="w-full h-auto">
      <Fade triggerOnce>
        <div className="flex-col w-full h-full p-4 border-2 border-[#E1B989] mx-auto  justify-center  items-center rounded-xl shadow-lg shadow-neutral-800">
          <h1 className="text-2xl mb-4 tracking-widest text-center">
            Shipping Address
          </h1>
          <ul>
            {Object.values(data.order.shippingAddress).map((item, index) => {
              if (index === 0 || index === 1) return;
              return (
                <li key={index} className="text-lg text-[#1d1d1d]">
                  {item}
                </li>
              );
            })}
          </ul>
        </div>
      </Fade>
      <Fade triggerOnce>
        <div className="overflow-y-auto flex-col w-full mt-4 h-[400px] p-4 border-2 border-[#E1B989] mx-auto  justify-center  items-center rounded-xl shadow-lg shadow-neutral-800">
          <h1 className="text-2xl tracking-widest text-center">Order Items</h1>
          <ul>
            {orderItems.map((item, index) => {
              return (
                <div
                  key={`${item.id + index}`}
                  className={`flex w-full h-full 
                  ${
                    orderItems.length - 1 === index
                      ? "border-b-0"
                      : "border-b-2"
                  } border-[#E1B989] mb-2 py-2`}
                >
                  <div className="flex-col">
                    <li className="text-xl text-[#1d1d1d]">
                      {item.product?.name}
                    </li>
                    <li className="text-xl text-[#1d1d1d]">
                      {item.product?.price} $
                    </li>
                  </div>
                  <div className="relative  w-1/3 h-[120px] mb-2">
                    {item.product?.images[0].url && (
                      <Image
                        src={item.product?.images[0].url}
                        layout="fill"
                        objectFit="contain"
                      />
                    )}
                  </div>
                </div>
              );
            })}
          </ul>
        </div>
        <button
          onClick={clearLocalData}
          className="flex w-[180px] my-10 h-[48px] ease-in duration-300 cursor-pointer hover:bg-[#E1B989] border-2 border-[#E1B989] mx-auto justify-center items-center rounded-xl"
        >
          <p className="text-lg"> Go to Shop</p>
        </button>
      </Fade>
    </div>
  );
};
