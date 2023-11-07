import type { Ecclesiastical } from './register/ecclesiastical';
import type { Personal } from './register/personal';
import type { Supplementary } from './register/supplementary';
import type { UserAuth } from './user-auth';

export type UserData = {
  auth: UserAuth;
  personal: Personal;
  supplementary: Supplementary;
  ecclesiastical: Ecclesiastical;
};
