import { z } from 'zod';

export const createUserFormSchema = z
  .object({
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
    email: z
      .string()
      .min(1, 'E-mail é obrigatório!')
      .email('E-mail em formato inválido!')
      .toLowerCase()
      .refine(email => {
        return email.endsWith('.com');
      }, 'Domínio de email incorreto'),
    password: z
      .string()
      .min(6, 'A senha precisa conter no mínimo 6 caracteres!'),
    confirmedPassword: z
      .string()
      .min(6, 'A senha precisa conter no mínimo 6 caracteres!'),
  })
  .refine(data => data.password === data.confirmedPassword, {
    message: 'As senhas precisam ser iguais',
    path: ['confirmedPassword'], // path of error
  });

export type CreateUserFormData = z.infer<typeof createUserFormSchema>;
