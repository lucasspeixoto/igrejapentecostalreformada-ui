import { Timestamp } from 'firebase/firestore';

import type { FinanceNote } from '../types/finance-note';

export const MOCKED_FINANCE_NOTES: FinanceNote[] = [
  {
    id: 'cfa7fa7D7ahdU876',
    photoUrl:
      'https://firebasestorage.googleapis.com/v0/b/ipr-master.appspot.com/o/photos%2FU6tkvy5k7dfmGNlIYvKWv79Ssen1.jpg?alt=media&token=13114439-e212-4819-a510-a379c820ef9e',
    description: 'Compra de Microfones Sem Fio',
    owner: 'Lucas',
    category: 'Dízimo',
    date: new Timestamp(1714140925, 817000000), // 26/04/2024
    type: 'D',
    value: 150.0,
    member: 'Lucas',
    paymentVoucher: 'Pendente',
  },
  {
    id: 'cfa7fa7D7ahdU876',
    photoUrl:
      'https://firebasestorage.googleapis.com/v0/b/ipr-master.appspot.com/o/photos%2FbqUVwBSlNsPM1emXF8VUsK1kytl2.jpg?alt=media&token=82b4802c-5ca7-4b98-ac33-fe4dac6042e7',
    description: 'Dízimo Pessoa A',
    owner: 'Rodrigo',
    category: 'Dízimo',
    date: new Timestamp(1714243682, 987000000), // 27/04/2024
    type: 'C',
    member: 'Lucas',
    paymentVoucher: 'Pendente',
    value: 146.81,
  },
  {
    id: 'cfa7fa7D7ahdU876',
    photoUrl:
      'https://firebasestorage.googleapis.com/v0/b/ipr-master.appspot.com/o/photos%2Fi3TtaUH2y1W0jInkpgHU7MIF5iq1.jpg?alt=media&token=8a26aea3-bcc2-489c-a40d-e6d7c7d445f3',
    description: 'Luz',
    owner: 'Daniel',
    category: 'Dízimo',
    date: Timestamp.fromDate(new Date('2024-02-03T00:00:00')),
    type: 'D',
    member: 'Lucas',
    paymentVoucher: 'Pendente',
    value: 621.81,
  },
  {
    id: 'cfa7fa7D7ahdU876',
    photoUrl:
      'https://firebasestorage.googleapis.com/v0/b/ipr-master.appspot.com/o/photos%2FbqUVwBSlNsPM1emXF8VUsK1kytl2.jpg?alt=media&token=82b4802c-5ca7-4b98-ac33-fe4dac6042e7',
    description: 'Internet',
    owner: 'Rodrigo',
    category: 'Dízimo',
    date: Timestamp.fromDate(new Date('2024-01-04T00:00:00')),
    type: 'D',
    member: 'Lucas',
    paymentVoucher: 'Pendente',
    value: 621.81,
  },
  {
    id: 'cfa7fa7D7ahdU876',
    photoUrl:
      'https://firebasestorage.googleapis.com/v0/b/ipr-master.appspot.com/o/photos%2FU6tkvy5k7dfmGNlIYvKWv79Ssen1.jpg?alt=media&token=13114439-e212-4819-a510-a379c820ef9e',
    description: 'Dízimo Pessoa B',
    owner: 'Lucas',
    category: 'Dízimo',
    date: Timestamp.fromDate(new Date('2023-12-05T00:00:00')),
    type: 'C',
    member: 'Lucas',
    paymentVoucher: 'Pendente',
    value: 150.0,
  },
  {
    id: 'cfa7fa7D7ahdU876',
    photoUrl:
      'https://firebasestorage.googleapis.com/v0/b/ipr-master.appspot.com/o/photos%2FbqUVwBSlNsPM1emXF8VUsK1kytl2.jpg?alt=media&token=82b4802c-5ca7-4b98-ac33-fe4dac6042e7',
    description: 'Dízimo Pessoa C',
    owner: 'Rodrigo',
    category: 'Dízimo',
    date: Timestamp.fromDate(new Date('2023-11-07T00:00:00')),
    type: 'C',
    member: 'Lucas',
    paymentVoucher: 'Pendente',
    value: 200.0,
  },
  {
    id: 'cfa7fa7D7ahdU876',
    photoUrl:
      'https://firebasestorage.googleapis.com/v0/b/ipr-master.appspot.com/o/photos%2FbqUVwBSlNsPM1emXF8VUsK1kytl2.jpg?alt=media&token=82b4802c-5ca7-4b98-ac33-fe4dac6042e7',
    description: 'Dízimo Pessoa D',
    owner: 'Rodrigo',
    category: 'Dízimo',
    date: Timestamp.fromDate(new Date('2023-11-07T00:00:00')),
    type: 'C',
    member: 'Lucas',
    paymentVoucher: 'Pendente',
    value: 1000.0,
  },
];

export const NO_SORTED_NOTES_MOCK: FinanceNote[] = [
  {
    id: 'cfa7fa7D7ahdU876',
    photoUrl:
      'https://firebasestorage.googleapis.com/v0/b/ipr-master.appspot.com/o/photos%2FU6tkvy5k7dfmGNlIYvKWv79Ssen1.jpg?alt=media&token=13114439-e212-4819-a510-a379c820ef9e',
    description: 'Compra de Microfones Sem Fio',
    owner: 'Lucas',
    category: 'Dízimo',
    date: new Timestamp(1714140925, 817000000), // 26/04/2024
    type: 'D',
    value: 150.0,
    member: 'Lucas',
    paymentVoucher: 'Pendente',
  },
  {
    id: 'cfa7fa7D7ahdU876',
    photoUrl:
      'https://firebasestorage.googleapis.com/v0/b/ipr-master.appspot.com/o/photos%2FbqUVwBSlNsPM1emXF8VUsK1kytl2.jpg?alt=media&token=82b4802c-5ca7-4b98-ac33-fe4dac6042e7',
    description: 'Dízimo Pessoa A',
    owner: 'Rodrigo',
    category: 'Dízimo',
    date: new Timestamp(1714243682, 987000000), // 27/04/2024
    type: 'C',
    member: 'Lucas',
    paymentVoucher: 'Pendente',
    value: 146.81,
  },
];
