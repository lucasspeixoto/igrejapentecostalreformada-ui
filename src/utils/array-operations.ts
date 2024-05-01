import type { UserData } from '@/types/user-data';

/**
 * Sorts an array of objects by the name property of their UserData object.
 *
 * @param first - the first object to compare
 * @param second - the second object to compare
 * @returns a negative value if the first object's name is less than the second object's name,
 * a positive value if the first object's name is greater than the second object's name,
 * or zero if the names are equal
 */
export function orderMembersListByName(first: UserData, second: UserData): number {
  if (first.auth?.name < second.auth?.name) {
    return -1;
  }
  if (first.auth?.name > second.auth?.name) {
    return 1;
  }
  return 0;
}
