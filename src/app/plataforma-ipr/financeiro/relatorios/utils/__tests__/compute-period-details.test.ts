import {
  getMonthDescriptionFromMonthIndex,
  getStartAndEndOfMonth,
  getStartAndEndOfWeek,
} from '@/utils/transform-date';

import { computePeriodDetail } from '../compute-period-detail';

describe('computePeriodDetail', () => {
  it('should return the current year for the "yearly" period', () => {
    const year = 2024;

    const result = computePeriodDetail('yearly', year);

    expect(result).toEqual(year.toString());
  });

  it('should return the start and end dates for the "weekly" period', () => {
    const { start, end } = getStartAndEndOfWeek();
    const startDay = start.getDate();
    const endDay = end.getDate();
    const startMonth = getMonthDescriptionFromMonthIndex(start);
    const endMonth = getMonthDescriptionFromMonthIndex(end);

    const result = computePeriodDetail('weekly', start.getFullYear());

    expect(result).toEqual(
      `${startDay.toString().padStart(2, '0')}/${startMonth} - ${endDay.toString().padStart(2, '0')}/${endMonth}`
    );
  });

  it('should return the start and end dates for the "monthly" period', () => {
    const { start, end } = getStartAndEndOfMonth();
    const startDay = start.getDate();
    const endDay = end.getDate();
    const startMonth = getMonthDescriptionFromMonthIndex(start);
    const endMonth = getMonthDescriptionFromMonthIndex(end);

    const result = computePeriodDetail('monthly', start.getFullYear());

    expect(result).toEqual(
      `${startDay.toString().padStart(2, '0')}/${startMonth} - ${endDay.toString().padStart(2, '0')}/${endMonth}`
    );
  });
});
