import { z } from 'zod';

export const loginUserFormSchema = z.object({
  email: z
    .string()
    .min(1, 'E-mail é obrigatório!')
    .email('E-mail em formato inválido!')
    .toLowerCase()
    .refine(email => {
      return email.endsWith('.com');
    }, 'Domínio de email incorreto'),
  password: z.string().min(6, 'A senha precisa conter no mínimo 6 caracteres!'),
});

export type LoginUserFormData = z.infer<typeof loginUserFormSchema>;
