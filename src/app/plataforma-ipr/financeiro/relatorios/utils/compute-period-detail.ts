import {
  getDayDescriptionFomDate,
  getMonthDescriptionFromMonthIndex,
  getStartAndEndOfMonth,
  getStartAndEndOfWeek,
} from '@/utils/transform-date';

import type { Period } from '../types/period';

export function computePeriodDetail(period: Period): string {
  const date = new Date();
  const year = date.getFullYear();

  if (period === 'weekly') {
    const { start, end } = getStartAndEndOfWeek();
    return `${getDayDescriptionFomDate(start)}/${getMonthDescriptionFromMonthIndex(start)} - ${getDayDescriptionFomDate(end)}/${getMonthDescriptionFromMonthIndex(end)}`;
  }
  if (period === 'monthly') {
    const { start, end } = getStartAndEndOfMonth();
    return `${getDayDescriptionFomDate(start)}/${getMonthDescriptionFromMonthIndex(start)} - ${getDayDescriptionFomDate(end)}/${getMonthDescriptionFromMonthIndex(end)}`;
  }
  return `${year}`;
}
