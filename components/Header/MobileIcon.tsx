import { Dispatch, memo, SetStateAction, useState } from "react";

type MobileIconProps = {
  isOpen: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
};

export const MobileIcon = memo<MobileIconProps>(({ isOpen, setOpen }) => {
  return (
    <div
      style={{ zIndex: 9999 }}
      onClick={() => setOpen(prevState => !prevState)}
      className={`ml-auto  mx-auto flex justify-center items text-gray-500 w-16 h-16  focus:outline-none bg-neutral-800 md:hidden mx-4 cursor-pointer absolute top-0 right-0`}
    >
      <div className="w-full h-full relative focus:outline-none transform">
        <span
          aria-hidden="true"
          className={`block absolute top-1/2 left-1/2 -translate-x-1/2  h-0.5 w-8 bg-[#E1B989] transform transition duration-500 ease-in-out  ${
            isOpen ? "rotate-45" : "-translate-y-2"
          }`}
        ></span>
        <span
          aria-hidden="true"
          className={`block absolute top-1/2 left-1/2 -translate-x-1/2  h-0.5 w-8 bg-[#E1B989] transform transition duration-500 ease-in-out ${
            isOpen ? "opacity-0" : ""
          }`}
        ></span>
        <span
          aria-hidden="true"
          className={`block absolute top-1/2 left-1/2 -translate-x-1/2  h-0.5 w-8 bg-[#E1B989] transform  transition duration-500 ease-in-out ${
            isOpen ? "-rotate-45" : "translate-y-2"
          }`}
        ></span>
      </div>
    </div>
  );
});
