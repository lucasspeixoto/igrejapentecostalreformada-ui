import { z } from 'zod';

import { phoneRegex } from '@/constants/regex';

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
  sex: z.string(),
  cellphone: z.string().regex(phoneRegex, 'Número de celular inválido!'),
  telephone: z
    .string()
    .regex(phoneRegex, 'Número de telefone inválido!')
    .optional()
    .or(z.literal('')),

  birthday: z.string(),
});

export type CreatePersonalContactFormData = z.infer<
  typeof createPersonalContactFormSchema
>;
