import { UseClientContext } from "../components/context/ClientContext";
import { InfoPopup } from "../components/InfoPopup";

import Image from "next/image";
import { NavPayment } from "../components/NavPayment";

type TemplateType = {
  children: JSX.Element;
  imageName: string;
};

export const CheckoutTemplate = ({ children, imageName }: TemplateType) => {
  const { orderID } = UseClientContext();

  return (
    <div className="w-screen  h-auto">
      {orderID ? (
        <>
          <NavPayment />
          <div className="flex justify-center">
            <div className="flex w-3/4 h-full">{children}</div>

            <div className=" hidden md:flex w-3/4 h-full">
              <div className="w-full h-full">
                <Image
                  src={`/${imageName}.svg`}
                  height={16 / 9}
                  width={16 / 9}
                  layout="responsive"
                  objectFit="contain"
                />
              </div>
            </div>
          </div>
        </>
      ) : (
        <InfoPopup status="cancell" />
      )}
    </div>
  );
};
