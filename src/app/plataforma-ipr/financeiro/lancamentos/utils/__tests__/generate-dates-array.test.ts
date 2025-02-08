/* eslint-disable max-len */

import { generateMonthAndYearList } from '../generate-dates-array';

jest.mock('../get-actual-date', () => ({
  getActualDate: jest.fn(() => '04/2024'),
}));

describe('generateMonthAndYearList', () => {
  describe('generateMonthAndYearList', () => {
    it('should generate an array starting from January if the start month is January and the current date is in the same year', () => {
      const datesArray = generateMonthAndYearList(2024, 1);

      const expectedDatesArray = ['04/2024', '03/2024', '02/2024', '01/2024'];
      expect(datesArray).toEqual(expectedDatesArray);
    });

    it('should generate an array starting from December if the start month is December and the current date is in the next year', () => {
      const datesArray = generateMonthAndYearList(2023, 12);

      const expectedDatesArray = ['04/2024', '03/2024', '02/2024', '01/2024', '12/2023'];
      expect(datesArray).toEqual(expectedDatesArray);
    });

    it('should return an empty array when the start year is equal to the end year but the start month is after the end month', () => {
      const datesArray = generateMonthAndYearList(2024, 5);

      const expectedDatesArray: string[] = [];
      expect(datesArray).toEqual(expectedDatesArray);
    });

    it('should return an empty array if the start year is after the current year', () => {
      const datesArray = generateMonthAndYearList(2025, 1);

      const expectedDatesArray: string[] = [];
      expect(datesArray).toEqual(expectedDatesArray);
    });

    it('should handle the case where the start month is February in a leap year', () => {
      const datesArray = generateMonthAndYearList(2024, 2);

      const expectedDatesArray = ['04/2024', '03/2024', '02/2024'];
      expect(datesArray).toEqual(expectedDatesArray);
    });
  });
});
