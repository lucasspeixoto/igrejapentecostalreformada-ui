import { z } from 'zod';

export const createSupplementaryEducationFormSchema = z.object({
  schooling: z.string(),
  profession: z
    .string()
    .min(3, 'A profissão precisa conter no mínimo 3 caracteres!')
    .optional()
    .or(z.literal('')),
});

export type CreateSupplementaryEducationFormData = z.infer<typeof createSupplementaryEducationFormSchema>;
