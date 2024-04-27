import { NO_SORTED_NOTES_MOCK } from '../../__mocks__/finance-notes';
import { orderNotesByDate } from '../order-notes-by-date';

describe('order-notes-by-date', () => {
  describe('orderNotesByDate', () => {
    it('should return the sorted FinanceNote array from the given a finance note array', () => {
      const sortedNotes = orderNotesByDate(NO_SORTED_NOTES_MOCK);
      expect(sortedNotes.length).toEqual(2);
      expect(sortedNotes[0]).toBe(NO_SORTED_NOTES_MOCK[1]);
      expect(sortedNotes[0].value).toEqual(NO_SORTED_NOTES_MOCK[1].value);
    });
  });
});
