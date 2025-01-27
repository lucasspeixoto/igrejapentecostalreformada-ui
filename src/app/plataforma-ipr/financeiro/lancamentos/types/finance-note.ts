import type { Timestamp } from 'firebase/firestore';

export type FinanceNoteType = 'D' | 'C';

export type FinanceNote = {
  id: string;
  photoUrl: string;
  description: string;
  owner: string;
  date: Timestamp;
  type: FinanceNoteType;
  value: number;
  category: string;
  member: string;
  paymentVoucher: string;
  createdAt: Timestamp;
};
