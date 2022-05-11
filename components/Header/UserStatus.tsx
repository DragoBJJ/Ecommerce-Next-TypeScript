import { memo } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";

type UserNavType = {
  isMobile?: boolean;
};

export const UserStatus = memo<UserNavType>(({ isMobile }) => {
  const { data: session, status } = useSession();

  if (!session) return null;

  return (
    <div
      className={`relative ${
        isMobile ? "flex w-[280px] " : "hidden w-[250px]"
      }  md:flex flex-col text-black items-end py-4 px-2 rounded-xl   h-20 hover:pb-10 overflow-hidden bg-[#E1B989]
       shadow-2xl shadow-stone-700  ease-in-out duration-300 cursor-pointer`}
    >
      <div className="absolute -top-7  hover:scale-125 ease-in-out duration-500  -left-4 flex w-28 h-28 rounded-full border-r-2 border-black">
        <Image
          layout="fill"
          className="inline  w-full h-full rounded-full"
          objectFit="cover"
          src="/Leon.jpeg"
          alt="Leon"
        />
      </div>

      <h2 className="text-xl">{session?.user.username}</h2>
      <p className="text-sm">{session?.user.specialization}</p>
    </div>
  );
});
