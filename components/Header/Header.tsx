import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";

import { UserStatus } from "./UserStatus";
import { Fade } from "react-awesome-reveal";
import { CartBar } from "../CartBar/CartBar";
import { MobileIcon } from "./MobileIcon";
import { MobileNav } from "./MobileNav";
import { NavLinks } from "./NavLinks";
import { UseClientContext } from "../context/ClientContext";
import { signIn, signOut, useSession } from "next-auth/react";

export const Header = () => {
  const [isOpen, setOpen] = useState(false);
  const router = useRouter();

  const { data, status } = useSession();

  const linksArray = [
    { name: "Profile", href: "/" },
    { name: "Cart", href: "/Cart" },
    { name: "Products", href: "/products/1" }
  ];

  const orderPaths = ["address", "payment", "summary"];
  return (
    <header
      style={{ zIndex: 9999 }}
      className={`flex ${orderPaths.filter(path => router.asPath.includes(path))
        .length && "hidden"} w-screen ${isOpen &&
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
          alt="Mathilda"
        />
      </div>
      <nav
        className={` grid-cols-3 h-full  hidden md:grid  w-2/4 p-4 rounded-xl place-items-center mx-auto text-[#E1B989]`}
      >
        <NavLinks navLinks={linksArray} setOpen={setOpen} />
      </nav>

      <MobileNav linksArray={linksArray} isOpen={isOpen} setOpen={setOpen} />

      <Fade triggerOnce direction="right">
        {status === "authenticated" ? (
          <>
            <UserStatus />
            <button
              onClick={() => signOut()}
              className="text-[#E1B989] text-xl mr-4"
            >
              Log Out
            </button>
          </>
        ) : (
          <button
            onClick={() => signIn()}
            className="text-[#E1B989] text-xl mr-4"
          >
            Log In
          </button>
        )}
      </Fade>
      <MobileIcon isOpen={isOpen} setOpen={setOpen} />
      <CartBar />
    </header>
  );
};
