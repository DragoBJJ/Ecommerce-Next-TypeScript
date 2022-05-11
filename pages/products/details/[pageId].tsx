import { InferGetStaticPaths } from "../../../utils/type";
import { getPaths, getCurrentProduct } from "../../../utils/getData";
import { InferGetStaticPropsType } from "next";
import { GridTemplate } from "../../../templates/GridTemplate";
import Image from "next/image";
import { UseCartContext } from "../../../components/context/CartContext";

import { MarkDownNext } from "../../../components/MarkDown";

import { serialize } from "next-mdx-remote/serialize";
import { MDXRemote } from "next-mdx-remote";

import { Fade } from "react-awesome-reveal";
import { ReviewContainer } from "../../../components/Review/ReviewContainer";

const ProductID = ({
  product
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  if (!product) return <h2>You dont have this product</h2>;

  const { addItemToCart } = UseCartContext();

  return (
    <GridTemplate>
      <Fade triggerOnce direction="down">
        <div className="grid grid-cols-1 lg:grid-cols-2 h-[550px] lg:h-[480px] w-11/12 mx-auto bg-white  rounded-xl overflow-hidden py-8  shadow-md shadow-[#1d1d1d]">
          {product.images[0]?.url && (
            <div className=" h-[180px] mb-4 lg:h-full w-full relative">
              <Image
                layout="fill"
                objectFit="contain"
                src={product.images[0].url}
                alt={product.name}
              />
            </div>
          )}

          <div className="overflow-y-auto lg:h-full w-full mx-auto p-6 border-t-2   lg:border-l-2 lg:border-t-0  border-[#E1B989] opacity-80 hover:opacity-100 flex flex-col ease-in-out duration-300 text-white items-center">
            <article className="prose prose-stone  -lg:prose-sm text-[#1d1d1d] text-center">
              <h1>{product.name}</h1>
              <MDXRemote {...product.description} />

              <p className="text-black text-2xl">{product.price}$</p>
              <div
                onClick={() =>
                  addItemToCart({
                    price: product.price,
                    title: product.name,
                    count: 1,
                    id: product.id
                  })
                }
                className="flex  md:my-4 justify-center items-center w-full hover:border-none border-[1px] text-black rounded-lg cursor-pointer mx-auto ease-in-out duration-300 bg-white border-black hover:bg-[#E1B989]  w-full  max-w-[180px]  h-[48px]"
              >
                BUY
              </div>
            </article>
          </div>
        </div>
        <ReviewContainer productID={product.id} />
      </Fade>
    </GridTemplate>
  );
};

export default ProductID;

export const getStaticPaths = async () => {
  const paths = await getPaths();

  if (!paths) {
    return {
      paths: [],
      fallback: false
    };
  }

  return {
    paths,
    fallback: "blocking"
  };
};

export const getStaticProps = async ({
  params
}: InferGetStaticPaths<typeof getStaticPaths>) => {
  if (!params?.pageId)
    return {
      props: {
        data: undefined
      }
    };

  const product = await getCurrentProduct(params.pageId);

  if (!product) {
    return {
      props: {},
      notFound: true
    };
  }

  const description = await serialize(product.description);

  return {
    props: {
      product: {
        ...product,
        description
      }
    },
    revalidate: 60 * 60
  };
};
