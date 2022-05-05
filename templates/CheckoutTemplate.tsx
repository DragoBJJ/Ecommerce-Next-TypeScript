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
    <div className="w-screen min-h-screen border-red-600">
      {orderID ? (
        <>
          <NavPayment />
          <div className="flex-column md:flex justify-center p-4">
            <div className="flex w-full h-full">{children}</div>

            <div className="md:flex w-full h-full mx-auto justify-center items-center">
              <div className="w-full h-full mx-auto justify-center items-center">
                <Image
                  src={`/${imageName}.svg`}
                  height={imageName === "card" ? 16 / 16 : 16 / 9}
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
