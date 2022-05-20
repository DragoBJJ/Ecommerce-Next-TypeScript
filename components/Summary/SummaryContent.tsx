import Image from "next/image";
import { useRouter } from "next/router";
import { GetOrderAndShippingAddressQuery } from "../../generated/graphql";
import { Fade } from "react-awesome-reveal";
import { InfoPopup } from "../InfoPopup";
import { deleteOrderAndStripeFromLocalStorage } from "../../utils/storage";
import { UseCartContext } from "../context/CartContext";
import { UseClientContext } from "../context/ClientContext";

export const SummaryContent = ({
  data
}: {
  data: GetOrderAndShippingAddressQuery;
}) => {
  const router = useRouter();
  const { setCartItems } = UseCartContext();
  const { setOrderID, setClientStripeID } = UseClientContext();

  if (
    !data ||
    !data.order ||
    !data.order.shippingAddress ||
    !data.order.orderItems
  ) {
    return <InfoPopup status="cancell" description="Error with your Order" />;
  }
  const { orderItems } = data.order;
  const {
    email,
    firstName,
    lastName,
    state,
    streetAddress,
    city,
    postalCode
  } = data.order.shippingAddress;

  const clearLocalData = () => {
    router.push({
      pathname: "/products/1"
    });
    deleteOrderAndStripeFromLocalStorage();
    if (!setOrderID || !setClientStripeID) return;
    setCartItems([]);
    setOrderID(undefined);
    setClientStripeID(undefined);
  };

  return (
    <div className="w-full h-auto">
      <Fade triggerOnce>
        <div className="flex-col  w-full md:w-3/4 h-full p-4 text-[#E1B989] bg-neutral-800 mx-auto  justify-center  items-center rounded-xl shadow-md shadow-neutral-800">
          <h1 className="text-2xl mb-4 tracking-widest text-center">
            Shipping Address
          </h1>
          <div className="flex justify-around w-full h-full text-center">
            <div>
              <p>{email}</p>
              <p>
                {firstName} {lastName}
              </p>
            </div>
            <div className="">
              <p>{state}</p>
              <p>{city}</p>
              <p>
                {streetAddress} / {postalCode}
              </p>
            </div>
          </div>
        </div>
      </Fade>
      <Fade triggerOnce>
        <div className="overflow-y-auto flex-col w-full mt-8 h-[400px] p-4 bg-[#E1B989] mx-auto justify-center  items-center rounded-xl shadow-md shadow-neutral-800">
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
                      : "border-b-[1px]"
                  } border-neutral-800 mb-2 py-2`}
                >
                  <div className="flex-col">
                    <li className="text-xl text-[#1d1d1d]">
                      {item.product?.name}
                    </li>
                    <li className="text-xl text-[#1d1d1d]">
                      {item.product?.price} $
                    </li>
                  </div>
                  <div className="relative ml-auto  w-1/3 h-[120px]">
                    {item.product?.images[0].url && (
                      <Image
                        src={item.product?.images[0].url}
                        layout="fill"
                        alt="orderImage"
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
