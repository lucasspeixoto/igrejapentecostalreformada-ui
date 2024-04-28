import {
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
    return `${start.getDate().toString().padStart(2, '0')}/${getMonthDescriptionFromMonthIndex(start)} - ${end.getDate().toString().padStart(2, '0')}/${getMonthDescriptionFromMonthIndex(end)}`;
  }
  if (period === 'monthly') {
    const { start, end } = getStartAndEndOfMonth();
    return `${start.getDate().toString().padStart(2, '0')}/${getMonthDescriptionFromMonthIndex(start)} - ${end.getDate().toString().padStart(2, '0')}/${getMonthDescriptionFromMonthIndex(end)}`;
  }
  return `${year}`;
}
