import type { FinanceNote } from '../types/finance-note';

/**
 * Returns the number of milliseconds since the Unix epoch for the given date.
 *
 * @param note - a finance note
 * @returns the number of milliseconds since the Unix epoch
 */
function getTimeFromDate(note: FinanceNote): number {
  return note!.createdAt!.toDate().getTime();
}

/**
 * Sorts an array of finance notes by their date in ascending order.
 *
 * @param financeNotes - an array of finance notes
 * @returns the sorted array of finance notes
 */
export function orderNotesByDate(financesNotes: FinanceNote[]): FinanceNote[] {
  return Object.values(financesNotes).sort(
    (firstNote, secondNote) => getTimeFromDate(firstNote) - getTimeFromDate(secondNote)
  );
}
