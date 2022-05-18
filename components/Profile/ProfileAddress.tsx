import { memo } from "react";
import { ShippingAddressType } from "../../utils/type";

type ProfileAddressType = {
  shippingAddress: ShippingAddressType;
};

export const ProfileAddress = memo<ProfileAddressType>(
  ({ shippingAddress }) => {
    return (
      <div className="flex m-2 mx-auto lg:ml-auto w-full  md:w-3/4  lg:w-1/3">
        <div className="flex-col  w-full  h-auto p-4 text-[#E1B989] bg-neutral-800 justify-start  items-center rounded-xl shadow-lg shadow-neutral-800">
          <h1 className="text-2xl mb-4 tracking-widest text-center">
            Shipping Address
          </h1>
          {shippingAddress && (
            <div className="flex justify-between">
              <div className="text-lg tracking-widest">
                <p>{shippingAddress.city}</p>
                <p>{shippingAddress.state}</p>
                <p>{shippingAddress.postalCode}</p>
                <p>{shippingAddress.streetAddress}</p>
                <p>{shippingAddress.city}</p>
              </div>
              <div className="text-lg tracking-widest">
                <p>{shippingAddress.firstName}</p>
                <p>{shippingAddress.lastName}</p>
                <p>{shippingAddress.email}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
);
