import MainButton from "@/app/components/ui/MainButton";

export default function AccountSavedCards() {
  return (
    <div className="space-y-4">
      {/** Add new address button */}
      <MainButton
        className="!w-full !max-w-[280px]"
        //onClick={() => openNewAddressModal()}
      >
        <span className="mr-2">+</span>Add New Card
      </MainButton>
    </div>
  );
}
