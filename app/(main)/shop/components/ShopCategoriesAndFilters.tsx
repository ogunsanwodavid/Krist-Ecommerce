import { CgClose } from "react-icons/cg";

interface ShopCategoriesAndFiltersProps {
  isOpen: boolean;
  setIsOpen: (arg0: boolean) => void;
}

export default function ShopCategoriesAndFilters({
  isOpen,
  setIsOpen,
}: ShopCategoriesAndFiltersProps) {
  function handleClose() {
    setIsOpen(false);
  }

  return (
    <div
      className={`${
        !isOpen ? "!w-0" : "w-full"
      } fixed left-0 top-[61px] h-full max-w-[277.5px] bg-white z-30 shadow-md transition-all duration-300 ease-in-out overflow-hidden flex flex-col md:top-[67px] lg:top-0 lg:h-max lg:block lg:!relative lg:!w-[277.5px] lg:mr-[30px] lg:flex-shrink-0 `}
    >
      {/*** Inner container */}
      <main className="w-full p-4">
        {/*** Close button */}
        <CgClose
          className="text-black text-lg ml-auto lg:hidden"
          onClick={handleClose}
        />
      </main>
    </div>
  );
}
