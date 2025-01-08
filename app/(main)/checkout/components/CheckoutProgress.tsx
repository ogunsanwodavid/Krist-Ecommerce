import { usePathname } from "next/navigation";

import { HiOutlineDocumentText } from "react-icons/hi2";

import { PiCreditCard } from "react-icons/pi";

import { TbHome } from "react-icons/tb";

export default function CheckoutProgress() {
  //Pathname function
  const pathname = usePathname();

  //Check current active page
  const isAddressPage = pathname === "/checkout/address";
  const isPaymentPage = pathname === "/checkout/payment";
  const isReviewPage = pathname === "/checkout/review";

  return (
    <div
      className={`relative checkout-progress hidden w-full cursor-pointer lg:block ${
        (isPaymentPage || isReviewPage) &&
        "after:!bg-[linear-gradient(to_right,_#131118_5px,_transparent_2px)]"
      } ${
        isReviewPage &&
        "before:!bg-[linear-gradient(to_right,_#131118_5px,_transparent_2px)]"
      }`}
    >
      <main className="w-full flex items-center justify-between overflow-hidden">
        {/** Address */}
        <section className="flex flex-col items-center gap-y-2">
          <div
            className={`w-[45px] h-[45px] bg-gray-100 rounded-[10px] flex items-center justify-center ${
              (isAddressPage || isPaymentPage || isReviewPage) && "!bg-black"
            }`}
          >
            <TbHome
              className={`text-[25px] text-black ${
                (isAddressPage || isPaymentPage || isReviewPage) &&
                "!text-white"
              }`}
            />
          </div>

          <p
            className={`text-[17px] text-gray-400 ${
              (isAddressPage || isPaymentPage || isReviewPage) && "!text-black"
            }`}
          >
            Address
          </p>
        </section>

        {/** Payment */}
        <section className="flex flex-col items-center gap-y-2">
          <div
            className={`w-[45px] h-[45px] bg-gray-100 rounded-[10px] flex items-center justify-center ${
              (isPaymentPage || isReviewPage) && "!bg-black"
            }`}
          >
            <PiCreditCard
              className={`text-[25px] text-black ${
                (isPaymentPage || isReviewPage) && "!text-white"
              }`}
            />
          </div>

          <p
            className={`text-[17px] text-gray-400 ${
              (isPaymentPage || isReviewPage) && "!text-black"
            }`}
          >
            Payment Method
          </p>
        </section>

        {/** Review */}
        <section className="flex flex-col items-center gap-y-2">
          <div
            className={`w-[45px] h-[45px] bg-gray-100 rounded-[10px] flex items-center justify-center ${
              isReviewPage && "!bg-black"
            }`}
          >
            <HiOutlineDocumentText
              className={`text-[25px] text-black ${
                isReviewPage && "!text-white"
              }`}
            />
          </div>

          <p
            className={`text-[17px] text-gray-400 ${
              isReviewPage && "!text-black"
            }`}
          >
            Review
          </p>
        </section>
      </main>
    </div>
  );
}
