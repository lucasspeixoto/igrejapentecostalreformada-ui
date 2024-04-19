import { Timestamp } from 'firebase/firestore';

import {
  getMonthFromTimestampDate,
  getYearFromTimestampDate,
} from '../timestamp-to-date';

describe('timestamp-utils', () => {
  describe('getYearFromTimestampDate', () => {
    it('should return the year from the given timestamp', () => {
      const timestamp = Timestamp.fromDate(new Date('2024-04-18T00:00:00'));
      const year = getYearFromTimestampDate(timestamp);
      expect(year).toEqual(2024);
    });
  });

  describe('getMonthFromTimestampDate', () => {
    it('should return the month from the given timestamp', () => {
      const timestamp = Timestamp.fromDate(new Date('2024-04-18T00:00:00'));
      const month = getMonthFromTimestampDate(timestamp);
      expect(month).toEqual(4);
    });
  });
});
