import { Months } from '@relatorios/constants/months';
import type { Timestamp } from 'firebase/firestore';

import {
  formatFirebaseTimestampDate,
  getDayDescriptionFomDate,
  getMonthDescriptionFromMonthIndex,
  getStartAndEndOfMonth,
  getStartAndEndOfWeek,
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
      const date1 = new Date('2023-02-11');
      const date2 = new Date('2023-02-05');

      expect(getDayDescriptionFomDate(date1)).toEqual('10');
      expect(getDayDescriptionFomDate(date2)).toEqual('04');
    });
  });
});
