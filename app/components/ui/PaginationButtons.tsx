import { useRouter, useSearchParams } from "next/navigation";
import { HiArrowLeft, HiArrowRight } from "react-icons/hi2";

interface PaginationButtonsProps<T> {
  items: T[];
  itemsPerPage: number;
  currentPage: number;
}

export default function PaginationButtons<T>({
  items,
  itemsPerPage,
  currentPage,
}: PaginationButtonsProps<T>) {
  const router = useRouter();

  //Search params function
  const searchParams = useSearchParams();

  // Change page and update URL param
  const paginate = (pageNumber: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", String(pageNumber));
    router.push(`?${params.toString()}`, { scroll: true });
  };

  //Check if first or last page
  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === Math.ceil(items.length / itemsPerPage);

  //Go to prev page
  const prevPage = () => {
    //Return if first page
    if (isFirstPage) return;

    const params = new URLSearchParams(searchParams);
    const prevPage = currentPage - 1;
    params.set("page", prevPage.toString());
    router.push(`?${params.toString()}`, { scroll: true });
  };

  //Go to next page
  const nextPage = () => {
    //Return if last page
    if (isLastPage) return;

    const params = new URLSearchParams(searchParams);
    const nextPage = currentPage + 1;
    params.set("page", nextPage.toString());
    router.push(`?${params.toString()}`, { scroll: true });
  };

  return (
    <div className="w-full mt-4 flex flex-wrap items-center justify-center gap-3 py-5 md:gap-6 lg:w-max lg:ml-auto lg:justify-start">
      {/** Previous page navigator */}
      <HiArrowLeft
        className={`text-black text-base cursor-pointer md:text-lg ${
          isFirstPage && "!text-gray-400"
        }`}
        aria-disabled={isFirstPage}
        onClick={prevPage}
      />

      {/** Page button display navigators */}
      {Array.from(
        { length: Math.ceil(items.length / itemsPerPage) },
        (_, i) => (
          <button
            key={i + 1}
            onClick={() => paginate(i + 1)}
            className={`w-[35px] h-[35px] border-black border-[1.5px] rounded-[6px] flex items-center justify-center md:h-[40px] md:w-[40px] ${
              currentPage === i + 1 ? "bg-black text-white" : "text-black"
            }`}
          >
            {i + 1}
          </button>
        )
      )}

      {/** Next page navigator */}
      <HiArrowRight
        className={`text-black text-base cursor-pointer md:text-lg ${
          isLastPage && "!text-gray-400"
        }`}
        aria-disabled={isLastPage}
        onClick={nextPage}
      />
    </div>
  );
}
