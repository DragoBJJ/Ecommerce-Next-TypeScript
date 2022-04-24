import { memo } from "react";
import { ProductReview } from "./ProductReview";
import { ReviewForm } from "./ReviewForm";

type ReviewProps = {
  productID: string;
};

export const ReviewContainer = memo<ReviewProps>(({ productID }) => {
  return (
    <>
      <div className="flex flex-col justify-center items-center w-3/4 mx-auto mt-12 border-2">
        <ProductReview productID={productID} />
      </div>
      <div className="flex flex-col justify-center items-center w-3/4 mx-auto mt-12 border-2">
        <ReviewForm productID={productID} />
      </div>
    </>
  );
});
