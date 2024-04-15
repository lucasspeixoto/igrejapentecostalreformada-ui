import type { Timestamp } from 'firebase/firestore';

export type FinanceNote = {
  id: string;
  photoUrl: string;
  description: string;
  owner: string;
  date: Timestamp;
  type: 'D' | 'C';
  value: number;
};
