/* eslint-disable max-len */

import { generateMonthAndYearList } from '../generate-dates-array';

jest.mock('../get-actual-date', () => ({
  getActualDate: jest.fn(() => '04/2024'),
}));

describe('generateMonthAndYearList', () => {
  describe('generateMonthAndYearList', () => {
    it('should generate an array of strings representing month/year combinations', () => {
      const datesArray = generateMonthAndYearList(2023, 11);

      const expectedDatesArray = ['04/2024', '03/2024', '02/2024', '01/2024', '12/2023', '11/2023'];
      expect(datesArray).toEqual(expectedDatesArray);
    });
  });
});
