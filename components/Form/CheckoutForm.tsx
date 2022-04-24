import { useForm } from "react-hook-form";
import Image from "next/image";

import { yupResolver } from "@hookform/resolvers/yup";
import { FormData, schema } from "./FormAreaType";
import {
  personalData,
  shippingAddress,
  billingData,
  homeAddress,
  cardData
} from "./FormAreaData";

import { AreaInputs } from "./AreaInputs";
import { CartContent } from "../CartBar/CartContent";
import { UseCartContext } from "../context/CartContext";
import { FormEvent } from "react";

import { useCreateOrderItemMutation } from "../../generated/graphql";
import { addItem } from "../context/actions";

export const CheckoutForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm<FormData>({
    resolver: yupResolver(schema)
  });

  const { cartItems } = UseCartContext();
  console.log("cartItem", cartItems);
  const [
    createOrderItem,
    { data, loading, error }
  ] = useCreateOrderItemMutation();

  console.log("data", data);

  const addItemsOrder = () => {
    cartItems.map(({ id, count }) => {
      createOrderItem({
        variables: {
          data: {
            quantity: count,
            total: count,
            product: {
              connect: {
                id
              }
            }
          }
        }
      });
    });
  };

  const onSubmit = (data: FormData) => {
    addItemsOrder();
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error...</div>;
  if (data) return <div>Your OrderItem has beed created</div>;

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid  grid-cols-2 md:grid-cols-4">
          <div className="flex w-full flex-wrap col-span-2  justify-center">
            <AreaInputs<FormData>
              title="Contact Information"
              inputs={personalData}
              register={register}
              errors={errors}
            />
            <AreaInputs<FormData>
              title="Payment Default"
              inputs={cardData}
              register={register}
              errors={errors}
            />

            <AreaInputs<FormData>
              title="Shipping Address"
              inputs={shippingAddress}
              register={register}
              errors={errors}
            />
            <AreaInputs<FormData>
              title="Home Address"
              inputs={homeAddress}
              register={register}
              errors={errors}
              selectOptions={["Arizona", "Kujawsko/Pomorski", "Massachusetts"]}
            />
            <AreaInputs<FormData>
              title="Billing Information"
              register={register}
              errors={errors}
              inputs={billingData}
            />
            <div className="w-full  px-3 mx-3 mb-6">
              <button
                type="submit"
                className=" ease-in-out duration-500 bg-white border-2 border-[#E1B989] hover:bg-[#E1B989] rounded-2xl  w-full  max-w-[180px]  h-[48px]"
              >
                <p className="text-xl">Submit</p>
              </button>
            </div>
          </div>
          <div className="flex flex-col col-span-2">
            <div className="w-full h-full top-0 hidden md:block">
              <Image
                priority={true}
                src="/family.jpeg"
                height={16 / 7}
                width={16 / 9}
                layout="responsive"
                objectFit="cover"
              />
              <CartContent cartItems={cartItems} />
            </div>
          </div>
        </div>
      </form>
    </>
  );
};
