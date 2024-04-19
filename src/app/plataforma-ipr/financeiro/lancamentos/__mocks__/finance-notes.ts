import { Timestamp } from 'firebase/firestore';

import type { FinanceNote } from '../types/finance-note';

/* eslint-disable max-len */
export const MOCKED_FINANCE_NOTES: FinanceNote[] = [
  {
    id: 'cfa7fa7D7ahdU876',
    photoUrl:
      'https://firebasestorage.googleapis.com/v0/b/ipr-master.appspot.com/o/photos%2FU6tkvy5k7dfmGNlIYvKWv79Ssen1.jpg?alt=media&token=13114439-e212-4819-a510-a379c820ef9e',
    description: 'Compra de Microfones Sem Fio',
    owner: 'Lucas',
    date: Timestamp.fromDate(new Date('2024-04-18T00:00:00')),
    type: 'D',
    value: 150.0,
  },
  {
    id: 'cfa7fa7D7ahdU876',
    photoUrl:
      'https://firebasestorage.googleapis.com/v0/b/ipr-master.appspot.com/o/photos%2FbqUVwBSlNsPM1emXF8VUsK1kytl2.jpg?alt=media&token=82b4802c-5ca7-4b98-ac33-fe4dac6042e7',
    description: 'Dízimo Pessoa A',
    owner: 'Rodrigo',
    date: Timestamp.fromDate(new Date('2024-03-02T00:00:00')),
    type: 'C',
    value: 146.81,
  },
  {
    id: 'cfa7fa7D7ahdU876',
    photoUrl:
      'https://firebasestorage.googleapis.com/v0/b/ipr-master.appspot.com/o/photos%2Fi3TtaUH2y1W0jInkpgHU7MIF5iq1.jpg?alt=media&token=8a26aea3-bcc2-489c-a40d-e6d7c7d445f3',
    description: 'Luz',
    owner: 'Daniel',
    date: Timestamp.fromDate(new Date('2024-02-03T00:00:00')),
    type: 'D',
    value: 621.81,
  },
  {
    id: 'cfa7fa7D7ahdU876',
    photoUrl:
      'https://firebasestorage.googleapis.com/v0/b/ipr-master.appspot.com/o/photos%2FbqUVwBSlNsPM1emXF8VUsK1kytl2.jpg?alt=media&token=82b4802c-5ca7-4b98-ac33-fe4dac6042e7',
    description: 'Internet',
    owner: 'Rodrigo',
    date: Timestamp.fromDate(new Date('2024-01-04T00:00:00')),
    type: 'D',
    value: 621.81,
  },
  {
    id: 'cfa7fa7D7ahdU876',
    photoUrl:
      'https://firebasestorage.googleapis.com/v0/b/ipr-master.appspot.com/o/photos%2FU6tkvy5k7dfmGNlIYvKWv79Ssen1.jpg?alt=media&token=13114439-e212-4819-a510-a379c820ef9e',
    description: 'Dízimo Pessoa B',
    owner: 'Lucas',
    date: Timestamp.fromDate(new Date('2023-12-05T00:00:00')),
    type: 'C',
    value: 150.0,
  },
  {
    id: 'cfa7fa7D7ahdU876',
    photoUrl:
      'https://firebasestorage.googleapis.com/v0/b/ipr-master.appspot.com/o/photos%2FbqUVwBSlNsPM1emXF8VUsK1kytl2.jpg?alt=media&token=82b4802c-5ca7-4b98-ac33-fe4dac6042e7',
    description: 'Dízimo Pessoa C',
    owner: 'Rodrigo',
    date: Timestamp.fromDate(new Date('2023-11-07T00:00:00')),
    type: 'C',
    value: 200.0,
  },
  {
    id: 'cfa7fa7D7ahdU876',
    photoUrl:
      'https://firebasestorage.googleapis.com/v0/b/ipr-master.appspot.com/o/photos%2FbqUVwBSlNsPM1emXF8VUsK1kytl2.jpg?alt=media&token=82b4802c-5ca7-4b98-ac33-fe4dac6042e7',
    description: 'Dízimo Pessoa D',
    owner: 'Rodrigo',
    date: Timestamp.fromDate(new Date('2023-11-07T00:00:00')),
    type: 'C',
    value: 1000.0,
  },
];
