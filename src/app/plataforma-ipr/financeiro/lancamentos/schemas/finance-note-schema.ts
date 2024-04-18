import { z } from 'zod';

type FinanceType = 'C' | 'D';

export const financeNoteFormSchema = z.object({
  type: z.custom<FinanceType>(),
  value: z.coerce.number().gte(1, 'Número inválido'),
  description: z
    .string()
    .min(3, 'A descrição precisa conter no mínimo 3 caracteres!'),
});

export type FinanceNoteFormData = z.infer<typeof financeNoteFormSchema>;