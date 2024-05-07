import { Months } from '@relatorios/constants/months';
import { Timestamp } from 'firebase/firestore';

import {
  formatFirebaseTimestampDate,
  generateTimestampFromStringDate,
  getDayDescriptionFomDate,
  getMonthDescriptionFromMonthIndex,
  getMonthFromTimestampDate,
  getStartAndEndOfMonth,
  getStartAndEndOfWeek,
  getStringDateFromTimestampDate,
  getYearFromTimestampDate,
  longDateConvert,
  shortDateConvert,
} from '../transform-date';

describe('Transform Date tests', () => {
  describe('longDateConvert', () => {
    it('should return "--/--/--" when given an empty string', () => {
      const result = longDateConvert('');

      expect(result).toBe('--/--/--');
    });

    it('should return "--/--/--" when given a null value', () => {
      const result = longDateConvert(null);

      expect(result).toBe('--/--/--');
    });

    it('should return the expected value when given a valid date string', () => {
      const date = '2022-02-22';
      const result = longDateConvert(date);

      expect(result).toBe('22/02/2022');
    });
  });

  describe('shortDateConvert', () => {
    it('should return "--/--" when given an empty string', () => {
      const result = shortDateConvert('');

      expect(result).toBe('--/--');
    });

    it('should return "--/--" when given a null value', () => {
      const result = shortDateConvert(null);

      expect(result).toBe('--/--');
    });

    it('should return the expected value when given a valid date string', () => {
      const date = '2022-02-22';
      const result = shortDateConvert(date);

      expect(result).toBe('02/2022');
    });
  });

  describe('formatFirebaseTimestampDate', () => {
    it('should return a string in the format "dd/mm/yyyy"', () => {
      const timestamp = { seconds: 1701745200, nanoseconds: 0 } as Timestamp;
      const result = formatFirebaseTimestampDate(timestamp);
      expect(result).toEqual('05/12/2023');
    });
  });

  describe('getStartAndEndOfWeek', () => {
    it('should return an object with start and end properties that are both instances of Date', () => {
      const result = getStartAndEndOfWeek();

      expect(result.start).toBeInstanceOf(Date);
      expect(result.end).toBeInstanceOf(Date);
    });
  });

  describe('getStartAndEndOfMonth', () => {
    test('should return the correct start and end dates for the current month', () => {
      const currentDate = new Date();

      const year = currentDate.getFullYear();
      const month = currentDate.getMonth();

      const expectedStartDate = new Date(year, month, 1);
      const expectedEndDate = new Date(year, month + 1, 0);

      const { start, end } = getStartAndEndOfMonth();

      expect(start).toEqual(expectedStartDate);
      expect(end).toEqual(expectedEndDate);
    });
  });

  describe('getMonthDescriptionFromMonthIndex', () => {
    it('should return the month description for the given month index', () => {
      const date = new Date();
      const monthDescription = getMonthDescriptionFromMonthIndex(date);

      expect(monthDescription).toEqual(Months[(date.getMonth() + 1).toString().padStart(2, '0')]);
    });
  });

  describe('getDayDescriptionFomDate', () => {
    it('should return the day description from the date', () => {
      const date1 = new Date(2024, 4, 1); // 01/05/2024;
      const date2 = new Date(2024, 4, 11);

      expect(getDayDescriptionFomDate(date1)).toEqual('01');
      expect(getDayDescriptionFomDate(date2)).toEqual('11');
    });
  });

  describe('generateTimestampFromStringDate', () => {
    it('should return a valid Timestamp', () => {
      const dateString = '2024-04-18';
      const expectedTimestamp = Timestamp.fromDate(new Date('2024-04-18T00:00:00'));

      const result = generateTimestampFromStringDate(dateString);

      expect(result).toEqual(expectedTimestamp);
    });
  });

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

  describe('getStringDateFromTimestampDate', () => {
    it('should return a string representation of a timestamp in the format "MM/DD/YYYY"', () => {
      const timestamp = Timestamp.fromDate(new Date('2024-04-18T00:00:00')); // October 25, 2022
      const expected = '2024-04-18';

      expect(getStringDateFromTimestampDate(timestamp)).toEqual(expected);
    });

    it('should pad single-digit months and days with a leading zero', () => {
      const timestamp = Timestamp.fromDate(new Date('2024-01-08T00:00:00')); // January 10, 2022
      const expected = '2024-01-08';

      expect(getStringDateFromTimestampDate(timestamp)).toEqual(expected);
    });
  });
});
