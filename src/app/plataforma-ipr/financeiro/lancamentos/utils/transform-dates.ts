export const generateDateFromString = (stringDate: string): Date => {
  return new Date(stringDate.split('/').reverse().join('-'));
};
