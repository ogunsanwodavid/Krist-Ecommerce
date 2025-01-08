import { useRouter } from "next/navigation";

import { useCheckout } from "../../contexts/CheckoutContext";

import { HiMiniShoppingBag } from "react-icons/hi2";

export default function OrderCompletedModal() {
  //Checkout context variables
  const { closeOrderCompletedModal } = useCheckout();

  //Router function
  const router = useRouter();

  //Handle view orders
  function handleViewOrders() {
    //Close modal
    closeOrderCompletedModal();

    //Route to orders page
    router.push("/account/orders");
  }

  //Handle back to home
  function handleBackHome() {
    //Close modal
    closeOrderCompletedModal();

    //Route to home page
    router.push("/");
  }

  return (
    <div className="fixed top-0 left-0 min-h-screen w-screen bg-[rgba(0,0,0,0.4)] z-[300] flex items-center justify-center p-3">
      {/* Modal Content */}
      <main className="w-full max-w-[500px] max-h-[calc(100vh_-_24px)] overflow-y-auto mx-auto bg-white rounded-xl p-4 text-black space-y-1 md:space-y-3 md:p-7">
        {/** Pattern */}
        <div className="w-max mx-auto bg-gray-200 rounded-full p-3 flex items-center justify-center">
          <div className="bg-gray-400 rounded-full p-3 flex items-center justify-center">
            <div className="bg-black rounded-full p-5 flex items-center justify-center">
              <HiMiniShoppingBag className="text-white text-xl md:text-2xl" />
            </div>
          </div>
        </div>

        {/** Texts */}
        <div className="space-y-2">
          <h5 className="text-[20px] text-center font-semibold md:text-[22px]">
            Your order is confirmed
          </h5>

          <p className="text-base text-center md:text-lg">
            Thanks for shopping! We will send you an email when it&apos;s ready
            for pickup.
          </p>
        </div>

        {/** Buttons */}
        <section className="!mt-5 space-y-3">
          {/** View order */}
          <button
            className="w-full h-max px-4 py-2 text-white bg-black border-[2px] border-black flex items-center justify-center rounded-[7px] z-10 md:text-lg"
            onClick={handleViewOrders}
          >
            View Orders
          </button>

          {/** Back to home */}
          <button
            className="w-full h-max px-4 py-2 text-black border-[2px] border-black flex items-center justify-center rounded-[7px] z-10 md:text-lg"
            onClick={handleBackHome}
          >
            Back to Home
          </button>
        </section>
      </main>
    </div>
  );
}
