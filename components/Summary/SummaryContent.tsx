import Image from "next/image";
import { GetOrderAndShippingAddressQuery } from "../../generated/graphql";
import { Fade } from "react-awesome-reveal";

export const SummaryContent = ({
  data
}: {
  data: GetOrderAndShippingAddressQuery | undefined;
}) => {
  if (
    !data ||
    !data.order ||
    !data.order.shippingAddress ||
    !data.order.orderItems
  )
    return <div>you have some error with your OrderData</div>;
  const { orderItems } = data.order;

  return (
    <div className="w-full h-full">
      <Fade triggerOnce>
        <div className="flex-col w-full h-full p-4 border-2 border-[#E1B989] mx-auto  justify-center  items-center rounded-xl shadow-lg shadow-neutral-800">
          <h1 className="text-2xl tracking-widest text-center">
            Shipping Address
          </h1>
          <ul>
            {Object.values(data.order.shippingAddress).map((item, index) => {
              if (index === 0) return;
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
        <div className="flex-col w-full mt-4 h-full p-4 border-2 border-[#E1B989] mx-auto  justify-center  items-center rounded-xl shadow-lg shadow-neutral-800">
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
                        height={16 / 9}
                        width={16 / 9}
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
      </Fade>
    </div>
  );
};
