export const longDateConvert = (date: string | null): string => {
  if (date) {
    const year = date?.split('-')[0];
    const month = date?.split('-')[1];
    const day = date?.split('-')[2];

    return `${day}/${month}/${year}`;
  }

  return '--/--/--';
};

export const shortDateConvert = (date: string | null): string => {
  if (date) {
    const year = date?.split('-')[0];
    const month = date?.split('-')[1];

    return `${month}/${year}`;
  }

  return '--/--/--';
};
