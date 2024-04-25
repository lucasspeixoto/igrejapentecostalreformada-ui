/**
 * Returns the current date in the format "MM/YYYY".
 *
 * @returns The current date in the format "MM/YYYY".
 */
export function getActualDate(): string {
  const currentDate = new Date();

  const currentMonth = currentDate.getMonth() + 1;
  const currentYear = currentDate.getFullYear();

  const monthString =
    currentMonth < 10 ? `0${currentMonth}` : `${currentMonth}`;

  return `${monthString}/${currentYear}`;
}
