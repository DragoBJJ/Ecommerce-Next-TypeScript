import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";

import { UserStatus } from "./UserStatus";
import { Fade } from "react-awesome-reveal";
import { CartBar } from "../CartBar/CartBar";
import { MobileIcon } from "./MobileIcon";
import { MobileNav } from "./MobileNav";
import { NavLinks } from "./NavLinks";
import { signIn, signOut, useSession } from "next-auth/react";

export const Header = () => {
  const [isOpen, setOpen] = useState(false);
  const router = useRouter();

  const { status } = useSession();

  const linksArray = [
    { name: "Profile", href: "/" },
    { name: "Cart", href: "/Cart" },
    { name: "Products", href: "/products/1" }
  ];
  const mobileFunc =
    status === "authenticated"
      ? { name: "Log Out", href: "/signin", authFunc: signOut }
      : { name: "Log In", href: "/product/1", authFunc: signIn };

  const MobileLinks = [...linksArray, mobileFunc];

  const orderPaths = ["address", "payment", "summary"];
  return (
    <header
      style={{ zIndex: 9999 }}
      className={`flex ${orderPaths.filter(path => router.asPath.includes(path))
        .length && "hidden"} w-screen ${isOpen &&
        "fixed t-0 b-0 l-0 min-h-screen opacity-95 ease-in-out duration-500"} h-[100px] md:h-[120px]
      px-4 justify-center items-center bg-neutral-800`}
    >
      <div
        className={` ${isOpen && "hidden"} relative  h-28 w-28 my-auto mt-1`}
      >
        <Image
          priority={true}
          width={16 / 9}
          height={16 / 9}
          layout="responsive"
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

      <MobileNav linksArray={MobileLinks} isOpen={isOpen} setOpen={setOpen} />

      <Fade triggerOnce direction="right">
        {status === "unauthenticated" && (
          <>
            <UserStatus />
            <button
              onClick={() => signIn()}
              className="text-[#E1B989] text-xl mr-4 hidden md:flex"
            >
              Log In
            </button>
          </>
        )}
      </Fade>
      <MobileIcon isOpen={isOpen} setOpen={setOpen} />
      <CartBar />
    </header>
  );
};
