import { useSession } from "next-auth/react";
import { InfoPopup } from "../components/InfoPopup";
import { Spinner } from "../components/Spinner";
import { useGetAccountDataQuery } from "../generated/graphql";
import { Profile } from "../components/Profile/Profile";
import { getClearFormatData } from "../utils/apiCheckout";
import { Fade } from "react-awesome-reveal";
import Image from "next/image";

const Home = () => {
  const { status, data: sessionData } = useSession();

  const {
    data: AccountData,
    loading: LoadingAccountData,
    error: ErrorAccountData
  } = useGetAccountDataQuery({
    variables: {
      id: sessionData?.user.id
    }
  });

  if (status === "loading") return <Spinner />;
  if (status === "unauthenticated") {
    <div className="flex flex-col  w-full h-full justify-center p-2">
      <InfoPopup status="cancell" description="Error with your Session" />
    </div>;
  }

  if (LoadingAccountData) {
    return (
      <div className="flex flex-col h-screen w-screen justify-center">
        <Spinner />;
      </div>
    );
  }
  if (ErrorAccountData || !AccountData || !AccountData.account) {
    return (
      <div className="flex flex-col h-screen w-screen justify-center p-2">
        <InfoPopup
          status="cancell"
          description="Error with your Account Data"
        />
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full min-h-screen min-w-screen justify-start p-2">
      <Fade
        triggerOnce
        style={{ width: "100%", height: "100%" }}
        direction="top-left"
      >
        <Profile dateTime={getClearFormatData(AccountData.account.createdAt)} />
      </Fade>
      <div>
        <ul className="flex flex-col w-full h-2/4 overflow-y-auto">
          {AccountData.account.orders.map((order, index) => {
            return (
              <li className="flex flex-col my-8">
                <div className="flex w-full items-center py-1 justify-start bg-[#E1B989] border-y-[1px] border-[#E1B989]">
                  <p className="text-3xl text-[#1d1d1d] mx-4">#{index + 1}</p>
                  <p className="text-2xl text-[#1d1d1d] mr-4">
                    {getClearFormatData(order.createdAt)}
                  </p>
                  <p
                    className={`text-xl text-[#1d1d1d] border-2 ${
                      order.stripeCheckoutId.startsWith("-")
                        ? "border-red-500"
                        : "border-green-500"
                    } rounded-xl px-6`}
                  >
                    {order.stripeCheckoutId.startsWith("-")
                      ? "Unpaid"
                      : "Delivered"}
                  </p>
                </div>

                <ul className="flex flex-col overflow-y-auto  w-3/5">
                  {order.orderItems.map((item, index) => {
                    return (
                      <li
                        key={`${item.product?.name}_${index}`}
                        className="flex justify-between items-center w-full p-4 border-b-[1px] border-[#E1B989]"
                      >
                        <p className="text-xl">{item.product?.name}</p>
                        <div className="relative  w-1/3 h-[60px]">
                          {item.product?.images[0].url && (
                            <Image
                              src={item.product?.images[0].url}
                              alt={item.product.name}
                              height={16 / 9}
                              width={16 / 9}
                              layout="fill"
                              objectFit="contain"
                            />
                          )}
                        </div>
                        <div className="flex w-[200px] justify-between items-center">
                          <p>
                            price: {item.product?.price}$ <br />
                            amount: {item.quantity}
                          </p>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Home;
