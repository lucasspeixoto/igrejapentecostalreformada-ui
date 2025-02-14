/**
 * Determines if a given date is greater than the current month and year.
 *
 * @param dateString - The date string in the format 'MM/YYYY' to compare.
 * @param current - The current date string in the format 'MM/YYYY' to compare against.
 * @returns A boolean indicating whether the given date is greater than the current month and year.
 */
export function isDateGreaterThanCurrentMonth(dateString: string, current: string): boolean {
  // Split and convert the input date and current date to numbers (month and year)
  const [inputMonth, inputYear] = dateString.split('/').map(Number);
  const [currentMonth, currentYear] = current.split('/').map(Number);

  if (
    Number.isNaN(inputMonth) ||
    Number.isNaN(inputYear) ||
    Number.isNaN(currentMonth) ||
    Number.isNaN(currentYear) ||
    inputMonth < 1 ||
    inputMonth > 12 ||
    currentMonth < 1 ||
    currentMonth > 12
  ) {
    return false;
  }

  if (inputYear > currentYear) {
    return true;
  }

  if (inputYear === currentYear && inputMonth > currentMonth) {
    return true;
  }

  return false;
}
