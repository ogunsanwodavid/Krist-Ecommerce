"use client";

import Image from "next/image";
import Link from "next/link";

import { useAppDispatch, useAppSelector } from "@/app/hooks/redux";

import { ReduxStoreState } from "@/app/redux/store";

import { cancelOrder } from "@/app/redux/ordersSlice";

import { Order } from "@/app/models/orders";

import { formatToSupabaseImageUrl } from "@/app/lib/supabase";

import { parseISO, isAfter } from "date-fns";

import { formatToCurrency } from "@/app/utils/helpers";

import noOrderImg from "@/public/noOrder.svg";

export default function AccountOrders() {
  //Orders from the redux state
  const orders: Order[] = useAppSelector(
    (state: ReduxStoreState) => state.orders.orders
  );

  //Dispatch function
  const dispatch = useAppDispatch();

  return (
    <div>
      {/** Header */}
      <header>
        <h3 className="text-black text-[20px] lg:hidden">My Orders</h3>
      </header>

      {/** Main list of orders */}
      {orders.length === 0 ? (
        <div className="w-full flex flex-col items-center justify-center gap-4 py-3 text-black lg:py-6">
          <Image
            src={noOrderImg}
            className="w-full max-w-[210px] md:max-w-[280px]"
            alt="No order error image"
          />
          <p className="text-base text-center md:text-lg">
            You currently have no orders.
          </p>
        </div>
      ) : (
        <main>
          {orders.map((order) => {
            //Order product
            const orderProduct = order.product;

            //Supabase url for the product image
            const productImageUrl = formatToSupabaseImageUrl(
              "productImages",
              orderProduct.item.image
            );

            //Product's price
            const productPrice = orderProduct.item.discount
              ? orderProduct.item.price - orderProduct.item.discount
              : orderProduct.item.price;

            //Product's size and color
            const productSize = orderProduct.size;
            const productColor = orderProduct.color;

            //Product subtotal
            const productSubtotal = productPrice * orderProduct.quantity;

            //Function check delivery status
            function checkIfDelivered(deliveryDateISO: string): boolean {
              // Convert ISO string to Date object
              const deliveryDate = parseISO(deliveryDateISO);

              // Get the current date and time
              const currentDate = new Date();

              // Check if the current date is after the delivery date
              return isAfter(currentDate, deliveryDate);
            }

            //Product delivery status
            const isProductDelivered = checkIfDelivered(order.deliveryDate);

            //Function to cancel an undelivered order
            function handleCancelOrder() {
              dispatch(cancelOrder(order.id));
            }

            return (
              <main
                className="py-5 space-y-4 border-b-[2px] border-b-gray-200 lg:space-y-5"
                key={order.id}
              >
                <section className="grid grid-cols-[75px_auto] gap-3 lg:grid-cols-[90px_auto_250px_143px] lg:gap-5 lg:items-center">
                  {/** Image */}
                  <div className="relative w-[75px] h-[75px] rounded-[6px] overflow-hidden lg:w-[90px] lg:h-[90px]">
                    <Image
                      src={productImageUrl}
                      alt={orderProduct.item.title}
                      fill
                      className="object-cover object-center"
                    />
                  </div>

                  {/** Details */}
                  <div className="space-y-1 self-start">
                    {/** Title */}
                    <p className="w-full line-clamp-1 text-ellipsis overflow-hidden font-semibold text-[16px] md:text-[17px]">
                      {orderProduct.item.title}
                    </p>

                    {/** Quantity and price */}
                    <p className=" text-[15px] md:text-[16px] lg:hidden">
                      <span className="font-roboto">₦</span>
                      {formatToCurrency(productSubtotal)} (Qty:{" "}
                      {orderProduct.quantity})
                    </p>

                    {/** Size and color */}
                    {(productSize || productColor) && (
                      <p className="line-clamp-1 text-ellipsis overflow-hidden text-[15px] space-x-1 capitalize md:text-[16px]">
                        {productSize && <span>Size: {productSize}, </span>}

                        {productColor && <span>Color: {productColor}</span>}
                      </p>
                    )}

                    {/** Quantity: DESKTOP */}
                    <p className="hidden text-[15px] md:text-[16px] lg:block">
                      Quantity: {orderProduct.quantity}
                    </p>
                  </div>

                  {/** Subtotal
                   * FOR DESKTOP
                   */}
                  <div className="hidden w-[250px] items-center justify-center lg:flex">
                    <p className="font-semibold">
                      <span className="font-roboto">₦</span>
                      {formatToCurrency(productSubtotal)}
                    </p>
                  </div>

                  {/**
                   * Write review if item has been delivered
                   * Cancel order if item is in process
                   * THIS IS FOR DESKTOP
                   */}
                  <div className="hidden lg:block">
                    {isProductDelivered ? (
                      <Link
                        href={`/shop/${orderProduct.item.id}`}
                        className="block"
                      >
                        <button className="w-[143px] px-4 py-2 rounded-[9px] bg-black text-white text-[17px] flex items-center justify-center">
                          Write A Review
                        </button>
                      </Link>
                    ) : (
                      <button
                        className="w-[143px] px-4 py-2 rounded-[9px] bg-[#FF7262] text-white text-[17px] flex items-center justify-center"
                        onClick={handleCancelOrder}
                      >
                        Cancel Order
                      </button>
                    )}
                  </div>
                </section>

                <section className="flex items-center justify-between">
                  {/** Delivery status */}
                  {isProductDelivered ? (
                    <div className="flex items-center gap-x-5">
                      <button className="w-max px-2 py-1 bg-[rgba(60,209,57,0.1)] text-[14px] text-[#3CD139] font-medium rounded-[5px] lg:text-base lg:px-3">
                        Delivered
                      </button>

                      <p className="hidden lg:block">
                        Your product has been delivered.
                      </p>
                    </div>
                  ) : (
                    <div className="flex items-center gap-x-4">
                      <button className="w-max px-2 py- bg-[rgba(227,178,49,0.1)] text-[14px] text-[#E3B231] font-medium rounded-[5px] lg:text-base lg:px-3">
                        In process
                      </button>

                      <p className="hidden lg:block">
                        Your order is currently being processed.
                      </p>
                    </div>
                  )}

                  {/**
                   * Write review if item has been delivered
                   * Cancel order if item is in process
                   * THIS IS FOR MOBILE
                   */}
                  <div className="lg:hidden">
                    {isProductDelivered ? (
                      <Link
                        href={`/shop/${orderProduct.item.id}`}
                        className="block"
                      >
                        <button className="p-2 rounded-[8px] bg-black text-white text-[15px] flex items-center justify-center">
                          Write A Review
                        </button>
                      </Link>
                    ) : (
                      <button
                        className="p-2 rounded-[8px] bg-[#FF7262] text-white text-[15px] flex items-center justify-center"
                        onClick={handleCancelOrder}
                      >
                        Cancel Order
                      </button>
                    )}
                  </div>
                </section>
              </main>
            );
          })}
        </main>
      )}
    </div>
  );
}
