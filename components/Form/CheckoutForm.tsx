import { useForm } from "react-hook-form";
import { FormInput } from "./FormInput";
import FormSelect from "./FormSelect";

export type FormData = {
  email: string;
  nameCard: string;
  cardNumber: string;
  expirationDate: string;
  cvc: string;
  company: string;
  address: string;
  apartament: string;
  city: string;
  state: string;
  postalCode: string;
  billing: string;
};

export const CheckoutForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm<FormData>();

  // const handleSubmitForm = (e: FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   console.log("E", e);
  // };
  const onSubmit = (data: FormData) => console.log(data);

  return (
    <>
      <form className="100" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-wrap mx-3 mb-6">
          <div className="w-full md:w-3/4 mb-4 md:mr-4">
            <h1 className="text-bold text-xl my-5">Contact Information</h1>
            <FormInput<FormData>
              id="email"
              type="text"
              label="E-mail"
              placeholder="Aleksander@gmail.com"
              register={register}
              errors={errors}
              rules={{
                required: "fill this field"
              }}
            />
          </div>
          <div className="w-full  px-3">
            <h1 className="text-bold my-5 text-xl">Payment Details</h1>
            <div className="w-full md:w-1/3 mb-4 md:mr-4">
              <FormInput<FormData>
                id="nameCard"
                type="text"
                label="Name Card"
                placeholder="Visa"
                register={register}
                errors={errors}
                rules={{
                  required: "fill this field"
                }}
              />
            </div>
            <FormInput<FormData>
              id="cardNumber"
              type="text"
              label="Card Number"
              placeholder="1123-1231..."
              register={register}
              errors={errors}
              rules={{
                required: "fill this field"
              }}
            />

            <div className="flex my-4 flex-wrap">
              <div className="w-full md:w-1/3 mb-4 md:mr-4">
                <FormInput<FormData>
                  id="expirationDate"
                  type="date"
                  label="Expiration Date"
                  placeholder="22/3/2022"
                  register={register}
                  errors={errors}
                  rules={{
                    required: "Your format date isn't correct"
                  }}
                />
              </div>
              <div className="w-full md:w-1/3 mb-6">
                <FormInput<FormData>
                  id="cvc"
                  type="text"
                  label="CVC"
                  placeholder="123"
                  register={register}
                  errors={errors}
                  rules={{
                    required: "fill this field"
                  }}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="w-full  px-3 mx-3 mb-6">
          <h1 className="text-bold my-5 text-xl">Shipping Address</h1>
          <FormInput<FormData>
            id="company"
            type="text"
            label="Company"
            placeholder="Apple"
            register={register}
            errors={errors}
            rules={{
              required: "fill this field"
            }}
          />
          <FormInput<FormData>
            id="address"
            label="Address"
            type="text"
            placeholder="Słoneczna"
            register={register}
            errors={errors}
            rules={{
              required: "fill this field"
            }}
          />
          <FormInput<FormData>
            id="apartament"
            label="Apartament"
            type="text"
            placeholder="Hilton"
            register={register}
            errors={errors}
            rules={{
              required: "fill this field"
            }}
          />
        </div>
        <div className="w-full max-w-full flex flex-wrap px-3 border-2 border-red-500  mb-2">
          <div className="w-full md:w-1/3 px-3 mb-6">
            <FormInput<FormData>
              id="city"
              type="text"
              label="City"
              placeholder="Poznan"
              register={register}
              errors={errors}
              rules={{
                required: "fill this field"
              }}
            />
          </div>
          <div className="w-1/3 pl-5 ">
            <FormSelect<FormData>
              id="state"
              register={register}
              label="State"
              errors={errors}
              options={["Florida", "Alaska", "Texas"]}
            />
          </div>
          <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <FormInput<FormData>
              id="postalCode"
              type="text"
              label="Postal Code"
              placeholder="63-430"
              register={register}
              errors={errors}
              rules={{
                required: "fill this field"
              }}
            />
          </div>
        </div>
        <div>
          <div className="w-full md:max-w-3/4 px-3 mb-6 md:mb-0">
            <h1 className="text-bold my-5 text-xl">Billing Information</h1>

            <FormInput<FormData>
              id="billing"
              type="checkbox"
              label="Same information as a Shipping Address"
              register={register}
              errors={errors}
            />
          </div>
        </div>

        <div className="w-full  px-3 mx-3 mb-6">
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
};
