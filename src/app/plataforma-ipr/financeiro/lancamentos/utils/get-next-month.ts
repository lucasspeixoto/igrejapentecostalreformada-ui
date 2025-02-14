export const getNextMonth = (currentMonth: string): string => {
  const [month, year] = currentMonth.split('/').map(Number);

  if (Number.isNaN(month) || Number.isNaN(year) || month < 1 || month > 12) {
    throw new Error('Invalid date format. Use MM/YYYY');
  }

  let newMonth = month + 1;
  let newYear = year;

  if (newMonth > 12) {
    newMonth = 1;
    newYear += 1;
  }

  return `${newMonth.toString().padStart(2, '0')}/${newYear}`;
};
