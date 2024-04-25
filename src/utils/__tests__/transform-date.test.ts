import type { Timestamp } from 'firebase/firestore';

import {
  formatFirebaseTimestampDate,
  /* formatDate, */
  longDateConvert,
  shortDateConvert,
} from '../transform-date';

describe('Transform Date tests', () => {
  describe('longDateConvert', () => {
    it('should return "--/--/--" when given an empty string', () => {
      const result = longDateConvert('');

      expect(result).toBe('--/--/--');
    });

    it('should return "--/--/--" when given a null value', () => {
      const result = longDateConvert(null);

      expect(result).toBe('--/--/--');
    });

    it('should return the expected value when given a valid date string', () => {
      const date = '2022-02-22';
      const result = longDateConvert(date);

      expect(result).toBe('22/02/2022');
    });
  });

  describe('shortDateConvert', () => {
    it('should return "--/--" when given an empty string', () => {
      const result = shortDateConvert('');

      expect(result).toBe('--/--');
    });

    it('should return "--/--" when given a null value', () => {
      const result = shortDateConvert(null);

      expect(result).toBe('--/--');
    });

    it('should return the expected value when given a valid date string', () => {
      const date = '2022-02-22';
      const result = shortDateConvert(date);

      expect(result).toBe('02/2022');
    });
  });

  describe('formatFirebaseTimestampDate', () => {
    it('should return a string in the format "dd/mm/yyyy"', () => {
      const timestamp = { seconds: 1701745200, nanoseconds: 0 } as Timestamp;
      const result = formatFirebaseTimestampDate(timestamp);
      expect(result).toEqual('05/12/2023');
    });
  });
});
