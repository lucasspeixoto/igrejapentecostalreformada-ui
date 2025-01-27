import { NO_SORTED_NOTES_MOCK } from '../../__mocks__/finance-notes';
import { orderNotesByDate } from '../order-notes-by-date';

describe('order-notes-by-date', () => {
  describe('orderNotesByDate', () => {
    it('should correctly sort notes spanning multiple years', () => {
      const unsortedNotes = NO_SORTED_NOTES_MOCK;

      const sortedNotes = orderNotesByDate(unsortedNotes);

      expect(sortedNotes.length).toEqual(2);

      const firstDate = sortedNotes[0].date!.toDate();
      expect(firstDate.getDate()).toEqual(26);
      expect(firstDate.getMonth()).toEqual(3);
      expect(firstDate.getFullYear()).toEqual(2024);

      const secondDate = sortedNotes[1].date!.toDate();
      expect(secondDate.getDate()).toEqual(27);
      expect(secondDate.getMonth()).toEqual(3);
      expect(secondDate.getFullYear()).toEqual(2024);
    });
  });
});
