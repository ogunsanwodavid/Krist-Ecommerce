import { TbCurrencyNaira } from "react-icons/tb";

export default function FormatCurrencyNaira({ amount }: { amount: number }) {
  // Convert to string and format with commas
  const formattedAmount = amount
    .toFixed(2)
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  // Return formatted string with a naira symbol inside a div
  return (
    <div className="flex items-center">
      <TbCurrencyNaira className="inline text-lg md:text-xl" />
      <p className="leading-[20px]">{formattedAmount}</p>
    </div>
  );
}
