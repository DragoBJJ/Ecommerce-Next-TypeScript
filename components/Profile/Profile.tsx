import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { Dispatch, memo, SetStateAction } from "react";
import { deployHook } from "../../utils/common";
import { InfoPopup } from "../InfoPopup";

type ProfileType = {
  dateTime: string;
  setOrderVisible: Dispatch<SetStateAction<boolean>>;
};

export const Profile = memo<ProfileType>(({ dateTime, setOrderVisible }) => {
  const { data: session } = useSession();

  if (!session) {
    return <InfoPopup status="cancell" description="You dont have access" />;
  }
  console.log("session", session);
  return (
    <div
      className={`relative flex md:flex w-full mt-4 lg:w-5/6 h-[250px] 
       md:flex flex-col text-black items-end py-4 px-4 rounded-xl   h-20 hover:pb-10 overflow-hidden 
       bg-[#E1B989] 
       shadow-2xl shadow-stone-700  ease-in-out duration-300 cursor-pointer`}
    >
      <div
        className="absolute -top-7  hover:scale-125 ease-in-out duration-500  -left-4 flex  w-28 h-28
      sm:w-64 sm:h-64  rounded-full border-r-2 border-black"
      >
        <Image
          layout="fill"
          className="inline  w-full h-full rounded-full"
          objectFit="cover"
          src="/Leon.jpeg"
          alt="Leon"
        />
      </div>
      <div className="flex  w-3/4  sm:w-2/4 md:w-1/3 lg:w-2/4">
        <div className="flex w-1/3 flex-col mr-2">
          <p className="text-lg my-1">Email: </p>
          <p className="text-lg">UserName: </p>
          <p className="text-lg">Specialization: </p>
          <p className="text-lg">Created: </p>
        </div>
        <div className="flex  w-2/3  items-end  flex-col">
          <p className="text-xl my-1">{session?.user.email}</p>
          <p className="text-lg">{session?.user.username}</p>
          <p className="text-lg">{session?.user.specialization}</p>
          <p className="text-lg">{dateTime}</p>
        </div>
      </div>
      <div className="flex  justify-end  w-3/4 lg:w-2/4 h-full mt-4">
        <div
          onClick={() => setOrderVisible(prev => !prev)}
          className="flex my-4 justify-center items-center w-full max-w-[160px]  ease-in-out duration-300 hover:bg-neutral-800  hover:text-white  hover:border-none h-[48px] border-[1px] border-neutral-800  text-black rounded-lg cursor-pointer mr-2"
        >
          Orders History
        </div>

        {session.user.id === process.env.NEXT_PUBLIC_DRAGO_ID && (
          <button
            onClick={deployHook}
            className="flex my-4 justify-center items-center w-full max-w-[160px]  ease-in-out duration-300 hover:bg-neutral-800  hover:text-white  hover:border-none h-[48px] border-[1px] border-neutral-800  text-black rounded-lg cursor-pointer mr-2"
          >
            Deploy
          </button>
        )}
      </div>
    </div>
  );
});
