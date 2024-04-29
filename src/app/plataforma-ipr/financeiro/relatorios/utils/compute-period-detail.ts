import {
  getDayDescriptionFomDate,
  getMonthDescriptionFromMonthIndex,
  getStartAndEndOfMonth,
  getStartAndEndOfWeek,
} from '@/utils/transform-date';

import type { Period } from '../types/period';

export function computePeriodDetail(period: Period, selectedYear: number): string {
  if (period === 'weekly') {
    const { start, end } = getStartAndEndOfWeek();
    return `${getDayDescriptionFomDate(start)}/${getMonthDescriptionFromMonthIndex(start)} - ${getDayDescriptionFomDate(end)}/${getMonthDescriptionFromMonthIndex(end)}`;
  }
  if (period === 'monthly') {
    const { start, end } = getStartAndEndOfMonth();
    return `${getDayDescriptionFomDate(start)}/${getMonthDescriptionFromMonthIndex(start)} - ${getDayDescriptionFomDate(end)}/${getMonthDescriptionFromMonthIndex(end)}`;
  }
  return `${selectedYear}`;
}
