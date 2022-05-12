import { UseClientContext } from "../components/context/ClientContext";
import { InfoPopup } from "../components/InfoPopup";

import Image from "next/image";
import { NavPayment } from "../components/NavPayment";
import { useState } from "react";
import { Fade } from "react-awesome-reveal";
import { OrderContent } from "../components/Order/OrderContent";

type TemplateType = {
  children: JSX.Element;
  imageName: string;
};

export const CheckoutTemplate = ({ children, imageName }: TemplateType) => {
  const { orderID } = UseClientContext();
  const [showOrder, setShowOrder] = useState<boolean>(false);

  return (
    <div className="w-screen min-h-screen border-red-600">
      {orderID ? (
        <>
          <NavPayment />
          <div className="flex-column md:flex justify-center p-4">
            <div className="flex w-full h-full">{children}</div>

            <div className="md:flex flex-col w-full h-full mx-auto justify-center items-center">
              <button
                onClick={() => setShowOrder(prev => !prev)}
                className="h-[48px]   w-[200px] mt-2 border-[1px] hover:bg-[#E1B989] border-[#E1B989] rounded-xl ease-in-out duration-300"
              >
                {showOrder ? "hidden Order" : "Show Order"}
              </button>
              {showOrder && (
                <Fade className="w-full h-auto">
                  <OrderContent />
                </Fade>
              )}
              {!showOrder && (
                <div className="w-full h-full mx-auto justify-center items-center">
                  <Fade>
                    <Image
                      src={`/${imageName}.svg`}
                      height={imageName === "card" ? 16 / 16 : 16 / 9}
                      width={16 / 9}
                      layout="responsive"
                      objectFit="contain"
                    />
                  </Fade>
                </div>
              )}
            </div>
          </div>
        </>
      ) : (
        <InfoPopup status="cancell" description="You don't have Order" />
      )}
    </div>
  );
};
