import { z } from 'zod';

export const createEcclesiasticalBaptismFormSchema = z.object({
  baptism: z.string(),
  baptismDate: z.string().optional().or(z.literal('')),
  baptismShepherd: z
    .string()
    .min(3, 'O Nome precisa conter no mínimo 3 caracteres!')
    .optional()
    .or(z.literal('')),
});

export type CreateEcclesiasticalBaptismFormData = z.infer<typeof createEcclesiasticalBaptismFormSchema>;
