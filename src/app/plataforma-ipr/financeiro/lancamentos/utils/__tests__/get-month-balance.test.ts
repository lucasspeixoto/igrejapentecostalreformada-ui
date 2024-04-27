import { Timestamp } from 'firebase/firestore';

import type { FinanceNote } from '../../types/finance-note';
import { getMonthBalance } from '../get-balance';

describe('getMonthBalance', () => {
  it('should return the sum of all values in the notes array', () => {
    const notes: FinanceNote[] = [
      {
        id: 'cfa7fa7D7ahdU876',
        photoUrl: 'http://',
        description: 'Internet',
        owner: 'Lucas',
        date: Timestamp.fromDate(new Date('2024-04-18T00:00:00')),
        type: 'D',
        category: 'Conta',
        member: '',
        value: 100.0,
        paymentVoucher: 'Pendente',
      },
      {
        id: 'ju73jfYt71Fe1Ss',
        photoUrl: 'http://',
        description: 'Dízimo Pessoa B',
        owner: 'Lucas',
        date: Timestamp.fromDate(new Date('2024-04-18T00:00:00')),
        type: 'C',
        category: 'Dízimo',
        member: '',
        value: 150.0,
        paymentVoucher: 'Pendente',
      },
    ];

    const balance = getMonthBalance(notes);

    expect(balance).toBe(50.0);
  });
});
