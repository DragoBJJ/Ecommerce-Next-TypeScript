import { memo } from "react";
import { ProductReview } from "./ProductReview";
import { ReviewForm } from "./ReviewForm";

type ReviewProps = {
  productID: string;
};

export const ReviewContainer = memo<ReviewProps>(({ productID }) => {
  return (
    <>
      <div className="overflow-y-auto flex flex-col items-center w-full md:w-3/4 h-auto mx-auto mt-12   shadow-sm shadow-[#1d1d1d] rounded-lg">
        <ProductReview productID={productID} />
      </div>
      <div
        className="flex flex-col justify-center items-center w-full px-4 md:w-3/4 mx-auto pb-4 mt-8  
    shadow-sm shadow-[#1d1d1d]"
      >
        <ReviewForm productID={productID} />
      </div>
    </>
  );
});
