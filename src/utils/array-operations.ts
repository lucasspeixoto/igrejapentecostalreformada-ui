import type { UserData } from '@/types/user-data';

export const orderMembersListByName = (first: UserData, second: UserData) => {
  if (first.auth?.name < second.auth?.name) {
    return -1;
  }
  if (first.auth?.name > second.auth?.name) {
    return 1;
  }
  return 0;
};
