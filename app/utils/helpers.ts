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
 * This function is useful for presenting numeric values in a more readable format,
 * such as monetary amounts, but it does not include any currency symbol.
 *
 * @param amount - The numeric value to format
 * @returns A string representing the formatted value with thousands separators
 *          and up to two decimal places, e.g., "1,234.56"
 */
export const formatToCurrency = (amount: number): string => {
  return amount.toLocaleString("en-NG", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  });
};

/**
 * Capitalizes the first letter of each word in a given text string while converting
 * the rest of the letters to lowercase. This ensures proper capitalization format
 * regardless of the input case.
 *
 * @param text - The input string to be capitalized.
 * @returns A string with each word's first letter capitalized and the remaining letters in lowercase.
 *          Example: "hello WORLD" -> "Hello World"
 */
export function capitalizeText(text: string): string {
  return text
    .toLowerCase() // Convert the entire string to lowercase first.
    .replace(/\b\w/g, (char: string) => char.toUpperCase()); // Capitalize the first letter of each word.
}

/**
 * Formats a given Date object into a string in the format "Month DD, YYYY".
 *
 * @param date - The Date object to be formatted.
 * @returns A string representation of the date in the format "Month DD, YYYY".
 *          Example: June 05, 2023
 */
export function formatDate(date: Date): string {
  const options: Intl.DateTimeFormatOptions = {
    month: "long",
    day: "2-digit",
    year: "numeric",
  };
  return date.toLocaleDateString("en-US", options); // Format the date based on the specified options.
}
