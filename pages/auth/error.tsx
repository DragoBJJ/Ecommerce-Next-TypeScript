import { InfoPopup } from "../../components/InfoPopup";

const ErrorAuthPage = () => {
  return (
    <div className="w-screen h-full pb-5 md:pb-0 min-h-screen min-h-screen">
      <InfoPopup
        status="cancell"
        description="Error with your credentials"
        image="cancell"
      />
    </div>
  );
};

export default ErrorAuthPage;
