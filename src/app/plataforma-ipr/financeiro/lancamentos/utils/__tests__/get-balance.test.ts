import { Timestamp } from 'firebase/firestore';

import type { FinanceNote } from '../../types/finance-note';
import { getBalance } from '../get-balance';

describe('getBalance', () => {
  it('should return the sum of all values in the notes array', () => {
    const notes: FinanceNote[] = [
      {
        id: 'cfa7fa7D7ahdU876',
        photoUrl: 'http://',
        description: 'Internet',
        owner: 'Lucas',
        date: Timestamp.fromDate(new Date('2024-04-18T00:00:00')),
        type: 'D',
        value: 100.0,
      },
      {
        id: 'ju73jfYt71Fe1Ss',
        photoUrl: 'http://',
        description: 'Dízimo Pessoa B',
        owner: 'Lucas',
        date: Timestamp.fromDate(new Date('2024-04-18T00:00:00')),
        type: 'C',
        value: 150.0,
      },
    ];

    const balance = getBalance(notes);

    expect(balance).toBe(50.0);
  });
});
