import { z } from 'zod';

/* The code is defining a schema for a personal contact form. The schema is created
using the `zod` library, which is a TypeScript runtime type checking library. */
export const createPersonalAddressFormSchema = z.object({
  cep: z.coerce.number().gte(1, 'Número inválido'),
  state: z.string(),
  city: z.string().min(3, 'A Cidade precisa conter no mínimo 3 caracteres!'),
  address: z
    .string()
    .min(3, 'O Nome da rua precisa conter no mínimo 3 caracteres!'),
  district: z
    .string()
    .min(3, 'O Nome do bairro precisa conter no mínimo 3 caracteres!'),
  number: z.coerce.number().gte(1, 'Número inválido'),
  complement: z
    .string()
    .min(3, 'O Complemento precisa conter no mínimo 3 caracteres!'),
});

export type CreatePersonalAddressFormData = z.infer<
  typeof createPersonalAddressFormSchema
>;
