import { z } from 'zod';

import { phoneRegex } from '@/constants/regex';

/* The code is defining a schema for a personal contact form. The schema is created
using the `zod` library, which is a TypeScript runtime type checking library. */
export const createPersonalContactFormSchema = z.object({
  name: z
    .string()
    .min(3, 'O Nome precisa conter no mínimo 3 caracteres!')
    .transform(name => {
      return name
        .trim()
        .split(' ')
        .map(word => {
          return word[0].toLocaleUpperCase().concat(word.substring(1));
        })
        .join(' ');
    }),
  lastName: z
    .string()
    .min(3, 'O Sobre nome precisa conter no mínimo 3 caracteres!')
    .transform(lastName => {
      return lastName
        .trim()
        .split(' ')
        .map(word => {
          return word[0].toLocaleUpperCase().concat(word.substring(1));
        })
        .join(' ');
    }),
  sex: z.string(),
  cellphone: z.string().regex(phoneRegex, 'Número de celular inválido!'),
  telephone: z.string().regex(phoneRegex, 'Número de telefone inválido!'),
  birthday: z.string(),
});

export type CreatePersonalContactFormData = z.infer<
  typeof createPersonalContactFormSchema
>;
