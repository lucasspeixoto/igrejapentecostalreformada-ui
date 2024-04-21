import type { Timestamp } from 'firebase/firestore';

/**
 * Convert a long date string to a more human-friendly format.
 * @param date - The long date string to convert, in the format "yyyy-mm-dd".
 * @returns The human-friendly date string, in the format "dd/mm/yyyy".
 */
export const longDateConvert = (date: string | null): string => {
  if (date) {
    const year = date?.split('-')[0];
    const month = date?.split('-')[1];
    const day = date?.split('-')[2];

    return `${day}/${month}/${year}`;
  }

  return '--/--/--';
};

/**
 * Convert a short date string to a more human-friendly format.
 * @param date - The short date string to convert, in the format "yyyy-mm".
 * @returns The human-friendly date string, in the format "mm/yyyy".
 */
export const shortDateConvert = (date: string | null): string => {
  if (date) {
    const year = date?.split('-')[0];
    const month = date?.split('-')[1];

    return `${month}/${year}`;
  }

  return '--/--';
};

export function formatFirebaseTimestampDate(timestamp: Timestamp) {
  const date = new Date(timestamp.seconds * 1000);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
}
