import { memo } from "react";
import Image from "next/image";
import { Fade } from "react-awesome-reveal";

type StatusProps = {
  status: "success" | "cancell";
  description?: string;
  image?: "string";
};

export const InfoPopup = memo(({ status, description, image }: StatusProps) => {
  return (
    <Fade triggerOnce>
      <div className="flex flex-col my-4 mx-auto w-full h-full max-w-[350px]   sm:max-w-[400px] max-h-[450px]  lg:max-w-[550px] lg:max-h-[550px] bg-[#E1B989] rounded-xl shadow-2xl">
        <div className="w-full mt-4">
          <Image
            priority={true}
            src={image ? `/${image}.svg` : `/cancell.svg`}
            height={16 / 12}
            width={16 / 9}
            layout="responsive"
            objectFit="contain"
          />
        </div>
        <h1
          className={`mx-auto my-[2rem] tracking-widest text-4xl ${
            status === "success"
              ? "text-[rgba(108,99,255,255)]"
              : "text-[#EA604D]"
          }`}
        >
          {description ? description : "Access Denied :("}
        </h1>
      </div>
    </Fade>
  );
});
