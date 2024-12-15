/**
 * Formats a number as currency in US Dollars ($).
 * Converts from Naira using the provided exchange rate.
 * @param amount - The amount in Naira to convert and format.
 * @param exchangeRate - The current exchange rate from Naira to Dollar.
 * @returns The formatted currency string in Dollars.
 */
export const formatCurrencyDollar = (amount: number): string => {
  const exchangeRate = 1650;
  // Ensure the amount is a finite number
  if (!isFinite(amount) || !isFinite(exchangeRate) || exchangeRate <= 0) {
    throw new Error("Invalid amount or exchange rate");
  }

  // Convert Naira to Dollar
  const dollarAmount = amount / exchangeRate;

  // Convert to string and format with commas
  const formattedAmount = dollarAmount
    .toFixed(2)
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  // Return formatted string with Dollar symbol
  return `$${formattedAmount}`;
};
