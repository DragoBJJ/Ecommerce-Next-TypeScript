import { memo } from "react";
import { ProductReview } from "./ProductReview";
import { ReviewForm } from "./ReviewForm";

type ReviewProps = {
  productID: string;
};

export const ReviewContainer = memo<ReviewProps>(({ productID }) => {
  return (
    <>
      <div className=" overflow-y-auto flex flex-col items-center w-3/4 h-[400px] mx-auto mt-12  shadow-md shadow-[#1d1d1d] rounded-lg">
        <ProductReview productID={productID} />
      </div>
      <div
        className="flex flex-col justify-center items-center w-3/4 mx-auto pb-4 mt-8 border-2 
      border-[#E1B989]"
      >
        <ReviewForm productID={productID} />
      </div>
    </>
  );
});
