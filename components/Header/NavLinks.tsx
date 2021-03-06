import Link from "next/link";
import { useRouter } from "next/router";
import { Dispatch, memo, SetStateAction } from "react";
import { SignInResponse, SignOutResponse } from "next-auth/react";

interface NavLinksProps {
  navLinks: {
    name: string;
    href: string;
    authFunc?: () => SignInResponse | SignOutResponse;
  }[];
  isMobile?: boolean;
  setOpen?: Dispatch<SetStateAction<boolean>>;
}

export const NavLinks = memo<NavLinksProps>(
  ({ navLinks, isMobile, setOpen }) => {
    const router = useRouter();

    return (
      <>
        {navLinks &&
          navLinks.map(({ href, name, authFunc }) => {
            return (
              <div
                key={href}
                onClick={() => isMobile && setOpen && setOpen(false)}
                className={`grid place-items-center  ${isMobile &&
                  "text-2xl  h-28 tracking-widest"}`}
              >
                <Link href={href}>
                  <a
                    onClick={authFunc ? () => authFunc() : undefined}
                    className={`text-[#E1B989]
                    ${href.split("/")[1] === router.pathname.split("/")[1] &&
                      "border-b-2 border-[#E1B989]"} `}
                  >
                    {name}
                  </a>
                </Link>
              </div>
            );
          })}
      </>
    );
  }
);
