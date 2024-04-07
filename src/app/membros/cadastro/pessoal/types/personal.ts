export interface Personal {
  name: string;
  sex: string;
  cellphone: string;
  telephone: string;
  birthday: string;
  birth_day: string;

  cep: number;
  state: string;
  city: string;
  address: string;
  district: string;
  number: number;
  complement: string;

  rg: number;
  cpf: number;

  bio: string;

  comments?: string;

  engagement?: 1 | 2 | 3 | 4 | 5;

  cardMemberDate?: string;

  cardMemberEmission?: string;
}
