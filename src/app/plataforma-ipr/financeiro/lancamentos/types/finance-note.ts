export type FinanceNote = {
  id: string;
  photoUrl: string;
  description: string;
  owner: string;
  date: Date;
  type: 'D' | 'C';
  value: number;
};
