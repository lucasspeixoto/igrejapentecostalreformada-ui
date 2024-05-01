import { getActualDate } from './get-actual-date';

/**
 * Generate an array of dates between two specified dates.
 * @param startYear - the year of the first date in the range
 * @param startMonth - the month of the first date in the range (1-indexed)
 * @returns an array of dates in the specified range
 */
export function generateMonthAndYearList(startYear: number, startMonth: number): string[] {
  const datesArray = [];

  const currentDate = getActualDate();
  const endYear = +currentDate.split('/')[1];
  const endMonth = +currentDate.split('/')[0];

  for (let year = startYear; year <= endYear; year += 1) {
    const startMonthIndex = year === startYear ? startMonth : 1;
    const endMonthIndex = year === endYear ? endMonth : 12;

    for (let month = startMonthIndex; month <= endMonthIndex; month += 1) {
      const monthString = month < 10 ? `0${month}` : `${month}`;
      datesArray.push(`${monthString}/${year}`);
    }
  }

  return datesArray.reverse();
}

export function generateYearList(startYear: number): number[] {
  const years = [];

  const currentDate = getActualDate();
  const endYear = +currentDate.split('/')[1];

  for (let year = startYear; year <= endYear; year += 1) {
    years.push(year);
  }

  return years.reverse();
}
