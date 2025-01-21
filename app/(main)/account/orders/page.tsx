"use client";

import Image from "next/image";

import { ReduxStoreState } from "@/app/redux/store";

import { useAppSelector } from "@/app/hooks/redux";

import { Order as OrderModel } from "@/app/models/orders";

import Order from "./components/Order";

import noOrderImg from "@/public/noOrder.svg";

export default function AccountOrders() {
  //Orders from the redux state
  const orders: OrderModel[] = useAppSelector(
    (state: ReduxStoreState) => state.orders.orders
  );

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
            return <Order order={order} key={order.id} />;
          })}
        </main>
      )}
    </div>
  );
}
