import { useForm } from "react-hook-form";
import Image from "next/image";

import { yupResolver } from "@hookform/resolvers/yup";
import { ReviewData, reviewSchema } from "../Form/FormAreaType";
import { reviewInputData } from "../Form/FormAreaData";

import { AreaInputs } from "../Form/AreaInputs";
import {
  GetReviewsFromProductDocument,
  GetReviewsFromProductQuery,
  useCreateProductReviewMutation,
  usePublishManyReviewsMutation
} from "../../generated/graphql";
import { memo } from "react";
import { useSession } from "next-auth/react";
import { InfoPopup } from "../InfoPopup";
import { Spinner } from "../Spinner";

type ReviewFormType = {
  productID: string;
};

export const ReviewForm = memo<ReviewFormType>(({ productID }) => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<ReviewData>({
    resolver: yupResolver(reviewSchema)
  });
  const { data: session, status } = useSession();
  const [
    createReview,
    { loading: reviewLoading, error }
  ] = useCreateProductReviewMutation({
    update(cache, { data, errors }) {
      const orginalQuery = cache.readQuery<GetReviewsFromProductQuery>({
        query: GetReviewsFromProductDocument,
        variables: { id: productID }
      });

      if (errors) {
        errors.map(item => {
          throw new Error(item.originalError?.message);
        });
      }

      if (
        !orginalQuery ||
        !orginalQuery.product?.reviews ||
        !data?.createReview
      ) {
        return null;
      }

      const newQuery = {
        ...orginalQuery,
        product: {
          ...orginalQuery.product,
          reviews: [...orginalQuery.product?.reviews, data.createReview]
        }
      };
      cache.writeQuery({
        query: GetReviewsFromProductDocument,
        variables: { id: productID },
        data: newQuery
      });
    }
  });

  const [setPublishManyReviews] = usePublishManyReviewsMutation();

  if (status === "unauthenticated") {
    return <div className="text-xl text-center">Sign in to add reviews</div>;
  }
  if (reviewLoading) {
    return <Spinner isSmaller />;
  }
  if (error) {
    return <InfoPopup status="cancell" description="Error with your review" />;
  }

  const onSubmit = async (data: ReviewData) => {
    if (!session?.user.id) return;
    await createReview({
      variables: {
        review: {
          ...data,
          email: session.user.email,
          product: {
            connect: {
              id: productID
            }
          }
        }
      },
      optimisticResponse: {
        __typename: "Mutation",
        createReview: {
          __typename: "Review",
          id: (-Math.random()).toString(25),
          ...data
        }
      }
    });
    await setPublishManyReviews();
  };
  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full flex flex-col justify-center items-center"
      >
        <AreaInputs
          title="Review Section"
          inputs={reviewInputData}
          register={register}
          errors={errors}
        />
        <div className=" flex w-full px-3 justify-center items-center">
          <button
            type="submit"
            className=" ease-in-out duration-500 bg-white border-2 border-[#E1B989] hover:bg-[#E1B989] rounded-2xl  w-full  max-w-[180px]  h-[48px]"
          >
            <p className="text-xl">Submit</p>
          </button>
        </div>
      </form>
    </>
  );
});
