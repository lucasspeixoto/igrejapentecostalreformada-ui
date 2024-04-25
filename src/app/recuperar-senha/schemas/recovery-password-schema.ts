import { z } from 'zod';

export const recoveryPasswordFormSchema = z.object({
  email: z
    .string()
    .min(1, 'E-mail é obrigatório!')
    .email('E-mail em formato inválido!')
    .toLowerCase(),
});

export type RecoveryPasswordFormData = z.infer<
  typeof recoveryPasswordFormSchema
>;
