import { memo } from "react";
import { useGetReviewsFromProductQuery } from "../../generated/graphql";
import { InfoPopup } from "../InfoPopup";
import { Spinner } from "../Spinner";

type ProductReviewProps = {
  productID: string;
};

export const ProductReview = memo<ProductReviewProps>(({ productID }) => {
  const { data, loading, error } = useGetReviewsFromProductQuery({
    variables: {
      id: productID
    }
  });

  if (loading) return <Spinner />;
  if (error) {
    return <InfoPopup status="cancell" description={error.message} />;
  }

  return (
    <div className="w-full py-4  max-h-[400px]">
      <ul className="w-full h-full">
        {data?.product?.reviews.length ? (
          data.product?.reviews.map((review, index) => {
            return (
              <li
                className="border-[1px] border-[#E1B989] mx-auto h-full  w-3/4 my-4  rounded-xl p-2"
                key={review.id}
              >
                <p className="text-lg uppercase text-[#E1B989]">
                  {review.name}
                </p>
                <p className="text-[#1d1d1d] text-lg">{review.headline}</p>
                <p className="text-[#1d1d1d]">{review.content}</p>
                {review.rating && (
                  <p>
                    <span className="text-lg text-[#E1B989]">
                      {review.rating}/5
                    </span>
                  </p>
                )}
              </li>
            );
          })
        ) : (
          <div className="text-xl text-center">
            This product doesnt have any reviews...
          </div>
        )}
      </ul>
    </div>
  );
});
