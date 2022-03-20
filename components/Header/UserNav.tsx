import Image from "next/image";
export const UserNav = () => {
  return (
    <div
      className="relative flex flex-col text-black items-end p-4 rounded-xl  max-w-[300px] h-20 w-full overflow-hidden
       shadow-2xl shadow-stone-700  ease-in-out duration-300 cursor-pointer"
      style={{ backgroundColor: "#E1B989" }}
    >
      <div className="absolute -top-9  hover:scale-125 ease-in-out duration-500  -left-4 flex w-32 h-32 rounded-full border-r-2 border-black">
        <Image
          layout="fill"
          className="inline  w-full h-full rounded-full"
          width={16}
          height={9}
          objectFit="cover"
          src="/Leon.jpeg"
          alt="Leon"
        />
      </div>

      <h2 className="text-lg">Jakub Pawelski</h2>
      <p className="text-sm">Frontend Developer</p>
    </div>
  );
};
