import Link from "next/link";
import Image from "next/image";

import { useRouter } from "next/router";
import { UserNav } from "./UserNav";

[];

export const Header = () => {
  const router = useRouter();

  const linksArray = [
    { name: "Home", href: "/" },
    { name: "about", href: "/about" },
    { name: "products", href: "/products/1" }
  ];

  return (
    <header className="flex w-full h-[120px] p-6 justify-center items-center bg-neutral-800 overflow-hidden">
      <div className="relative h-28 w-28 shadow-2xl shadow-stone-700 rounded-full">
        <Image
          layout="fill"
          className="inline rounded-full"
          objectFit="cover"
          src="/Mathilda1.png"
          alt="Leon"
        />
      </div>
      <nav
        className={`grid grid-cols-3 h-full w-2/4 p-4 rounded-xl place-items-center mx-auto text-[#E1B989] border-2 border-[#E1B989]`}
      >
        {linksArray.map(({ href, name }) => {
          return (
            <Link href={href} key={href}>
              <a
                className={
                  href.split("/")[1] === router.pathname.split("/")[1]
                    ? "border-b-2 border-white"
                    : ""
                }
              >
                {name}
              </a>
            </Link>
          );
        })}
      </nav>
      <UserNav />
    </header>
  );
};
