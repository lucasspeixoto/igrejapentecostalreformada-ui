import type { Timestamp } from 'firebase/firestore';

export const getYearFromTimestampDate = (timestamp: Timestamp): number => {
  const time = timestamp.toDate();
  return time.getFullYear();
};

export const getMonthFromTimestampDate = (timestamp: Timestamp): number => {
  const time = timestamp.toDate();
  return time.getMonth() + 1;
};
