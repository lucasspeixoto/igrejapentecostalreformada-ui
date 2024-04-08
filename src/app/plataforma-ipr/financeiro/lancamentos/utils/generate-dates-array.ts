import { getActualDate } from './get-actual-date';

export function generateDatesArray(
  startYear: number,
  startMonth: number
): string[] {
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
