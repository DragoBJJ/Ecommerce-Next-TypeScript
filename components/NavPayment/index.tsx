import { IoRocketOutline } from "react-icons/io5";
import { useRouter } from "next/router";
import { CgCreditCard } from "react-icons/cg";
import { BsCartCheck } from "react-icons/bs";

export const NavPayment = () => {
  const router = useRouter();

  const shipping = router.asPath.includes("address")!!;
  const payment = router.asPath.includes("payment")!!;
  const summary = router.asPath.includes("summary")!!;

  return (
    <>
      <div className="flex w-full h-[100px] bg-neutral-800   justify-center  items-center">
        <div className="flex mx-4  cursor-pointer pointer w-[60px] h-[60px] items-center justify-center rounded-full border-[1px] border-[#E1B989]">
          <IoRocketOutline
            color={shipping || payment || summary ? "#E1B989" : "#fff"}
            size="40px"
          />
        </div>
        <div className="inline-block border-[1px] border-[#E1B989] w-[3rem] lg:w-[6rem]"></div>
        <div className="flex mx-4 w-[60px] cursor-pointer h-[60px] items-center justify-center rounded-full border-[1px] border-[#E1B989]">
          <CgCreditCard
            color={payment || summary ? "#E1B989" : "#fff"}
            size="40px"
          />
        </div>
        <div className="inline-block border-[1px] border-[#E1B989] w-[3rem] lg:w-[6rem]"></div>
        <div className="flex mx-4 w-[60px] cursor-pointer h-[60px] items-center justify-center rounded-full border-[1px] border-[#E1B989]">
          <BsCartCheck color={summary ? "#E1B989" : "#fff"} size="40px" />
        </div>
        {/* <div className="inline-block border-[1px] border-[#E1B989] w-[3rem] lg:w-[6rem]"></div>
        <div className="inline-block mx-4 w-[60px] h-[60px] rounded-full border-[1px] border-[#E1B989]"></div> */}
      </div>
    </>
  );
};
