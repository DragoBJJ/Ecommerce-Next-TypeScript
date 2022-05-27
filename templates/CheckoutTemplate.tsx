import { UseClientContext } from "../components/context/ClientContext";
import { InfoPopup } from "../components/InfoPopup";

import Image from "next/image";
import { NavPayment } from "../components/NavPayment";
import { useState } from "react";
import { Fade } from "react-awesome-reveal";
import { OrderContent } from "../components/Order/OrderContent";
import { useSession } from "next-auth/react";
import { memo } from "react";
import { Spinner } from "../components/Spinner";
import { useRouter } from "next/router";

type TemplateType = {
  children: JSX.Element;
  imageName: string;
};

export const CheckoutTemplate = memo<TemplateType>(
  ({ children, imageName }) => {
    const { orderID } = UseClientContext();
    const { pathname } = useRouter();
    const [showOrder, setShowOrder] = useState<boolean>(false);
    const { status } = useSession();

    if (status === "unauthenticated") {
      return <InfoPopup status="cancell" description="You dont have access" />;
    }
    if (status === "loading") return <Spinner />;

    return (
      <div className="w-screen min-h-screen border-red-600">
        {status === "authenticated" ? (
          <>
            <NavPayment />
            <div className="flex-column md:flex justify-center p-4">
              <div className="flex w-full h-full">{children}</div>

              <div className="md:flex flex-col w-full h-full mx-auto justify-center items-center">
                {orderID && pathname.includes("address") && (
                  <button
                    onClick={() => setShowOrder(prev => !prev)}
                    className="h-[48px]   w-[200px] mt-2 border-[1px] hover:bg-[#E1B989] border-[#E1B989] rounded-xl ease-in-out duration-300"
                  >
                    {showOrder ? "hidden Order" : "Show Order"}
                  </button>
                )}

                {showOrder ? (
                  <Fade className="w-full h-full">
                    <OrderContent />
                  </Fade>
                ) : (
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
          <InfoPopup status="cancell" description="You dont have access" />
        )}
      </div>
    );
  }
);
