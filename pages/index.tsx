import { useSession } from "next-auth/react";
import { InfoPopup } from "../components/InfoPopup";
import { Spinner } from "../components/Spinner";
import { useGetAccountDataQuery } from "../generated/graphql";
import { Profile } from "../components/Profile/Profile";
import { getClearFormatData, getShippingAddress } from "../utils/common";
import { Fade } from "react-awesome-reveal";

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

  if (status === "loading") return <Spinner />;
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
  3;

  return (
    <div className="flex flex-col w-full min-h-screen min-w-screen justify-start p-2">
      <Fade triggerOnce direction="top-left" style={{ height: "100%" }}>
        <Profile
          dateTime={getClearFormatData(AccountData.account.createdAt)}
          setOrderVisible={setOrdersVisible}
        />
      </Fade>

      <div className="mt-4 w-full h-full ">
        {ordersVisible && (
          <Fade triggerOnce style={{ height: "100%" }}>
            <ProfileOrders accountData={AccountData.account} />
          </Fade>
        )}
      </div>
    </div>
  );
};

export default Home;
