import Link from "next/link";
import { FaLinkedinIn } from "react-icons/fa";

export const Footer = () => {
  return (
    <footer className="flex h-[100px]  text-center bg-neutral-800">
      <div className="flex justify-center mx-auto items-center w-1/6">
        <Link
          href="https://linkedin.com/in/jakub-pawelski-885559228/"
          passHref={true}
        >
          <a>
            <FaLinkedinIn
              color="#E1B989"
              cursor="pointer"
              size="30px"
              className="ease-in-out duration-300 hover:scale-125"
            />
          </a>
        </Link>
      </div>
    </footer>
  );
};
