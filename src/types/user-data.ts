/* eslint-disable max-len */
import type { Supplementary } from '@cadastro/complementar/types/supplementary';
import type { Ecclesiastical } from '@cadastro/eclesiastico/types/ecclesiastical';
import type { Personal } from '@cadastro/pessoal/types/personal';

import type { Auth } from './auth';
import type { Process } from './process';

export type UserData = {
  auth: Auth;
  personal: Personal;
  supplementary: Supplementary;
  ecclesiastical: Ecclesiastical;
  process?: Process;
};
