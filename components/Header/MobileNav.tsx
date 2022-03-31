import Link from "next/link";
import { Dispatch, memo, SetStateAction } from "react";
import { NavLinks } from "./NavLinks";
import { UserStatus } from "./UserStatus";

interface MobileNavProps {
  linksArray: { name: string; href: string }[];
  isOpen: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

export const MobileNav = memo<MobileNavProps>(
  ({ linksArray, isOpen, setOpen }) => {
    return (
      <div
        className={`flex md:hidden relative -top-[800px]  p-2  ${
          isOpen ? " translate-y-[700px]" : "flex -translate-y-full"
        }
       items-center flex-col  mx-auto w-full ease-in-out duration-500 `}
      >
        <UserStatus isMobile />
        <div className="flex-col w-full  mx-auto ">
          <NavLinks navLinks={linksArray} setOpen={setOpen} isMobile />
        </div>
      </div>
    );
  }
);
