import type { FinanceNote } from '../types/finance-note';

export function getBalance(notes: FinanceNote[]): number {
  return notes.reduce((accumulator, currentValue) => {
    const increment =
      currentValue.type === 'C' ? currentValue.value : -currentValue.value;
    return accumulator + increment;
  }, 0);
}
