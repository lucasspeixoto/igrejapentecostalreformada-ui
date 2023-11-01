import { z } from 'zod';

/* The code is defining a schema for a personal contact form. The schema is created
using the `zod` library, which is a TypeScript runtime type checking library. */
export const createPersonalDocsFormSchema = z.object({
  rg: z.coerce.number().gte(1, 'Número de RG inválido'),
  cpf: z.coerce.number().gte(1, 'Número de CPF inválido'),
});

export type CreatePersonalDocsFormData = z.infer<
  typeof createPersonalDocsFormSchema
>;
