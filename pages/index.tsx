import { useSession } from "next-auth/react";
import { InfoPopup } from "../components/InfoPopup";
import { Spinner } from "../components/Spinner";
import { useGetAccountDataQuery } from "../generated/graphql";
import { Profile } from "../components/Profile/Profile";
import { getClearFormatData } from "../utils/common";
import { Fade } from "react-awesome-reveal";
import Image from "next/image";

import { useState } from "react";
import { ProfileOrders } from "../components/Profile/ProfileOrders";

const Home = () => {
  const { status, data: sessionData } = useSession();
  const [ordersVisible, setOrdersVisible] = useState(false);

  const {
    data: AccountData,
    loading: LoadingAccountData,
    error: ErrorAccountData
  } = useGetAccountDataQuery({
    variables: {
      id: sessionData?.user.id
    }
  });

  if (LoadingAccountData) {
    return (
      <div className="flex flex-col h-screen w-screen justify-center">
        <Spinner />;
      </div>
    );
  }

  if (status === "unauthenticated") {
    return (
      <div className="flex flex-col mx-auto  w-full h-full justify-center p-2">
        <InfoPopup
          status="cancell"
          description="Please, Log In to see details"
        />
      </div>
    );
  }

  if (ErrorAccountData || !AccountData || !AccountData.account) {
    return (
      <div className="flex flex-col h-screen w-screen justify-start p-2">
        <InfoPopup
          status="cancell"
          description="Error with your Account Data"
        />
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full min-h-screen min-w-screen justify-start p-2">
      <div className="flex flex-col  lg:flex-row">
        <Fade
          triggerOnce
          direction="top-left"
          style={{ width: "100%", height: "100%" }}
        >
          <Profile
            dateTime={getClearFormatData(AccountData.account.createdAt)}
            setOrderVisible={setOrdersVisible}
          />
        </Fade>

        <div className="ml-auto mr-4 relative  mt-4 items-center  w-2/3">
          {!ordersVisible && (
            <Fade triggerOnce direction="top-right">
              <Image
                src="/code.svg"
                alt="code"
                height={16 / 16}
                width={16 / 8}
                layout="responsive"
                objectFit="contain"
              />
            </Fade>
          )}
        </div>
      </div>

      {ordersVisible && (
        <div className="w-full h-full mt-4">
          <Fade triggerOnce>
            <ProfileOrders accountData={AccountData.account} />
          </Fade>
        </div>
      )}
    </div>
  );
};

export default Home;
