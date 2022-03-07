import Link from "next/link";
import { useRouter } from "next/router";

interface HeaderProps {}

export const Header = () => {
  const router = useRouter();

  const linksArray = [
    { name: "Home", href: "/" },
    { name: "about", href: "/about" },
    { name: "products", href: "/products" }
  ];

  return (
    <header className="w-full h-full p-6 bg-neutral-800">
      <nav
        className={`grid grid-cols-3 h-full w-full place-items-center  text-white mx-auto `}
      >
        {linksArray.map(({ href, name }) => {
          return (
            <Link href={href} key={href}>
              <a
                className={
                  href === router.pathname ? "border-b-2 border-red-500" : ""
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
