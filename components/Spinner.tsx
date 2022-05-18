import Image from "next/image";

export const Spinner = () => {
  return (
    <div className="w-full h-screen m-auto bg-neutral-800 border-2 border-[#E1B989]">
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
};
