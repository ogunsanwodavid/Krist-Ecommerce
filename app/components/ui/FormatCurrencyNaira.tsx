import { TbCurrencyNaira } from "react-icons/tb";

export default function FormatCurrencyNaira({
  amount,
  iconStyles,
  textStyles,
}: {
  amount: number;
  iconStyles?: string;
  textStyles?: string;
}) {
  // Convert to string and format with commas
  const formattedAmount = amount
    .toFixed(2)
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  // Return formatted string with a naira symbol inside a div
  return (
    <span className="inline-flex items-center">
      <TbCurrencyNaira className={`inline text-lg md:text-xl ${iconStyles}`} />
      <p className={`leading-[20px] ${textStyles}`}>{formattedAmount}</p>
    </span>
  );
}
