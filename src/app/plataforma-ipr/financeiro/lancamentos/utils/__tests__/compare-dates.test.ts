import { isDateGreaterThanCurrentMonth } from '../compare-dates';

describe('isDateGreaterThanCurrentMonth', () => {
  it('should return true when input year is greater than current year', () => {
    const result = isDateGreaterThanCurrentMonth('01/2024', '12/2023');
    expect(result).toBe(true);
  });

  it('should return false when input year is less than current year', () => {
    const result = isDateGreaterThanCurrentMonth('01/2022', '12/2023');
    expect(result).toBe(false);
  });

  it('should return true when years are equal and input month is greater than current month', () => {
    const result = isDateGreaterThanCurrentMonth('08/2023', '07/2023');
    expect(result).toBe(true);
  });

  it('should return false when years are equal and input month is less than current month', () => {
    const result = isDateGreaterThanCurrentMonth('05/2023', '07/2023');
    expect(result).toBe(false);
  });

  it('should return false when input date is exactly equal to current date', () => {
    const result = isDateGreaterThanCurrentMonth('07/2023', '07/2023');
    expect(result).toBe(false);
  });

  it('should handle single-digit months correctly', () => {
    const result = isDateGreaterThanCurrentMonth('3/2023', '02/2023');
    expect(result).toBe(true);
  });

  it('should correctly compare December of current year with January of next year', () => {
    const result = isDateGreaterThanCurrentMonth('01/2024', '12/2023');
    expect(result).toBe(true);
  });

  it('should handle leap year edge cases correctly', () => {
    const result1 = isDateGreaterThanCurrentMonth('02/2024', '01/2024'); // February in a leap year
    expect(result1).toBe(true);

    const result2 = isDateGreaterThanCurrentMonth('03/2024', '02/2024'); // March after February in a leap year
    expect(result2).toBe(true);

    const result3 = isDateGreaterThanCurrentMonth('02/2025', '02/2024'); // February in a non-leap year compared to February in a leap year
    expect(result3).toBe(true);
  });

  it('should return false for invalid date formats', () => {
    const result1 = isDateGreaterThanCurrentMonth('13/2023', '12/2023');
    expect(result1).toBe(false);

    const result2 = isDateGreaterThanCurrentMonth('01-2023', '12/2023');
    expect(result2).toBe(false);

    const result3 = isDateGreaterThanCurrentMonth('2023/01', '12/2023');
    expect(result3).toBe(false);

    const result4 = isDateGreaterThanCurrentMonth('abc', '12/2023');
    expect(result4).toBe(false);
  });
});
