"use client";

import { useNewAddressModal } from "../../contexts/NewAddressModalContext";

import MainButton from "@/app/components/ui/MainButton";

export default function AccountAddresses() {
  //New address modal variables
  const { openNewAddressModal } = useNewAddressModal();

  return (
    <div className="space-y-4">
      {/** Add new address button */}
      <MainButton
        className="!w-full !max-w-[280px]"
        onClick={() => openNewAddressModal()}
      >
        <span className="mr-2">+</span>Add New Address
      </MainButton>

      {/** New Address modal */}
    </div>
  );
}
