/**
 * Accepts an array and randomizes its content indexes using the Fisher-Yates Shuffle Algorithm
 * @param array - The array to be shuffled
 * @returns A shuffled array
 */
export const shuffleArray = <T>(array: T[]): T[] => {
  const shuffled = [...array]; // Create a shallow copy to avoid mutating the original array
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1)); // Generate a random index between 0 and i (inclusive)
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]; // Swap the elements at index i and j
  }
  return shuffled; // Return the shuffled array
};

/**
 * Formats a numeric value with thousands separators and preserves its decimal precision.
 * @param amount - The numeric value to format
 * @returns A string representing the formatted value without the currency symbol
 */
export const formatToCurrency = (amount: number): string => {
  return amount.toLocaleString("en-NG", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  });
};
