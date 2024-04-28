import type { Timestamp } from 'firebase/firestore';

import { Months } from '@/app/plataforma-ipr/financeiro/relatorios/constants/months';

/**
 * @status: Tested
 * Convert a long date string to a more human-friendly format.
 * @param date - The long date string to convert, in the format "yyyy-mm-dd".
 * @returns The human-friendly date string, in the format "dd/mm/yyyy".
 */
export const longDateConvert = (date: string | null): string => {
  if (date) {
    const year = date?.split('-')[0];
    const month = date?.split('-')[1];
    const day = date?.split('-')[2];

    return `${day}/${month}/${year}`;
  }

  return '--/--/--';
};

/**
 * @status: Tested
 * Convert a short date string to a more human-friendly format.
 * @param date - The short date string to convert, in the format "yyyy-mm".
 * @returns The human-friendly date string, in the format "mm/yyyy".
 */
export const shortDateConvert = (date: string | null): string => {
  if (date) {
    const year = date?.split('-')[0];
    const month = date?.split('-')[1];

    return `${month}/${year}`;
  }

  return '--/--';
};

/*
 ** @status: Tested
 */
export function formatFirebaseTimestampDate(timestamp: Timestamp) {
  const date = new Date(timestamp.seconds * 1000);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
}

export function getStartAndEndOfWeek(): { start: Date; end: Date } {
  const currentDate = new Date();

  const startDate = new Date(currentDate);
  const endDate = new Date(currentDate);

  startDate.setDate(startDate.getDate() - startDate.getDay());
  endDate.setDate(endDate.getDate() + (6 - endDate.getDay()));

  return { start: startDate, end: endDate };
}

export function getStartAndEndOfMonth() {
  const currentDate = new Date();

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const startDate = new Date(year, month, 1);
  const endDate = new Date(year, month + 1, 0);

  return { start: startDate, end: endDate };
}

export function getMonthDescriptionFromMonthIndex(date: Date): string {
  return Months[(date.getMonth() + 1).toString().padStart(2, '0')];
}
