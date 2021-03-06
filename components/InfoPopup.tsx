import { memo } from "react";
import Image from "next/image";
import { Fade } from "react-awesome-reveal";

type StatusProps = {
  status: "success" | "cancell" | "info";
  description?: string;
  image?: string;
};

export const InfoPopup = memo<StatusProps>(({ status, description, image }) => {
  const logicCss = `${
    status === "success" || status === "info"
      ? "text-[rgba(108,99,255,255)]"
      : "text-[#EA604D]"
  }`;
  return (
    <Fade triggerOnce style={{ width: "100%" }}>
      <div
        className="flex flex-col my-4 mx-auto w-full h-full max-w-[380px] max-h-[380px] sm:max-w-[400px] sm:max-h-[400px] 
      md:max-w-[500px] md:max-h-[500px] lg:max-w-[550px]
        lg:max-h-[550px] bg-[#E1B989] rounded-xl shadow-2xl"
      >
        <div className="w-full mt-4">
          <Image
            priority={true}
            src={image ? `/${image}.svg` : `/cancell.svg`}
            alt="resultImage"
            height={5 / 4}
            width={16 / 7}
            layout="responsive"
            objectFit="contain"
          />
        </div>
        <h1
          className={`mx-auto my-[2rem] w-full text-center tracking-widest text-md md:text-2xl ${logicCss}`}
        >
          {description ? description : "Access Denied"}
        </h1>
      </div>
    </Fade>
  );
});
