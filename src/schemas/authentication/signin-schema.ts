import { z } from 'zod';

export const loginUserFormSchema = z.object({
  usernameOrEmail: z
    .string()
    .min(1, 'E-mail ou nome de usuário é obrigatório!')
    .email('E-mail ou nome de usuário em formato inválido!')
    .toLowerCase(),
  password: z.string().min(3, 'A senha precisa conter no mínimo 6 caracteres!'),
});

export type LoginUserFormData = z.infer<typeof loginUserFormSchema>;
