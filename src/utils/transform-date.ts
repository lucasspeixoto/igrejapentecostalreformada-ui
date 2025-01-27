import { Months } from '@relatorios/constants/months';
import { Timestamp } from 'firebase/firestore';

/**
 * @status: Tested
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
 * @status: Tested
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

/**
 * Returns a human-friendly representation of a Firebase Firestore timestamp.
 *
 * @param timestamp - A Firebase Firestore timestamp.
 * @returns A string representation of the timestamp in the format "MM/DD/YYYY".
 */
export function formatFirebaseTimestampDate(timestamp: Timestamp) {
  const date = new Date(timestamp.seconds * 1000);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
}

/**
 * Returns an object containing the start and end dates of the current week.
 *
 * @returns An object with `start` and `end` properties, each of which is a
 * Date object representing the start and end of the current week, respectively.
 */
export function getStartAndEndOfWeek(): { start: Date; end: Date } {
  const currentDate = new Date();

  const startDate = new Date(currentDate);
  const endDate = new Date(currentDate);

  startDate.setDate(startDate.getDate() - startDate.getDay());
  endDate.setDate(endDate.getDate() + (6 - endDate.getDay()));

  return { start: startDate, end: endDate };
}

/**
 * Returns the start and end dates of the current month.
 *
 * @returns An object with `start` and `end` properties, each of which is a
 * Date object representing the start and end of the current month, respectively.
 */
export function getStartAndEndOfMonth() {
  const currentDate = new Date();

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const startDate = new Date(year, month, 1);
  const endDate = new Date(year, month + 1, 0);

  return { start: startDate, end: endDate };
}

/**
 * Returns the month description from the month index.
 *
 * @param date - The date object.
 * @returns The month description.
 */
export function getMonthDescriptionFromMonthIndex(date: Date): string {
  return Months[(date.getMonth() + 1).toString().padStart(2, '0')];
}

/**
 * Returns the day description from the date.
 *
 * @param date - The date object.
 * @returns The day description.
 */
export function getDayDescriptionFomDate(date: Date): string {
  return date.getDate().toString().padStart(2, '0');
}

/**
 * Generates a Firebase Firestore Timestamp from a string date in the format "yyyy-mm-dd".
 *
 * @param date - The string date to convert to a Timestamp.
 * @returns A Firebase Firestore Timestamp object.
 */
export function generateTimestampFromStringDate(date: string): Timestamp {
  const year = +date.split('-')[0];
  const month = +date.split('-')[1] - 1;
  const day = +date.split('-')[2];

  return Timestamp.fromDate(new Date(year, month, day));
}

/**
 * Returns the year from a given Firestore timestamp.
 *
 * @param timestamp - the Firestore timestamp
 * @returns the year from the timestamp
 */
export function getYearFromTimestampDate(timestamp: Timestamp): number {
  const time = timestamp.toDate();
  return time.getFullYear();
}

/**
 * Returns the month from a given Firestore timestamp.
 *
 * @param timestamp - the Firestore timestamp
 * @returns the month from the timestamp (1-indexed)
 */
export function getMonthFromTimestampDate(timestamp: Timestamp): number {
  const time = timestamp.toDate();
  return time.getMonth() + 1;
}

/**
 * Returns a string representation of a Firebase Firestore timestamp in the format "MM/DD/YYYY".
 *
 * @param timestamp - A Firebase Firestore timestamp.
 * @returns A string representation of the timestamp in the format "MM/DD/YYYY".
 */
export function getStringDateFromTimestampDate(timestamp: Timestamp): string {
  const time = timestamp.toDate();

  const month = time.getMonth() + 1;
  const day = time.getDate();
  const year = time.getFullYear();

  return `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
}

/**
 * Transforms a date string in the format 'YYYY-MM-DD' to a Date object.
 *
 * @param dateString - The date string to transform.
 * @returns A Date object representing the given date string.
 */
export const transformStringToDate = (dateString: string): Date => {
  const [year, month, day] = dateString.split('-').map(Number);
  const now = new Date();
  return new Date(year, month - 1, day, now.getHours(), now.getMinutes(), now.getSeconds());
};

/**
 * Transforms a Date object into a string formatted as "DD/MM/YYYY".
 *
 * @param date - The Date object to be transformed.
 * @returns A string representing the date in "DD/MM/YYYY" format.
 */
export function transformDateToString(date: Date) {
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
}
