import Image from "next/image";
import { useRouter } from "next/router";
import { memo } from "react";

type SpinnerType = {
  isSmaller?: boolean;
};

export const Spinner = memo<SpinnerType>(({ isSmaller }) => {
  return (
    <div
      className={`${
        isSmaller ? "w-full h-full" : "w-screen h-screen"
      } bg-neutral-800 border-2 border-[#E1B989]`}
    >
      <div className="relative w-1/3 mx-auto h-[400px]  rounded-xl">
        <Image
          priority={true}
          src="/time.svg"
          alt="time"
          height={16 / 9}
          width={16 / 9}
          layout="fill"
          objectFit="contain"
        />
      </div>
    </div>
  );
});
