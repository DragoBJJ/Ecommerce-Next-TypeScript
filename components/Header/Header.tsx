import Link from "next/link";
import { useRouter } from "next/router";

interface HeaderProps {}

export const Header = () => {
  const router = useRouter();

  const linksArray = [
    { name: "Home", href: "/" },
    { name: "about", href: "/about" },
    { name: "products", href: "/products/1" }
  ];

  return (
    <header className="w-full h-30 p-6 bg-sky-700">
      <nav
        className={`grid grid-cols-3 h-full w-full place-items-center  text-white mx-auto `}
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
    </header>
  );
};
