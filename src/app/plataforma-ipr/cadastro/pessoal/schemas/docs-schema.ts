import { z } from 'zod';

export const createPersonalDocsFormSchema = z.object({
  rg: z.coerce.number().gte(1, 'Número de RG inválido'),
  cpf: z.coerce.number().gte(1, 'Número de CPF inválido'),
});

export type CreatePersonalDocsFormData = z.infer<
  typeof createPersonalDocsFormSchema
>;
