import { useState } from "react";
import Image from "next/image";

import { UserStatus } from "./UserStatus";
import { Fade } from "react-awesome-reveal";
import { CartBar } from "../CartBar/CartBar";
import { MobileIcon } from "./MobileIcon";
import { MobileNav } from "./MobileNav";
import { NavLinks } from "./NavLinks";
import { UseClientContext } from "../context/ClientContext";

export const Header = () => {
  const [isOpen, setOpen] = useState(false);
  const { orderID } = UseClientContext();

  const linksArray = [
    { name: "Home", href: "/" },
    { name: "about", href: "/about" },
    { name: "products", href: "/products/1" }
  ];
  return (
    <header
      style={{ zIndex: 9999 }}
      className={`flex ${orderID && "hidden"} w-screen ${isOpen &&
        "fixed t-0 b-0 l-0 min-h-screen opacity-95 ease-in-out duration-500"} h-[120px]
      p-4  lg:justify-center items-center bg-neutral-800  `}
    >
      <div
        className={` ${isOpen &&
          "hidden"} relative h-28  w-28 mr-4 shadow-2xl shadow-stone-700 rounded-full`}
      >
        <Image
          layout="fill"
          className="inline rounded-full"
          objectFit="cover"
          src="/Mathilda1.png"
          alt="Leon"
        />
      </div>
      <nav
        className={` grid-cols-3 h-full  hidden md:grid  w-2/4 p-4 rounded-xl place-items-center mx-auto text-[#E1B989]`}
      >
        <NavLinks navLinks={linksArray} setOpen={setOpen} />
      </nav>

      <MobileNav linksArray={linksArray} isOpen={isOpen} setOpen={setOpen} />

      <Fade triggerOnce direction="right">
        <UserStatus />
      </Fade>
      <MobileIcon isOpen={isOpen} setOpen={setOpen} />
      <CartBar />
    </header>
  );
};
