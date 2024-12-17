import { BsBoxSeam } from "react-icons/bs";

import { CiDollar } from "react-icons/ci";

import { PiCreditCard, PiHeadphones } from "react-icons/pi";

export default function OurServices() {
  return (
    <div className="w-full">
      {/**** Inner container */}
      <div className="w-full max-w-[1200px] mx-auto px-3 py-8 space-y-4 md:px-6 md:py-20 md:space-y-7 lg:px-0">
        {/*** Header */}
        <header className="w-full flex items-center justify-center">
          <h2 className="text-black text-[23px] text-center md:text-3xl">
            Our Services
          </h2>
        </header>

        {/*** Main list of our services */}
        <main className="flex justify-center flex-wrap gap-[30px] gap-y-[50px] cursor-pointer">
          {/*** Free Shipping */}
          <section className="w-full max-w-[277.5px] flex flex-col items-center gap-4 text-black md:items-start">
            <BsBoxSeam className="text-4xl" />

            <h5 className="font-semibold text-lg leading-[18px]">
              Free Shipping
            </h5>

            <p className="leading-[16px]">Free shipping for above $30</p>
          </section>

          {/*** Money Guarantee */}
          <section className="w-full max-w-[277.5px] flex flex-col items-center gap-4 text-black md:items-start">
            <CiDollar className="text-4xl" />

            <h5 className="font-semibold text-lg leading-[18px]">
              Money Guarantee
            </h5>

            <p className="leading-[16px]">Within 30 days for an exchange</p>
          </section>

          {/*** Order Support */}
          <section className="w-full max-w-[277.5px] flex flex-col items-center gap-4 text-black md:items-start">
            <PiHeadphones className="text-4xl" />

            <h5 className="font-semibold text-lg leading-[18px]">
              Online Support
            </h5>

            <p className="leading-[16px]">24 hours a day, 7 days a week</p>
          </section>

          {/*** Flexible Payment */}
          <section className="w-full max-w-[277.5px] flex flex-col items-center gap-4 text-black md:items-start">
            <PiCreditCard className="text-4xl" />

            <h5 className="font-semibold text-lg leading-[18px]">
              Flexible Payment
            </h5>

            <p className="leading-[16px]">Pay with multiple credit cards</p>
          </section>
        </main>
      </div>
    </div>
  );
}
