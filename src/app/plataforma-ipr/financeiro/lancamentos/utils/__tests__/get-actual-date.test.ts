/* eslint-disable max-len */

import { getActualDate } from '../get-actual-date';

describe('getActualDate', () => {
  let realDateConstructor: typeof Date;

  beforeAll(() => {
    // Store the original Date constructor
    realDateConstructor = Date;
  });

  beforeEach(() => {
    // Mock the Date constructor to return a fixed date
    // Use a fixed date for consistent testing
    const mockDate = new Date('2024-04-07T00:00:00');
    (global.Date as unknown) = jest.fn(() => mockDate);
  });

  afterAll(() => {
    // Restore the original Date constructor
    (global.Date as unknown) = realDateConstructor;
  });

  it('should return the current month and year in the format MM/YYYY in getActualDate', () => {
    // Expected result based on the fixed date
    const expectedDate = '04/2024';

    // Call the function under test
    const actualDate = getActualDate();

    // Assert the result
    expect(actualDate).toEqual(expectedDate);
  });
});
