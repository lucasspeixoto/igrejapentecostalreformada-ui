import type { Timestamp } from 'firebase/firestore';

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
