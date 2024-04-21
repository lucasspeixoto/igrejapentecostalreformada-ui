import type { UserData } from '@/types/user-data';

import { orderMembersListByName } from '../array-operations';

const USER_DATA_MOCK: UserData[] = [
  {
    auth: {
      role: 'admin',
      isAdmin: true,
      name: 'Lucas Peixoto',
      photoUrl: 'https://example.com/admin_photo.jpg',
      email: 'admin@example.com',
      userId: 'admin123',
    },
    personal: {
      name: 'Lucas Peixoto',
      sex: 'male',
      cellphone: '123-456-7890',
      telephone: '098-765-4321',
      birthday: '1990-01-01',
      birth_day: 'Monday',
      cep: 12345678,
      state: 'California',
      city: 'Los Angeles',
      address: '123 Main Street',
      district: 'Downtown',
      number: 101,
      complement: 'Apt 202',
      rg: 123456789,
      cpf: 987654321,
      bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      comments: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      engagement: 5,
      cardMemberDate: '2020-01-01',
      cardMemberEmission: '2020-01-01',
    },
    supplementary: {
      maritalStatus: 'married',
      spouseName: 'Spouse Name',
      weddingDate: '2010-05-15',
      fatherName: 'Father Name',
      motherName: 'Mother Name',
      schooling: 'Graduate',
      profession: 'Engineer',
    },
    ecclesiastical: {
      membership: 'Member',
      craft: 'Craft',
      communities: 'Community 1, Community 2',
      interests: 'Interest 1, Interest 2',
      baptism: 'Baptized',
      baptismDate: '2000-01-01',
      baptismShepherd: 'Shepherd Name',
    },
    process: {
      isRegistered: true,
    },
  },
  {
    auth: {
      role: 'user',
      isAdmin: false,
      name: 'Liana Fernandes',
      photoUrl: 'https://example.com/user_photo.jpg',
      email: 'user@example.com',
      userId: 'user123',
    },
    personal: {
      name: 'Liana Fernandes',
      sex: 'female',
      cellphone: '987-654-3210',
      telephone: '012-345-6789',
      birthday: '1995-05-05',
      birth_day: 'Friday',
      cep: 87654321,
      state: 'New York',
      city: 'Brooklyn',
      address: '456 Oak Avenue',
      district: 'Suburb',
      number: 202,
      complement: 'Unit 101',
      rg: 987654321,
      cpf: 123456789,
      bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      engagement: 4,
    },
    supplementary: {
      maritalStatus: 'married',
      spouseName: 'Spouse Name',
      weddingDate: '2010-05-15',
      fatherName: 'Father Name',
      motherName: 'Mother Name',
      schooling: 'Graduate',
      profession: 'Engineer',
    },
    ecclesiastical: {
      membership: 'Member',
      craft: 'Craft',
      communities: 'Community 1, Community 2',
      interests: 'Interest 1, Interest 2',
      baptism: 'Baptized',
      baptismDate: '2000-01-01',
      baptismShepherd: 'Shepherd Name',
    },
    process: {
      isRegistered: false,
    },
  },
];

describe('Array Operation tests', () => {
  describe('orderMembersListByName', () => {
    it('should return the expected value when orderMembersListByName is called with MOCKED_USER_DATA ', () => {
      const user1 = USER_DATA_MOCK[1];
      const user2 = USER_DATA_MOCK[0];

      expect(orderMembersListByName(user1, user2)).toEqual(-1);
    });
  });
});
