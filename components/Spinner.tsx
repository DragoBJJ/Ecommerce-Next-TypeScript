import Image from "next/image";

export const Spinner = () => {
  return (
    <div className="w-full h-full m-auto bg-neutral-800">
      <div className="relative w-1/3 mx-auto h-[400px]  rounded-xl">
        <Image
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
