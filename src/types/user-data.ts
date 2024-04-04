import type { Auth } from './auth';
import type { Process } from './process';
import type { Ecclesiastical } from './register/ecclesiastical';
import type { Personal } from './register/personal';
import type { Supplementary } from './register/supplementary';

export type UserData = {
  auth: Auth;
  personal: Personal;
  supplementary: Supplementary;
  ecclesiastical: Ecclesiastical;
  process?: Process;
};
