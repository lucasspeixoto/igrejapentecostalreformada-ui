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
    createdAt: new Timestamp(1714140925, 817000000), // 26/04/2024
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
    createdAt: new Timestamp(1714243682, 987000000), // 27/04/2024
  },
  {
    id: 'cfa7fa7D7ahdU876',
    photoUrl:
      'https://firebasestorage.googleapis.com/v0/b/ipr-master.appspot.com/o/photos%2Fi3TtaUH2y1W0jInkpgHU7MIF5iq1.jpg?alt=media&token=8a26aea3-bcc2-489c-a40d-e6d7c7d445f3',
    description: 'Luz',
    owner: 'Daniel',
    category: 'Dízimo',
    date: Timestamp.fromDate(new Date('2024-02-03T00:00:00')),
    createdAt: Timestamp.fromDate(new Date('2024-02-03T00:00:00')),
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
    createdAt: Timestamp.fromDate(new Date('2024-01-04T00:00:00')),
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
    createdAt: Timestamp.fromDate(new Date('2023-12-05T00:00:00')),
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
    createdAt: Timestamp.fromDate(new Date('2023-11-07T00:00:00')),
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
    createdAt: Timestamp.fromDate(new Date('2023-11-07T00:00:00')),
    type: 'C',
    member: 'Lucas',
    paymentVoucher: 'Pendente',
    value: 1000.0,
  },
];

export const MOCKED_FINANCE_NOTES2: FinanceNote[] = [
  {
    description: 'Teste',
    member: '',
    owner: 'Lucas Peixoto',
    photoUrl:
      'https://firebasestorage.googleapis.com/v0/b/ipr-master.appspot.com/o/photos%2FU6tkvy5k7dfmGNlIYvKWv79Ssen1.jpg?alt=media&token=c9bdf6d1-52e7-4949-9352-2f3d08d40500',
    type: 'C',
    paymentVoucher: 'Não se aplica',
    category: 'Patrimônio',
    value: 5400,
    date: new Timestamp(1706137390, 113000000),
    createdAt: new Timestamp(1706137390, 113000000),
    id: '5VV5bcASHYmAOuyUUeuy',
  },
  {
    paymentVoucher: 'Não se aplica',
    owner: 'Lucas Peixoto',
    value: 4700,
    date: new Timestamp(1707606186, 216000000),
    createdAt: new Timestamp(1707606186, 216000000),
    category: 'Patrimônio',
    type: 'C',
    photoUrl:
      'https://firebasestorage.googleapis.com/v0/b/ipr-master.appspot.com/o/photos%2FU6tkvy5k7dfmGNlIYvKWv79Ssen1.jpg?alt=media&token=c9bdf6d1-52e7-4949-9352-2f3d08d40500',
    description: 'Teste',
    member: '',
    id: '6kKBdYG3uguxrHclJ7Bm',
  },
  {
    value: 3500,
    category: 'Patrimônio',
    photoUrl:
      'https://firebasestorage.googleapis.com/v0/b/ipr-master.appspot.com/o/photos%2FU6tkvy5k7dfmGNlIYvKWv79Ssen1.jpg?alt=media&token=c9bdf6d1-52e7-4949-9352-2f3d08d40500',
    type: 'C',
    description: 'Teste',
    member: '',
    date: new Timestamp(1714431659, 845000000),
    createdAt: new Timestamp(1714431659, 845000000),
    paymentVoucher: 'Não se aplica',
    owner: 'Lucas Peixoto',
    id: '9RN7RkdIpiTvScZrC3Xh',
  },
  {
    member: '',
    owner: 'Lucas Peixoto',
    value: 7850,
    type: 'C',
    description: 'Teste',
    date: new Timestamp(1711062198, 231000000),
    createdAt: new Timestamp(1711062198, 231000000),
    photoUrl:
      'https://firebasestorage.googleapis.com/v0/b/ipr-master.appspot.com/o/photos%2FU6tkvy5k7dfmGNlIYvKWv79Ssen1.jpg?alt=media&token=c9bdf6d1-52e7-4949-9352-2f3d08d40500',
    category: 'Patrimônio',
    paymentVoucher: 'Não se aplica',
    id: 'LPgsdERprcR5krrftFij',
  },
  {
    photoUrl:
      'https://firebasestorage.googleapis.com/v0/b/ipr-master.appspot.com/o/photos%2FU6tkvy5k7dfmGNlIYvKWv79Ssen1.jpg?alt=media&token=c9bdf6d1-52e7-4949-9352-2f3d08d40500',
    type: 'D',
    member: '',
    description: 'Teste',
    category: 'Patrimônio',
    owner: 'Lucas Peixoto',
    value: 4280,
    date: new Timestamp(1704841205, 504000000),
    createdAt: new Timestamp(1704841205, 504000000),
    paymentVoucher: 'Não se aplica',
    id: 'Us6JkcqcrHxKN96YMvbF',
  },
  {
    type: 'C',
    date: new Timestamp(1705437539, 58000000),
    createdAt: new Timestamp(1705437539, 58000000),
    photoUrl:
      'https://firebasestorage.googleapis.com/v0/b/ipr-master.appspot.com/o/photos%2FU6tkvy5k7dfmGNlIYvKWv79Ssen1.jpg?alt=media&token=c9bdf6d1-52e7-4949-9352-2f3d08d40500',
    category: 'Doações',
    member: '',
    paymentVoucher: 'Pendente',
    owner: 'Lucas Peixoto',
    value: 1500,
    description: 'dasdasdas',
    id: 'WrvPCN0HQB22Ch5sJFr9',
  },
  {
    description: 'Teste',
    type: 'C',
    photoUrl:
      'https://firebasestorage.googleapis.com/v0/b/ipr-master.appspot.com/o/photos%2FU6tkvy5k7dfmGNlIYvKWv79Ssen1.jpg?alt=media&token=c9bdf6d1-52e7-4949-9352-2f3d08d40500',
    paymentVoucher: 'Não se aplica',
    category: 'Patrimônio',
    value: 4852,
    date: new Timestamp(1710716452, 972000000),
    createdAt: new Timestamp(1710716452, 972000000),
    owner: 'Lucas Peixoto',
    member: '',
    id: 'XuAH07Nc6krisADXKdWd',
  },
  {
    date: new Timestamp(1707606040, 947000000),
    createdAt: new Timestamp(1707606040, 947000000),
    owner: 'Lucas Peixoto',
    type: 'D',
    description: 'Teste',
    category: 'Patrimônio',
    member: '',
    value: 4200,
    paymentVoucher: 'Não se aplica',
    photoUrl:
      'https://firebasestorage.googleapis.com/v0/b/ipr-master.appspot.com/o/photos%2FU6tkvy5k7dfmGNlIYvKWv79Ssen1.jpg?alt=media&token=c9bdf6d1-52e7-4949-9352-2f3d08d40500',
    id: 'ZqMavvaoOJo3TtsEvwYE',
  },
  {
    type: 'D',
    owner: 'Lucas Peixoto',
    value: 3800,
    photoUrl:
      'https://firebasestorage.googleapis.com/v0/b/ipr-master.appspot.com/o/photos%2FU6tkvy5k7dfmGNlIYvKWv79Ssen1.jpg?alt=media&token=c9bdf6d1-52e7-4949-9352-2f3d08d40500',
    member: '',
    description: 'Teste',
    date: new Timestamp(1710975724, 479000000),
    createdAt: new Timestamp(1710975724, 479000000),
    paymentVoucher: 'Não se aplica',
    category: 'Patrimônio',
    id: 'doOakmSLremTwrnoWysR',
  },
  {
    category: 'Patrimônio',
    paymentVoucher: 'Não se aplica',
    date: new Timestamp(1714431729, 24000000),
    createdAt: new Timestamp(1714431729, 24000000),
    photoUrl:
      'https://firebasestorage.googleapis.com/v0/b/ipr-master.appspot.com/o/photos%2FU6tkvy5k7dfmGNlIYvKWv79Ssen1.jpg?alt=media&token=c9bdf6d1-52e7-4949-9352-2f3d08d40500',
    description: 'Teste',
    owner: 'Lucas Peixoto',
    value: 5005,
    type: 'D',
    member: '',
    id: 'etyJkpzepagQ5yITwoAv',
  },
  {
    member: '',
    description: 'Teste',
    date: new Timestamp(1714431684, 880000000),
    createdAt: new Timestamp(1714431684, 880000000),
    category: 'Patrimônio',
    value: 8450,
    paymentVoucher: 'Não se aplica',
    type: 'C',
    owner: 'Lucas Peixoto',
    photoUrl:
      'https://firebasestorage.googleapis.com/v0/b/ipr-master.appspot.com/o/photos%2FU6tkvy5k7dfmGNlIYvKWv79Ssen1.jpg?alt=media&token=c9bdf6d1-52e7-4949-9352-2f3d08d40500',
    id: 'hryxbo5mvLcCokBh7A5c',
  },
  {
    category: 'Patrimônio',
    type: 'D',
    paymentVoucher: 'Não se aplica',
    owner: 'Lucas Peixoto',
    photoUrl:
      'https://firebasestorage.googleapis.com/v0/b/ipr-master.appspot.com/o/photos%2FU6tkvy5k7dfmGNlIYvKWv79Ssen1.jpg?alt=media&token=c9bdf6d1-52e7-4949-9352-2f3d08d40500',
    description: 'Teste',
    member: '',
    date: new Timestamp(1706137247, 346000000),
    createdAt: new Timestamp(1706137247, 346000000),
    value: 4150,
    id: 'mSvyvWMlaWJMNpFETMh5',
  },
  {
    owner: 'Lucas Peixoto',
    description: 'Teste',
    category: 'Patrimônio',
    photoUrl:
      'https://firebasestorage.googleapis.com/v0/b/ipr-master.appspot.com/o/photos%2FU6tkvy5k7dfmGNlIYvKWv79Ssen1.jpg?alt=media&token=c9bdf6d1-52e7-4949-9352-2f3d08d40500',
    paymentVoucher: 'Não se aplica',
    date: new Timestamp(1708037994, 773000000),
    createdAt: new Timestamp(1708037994, 773000000),
    type: 'D',
    value: 5000,
    member: '',
    id: 'vqGDv0jaot8R964GtdU7',
  },
  {
    value: 4280,
    description: 'Teste',
    category: 'Patrimônio',
    photoUrl:
      'https://firebasestorage.googleapis.com/v0/b/ipr-master.appspot.com/o/photos%2FU6tkvy5k7dfmGNlIYvKWv79Ssen1.jpg?alt=media&token=c9bdf6d1-52e7-4949-9352-2f3d08d40500',
    paymentVoucher: 'Não se aplica',
    member: '',
    type: 'D',
    owner: 'Lucas Peixoto',
    date: new Timestamp(1714431720, 23000000),
    createdAt: new Timestamp(1714431720, 23000000),
    id: 'wnP22ufZ5Jo4zJtedpo2',
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
    createdAt: new Timestamp(1714140925, 817000000), // 26/04/2024
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
    createdAt: new Timestamp(1714243682, 987000000), // 27/04/2024
    type: 'C',
    member: 'Lucas',
    paymentVoucher: 'Pendente',
    value: 146.81,
  },
];
