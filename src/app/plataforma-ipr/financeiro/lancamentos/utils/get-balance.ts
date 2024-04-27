import type { FinanceNote } from '../types/finance-note';

/**
 * Calculates the balance of a list of finance notes.
 *
 * @param notes - a list of finance notes
 * @returns the total balance of the list of notes
 */
export function getMonthBalance(notes: FinanceNote[]): number {
  return notes.reduce((accumulator, currentValue) => {
    const increment =
      currentValue.type === 'C' ? currentValue.value : -currentValue.value;
    return accumulator + increment;
  }, 0);
}
