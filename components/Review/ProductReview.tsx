import { useGetReviewsFromProductQuery } from "../../generated/graphql";

type ProductReviewProps = {
  productID: string;
};

export const ProductReview = ({ productID }: ProductReviewProps) => {
  const { data, loading, error } = useGetReviewsFromProductQuery({
    variables: {
      id: productID
    }
  });

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error with your Review...</div>;

  return (
    <div className="w-full">
      <ul className="w-full">
        {data?.product?.reviews.length ? (
          data.product?.reviews.map((review, index) => {
            return (
              <li
                className="border-2 border-[#E1B989] mx-auto h-full  w-3/4 my-4  rounded-xl p-2"
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
          <div className="text-2xl text-center">
            This product doesn't have any reviews...
          </div>
        )}
      </ul>
    </div>
  );
};
